const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const yearEl = document.getElementById("year");
const quoteForm = document.getElementById("quote-form");
const youtubeEmbeds = document.querySelectorAll(".youtube-embed");
const googleMapEl = document.querySelector("[data-google-map]");
const googleMapDataEl = document.getElementById("strong-service-area-map-data");
const quoteStepper = document.querySelector("[data-quote-stepper]");

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

function escapeMapHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function initStrongPerimeterServiceMap(mapData, mapEl) {
  if (!window.google?.maps || !mapData?.cities?.length) {
    return;
  }

  const preferredZoom = mapData.zoom || 10;
  const map = new window.google.maps.Map(mapEl, {
    center: mapData.center,
    zoom: preferredZoom,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true
  });

  const bounds = new window.google.maps.LatLngBounds();
  const infoWindow = new window.google.maps.InfoWindow();

  mapData.cities.forEach((city) => {
    const position = { lat: city.lat, lng: city.lng };
    const marker = new window.google.maps.Marker({
      position,
      map,
      title: city.name,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 6,
        fillColor: "#db7337",
        fillOpacity: 1,
        strokeColor: "#fffdf9",
        strokeWeight: 2
      }
    });

    marker.addListener("click", () => {
      infoWindow.setContent(`
        <strong>${escapeMapHtml(city.name)}</strong><br>
        <a href="${escapeMapHtml(city.href)}">View service area page</a>
      `);
      infoWindow.open(map, marker);
    });

    bounds.extend(position);
  });

  map.fitBounds(bounds, 44);

  window.google.maps.event.addListenerOnce(map, "bounds_changed", () => {
    map.setZoom(preferredZoom);
  });

  mapEl.closest(".service-map")?.classList.add("is-google-map-loaded");
}

