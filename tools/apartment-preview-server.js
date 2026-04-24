const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const APARTMENTS_DIR = path.join(ROOT, "_apartments");
const HOST = "127.0.0.1";
const DEFAULT_PORT = 4173;

const apartments = loadApartments();
const apartmentBySlug = new Map(apartments.map((apartment) => [apartment.slug, apartment]));
const apartmentByPath = new Map();

apartments.forEach((apartment) => {
  apartmentByPath.set(normalizeRoute(`/${apartment.slug}/`), apartment);

  if (apartment.data.permalink) {
    apartmentByPath.set(normalizeRoute(apartment.data.permalink), apartment);
  }
});

if (process.argv.includes("--check")) {
  console.log(`Appartamenti caricati: ${apartments.length}`);
  apartments.forEach((apartment) => {
    console.log(`- ${apartment.slug}`);
  });
  process.exit(0);
}

const port = getPortFromArgs(process.argv.slice(2)) || Number(process.env.PORT) || DEFAULT_PORT;

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host || `${HOST}:${port}`}`);
  const pathname = decodeURIComponent(requestUrl.pathname);

  if (pathname === "/" || pathname === "/index.html") {
    sendHtml(response, renderPreviewIndex(apartments, port));
    return;
  }

  const apartment = apartmentByPath.get(normalizeRoute(pathname)) || apartmentBySlug.get(trimSlashes(pathname));
  if (apartment) {
    sendHtml(response, renderApartmentPage(apartment));
    return;
  }

  const filePath = resolveStaticPath(pathname);
  if (filePath) {
    serveFile(response, filePath);
    return;
  }

  response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  response.end(renderNotFound(pathname));
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Porta ${port} occupata. Prova: npm run dev -- --port 4174`);
    process.exit(1);
  }

  console.error(error);
  process.exit(1);
});

server.listen(port, HOST, () => {
  console.log(`Preview pronta su http://${HOST}:${port}/`);
  console.log(`Apri un appartamento, per esempio: http://${HOST}:${port}/${apartments[0]?.slug || ""}/`);
});

function loadApartments() {
  const filenames = fs
    .readdirSync(APARTMENTS_DIR)
    .filter((filename) => filename.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b, "it"));

  return filenames.map((filename) => {
    const fullPath = path.join(APARTMENTS_DIR, filename);
    const raw = fs.readFileSync(fullPath, "utf8");
    const data = parseFrontMatter(raw);

    return {
      slug: path.basename(filename, ".md"),
      fullPath,
      data
    };
  });
}

function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    return {};
  }

  const lines = match[1].split(/\r?\n/);
  const data = {};
  let currentKey = null;

  for (const line of lines) {
    if (!line.trim()) {
      continue;
    }

    const listItemMatch = line.match(/^\s*-\s*(.+?)\s*$/);
    if (listItemMatch && currentKey) {
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = [];
      }

      data[currentKey].push(unquote(listItemMatch[1]));
      continue;
    }

    const keyValueMatch = line.match(/^([A-Za-z0-9_]+):(?:\s*(.*))?$/);
    if (!keyValueMatch) {
      currentKey = null;
      continue;
    }

    const [, key, rawValue = ""] = keyValueMatch;
    currentKey = key;

    if (!rawValue.trim()) {
      data[key] = [];
      continue;
    }

    data[key] = unquote(rawValue.trim());
  }

  return data;
}

