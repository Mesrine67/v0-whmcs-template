const fs = require("fs")
const path = require("path")

const baseUrl = "https://hebergtonserv.com"
const locales = ["fr", "en", "es", "de"]

const staticPages = [
  "",
  "/hosting",
  "/vps",
  "/fivem",
  "/dedicated",
  "/domains",
  "/support",
  "/login",
  "/register",
  "/terms",
  "/privacy",
  "/legal",
  "/configurator",
  "/compare",
  "/reviews",
]

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticPages
  .map((page) => {
    return locales
      .map((locale) => {
        const url = locale === "fr" ? `${baseUrl}${page}` : `${baseUrl}/${locale}${page}`
        const alternates = locales
          .map((altLocale) => {
            const altUrl = altLocale === "fr" ? `${baseUrl}${page}` : `${baseUrl}/${altLocale}${page}`
            return `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${altUrl}"/>`
          })
          .join("\n")

        return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
${alternates}
  </url>`
      })
      .join("\n")
  })
  .join("\n")}
</urlset>`

  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), sitemap)
  console.log("Sitemap generated successfully!")
}

generateSitemap()