if (googleMapEl && googleMapDataEl) {
  let mapData;

  try {
    mapData = JSON.parse(googleMapDataEl.textContent);
  } catch {
    mapData = null;
  }

  const googleMapsApiKey = googleMapEl.dataset.apiKey || window.STRONG_PERIMETER_GOOGLE_MAPS_API_KEY || "";

  if (mapData && googleMapsApiKey) {
    window.initStrongPerimeterGoogleMap = () => {
      initStrongPerimeterServiceMap(mapData, googleMapEl);
    };

    const googleMapsScript = document.createElement("script");
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(googleMapsApiKey)}&callback=initStrongPerimeterGoogleMap&loading=async`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    document.head.appendChild(googleMapsScript);
  }
}

if (quoteStepper) {
  const steps = Array.from(quoteStepper.querySelectorAll("[data-quote-step]"));
  const indicators = Array.from(quoteStepper.querySelectorAll("[data-quote-step-indicator]"));
  const quoteAreaList = quoteStepper.querySelector("[data-quote-area-list]");
  const quoteAreaTemplate = quoteStepper.querySelector("[data-quote-area-template]");
  const addQuoteAreaButton = quoteStepper.querySelector("[data-add-quote-area]");
  let quoteAreaCount = quoteAreaList?.querySelectorAll("[data-quote-area]").length || 0;
  let activeStep = 0;

  const refreshQuoteAreaControls = () => {
    if (!quoteAreaList) return;

    const areas = Array.from(quoteAreaList.querySelectorAll("[data-quote-area]"));

    areas.forEach((area, index) => {
      const title = area.querySelector("[data-quote-area-title]");
      const removeButton = area.querySelector("[data-remove-quote-area]");

      if (title) title.textContent = `Fence area ${index + 1}`;
      if (removeButton) {
        removeButton.hidden = areas.length === 1;
        removeButton.disabled = areas.length === 1;
      }
    });
  };

  if (quoteAreaList && quoteAreaTemplate && addQuoteAreaButton) {
    addQuoteAreaButton.addEventListener("click", () => {
      quoteAreaCount += 1;

      const wrapper = document.createElement("div");
      wrapper.innerHTML = quoteAreaTemplate.innerHTML.replaceAll("__INDEX__", String(quoteAreaCount)).trim();
      const area = wrapper.firstElementChild;

      if (!area) return;

      quoteAreaList.append(area);
      refreshQuoteAreaControls();
      area.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    quoteAreaList.addEventListener("click", (event) => {
      const removeButton = event.target.closest("[data-remove-quote-area]");
      if (!removeButton) return;

      const area = removeButton.closest("[data-quote-area]");
      if (!area || quoteAreaList.querySelectorAll("[data-quote-area]").length <= 1) return;

      area.remove();
      refreshQuoteAreaControls();
    });

    refreshQuoteAreaControls();
  }

  const showStep = (index) => {
    activeStep = Math.max(0, Math.min(index, steps.length - 1));

    steps.forEach((step, stepIndex) => {
      const isActive = stepIndex === activeStep;
      step.hidden = !isActive;
      step.classList.toggle("is-active", isActive);
    });

    indicators.forEach((indicator, indicatorIndex) => {
      indicator.classList.toggle("is-active", indicatorIndex === activeStep);
      indicator.classList.toggle("is-complete", indicatorIndex < activeStep);
    });
  };

  const validateStep = (step) => {
    const requiredRadioGroups = new Set(
      Array.from(step.querySelectorAll('input[type="radio"][required]')).map((input) => input.name)
    );

    for (const groupName of requiredRadioGroups) {
      if (!quoteStepper.querySelector(`input[name="${groupName}"]:checked`)) {
        step.querySelector(`input[name="${groupName}"]`)?.reportValidity();
        return false;
      }
    }

    const fields = Array.from(step.querySelectorAll("input:not([type='radio']), select, textarea"));
    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }

    return true;
  };

  quoteStepper.querySelectorAll("[data-quote-next]").forEach((button) => {
    button.addEventListener("click", () => {
      if (validateStep(steps[activeStep])) {
        showStep(activeStep + 1);
      }
    });
  });

  quoteStepper.querySelectorAll("[data-quote-prev]").forEach((button) => {
    button.addEventListener("click", () => {
      showStep(activeStep - 1);
    });
  });

  showStep(0);
}

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const to = quoteForm.dataset.to || "sales@strongperimeter.com";
    const firstName = document.getElementById("quote-first-name")?.value.trim() || "";
    const lastName = document.getElementById("quote-last-name")?.value.trim() || "";
    const name = document.getElementById("quote-name")?.value.trim() || `${firstName} ${lastName}`.trim();
    const email = document.getElementById("quote-email")?.value.trim() || "";
    const phone = document.getElementById("quote-phone")?.value.trim() || "";
    const address = document.getElementById("quote-address")?.value.trim() || "";
    const quoteAreas = Array.from(quoteForm.querySelectorAll("[data-quote-area]")).map((area, index) => {
      const location = area.querySelector("[data-scope-location]")?.value.trim() || "";
      const serviceNeeded = area.querySelector("[data-scope-service]:checked")?.value || "";
      const areaFenceType = area.querySelector("[data-scope-fence-type]:checked")?.value || "";
      const notes = area.querySelector("[data-scope-notes]")?.value.trim() || "";

      return {
        index: index + 1,
        location,
        serviceNeeded,
        fenceType: areaFenceType,
        notes
      };
    });
    const service = document.getElementById("quote-service")?.value.trim()
      || quoteForm.querySelector('input[name="service"]:checked')?.value
      || quoteAreas[0]?.serviceNeeded
      || "";
    const fenceType = quoteForm.querySelector('input[name="fence_type"]:checked')?.value
      || quoteAreas[0]?.fenceType
      || "";
    const propertyType = quoteForm.querySelector('input[name="property_type"]:checked')?.value || "";
    const timeline = document.getElementById("quote-timeline")?.value.trim() || "";
    const details = document.getElementById("quote-details")?.value.trim() || "";
    const areaLines = quoteAreas.length
      ? quoteAreas.flatMap((area) => [
        `${area.index}. ${area.location || "Fence area"}`,
        `   Fence type: ${area.fenceType || "Not specified"}`,
        `   Service needed: ${area.serviceNeeded || "Not specified"}`,
        `   Notes: ${area.notes || "No notes provided."}`
      ])
      : [
        `1. ${fenceType || "Fence area"}`,
        `   Fence type: ${fenceType || "Not specified"}`,
        `   Service needed: ${service || "Not specified"}`,
        "   Notes: No notes provided."
      ];

    const subject = `Strong Perimeter Quote Request - ${quoteAreas.length > 1 ? "Multiple Fence Areas" : service || "New Project"}`;
    const body = [
      "Strong Perimeter quote request",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Project address: ${address || "Not provided"}`,
      `Property type: ${propertyType || "Not specified"}`,
      `Timeline: ${timeline || "Not specified"}`,
      "",
      "Fence areas:",
      ...areaLines,
      "",
      "Project details:",
      details || "No project details provided yet."
    ].join("\n");

    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
