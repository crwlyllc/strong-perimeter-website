const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const yearEl = document.getElementById("year");
const quoteForm = document.getElementById("quote-form");
const youtubeEmbeds = document.querySelectorAll(".youtube-embed");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });
}

if (youtubeEmbeds.length) {
  const canEmbedYoutube = window.location.protocol === "http:" || window.location.protocol === "https:";

  youtubeEmbeds.forEach((embed) => {
    const videoId = embed.dataset.videoId;
    const title = embed.dataset.title || "Strong Perimeter video";
    const mode = embed.dataset.youtubeMode || "standard";
    const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

    if (!videoId) {
      return;
    }

    if (!canEmbedYoutube) {
      const fallbackLabel = mode === "background"
        ? "View restoration video on YouTube"
        : "Watch video on YouTube";

      embed.innerHTML = `
        <a class="youtube-fallback youtube-fallback--link" href="${watchUrl}" target="_blank" rel="noopener" aria-label="${fallbackLabel}">
          <div class="youtube-fallback__inner">
            <span class="youtube-fallback__eyebrow">Video preview</span>
            <p>${fallbackLabel}</p>
            <span class="youtube-fallback__link">Open YouTube</span>
          </div>
        </a>
      `;
      return;
    }

    const params = new URLSearchParams({
      playsinline: "1",
      rel: "0",
      origin: window.location.origin,
      widget_referrer: window.location.href
    });

    if (mode === "background") {
      params.set("autoplay", "1");
      params.set("mute", "1");
      params.set("controls", "0");
      params.set("loop", "1");
      params.set("playlist", videoId);
      params.set("modestbranding", "1");
    } else {
      params.set("controls", "1");
      params.set("modestbranding", "1");
    }

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    iframe.title = title;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "origin";

    embed.replaceChildren(iframe);
  });
}

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const to = quoteForm.dataset.to || "sales@strongperimeter.com";
    const name = document.getElementById("quote-name")?.value.trim() || "";
    const email = document.getElementById("quote-email")?.value.trim() || "";
    const phone = document.getElementById("quote-phone")?.value.trim() || "";
    const address = document.getElementById("quote-address")?.value.trim() || "";
    const service = document.getElementById("quote-service")?.value.trim() || "";
    const timeline = document.getElementById("quote-timeline")?.value.trim() || "";
    const details = document.getElementById("quote-details")?.value.trim() || "";

    const subject = `Strong Perimeter Quote Request - ${service || "New Project"}`;
    const body = [
      "Strong Perimeter quote request",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Project address: ${address || "Not provided"}`,
      `Fence type: ${service || "Not specified"}`,
      `Timeline: ${timeline || "Not specified"}`,
      "",
      "Project details:",
      details || "No project details provided yet."
    ].join("\n");

    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
