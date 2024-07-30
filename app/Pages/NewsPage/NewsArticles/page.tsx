import React, { useRef } from "react";

interface NewsArticleProps {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  image?: string;
  author?: string;
}

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const imageElement = e.currentTarget;
  console.error("Error loading image:", e);
  imageElement.src = "/path/to/default-image.jpg";
};

const NewsArticle: React.FC<NewsArticleProps> = ({
  title,
  link,
  description,
  pubDate,
  image,
  author,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <div className="flex items-start mb-4 border-b-2 border-gray-300 pb-4">
      {/* Image */}
      {image && (
        <img
          ref={imageRef}
          src={image}
          alt={title}
          className="w-32 h-32 object-cover mr-4 rounded-lg border-2 border-gray-300"
          onError={handleImageError}
        />
      )}

      {/* Text content */}
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-2">
          <a href={link} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <p className=" mb-2">{description}</p>
        <p className="text-sm">{new Date(pubDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default NewsArticle;
