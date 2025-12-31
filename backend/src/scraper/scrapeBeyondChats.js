const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("../models/Article");

const BLOG_URL = "https://beyondchats.com/blogs/";

const scrapeOldestArticles = async () => {
  try {
    const { data } = await axios.get(BLOG_URL);
    const $ = cheerio.load(data);

    const articles = [];

    // Select last 5 articles on page
    $(".blog-card").slice(-5).each((i, el) => {
      const title = $(el).find("h3").text().trim();
      const slug = $(el).find("a").attr("href");

      articles.push({
        title,
        slug,
        originalContent: "",
        status: "original"
      });
    });

    for (const article of articles) {
      await Article.create(article);
    }

    console.log("✅ Oldest articles scraped and stored");
    process.exit();
  } catch (error) {
    console.error("❌ Scraping failed", error.message);
    process.exit(1);
  }
};

scrapeOldestArticles();
