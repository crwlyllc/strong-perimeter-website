const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const yearEl = document.getElementById("year");
const quoteForm = document.getElementById("quote-form");
const youtubeEmbeds = document.querySelectorAll(".youtube-embed");
const googleMapEl = document.querySelector("[data-google-map]");
const googleMapDataEl = document.getElementById("strong-service-area-map-data");
const quoteStepper = document.querySelector("[data-quote-stepper]");
const googleAddressInputs = document.querySelectorAll("[data-google-address-autocomplete]");

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
    fullscreenControl: false,
    clickableIcons: false
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

let strongPerimeterMapData = null;

if (googleMapEl && googleMapDataEl) {
  try {
    strongPerimeterMapData = JSON.parse(googleMapDataEl.textContent);
  } catch {
    strongPerimeterMapData = null;
  }
}

function componentValue(components, type, key = "long_name") {
  return components.find((component) => component.types.includes(type))?.[key] || "";
}

function initStrongPerimeterAddressAutocomplete() {
  if (!window.google?.maps?.places || !googleAddressInputs.length) {
    return;
  }

  googleAddressInputs.forEach((input) => {
    if (input.dataset.googleAddressReady === "true") {
      return;
    }

    input.dataset.googleAddressReady = "true";
    input.autocomplete = "off";

    const autocomplete = new window.google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: "us" },
      fields: ["address_components", "formatted_address", "name"],
      types: ["address"]
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      const components = place.address_components || [];
      const prefix = input.dataset.addressPrefix || input.id;
      const form = input.form || document;
      const streetNumber = componentValue(components, "street_number");
      const route = componentValue(components, "route");
      const street = [streetNumber, route].filter(Boolean).join(" ") || place.name || "";
      const street2 = componentValue(components, "subpremise");
      const city = componentValue(components, "locality")
        || componentValue(components, "sublocality")
        || componentValue(components, "postal_town");
      const state = componentValue(components, "administrative_area_level_1", "short_name");
      const postalCode = componentValue(components, "postal_code");
      const postalSuffix = componentValue(components, "postal_code_suffix");
      const zip = [postalCode, postalSuffix].filter(Boolean).join("-");
      const values = {
        [`${prefix}-street`]: street,
        [`${prefix}-street-2`]: street2,
        [`${prefix}-city`]: city,
        [`${prefix}-state`]: state,
        [`${prefix}-zip`]: zip
      };

      input.value = place.formatted_address || input.value;

      Object.entries(values).forEach(([id, value]) => {
        const field = form.querySelector(`#${CSS.escape(id)}`);
        if (field && value) {
          field.value = value;
        }
      });
    });
  });
}

function initStrongPerimeterGoogleIntegrations() {
  if (googleMapEl && strongPerimeterMapData) {
    initStrongPerimeterServiceMap(strongPerimeterMapData, googleMapEl);
  }

  initStrongPerimeterAddressAutocomplete();
}

