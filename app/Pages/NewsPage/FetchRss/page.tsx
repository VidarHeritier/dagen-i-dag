import { parseStringPromise } from "xml2js";

interface Article {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  image?: string;
  author?: string;
}

export default async function fetchRSSItems(url: string): Promise<Article[]> {
  const response = await fetch(url);
  const xml = await response.text();

  const result = await parseStringPromise(xml);
  const items = result.rss.channel[0].item;

  return items.map((item: any) => ({
    title: item.title[0],
    link: item.link[0],
    description: item.description[0],
    pubDate: item.pubDate[0],
    image: item["media:thumbnail"] ? item["media:thumbnail"][0].$.url : null,
    author: item["dc:creator"] ? item["dc:creator"][0] : "Unknown",
  }));
}
