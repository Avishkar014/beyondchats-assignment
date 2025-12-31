import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    api.get("/articles").then(res => setArticles(res.data));
  }, []);

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 24 }}>Articles</h1>

      {articles.map(a => (
        <div
          key={a._id}
          style={{
            padding: 16,
            marginBottom: 16,
            borderRadius: 8,
            border: "1px solid #ddd"
          }}
        >
          <Link
            to={`/articles/${a._id}`}
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textDecoration: "none"
            }}
          >
            {a.title}
          </Link>

          <div style={{ marginTop: 8 }}>
            Status:{" "}
            <span
              style={{
                padding: "4px 8px",
                borderRadius: 4,
                background:
                  a.status === "updated" ? "#d1fae5" : "#e5e7eb"
              }}
            >
              {a.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
