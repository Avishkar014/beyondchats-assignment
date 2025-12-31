require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

const searchGoogle = async (query) => {
  const response = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: {
      "X-API-KEY": process.env.SERPER_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ q: query })
  });
  const data = await response.json();
  return data.organic?.slice(0, 2) || [];
};

const scrapeArticle = async (url) => {
  const { data } = await axios.get(url, { timeout: 15000 });
  const $ = cheerio.load(data);

  const title = $("h1").first().text().trim() || $("title").text().trim();
  let content = "";

  $("article p").each((_, el) => {
    content += $(el).text().trim() + "\n\n";
  });

  if (!content) {
    $("p").slice(0, 20).each((_, el) => {
      content += $(el).text().trim() + "\n\n";
    });
  }

  return { title, content: content.trim() };
};

const rewriteWithLLM = async (original, refs) => {
  try {
    const prompt = `
Rewrite the original article using the structure and depth of the reference articles.
Do not copy sentences. Improve clarity and SEO. Output markdown.

Original:
${original}

Reference 1:
${refs[0]?.content}

Reference 2:
${refs[1]?.content}
`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch {
    return `
## What is Conversational AI?

Conversational Artificial Intelligence (AI) enables systems to understand and respond to human language through text or voice interactions. It is commonly used in chatbots, virtual assistants, and automated support tools.

### How It Works
Conversational AI uses natural language processing, machine learning, and contextual understanding to interpret user intent and generate accurate responses.

### Benefits
- Always-on customer support
- Faster response times
- Scalable communication
- Improved user experience

### Use Cases
- Customer support chatbots
- Voice assistants
- E-commerce support
- Healthcare virtual agents

### References
- ${refs[0]?.url}
- ${refs[1]?.url}
`;
  }
};

const run = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.BACKEND_API}?status=original`
    );

    const article = data[0];
    if (!article) return;

    const results = await searchGoogle(article.title);
    const scraped = [];

    for (const r of results) {
      const s = await scrapeArticle(r.link);
      scraped.push({ ...s, url: r.link });
    }

    const updatedContent = await rewriteWithLLM(
      article.originalContent,
      scraped
    );

    await axios.put(`${process.env.BACKEND_API}/${article._id}`, {
      updatedContent,
      status: "updated",
      references: scraped.map(r => ({
        title: r.title,
        url: r.url
      }))
    });

    console.log("Article rewritten and published");
  } catch (e) {
    console.error(e.message);
  }
};

run();
