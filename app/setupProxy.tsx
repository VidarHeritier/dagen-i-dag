import { createProxyMiddleware } from "http-proxy-middleware";
import { Application } from "express";

module.exports = function (app: Application) {
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
};
