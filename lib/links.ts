/**
 * External destinations that live on the app subdomain, not this marketing site.
 */
export const SIGNUP_URL = "https://app.talktomedata.com/signup"
export const LOGIN_URL = "https://app.talktomedata.com/login"

/**
 * The product demo that every "Watch the demo" link leads to (/watch-demo).
 * https://youtu.be/orM0GLxjT8E
 */
export const DEMO_VIDEO_ID = "orM0GLxjT8E"
export const DEMO_EMBED_URL = `https://www.youtube.com/embed/${DEMO_VIDEO_ID}`

/**
 * The social media agent demo (https://youtu.be/0MDBjZoQrhg), embedded on
 * /agents/social-media and the social media blog posts.
 */
export const SOCIAL_AGENT_VIDEO = {
  youtubeId: "0MDBjZoQrhg",
  title: "AI Social Media Manager Demo",
  description: "A 71-second demo of the Talk to me Data social media agent: it analyzes your posts, finds what works, plans your content and creates the posts.",
  thumbnail: "/videos/ai-social-media-manager-demo-thumbnail.jpg",
  uploadDate: "2026-10-15T06:48:48-07:00",
  duration: "PT1M11S",
}

/**
 * The SEO & GEO agent demo (https://youtu.be/NQFFZaovJTw), embedded on
 * /agents/seo-geo.
 */
export const SEO_AGENT_VIDEO = {
  youtubeId: "NQFFZaovJTw",
  title: "SEO & GEO AI Agent Demo",
  description: "A 53-second demo of the Talk to me Data SEO & GEO agent: it finds the searches you can win on Google, writes pages built to rank and get cited by AI, and publishes them to your site.",
  thumbnail: "/videos/seo-geo-agent-demo-thumbnail.jpg",
  uploadDate: "2026-10-21T01:26:36-07:00",
  duration: "PT53S",
}