function unquote(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function renderPreviewIndex(apartmentList, portNumber) {
  const apartmentLinks = apartmentList
    .map((apartment) => {
      const title = apartment.data.title || apartment.slug;
      const type = apartment.data.tipologia || "Appartamento";
      return `
        <a class="preview-card" href="/${encodeURIComponent(apartment.slug)}/">
          <span class="preview-card__eyebrow">${escapeHtml(type)}</span>
          <strong class="preview-card__title">${escapeHtml(title)}</strong>
          <span class="preview-card__link">Apri preview</span>
        </a>
      `;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview appartamenti</title>
  <style>
    :root {
      color-scheme: light;
      font-family: Inter, Arial, Helvetica, sans-serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #f5f1ea;
      color: #171717;
    }
    main {
      width: min(1180px, calc(100% - 40px));
      margin: 0 auto;
      padding: 48px 0 56px;
    }
    h1 {
      margin: 0 0 10px;
      font: 500 clamp(40px, 5vw, 68px) "Cormorant Garamond", Georgia, serif;
      color: #4a3632;
      text-transform: uppercase;
      line-height: 1;
    }
    p {
      margin: 0;
      max-width: 760px;
      font-size: 18px;
      line-height: 1.55;
      color: rgba(88, 69, 64, 0.82);
    }
    .preview-meta {
      margin-top: 8px;
      font-size: 13px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(70, 52, 47, 0.7);
    }
    .preview-grid {
      margin-top: 32px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 18px;
    }
    .preview-card {
      display: grid;
      gap: 10px;
      padding: 22px;
      text-decoration: none;
      color: inherit;
      background: #ffffff;
      border: 1px solid rgba(0,0,0,0.08);
      min-height: 168px;
    }
    .preview-card__eyebrow {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(70, 52, 47, 0.7);
    }
    .preview-card__title {
      font-size: 32px;
      line-height: 1;
      font-family: "Cormorant Garamond", Georgia, serif;
      color: #4a3632;
    }
    .preview-card__link {
      align-self: end;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <main>
    <h1>Preview Apartment</h1>
    <p>
      Qui puoi vedere in locale i file dentro <code>_apartments</code> con il layout <code>apartment</code>,
      senza toccare il front matter e senza passare da Jekyll.
    </p>
    <div class="preview-meta">Server locale su porta ${portNumber}</div>
    <div class="preview-grid">${apartmentLinks}</div>
  </main>
</body>
</html>`;
}

function renderApartmentPage(apartment) {
  const { data, slug } = apartment;
  const title = data.title || slug;
  const gallery = Array.isArray(data.gallery) ? data.gallery : [];
  const hasGlb = Boolean(data.glb_model);

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="/assets/css/styl.css">
  <script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.182.0/build/three.module.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.182.0/examples/jsm/"
    }
  }
  </script>
</head>
<body>
  <main class="page">
    <div class="app-card">
      <nav class="section-nav">
        <a href="#video">VIDEO</a>
        <a href="#render">RENDER</a>
        <a href="#modello-3d">MODELLO 3D</a>
        <a href="#tour">TOUR</a>
      </nav>

      ${data.hero_video ? renderVideoSection(data) : ""}
      ${gallery.length ? renderGallerySection(gallery) : ""}
      ${hasGlb ? renderModelSection(data.glb_model) : ""}
      ${data.tour_embed_url ? renderTourSection(data.tour_embed_url) : ""}
    </div>
  </main>

  <script src="/assets/js/script.js"></script>
  ${hasGlb ? '<script type="module" src="/assets/js/three-viewer.js"></script>' : ""}
</body>
</html>`;
}

function renderVideoSection(data) {
  const posterAttribute = data.hero_poster ? ` poster="${escapeAttribute(data.hero_poster)}"` : "";
  const overlayImage = data.hero_overlay_png
    ? `
          <img
            class="hero-overlay-png"
            src="${escapeAttribute(data.hero_overlay_png)}"
            alt=""
          >`
    : "";

  return `
      <section id="video" class="block scroll-target">
        <div class="hero-media media-card">
          <video
            class="hero-video"
            autoplay
            muted
            loop
            playsinline${posterAttribute}
          >
            <source src="${escapeAttribute(data.hero_video)}" type="video/mp4">
          </video>${overlayImage}
        </div>
      </section>`;
}

function renderGallerySection(gallery) {
  const images = gallery
    .map(
      (image) => `
          <div class="gallery-item media-card">
            <img
              src="${escapeAttribute(image)}"
              alt=""
              loading="lazy"
            >
          </div>`
    )
    .join("");

  return `
      <section id="render" class="block scroll-target">
        <div class="gallery-column">${images}
        </div>
      </section>`;
}

function renderModelSection(modelUrl) {
  return `
      <section id="modello-3d" class="block scroll-target">
        <div
          class="viewer-wrap three-viewer media-card"
          data-model="${escapeAttribute(modelUrl)}">
          <canvas id="three-canvas"></canvas>
        </div>
      </section>`;
}

function renderTourSection(tourUrl) {
  return `
      <section id="tour" class="block scroll-target">
        <div class="tour-wrap media-card" id="tour-container">
          <a class="btn btn--light tour-home-btn" href="https://ilarioplacanica.github.io/Alfieri/">
            Torna alla home
          </a>
          <button type="button"
                  class="tour-fullscreen-btn"
                  id="tour-fullscreen-btn"
                  aria-label="Schermo intero">
            ⤢
          </button>

          <iframe id="tour-iframe"
                  src="${escapeAttribute(tourUrl)}"
                  title="Tour virtuale"
                  loading="lazy"
                  allowfullscreen
                  referrerpolicy="strict-origin-when-cross-origin">
          </iframe>
        </div>
      </section>`;
}

function renderNotFound(pathname) {
  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Non trovato</title>
  <style>
    body {
      margin: 0;
      font-family: Inter, Arial, Helvetica, sans-serif;
      background: #f5f1ea;
      color: #171717;
      display: grid;
      min-height: 100vh;
      place-items: center;
      text-align: center;
      padding: 24px;
    }
    a {
      color: inherit;
    }
  </style>
</head>
<body>
  <div>
    <h1>Pagina non trovata</h1>
    <p>Nessuna preview disponibile per <code>${escapeHtml(pathname)}</code>.</p>
    <p><a href="/">Torna all'indice delle preview</a></p>
  </div>
</body>
</html>`;
}

function resolveStaticPath(pathname) {
  const sanitized = pathname.replace(/^\/+/, "");
  const candidate = path.resolve(ROOT, sanitized);

  if (!candidate.startsWith(ROOT)) {
    return null;
  }

  if (!fs.existsSync(candidate)) {
    return null;
  }

  const stats = fs.statSync(candidate);
  if (stats.isFile()) {
    return candidate;
  }

  if (stats.isDirectory()) {
    const indexPath = path.join(candidate, "index.html");
    if (fs.existsSync(indexPath)) {
      return indexPath;
    }
  }

  return null;
}

function serveFile(response, filePath) {
  const contentType = getContentType(filePath);
  response.writeHead(200, { "Content-Type": contentType });
  fs.createReadStream(filePath).pipe(response);
}

function sendHtml(response, html) {
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.end(html);
}

function getPortFromArgs(args) {
  const portFlagIndex = args.indexOf("--port");
  if (portFlagIndex >= 0 && args[portFlagIndex + 1]) {
    return Number(args[portFlagIndex + 1]);
  }

  return null;
}

function normalizeRoute(route) {
  const trimmed = `/${trimSlashes(route)}/`;
  return trimmed === "//" ? "/" : trimmed;
}

function trimSlashes(value) {
  return String(value || "").replace(/^\/+|\/+$/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case ".css":
      return "text/css; charset=utf-8";
    case ".js":
      return "text/javascript; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".html":
      return "text/html; charset=utf-8";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".svg":
      return "image/svg+xml";
    case ".mp4":
      return "video/mp4";
    case ".glb":
      return "model/gltf-binary";
    case ".gltf":
      return "model/gltf+json";
    case ".woff":
      return "font/woff";
    case ".woff2":
      return "font/woff2";
    default:
      return "application/octet-stream";
  }
}
