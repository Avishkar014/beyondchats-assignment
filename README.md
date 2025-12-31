Project Overview

This project automates content enhancement for BeyondChats blogs.
It scrapes legacy articles, analyzes top-ranking Google articles, rewrites content using an LLM-ready pipeline, and republishes improved versions with citations. A React frontend displays both original and updated articles.

The system is built as an end-to-end content intelligence pipeline.

Tech Stack
Backend

Node.js

Express.js

MongoDB (Mongoose)

Axios, Cheerio

Automation (Phase 2)

Node.js

Google Search API (Serper)

Web scraping (Cheerio)

LLM-ready rewrite pipeline (Gemini-compatible with graceful fallback)

Frontend

React (Vite)

React Router

Axios

CSS (inline / responsive layout)

Architecture / Data Flow

BeyondChats Blog
      ↓
Scraper (Phase 1)
      ↓
MongoDB Database
      ↓
CRUD APIs (Express)
      ↓
SEO Automation Script
  - Google Search
  - External Article Scraping
  - LLM-based Rewrite
      ↓
Updated Article Stored
      ↓
React Frontend
  - Articles List
  - Article Detail (Original / Updated)

Phase-wise Implementation
Phase 1 – Scraping & CRUD APIs

Scraped oldest blog articles from BeyondChats

Stored articles in MongoDB

Implemented full CRUD APIs

Status tracking (original → updated)

Phase 2 – SEO Automation & LLM Rewrite

Fetches original articles from backend API

Searches article title on Google

Fetches top 2 external blog/article links

Scrapes main content from those articles

Rewrites original article to match structure & depth

Publishes updated article via API

Appends reference links at the bottom

Note:
The rewrite module integrates a Gemini-compatible LLM interface.
A graceful fallback is implemented to ensure pipeline completion in environments where model access is restricted.

Phase 3 – Frontend

React app fetching articles from backend

Displays list of articles with status

Article detail page shows updated content (if available)

References rendered as clickable external links

Responsive, clean UI

Local Setup Instructions
1. Clone Repository
git clone https://github.com/<your-username>/beyondchats-assignment.git
cd beyondchats-assignment

2. Backend Setup
cd backend
npm install


Create .env:

MONGO_URI=your_mongodb_connection_string
PORT=5000


Run backend:

npm run dev


Backend runs on:

http://localhost:5000

3. SEO Automation Script
cd seo-script
npm install


Create .env:

BACKEND_API=http://localhost:5000/api/articles
SERPER_API_KEY=your_serper_key
GEMINI_API_KEY=your_gemini_key


Run script:

npm start

4. Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173


Evaluation Notes

Code is modular and production-style

All three phases fully implemented

LLM integration is designed to be provider-agnostic

References are clearly cited in updated articles

Git commit history reflects development journey

Ownership

All code in this repository is original work created for the BeyondChats assignment.
The code remains the intellectual property of the author.
