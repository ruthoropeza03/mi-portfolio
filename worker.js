export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname.endsWith(".workers.dev")) {
      return Response.redirect(`https://ruthoropeza.site${url.pathname}${url.search}`, 301);
    }

    if (url.hostname === "media.ruthoropeza.site") {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return new Response("Method not allowed", {
          status: 405,
          headers: { Allow: "GET, HEAD" },
        });
      }

      let key;
      try {
        const segments = url.pathname
          .slice(1)
          .split("/")
          .map((segment) => decodeURIComponent(segment));

        if (
          segments.length === 0 ||
          segments.some(
            (segment) => !segment || segment === "." || segment === ".." || /[/\\]/.test(segment)
          )
        ) {
          return new Response("Not found", { status: 404 });
        }

        key = segments.join("/");
      } catch {
        return new Response("Invalid object key", { status: 400 });
      }

      const object =
        request.method === "HEAD"
          ? await env.PORTFOLIO_BUCKET.head(key)
          : await env.PORTFOLIO_BUCKET.get(key);

      if (!object) {
        return new Response("Not found", { status: 404 });
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("ETag", object.httpEtag);
      headers.set("Cache-Control", headers.get("Cache-Control") || "public, max-age=3600");
      headers.set("X-Content-Type-Options", "nosniff");

      if (!headers.has("Content-Type")) {
        const extension = key.split(".").pop()?.toLowerCase();
        const contentTypes = {
          pdf: "application/pdf",
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
          png: "image/png",
          svg: "image/svg+xml",
          webp: "image/webp",
        };

        if (extension && contentTypes[extension]) {
          headers.set("Content-Type", contentTypes[extension]);
        }
      }

      if (key.toLowerCase().endsWith(".pdf")) {
        headers.set(
          "Content-Disposition",
          url.searchParams.get("download") === "1" ? "attachment" : "inline"
        );
      }

      return new Response(request.method === "HEAD" ? null : object.body, { headers });
    }

    return env.ASSETS.fetch(request);
  },
};
