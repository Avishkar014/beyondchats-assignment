import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    api.get(`/articles/${id}`).then(res => setArticle(res.data));
  }, [id]);

  if (!article) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <Link to="/">← Back</Link>

      <h1 style={{ marginTop: 16 }}>{article.title}</h1>

      <div style={{ marginBottom: 24 }}>
        Status:{" "}
        <span
          style={{
            padding: "4px 10px",
            borderRadius: 6,
            background: article.status === "updated" ? "#d1fae5" : "#e5e7eb",
            fontWeight: "bold"
          }}
        >
          {article.status}
        </span>
      </div>

      {/* ORIGINAL ARTICLE */}
      <section style={{ marginBottom: 32 }}>
        <h2>Original Article</h2>
        <div
          style={{
            padding: 16,
            border: "1px solid #ddd",
            borderRadius: 8,
            lineHeight: 1.7,
            whiteSpace: "pre-wrap"
          }}
        >
          {article.originalContent || "No original content available"}
        </div>
      </section>

      {/* UPDATED ARTICLE */}
      {article.updatedContent && (
        <section style={{ marginBottom: 32 }}>
          <h2>Updated Article</h2>
          <div
            style={{
              padding: 16,
              border: "1px solid #22c55e",
              background: "#f0fdf4",
              borderRadius: 8,
              lineHeight: 1.7,
              whiteSpace: "pre-wrap"
            }}
          >
            {article.updatedContent}
          </div>
        </section>
      )}

      {/* REFERENCES */}
      {article.references?.length > 0 && (
        <section>
          <h3>References</h3>
          <ul>
            {article.references.map((r, i) => (
              <li key={i}>
                <a href={r.url} target="_blank" rel="noreferrer">
                  {r.title || r.url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
