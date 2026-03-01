import express from "express";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import fetch from "node-fetch";

const DB_FILE = path.join(process.cwd(), "data.json");
const JWT_SECRET = process.env.JWT_SECRET || "xdownloader-secret-key-2026";

// Initialize JSON Database
interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  meta_description: string;
  created_at: string;
}

interface Settings {
  site_title: string;
  site_description: string;
  ads_code: string;
  site_name: string;
  site_icon: string;
}

interface DB {
  articles: Article[];
  settings: Settings;
  nextArticleId: number;
}

const defaultDB: DB = {
  articles: [],
  settings: {
    site_title: "XDownloader - Best Twitter Video & Image Downloader (HD)",
    site_description: "Download Twitter videos, photos, and GIFs in HD quality. The fastest X (Twitter) downloader for MP4 and JPG. Free, secure, and no registration required.",
    ads_code: "",
    site_name: "XDownloader",
    site_icon: ""
  },
  nextArticleId: 1
};

function readDB(): DB {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultDB, null, 2));
    return defaultDB;
  }
  try {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return defaultDB;
  }
}

function writeDB(data: DB) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

const app = express();
app.use(express.json());
app.use(cookieParser());

// Admin Auth Middleware
const authenticateAdmin = (req: any, res: any, next: any) => {
  const token = req.cookies?.admin_token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// --- Public API Routes ---

// Get Site Info
app.get("/api/site-info", (req, res) => {
  const db = readDB();
  res.json(db.settings);
});

// Get Articles List
app.get("/api/articles", (req, res) => {
  const db = readDB();
  const list = db.articles.map(({ content, ...rest }) => rest).sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  res.json(list);
});

// Get Single Article
app.get("/api/articles/:slug", (req, res) => {
  const db = readDB();
  const article = db.articles.find(a => a.slug === req.params.slug);
  if (!article) return res.status(404).json({ error: "Article not found" });
  res.json(article);
});

// View Raw Data in Browser
app.get("/api/raw-data", (req, res) => {
  const db = readDB();
  res.json(db);
});

// Export Data as JSON
app.get("/api/export-data", (req, res) => {
  if (!fs.existsSync(DB_FILE)) return res.status(404).send("No data found");
  res.download(DB_FILE, "xdownloader_backup.json");
});

// Sitemap XML
app.get("/sitemap.xml", (req, res) => {
  const db = readDB();
  const baseUrl = process.env.APP_URL || "https://xdownloader.app";
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/sitemap</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.4</priority>
  </url>`;

  db.articles.forEach(a => {
    const articleDate = a.created_at.split('T')[0];
    sitemap += `
  <url>
    <loc>${baseUrl}/blog/${a.slug}</loc>
    <lastmod>${articleDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;
  res.header("Content-Type", "application/xml");
  res.send(sitemap);
});

// --- Admin API Routes ---

// Admin Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "sayeem" && password === "@Sayeem7664") {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "24h" });
    res.cookie("admin_token", token, { 
      httpOnly: true, 
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000 
    });
    return res.json({ success: true });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

// Admin Logout
app.post("/api/logout", (req, res) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
  res.json({ success: true });
});

// Check Auth Status
app.get("/api/admin/check", authenticateAdmin, (req, res) => {
  res.json({ authenticated: true });
});

// Update Settings
app.post("/api/admin/settings", authenticateAdmin, (req, res) => {
  const { site_title, site_description, ads_code, site_name, site_icon } = req.body;
  const db = readDB();
  if (site_title !== undefined) db.settings.site_title = site_title;
  if (site_description !== undefined) db.settings.site_description = site_description;
  if (ads_code !== undefined) db.settings.ads_code = ads_code;
  if (site_name !== undefined) db.settings.site_name = site_name;
  if (site_icon !== undefined) db.settings.site_icon = site_icon;
  writeDB(db);
  res.json({ success: true });
});

// Create Article
app.post("/api/admin/articles", authenticateAdmin, (req, res) => {
  const { title, slug, content, meta_description } = req.body;
  const db = readDB();
  
  if (db.articles.some(a => a.slug === slug)) {
    return res.status(400).json({ error: "Slug already exists" });
  }

  const newArticle: Article = {
    id: db.nextArticleId++,
    title,
    slug,
    content,
    meta_description,
    created_at: new Date().toISOString()
  };

  db.articles.push(newArticle);
  writeDB(db);
  res.json({ success: true });
});

// Update Article
app.put("/api/admin/articles/:id", authenticateAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const { title, slug, content, meta_description } = req.body;
  const db = readDB();
  
  const index = db.articles.findIndex(a => a.id === id);
  if (index === -1) return res.status(404).json({ error: "Article not found" });

  db.articles[index] = {
    ...db.articles[index],
    title,
    slug,
    content,
    meta_description
  };

  writeDB(db);
  res.json({ success: true });
});