function loadStrongPerimeterGoogleMaps() {
  const googleMapsApiKey = googleMapEl?.dataset.apiKey
    || googleAddressInputs[0]?.dataset.apiKey
    || window.STRONG_PERIMETER_GOOGLE_MAPS_API_KEY
    || "";

  if (!googleMapsApiKey) {
    return;
  }

  window.initStrongPerimeterGoogleIntegrations = initStrongPerimeterGoogleIntegrations;

  if (window.google?.maps?.places) {
    initStrongPerimeterGoogleIntegrations();
    return;
  }

  if (document.querySelector("[data-strong-google-maps-script]")) {
    return;
  }

  const googleMapsScript = document.createElement("script");
  googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(googleMapsApiKey)}&libraries=places&callback=initStrongPerimeterGoogleIntegrations&loading=async`;
  googleMapsScript.async = true;
  googleMapsScript.defer = true;
  googleMapsScript.dataset.strongGoogleMapsScript = "true";
  document.head.appendChild(googleMapsScript);
}

if ((googleMapEl && strongPerimeterMapData) || googleAddressInputs.length) {
  loadStrongPerimeterGoogleMaps();
}

if (quoteStepper) {
  const steps = Array.from(quoteStepper.querySelectorAll("[data-quote-step]"));
  const progressFill = quoteStepper.querySelector("[data-quote-progress-fill]");
  const progressValue = quoteStepper.querySelector("[data-quote-progress-value]");
  const navPrevButtons = Array.from(quoteStepper.querySelectorAll("[data-quote-prev]"));
  const navNextButtons = Array.from(quoteStepper.querySelectorAll("[data-quote-next]"));
  const fenceTypeInputs = Array.from(quoteStepper.querySelectorAll("[data-fence-type-select]"));
  const servicePanels = Array.from(quoteStepper.querySelectorAll("[data-service-panel]"));
  const fenceTypeError = quoteStepper.querySelector("[data-fence-type-error]");
  const serviceChoiceError = quoteStepper.querySelector("[data-service-choice-error]");
  let activeStep = 0;

  const selectedFenceTypes = () => fenceTypeInputs
    .filter((input) => input.checked)
    .map((input) => input.value);

  const setGroupValidity = (input, message) => {
    if (!input) return;
    input.setCustomValidity(message);
    input.reportValidity();
    input.setCustomValidity("");
  };

  const syncStyleSections = () => {
    quoteStepper.querySelectorAll("[data-style-section]").forEach((section) => {
      const panel = section.closest("[data-service-panel]");
      const triggerValue = section.dataset.styleTriggerValue || "Installation/replacement";
      const triggerIsChecked = Array.from(panel?.querySelectorAll("[data-service-choice]") || [])
        .some((input) => input.value === triggerValue && input.checked);
      const isActive = Boolean(panel && !panel.hidden && triggerIsChecked);

      section.hidden = !isActive;
      section.querySelectorAll("input").forEach((field) => {
        field.disabled = !isActive;

        if (!isActive) {
          field.checked = false;
        }
      });
    });
  };

  const syncServicePanels = () => {
    const selected = new Set(selectedFenceTypes());

    servicePanels.forEach((panel) => {
      const isSelected = selected.has(panel.dataset.fenceValue);
      panel.hidden = !isSelected;

      panel.querySelectorAll("input, textarea").forEach((field) => {
        field.disabled = !isSelected;

        if (!isSelected) {
          if (field.type === "checkbox" || field.type === "radio") field.checked = false;
          else field.value = "";
        }
      });
    });

    syncStyleSections();
  };

  fenceTypeInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (fenceTypeError) fenceTypeError.hidden = selectedFenceTypes().length > 0;
      syncServicePanels();
    });
  });

  const showStep = (index) => {
    activeStep = Math.max(0, Math.min(index, steps.length - 1));
    syncServicePanels();

    steps.forEach((step, stepIndex) => {
      const isActive = stepIndex === activeStep;
      step.hidden = !isActive;
      step.classList.toggle("is-active", isActive);
    });

    const percent = Math.round(((activeStep + 1) / steps.length) * 100);
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressValue) progressValue.textContent = `${percent}%`;

    navPrevButtons.forEach((button) => {
      button.disabled = activeStep === 0;
    });

    navNextButtons.forEach((button) => {
      button.disabled = activeStep === steps.length - 1;
    });
  };

  const validateStep = (step) => {
    const fenceGroup = Array.from(step.querySelectorAll("[data-fence-type-select]"));
    if (fenceGroup.length && !fenceGroup.some((input) => input.checked)) {
      if (fenceTypeError) fenceTypeError.hidden = false;
      setGroupValidity(fenceGroup[0], "Choose at least one fence type.");
      return false;
    }

    if (fenceGroup.length && fenceTypeError) {
      fenceTypeError.hidden = true;
    }

    const visibleServicePanels = Array.from(step.querySelectorAll("[data-service-panel]:not([hidden])"));
    for (const panel of visibleServicePanels) {
      const serviceChoices = Array.from(panel.querySelectorAll("[data-service-choice]"));
      if (serviceChoices.length && !serviceChoices.some((input) => input.checked)) {
        if (serviceChoiceError) serviceChoiceError.hidden = false;
        setGroupValidity(serviceChoices[0], "Choose at least one service for this fence type.");
        return false;
      }
    }

    if (visibleServicePanels.length && serviceChoiceError) {
      serviceChoiceError.hidden = true;
    }

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

  navNextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (validateStep(steps[activeStep])) {
        showStep(activeStep + 1);
      }
    });
  });

  navPrevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showStep(activeStep - 1);
    });
  });

  quoteStepper.querySelectorAll("[data-service-choice]").forEach((input) => {
    input.addEventListener("change", syncStyleSections);
  });

  syncServicePanels();
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
    const addressStreet = document.getElementById("quote-address-street")?.value.trim() || "";
    const addressStreet2 = document.getElementById("quote-address-street-2")?.value.trim() || "";
    const addressCity = document.getElementById("quote-address-city")?.value.trim() || "";
    const addressState = document.getElementById("quote-address-state")?.value.trim() || "";
    const addressZip = document.getElementById("quote-address-zip")?.value.trim() || "";
    const structuredAddress = [
      addressStreet,
      addressStreet2,
      [addressCity, addressState, addressZip].filter(Boolean).join(", ")
    ].filter(Boolean).join("\n");
    const quoteAreas = Array.from(quoteForm.querySelectorAll("[data-service-panel]"))
      .filter((panel) => !panel.hidden)
      .map((panel, index) => {
        const serviceNeeded = Array.from(panel.querySelectorAll("[data-service-choice]:checked"))
          .map((input) => input.value)
          .join(", ");
        const areaFenceType = panel.dataset.fenceValue || "";
        const styleSection = panel.querySelector("[data-style-section]:not([hidden])");
        const hasStyleOptions = Boolean(styleSection);
        const style = styleSection?.querySelector("[data-scope-style]:checked")?.value || "";
        const notes = panel.querySelector("[data-scope-notes]")?.value.trim() || "";

        return {
          index: index + 1,
          serviceNeeded,
          fenceType: areaFenceType,
          style: style || (hasStyleOptions ? "Not specified" : ""),
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
    const timeline = document.getElementById("quote-timeline")?.value.trim() || "";
    const details = document.getElementById("quote-details")?.value.trim() || "";
    const areaLines = quoteAreas.length
      ? quoteAreas.flatMap((area) => [
        `${area.index}. ${area.fenceType || "Fence area"}`,
        `   Service needed: ${area.serviceNeeded || "Not specified"}`,
        ...(area.style ? [`   Style: ${area.style}`] : []),
        `   Notes: ${area.notes || "No notes provided."}`
      ])
      : [
        `1. ${fenceType || "Fence area"}`,
        `   Fence type: ${fenceType || "Not specified"}`,
        `   Service needed: ${service || "Not specified"}`,
        "   Notes: No notes provided."
      ];

    const subject = `Strong Perimeter Quote Request - ${quoteAreas.length > 1 ? "Multiple Fence Types" : fenceType || service || "New Project"}`;
    const body = [
      "Strong Perimeter quote request",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Project address: ${address || structuredAddress || "Not provided"}`,
      `Street: ${addressStreet || "Not provided"}`,
      `Street 2: ${addressStreet2 || "Not provided"}`,
      `City: ${addressCity || "Not provided"}`,
      `State: ${addressState || "Not provided"}`,
      `ZIP: ${addressZip || "Not provided"}`,
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
