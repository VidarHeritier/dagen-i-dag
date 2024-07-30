import React, { useEffect, useState, useRef } from "react";

import Heading from "../Heading/page";
import NewsArticle from "./NewsArticles/page";
import fetchRSSItems from "./FetchRss/page";

interface Article {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  image?: string;
  author?: string;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function loadArticles() {
      const rssItems = await fetchRSSItems(
        "https://www.nrk.no/vestland/toppsaker.rss"
      );
      setArticles(rssItems);
    }
    loadArticles();
  }, []);

  return (
    <div className="p-4">
      <Heading>Dagens nyheter</Heading>
      <div className="news-container">
        {articles.map((article, index) => (
          <NewsArticle
            key={index}
            title={article.title}
            link={article.link}
            description={article.description}
            pubDate={article.pubDate}
            image={article.image}
            author={article.author}
          />
        ))}
      </div>
    </div>
  );
}