// Delete Article
app.delete("/api/admin/articles/:id", authenticateAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const db = readDB();
  db.articles = db.articles.filter(a => a.id !== id);
  writeDB(db);
  res.json({ success: true });
});

// Proxy download endpoint to bypass CORS and force download
app.get("/api/proxy-download", async (req, res) => {
  const fileUrl = req.query.url as string;
  const filename = req.query.filename as string || "download";

  if (!fileUrl) {
    return res.status(400).send("URL is required");
  }

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error(`Failed to fetch file: ${response.statusText}`);

    const contentType = response.headers.get("content-type");
    if (contentType) res.setHeader("Content-Type", contentType);
    
    // Force download header
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("Proxy download error:", error);
    res.status(500).send("Failed to download file");
  }
});

// API Route for Twitter Video Extraction
app.post("/api/download", async (req, res) => {
  const { url } = req.body;

  if (!url || (!url.includes("twitter.com") && !url.includes("x.com"))) {
    return res.status(400).json({ error: "Please provide a valid Twitter or X URL" });
  }

  try {
    const tweetIdMatch = url.match(/status\/(\d+)/);
    if (!tweetIdMatch) {
      return res.status(400).json({ error: "Invalid Twitter/X URL. Please make sure it contains a status ID." });
    }
    const tweetId = tweetIdMatch[1];

    // Simulating extraction delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const apiSources = [
      `https://api.vxtwitter.com/status/${tweetId}`,
      `https://api.fxtwitter.com/status/${tweetId}`,
      `https://api.fixupx.com/status/${tweetId}`
    ];

    let data = null;

    // Try FixTweet sources first
    for (const apiUrl of apiSources) {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json'
          },
          signal: AbortSignal.timeout(8000)
        });

        if (response.ok) {
          const json = await response.json() as any;
          if (json && json.media_extended && json.media_extended.length > 0) {
            data = json;
            break;
          }
        }
      } catch (e) {
        continue;
      }
    }

    // Fallback to Cobalt API if FixTweet fails
    if (!data) {
      try {
        const cobaltResponse = await fetch("https://api.cobalt.tools/api/json", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            url: url,
            videoQuality: "1080"
          }),
          signal: AbortSignal.timeout(10000)
        });

        if (cobaltResponse.ok) {
          const cobaltJson = await cobaltResponse.json() as any;
          if (cobaltJson.status === "stream" || cobaltJson.status === "redirect") {
            return res.json({
              id: tweetId,
              title: "Twitter Media",
              thumbnail: cobaltJson.url, // Cobalt doesn't always provide thumb easily, use url as fallback or placeholder
              media: [{
                type: "video",
                label: "Video",
                variants: [{ quality: "HD Quality (MP4)", url: cobaltJson.url, size: "Auto" }]
              }]
            });
          } else if (cobaltJson.status === "picker") {
             const media = cobaltJson.picker.map((item: any) => ({
                type: item.type === "video" ? "video" : "image",
                label: item.type === "video" ? "Video" : "Photo",
                variants: [{ quality: "Original Quality", url: item.url, size: "Auto" }]
             }));
             return res.json({
                id: tweetId,
                title: "Twitter Media",
                thumbnail: cobaltJson.picker[0].url,
                media: media
             });
          }
        }
      } catch (e) {
        console.error("Cobalt fallback failed:", e);
      }
    }
    
    if (!data || !data.media_extended || data.media_extended.length === 0) {
      return res.status(429).json({ 
        error: "Twitter is currently rate-limiting free extraction requests. Please wait 1-2 minutes and try again." 
      });
    }

    const detectedMedia = data.media_extended.map((m: any) => {
      if (m.type === 'video' || m.type === 'gif') {
        return {
          type: m.type,
          label: m.type === 'video' ? "Video" : "GIF",
          variants: [
            { quality: m.type === 'video' ? "High Quality (MP4)" : "Original GIF", url: m.url, size: "Auto" }
          ]
        };
      } else if (m.type === 'image') {
        return {
          type: "image",
          label: "Photo",
          variants: [
            { quality: "Original HD (JPG)", url: m.url, size: "Auto" }
          ]
        };
      }
      return null;
    }).filter(Boolean);

    res.json({
      id: tweetId,
      title: data.text ? data.text.substring(0, 80) + "..." : "Tweet Media",
      thumbnail: data.media_extended[0].thumbnail_url || data.media_extended[0].url,
      media: detectedMedia
    });

  } catch (error) {
    res.status(500).json({ error: "The extraction service is currently overloaded. Please try again." });
  }
});

export default app;
