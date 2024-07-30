import React, { useEffect, useState } from "react";
import axios from "axios";
import Heading from "../Heading/page";

interface Article {
  title: string;
  url: string;
  description: string;
  publishedAt: string;
  image?: string;
}

const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_NEWS_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setError("API key is missing.");
      setLoading(false);
      return;
    }

    const apiUrl = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apiKey=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data.articles) {
          setArticles(response.data.articles);
        } else {
          setError("No articles found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching news articles:",
          error.response?.data || error.message
        );
        setError(
          error.response?.data?.message ||
            "An error occurred while fetching news articles."
        );
        setLoading(false);
      });
  }, [apiKey]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Heading>Loading...</Heading>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Heading>Error: {error}</Heading>
      </div>
    );
  }

  const limitedArticles = articles.slice(0, 6); // Limit to 6 articles

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Heading>Dagens nyheter</Heading>

      {limitedArticles.length > 0 ? (
        <ul className="w-full max-w-4xl">
          {limitedArticles.map((article) => (
            <li
              key={article.url}
              className="flex items-start mb-4 border-gray-300 border-b-2 pb-4"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-32 h-32 object-cover mr-4 rounded-lg border-2 border-gray-300"
                />
              )}

              <div className="flex flex-col">
                <h2 className="text-xl font-bold mb-2">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title}
                  </a>
                </h2>
                <p className="mb-2">{article.description}</p>
                <p className="text-sm">{formatDate(article.publishedAt)}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles available.</p>
      )}
    </div>
  );
};

export default NewsPage;
