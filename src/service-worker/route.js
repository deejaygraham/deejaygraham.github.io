export function getFetchRoute(request, workerOrigin) {
  const method = typeof request.method === "string" ? request.method : "GET";
  if (method !== "GET") {
    return "none";
  }

  const urlString = typeof request.url === "string" ? request.url : String(request.url);
  const url = new URL(urlString);

  const mode = request.mode;
  const destination = request.destination || "";

  if (mode === "navigate" || destination === "document") {
    return "navigate";
  }

  const sameOrigin = url.origin === workerOrigin;

  const isCssJs =
    sameOrigin &&
    (destination === "style" ||
      destination === "script" ||
      /\.(css|js)$/.test(url.pathname));

  if (isCssJs) {
    return "cssjs";
  }

  const isImage =
    sameOrigin &&
    (destination === "image" || /\.(png|jpe?g|gif|webp|svg)$/.test(url.pathname));

  if (isImage) {
    return "image";
  }

  return "default";
}
