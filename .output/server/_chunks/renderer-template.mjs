import { i as HTTPResponse } from "../_libs/h3+rou3+srvx.mjs";
//#region #nitro/virtual/renderer-template
var rendererTemplate = () => new HTTPResponse("<!doctype html>\n<html lang=\"tr\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\" />\n    <meta name=\"theme-color\" content=\"#0B0614\" />\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />\n    <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Cinzel+Decorative:wght@700;900&display=swap\" />\n    <title>AI Multiverse Cinema</title>\n        <meta name=\"twitter:card\" content=\"summary_large_image\">\n    </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/mobile.tsx\"><\/script>\n  </body>\n</html>\n", { headers: { "content-type": "text/html; charset=utf-8" } });
//#endregion
//#region node_modules/.pnpm/nitro@3.0.260603-beta_drizzle-orm@0.45.4_postgres@3.4.9__jiti@2.7.0_vite@8.1.5_@types+n_9b7cb23e6c314be60587609f460b891b/node_modules/nitro/dist/runtime/internal/routes/renderer-template.mjs
function renderIndexHTML(event) {
	return rendererTemplate(event.req);
}
//#endregion
export { renderIndexHTML as default };
