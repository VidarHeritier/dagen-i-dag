import { createProxyMiddleware } from "http-proxy-middleware";
import express, { Application } from "express";

export default function setupProxy(app: Application): void {
  app.use(
    "/ipinfo",
    createProxyMiddleware({
      target: "https://ipinfo.io",
      changeOrigin: true,
      pathRewrite: {
        "^/ipinfo": "",
      },
      headers: {
        Authorization: `Bearer YOUR_API_TOKEN`,
      },
    })
  );
}

const app = express();
setupProxy(app);
