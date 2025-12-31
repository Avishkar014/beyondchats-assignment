import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    api.get(`/articles/${id}`).then(res => setArticle(res.data));
  }, [id]);

  if (!article) {
    return <div style={{ padding: 32 }}>Loading...</div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: 32 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Link
          to="/"
          style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}
        >
          ← Back to Articles
        </Link>

        <h1 style={{ marginTop: 16, color: "#020617" }}>
          {article.title}
        </h1>

        <div style={{ margin: "12px 0 32px" }}>
          <span
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              background:
                article.status === "updated" ? "#dcfce7" : "#e5e7eb",
              color:
                article.status === "updated" ? "#166534" : "#374151",
              fontWeight: 600,
              fontSize: 14
            }}
          >
            {article.status.toUpperCase()}
          </span>
        </div>

        {/* ORIGINAL ARTICLE */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ marginBottom: 12, color: "#020617" }}>
            Original Article
          </h2>
          <div
            style={{
              background: "#ffffff",
              padding: 20,
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              lineHeight: 1.8,
              color: "#334155",
              whiteSpace: "pre-wrap"
            }}
          >
            {article.originalContent}
          </div>
        </section>

        {/* UPDATED ARTICLE */}
        {article.updatedContent && (
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ marginBottom: 12, color: "#020617" }}>
              Updated Article
            </h2>
            <div
              style={{
                background: "#f0fdf4",
                padding: 20,
                borderRadius: 12,
                border: "1px solid #bbf7d0",
                lineHeight: 1.8,
                color: "#14532d",
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
            <h3 style={{ marginBottom: 12, color: "#020617" }}>
              References
            </h3>
            <ul style={{ paddingLeft: 20 }}>
              {article.references.map((r, i) => (
                <li key={i} style={{ marginBottom: 8 }}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#2563eb" }}
                  >
                    {r.title || r.url}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
