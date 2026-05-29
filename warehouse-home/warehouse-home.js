const canvas = document.getElementById("sim-canvas");
const ctx = canvas.getContext("2d");
const hudEl = document.getElementById("sim-hud");
const jobPanelEl = document.getElementById("job-panel");
const actionPanelEl = document.getElementById("action-panel");
const sceneReadoutEl = document.getElementById("scene-readout");

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const supplyCatalog = {
  posts: { label: "Steel posts", unit: "post", price: 28, bundle: 2 },
  rails: { label: "Cedar rails", unit: "rail", price: 13, bundle: 6 },
  pickets: { label: "Cedar pickets", unit: "picket", price: 3, bundle: 24 },
  concrete: { label: "Concrete bags", unit: "bag", price: 7, bundle: 6 },
  hardware: { label: "Gate hardware", unit: "set", price: 36, bundle: 1 },
  sprinklerRepair: { label: "Sprinkler repair kits", unit: "kit", price: 18, bundle: 1 }
};

const jobTemplates = [
  {
    id: "cedar-storm-repair",
    title: "Storm-damaged cedar repair",
    kind: "Repair",
    location: "Lake Highlands",
    payout: 1450,
    dueHour: 14.75,
    difficulty: "Medium",
    risk: "Old tree roots around the failed post",
    scope: "Replace one leaned post, rebuild a broken bay, and match the cedar pickets.",
    required: { posts: 1, rails: 3, pickets: 18, concrete: 2 },
    stages: [
      { key: "inspect", title: "Inspect leaning section", verb: "Inspect section", time: 0.35, energy: 2, quality: 1, note: "Measured the failed bay and marked the string line." },
      { key: "demo", title: "Demo broken bay", verb: "Demo bay", time: 0.8, energy: 10, cost: 20, quality: 0, note: "Removed broken rails, pickets, and old concrete." },
      { key: "dig-a", title: "Dig replacement post hole", verb: "Dig post hole", type: "dig", hole: 0, time: 0.7, energy: 12, hazard: { type: "roots" }, note: "Replacement post hole is open and clean." },
      { key: "set-a", title: "Set steel post", verb: "Set post", type: "set", hole: 0, uses: { posts: 1, concrete: 2 }, time: 0.8, energy: 10, quality: 1, note: "Post is plumb, braced, and set in concrete." },
      { key: "rails", title: "Install cedar rails", verb: "Install rails", visual: "rails", uses: { rails: 3 }, time: 0.75, energy: 8, quality: 1, note: "Rails are tight and level." },
      { key: "pickets", title: "Replace cedar pickets", verb: "Hang pickets", visual: "pickets", uses: { pickets: 18 }, time: 0.95, energy: 9, quality: 1, note: "New pickets blend into the existing fence line." },
      { key: "walkthrough", title: "Cleanup and walkthrough", verb: "Finish walkthrough", visual: "cleanup", time: 0.45, energy: 4, quality: 2, note: "Customer walkthrough complete." }
    ]
  },
  {
    id: "board-on-board-install",
    title: "Board-on-board side yard install",
    kind: "Install",
    location: "Plano",
    payout: 2650,
    dueHour: 17.0,
    difficulty: "Hard",
    risk: "Irrigation line crosses the fence path",
    scope: "Build a short privacy run with three new posts and a clean gate tie-in.",
    required: { posts: 3, rails: 6, pickets: 42, concrete: 6, hardware: 1 },
    stages: [
      { key: "layout", title: "Layout fence line", verb: "Layout line", time: 0.55, energy: 4, quality: 2, note: "Fence line is squared from the house corner." },
      { key: "dig-a", title: "Dig first post hole", verb: "Dig first hole", type: "dig", hole: 0, time: 0.65, energy: 11, hazard: { type: "sprinkler" }, note: "First post hole is dug to depth." },
      { key: "dig-b", title: "Dig middle post hole", verb: "Dig middle hole", type: "dig", hole: 1, time: 0.65, energy: 11, note: "Middle post hole is dug to depth." },
      { key: "dig-c", title: "Dig gate-side post hole", verb: "Dig gate hole", type: "dig", hole: 2, time: 0.8, energy: 13, hazard: { type: "rock" }, note: "Gate-side hole is dug through the hard layer." },
      { key: "set-posts", title: "Set three posts", verb: "Set posts", type: "set", hole: 0, uses: { posts: 3, concrete: 6 }, time: 1.25, energy: 16, quality: 2, note: "All posts are plumb and braced." },
      { key: "rails", title: "Build rail structure", verb: "Build rails", visual: "rails", uses: { rails: 6 }, time: 1.15, energy: 12, quality: 1, note: "Rail structure is ready for pickets." },
      { key: "pickets", title: "Hang board-on-board pickets", verb: "Hang pickets", visual: "pickets", uses: { pickets: 42 }, time: 1.65, energy: 16, quality: 2, note: "Privacy face is straight and consistent." },
      { key: "gate", title: "Install gate hardware", verb: "Install hardware", visual: "gate", uses: { hardware: 1 }, time: 0.75, energy: 8, quality: 1, note: "Gate swings cleanly and latches." },
      { key: "walkthrough", title: "Cleanup and walkthrough", verb: "Finish walkthrough", visual: "cleanup", time: 0.55, energy: 5, quality: 2, note: "The site is clean and ready for photos." }
    ]
  },
  {
    id: "sagging-gate-repair",
    title: "Sagging double gate repair",
    kind: "Gate",
    location: "Arlington",
    payout: 980,
    dueHour: 13.5,
    difficulty: "Medium",
    risk: "Latch post may be rotten below grade",
    scope: "Rebuild the latch side, square both leaves, and replace the worn hardware.",
    required: { posts: 1, concrete: 2, pickets: 8, hardware: 1 },
    stages: [
      { key: "diagnose", title: "Diagnose gate sag", verb: "Diagnose gate", time: 0.35, energy: 2, quality: 1, note: "Found hinge wear and a soft latch post." },
      { key: "dig-a", title: "Dig latch post hole", verb: "Dig latch hole", type: "dig", hole: 0, time: 0.65, energy: 10, hazard: { type: "roots" }, note: "Latch post hole is open." },
      { key: "set-a", title: "Set latch post", verb: "Set latch post", type: "set", hole: 0, uses: { posts: 1, concrete: 2 }, time: 0.75, energy: 10, quality: 1, note: "Latch post is square and braced." },
      { key: "skin", title: "Replace damaged pickets", verb: "Replace pickets", visual: "pickets", uses: { pickets: 8 }, time: 0.55, energy: 5, quality: 1, note: "Gate face is patched cleanly." },
      { key: "hardware", title: "Replace gate hardware", verb: "Replace hardware", visual: "gate", uses: { hardware: 1 }, time: 0.65, energy: 5, quality: 2, note: "Hinges, latch, and drop rod are aligned." },
      { key: "walkthrough", title: "Test and walkthrough", verb: "Test gate", visual: "cleanup", time: 0.35, energy: 3, quality: 2, note: "Gate opens, closes, and latches without drag." }
    ]
  },
  {
    id: "chain-link-corner",
    title: "Commercial chain-link corner repair",
    kind: "Commercial",
    location: "Mesquite",
    payout: 1720,
    dueHour: 16.25,
    difficulty: "Hard",
    risk: "Caliche and old low-voltage landscape wire",
    scope: "Reset two corner posts, stretch the corner fabric, and restore the bottom tension wire.",
    required: { posts: 2, concrete: 4, hardware: 1 },
    stages: [
      { key: "secure", title: "Secure work area", verb: "Secure area", time: 0.4, energy: 3, quality: 1, note: "Work zone is coned and documented." },
      { key: "cutout", title: "Cut out bent corner", verb: "Cut out corner", time: 0.85, energy: 10, cost: 15, quality: 0, note: "Bent fabric and old fittings are removed." },
      { key: "dig-a", title: "Dig first corner post", verb: "Dig first hole", type: "dig", hole: 0, time: 0.75, energy: 12, hazard: { type: "rock" }, note: "First corner hole is ready." },
      { key: "dig-b", title: "Dig second corner post", verb: "Dig second hole", type: "dig", hole: 1, time: 0.75, energy: 12, hazard: { type: "wire" }, note: "Second corner hole is ready." },
      { key: "set-posts", title: "Set corner posts", verb: "Set posts", type: "set", hole: 0, uses: { posts: 2, concrete: 4 }, time: 1.1, energy: 14, quality: 2, note: "Corner posts are set and aligned." },
      { key: "stretch", title: "Stretch and tie fabric", verb: "Stretch fabric", visual: "rails", uses: { hardware: 1 }, time: 1.15, energy: 13, quality: 2, note: "Fabric is tight with new fittings." },
      { key: "wire", title: "Restore bottom tension wire", verb: "Restore wire", visual: "pickets", time: 0.55, energy: 5, quality: 1, note: "Bottom wire is tensioned and clipped." },
      { key: "walkthrough", title: "Cleanup and photos", verb: "Finish photos", visual: "cleanup", time: 0.45, energy: 4, quality: 1, note: "Closeout photos are uploaded." }
    ]
  }
];

const hazardOptions = {
  roots: {
    title: "Roots in the dig path",
    detail: "The auger is hitting woody roots right where the post needs to land.",
    options: [
      { id: "hand-dig", label: "Hand-dig around roots", time: 0.75, energy: 10, cost: 0, quality: 3, reputation: 1, note: "Protected the roots and kept the post line true." },
      { id: "shift-post", label: "Shift the post layout", time: 0.35, energy: 4, cost: 12, quality: -2, reputation: 0, note: "Moved the post slightly and adjusted rail spans." },
      { id: "cut-root", label: "Cut through and reset", time: 0.25, energy: 5, cost: 0, quality: -4, reputation: -2, note: "Got through the hole fast, but the tree risk may annoy the customer." }
    ]
  },
  sprinkler: {
    title: "Sprinkler line nicked",
    detail: "A shallow irrigation line crossed the fence path. Water is starting to seep into the hole.",
    options: [
      { id: "repair-coupling", label: "Repair with coupling kit", time: 0.55, energy: 4, cost: 18, uses: { sprinklerRepair: 1 }, quality: 1, reputation: 1, note: "Repaired the line, tested pressure, and moved the post slightly clear." },
      { id: "call-irrigation", label: "Call irrigation tech", time: 0.95, energy: 1, cost: 125, quality: 3, reputation: 2, note: "Paid for help and kept the customer confident." },
      { id: "quick-patch", label: "Quick patch and keep moving", time: 0.3, energy: 2, cost: 10, quality: -5, reputation: -4, note: "The fast patch saved time, but it is a callback risk." }
    ]
  },
  rock: {
    title: "Hard rock layer",
    detail: "The hole stalls in a hard caliche layer before reaching proper depth.",
    options: [
      { id: "rock-bar", label: "Break it with rock bar", time: 0.85, energy: 16, cost: 0, quality: 1, reputation: 0, note: "Powered through the hard layer by hand." },
      { id: "rent-bit", label: "Rent rock auger bit", time: 0.4, energy: 5, cost: 85, quality: 2, reputation: 1, note: "Rented the right bit and hit proper depth." },
      { id: "shallower", label: "Set shallower with extra concrete", time: 0.25, energy: 3, cost: 18, quality: -5, reputation: -2, note: "Saved time, but the post is less durable." }
    ]
  },
  wire: {
    title: "Low-voltage wire in the soil",
    detail: "A landscape lighting wire is buried close to the new corner post location.",
    options: [
      { id: "trace-wire", label: "Trace and hand expose", time: 0.55, energy: 6, cost: 0, quality: 2, reputation: 1, note: "Exposed the wire by hand and kept it intact." },
      { id: "reroute-wire", label: "Reroute with waterproof splice", time: 0.65, energy: 4, cost: 32, quality: 3, reputation: 1, note: "Rerouted the lighting wire with a sealed splice." },
      { id: "work-around", label: "Work around it fast", time: 0.25, energy: 2, cost: 0, quality: -3, reputation: -1, note: "Avoided the wire, but the post placement is less ideal." }
    ]
  }
};

const state = {
  cash: 1850,
  reputation: 68,
  day: 1,
  clock: 7.5,
  crewEnergy: 88,
  selectedJobId: "cedar-storm-repair",
  activeJob: null,
  jobs: makeJobs(),
  supplies: {
    posts: 4,
    rails: 8,
    pickets: 56,
    concrete: 8,
    hardware: 1,
    sprinklerRepair: 1
  },
  completedJobs: [],
  modal: null,
  log: [
    "Morning dispatch is open. Pick a job, load materials, and protect your margin."
  ]
};

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button || button.disabled) {
    return;
  }

  const { action } = button.dataset;

  if (action === "select-job") {
    state.selectedJobId = button.dataset.jobId;
  } else if (action === "start-job") {
    startSelectedJob();
  } else if (action === "perform-stage") {
    performNextStage();
  } else if (action === "resolve-hazard") {
    resolveHazard(button.dataset.optionId);
  } else if (action === "mark-utilities") {
    markUtilities();
  } else if (action === "crew-break") {
    takeCrewBreak();
  } else if (action === "restock") {
    restock(button.dataset.item);
  } else if (action === "cancel-job") {
    cancelJob();
  } else if (action === "next-day") {
    startNextDay();
  }

  render();
});

window.addEventListener("resize", resizeCanvas);

render();
requestAnimationFrame(drawFrame);

function makeJobs() {
  return jobTemplates.map((job) => ({
    ...JSON.parse(JSON.stringify(job)),
    completed: false
  }));
}

function createActiveJob(job) {
  const activeJob = JSON.parse(JSON.stringify(job));
  activeJob.started = true;
  activeJob.timeSpent = 0;
  activeJob.costs = 0;
  activeJob.quality = 82;
  activeJob.utilityMarked = false;
  activeJob.stages = activeJob.stages.map((stage) => ({
    ...stage,
    done: false,
    hazardResolved: false
  }));
  return activeJob;
}

function render() {
  renderHud();
  renderJobPanel();
  renderActionPanel();
  renderSceneReadout();
}

function renderHud() {
  const active = state.activeJob;
  const jobLabel = active ? active.title : "Yard";
  hudEl.innerHTML = [
    hudStat("Cash", formatMoney(state.cash)),
    hudStat("Reputation", `${Math.round(state.reputation)}/100`),
    hudStat("Day / Time", `Day ${state.day} - ${formatTime(state.clock)}`),
    hudStat("Crew Energy", `${Math.round(state.crewEnergy)}%`),
    hudStat("Current", jobLabel)
  ].join("");
}

function renderJobPanel() {
  if (state.activeJob) {
    const job = state.activeJob;
    const nextStage = getNextStage(job);
    jobPanelEl.innerHTML = `
      <div class="panel-title">
        <div>
          <h2>${job.title}</h2>
          <p>${job.location} - ${job.scope}</p>
        </div>
        <span class="tag warning">${job.kind}</span>
      </div>
      <div class="metric-grid">
        ${metric("Bid", formatMoney(job.payout))}
        ${metric("Due", formatTime(job.dueHour))}
        ${metric("Job Cost", formatMoney(job.costs))}
        ${metric("Quality", `${Math.round(job.quality)}/100`)}
      </div>
      <div class="progress-list">
        ${job.stages.map((stage) => progressItem(stage, nextStage)).join("")}
      </div>
    `;
    return;
  }

  const availableJobs = state.jobs.filter((job) => !job.completed);
  const jobCards = availableJobs.map((job) => {
    const selected = job.id === state.selectedJobId;
    const missing = missingForJob(job);
    return `
      <article class="job-card ${selected ? "is-selected" : ""}">
        <div class="panel-title">
          <div>
            <h3>${job.title}</h3>
            <p>${job.location} - ${job.scope}</p>
          </div>
          <span class="tag">${job.kind}</span>
        </div>
        <div class="job-meta">
          <span><b>Bid</b><strong>${formatMoney(job.payout)}</strong></span>
          <span><b>Due</b><strong>${formatTime(job.dueHour)}</strong></span>
          <span><b>Risk</b><strong>${job.difficulty}</strong></span>
        </div>
        <p class="small-note">${job.risk}</p>
        ${missing.length ? `<p class="small-note">Missing: ${missing.join(", ")}</p>` : `<p class="small-note">Materials are ready to load.</p>`}
        <button class="${selected ? "primary-button" : "secondary-button"}" data-action="select-job" data-job-id="${job.id}">
          ${selected ? "Selected" : "Review job"}
        </button>
      </article>
    `;
  }).join("");

  jobPanelEl.innerHTML = `
    <div class="panel-title">
      <div>
        <h2>Bid Board</h2>
        <p>Choose work that fits your materials, time, and risk tolerance.</p>
      </div>
      <span class="tag good">${availableJobs.length} open</span>
    </div>
    <div class="job-list">
      ${jobCards || `<p class="small-note">All posted jobs are complete. Start the next day to get a new board.</p>`}
    </div>
  `;
}

function renderActionPanel() {
  const selected = getSelectedJob();

  if (state.modal) {
    actionPanelEl.innerHTML = renderProblemPanel();
    return;
  }

  if (state.activeJob) {
    const job = state.activeJob;
    const nextStage = getNextStage(job);
    const missing = nextStage ? missingSupplies(nextStage.uses) : [];
    const canWork = nextStage && missing.length === 0;
    const utilitiesButton = job.utilityMarked
      ? `<button class="secondary-button" disabled>Utilities located</button>`
      : `<button class="secondary-button" data-action="mark-utilities">Locate utilities - ${formatMoney(45)} / 0.45 hr</button>`;

    actionPanelEl.innerHTML = `
      <div class="panel-title">
        <div>
          <h2>Field Controls</h2>
          <p>${nextStage ? `Next: ${nextStage.title}` : "Ready to close out."}</p>
        </div>
        <span class="tag ${job.quality >= 84 ? "good" : "warning"}">Quality ${Math.round(job.quality)}</span>
      </div>
      <div class="metric-grid">
        ${metric("Time spent", `${job.timeSpent.toFixed(1)} hr`)}
        ${metric("Deadline", formatTime(job.dueHour))}
        ${metric("Energy", `${Math.round(state.crewEnergy)}%`)}
        ${metric("Margin", formatMoney(job.payout - job.costs))}
      </div>
      ${nextStage ? `
        <button class="primary-button" data-action="perform-stage" ${canWork ? "" : "disabled"}>
          ${nextStage.verb}
        </button>
        ${missing.length ? `<p class="small-note section-gap">Missing for this step: ${missing.join(", ")}.</p>` : ""}
      ` : `<button class="primary-button" data-action="perform-stage">Collect payment</button>`}
      <div class="button-grid section-gap">
        ${utilitiesButton}
        <button class="secondary-button" data-action="crew-break">Crew break - 0.40 hr</button>
      </div>
      <div class="section-gap">
        ${renderSupplies()}
      </div>
      <div class="section-gap">
        <button class="danger-button" data-action="cancel-job">Walk away from job</button>
      </div>
      ${renderLog()}
    `;
    return;
  }

  const missing = selected ? missingForJob(selected) : [];
  const allJobsDone = state.jobs.every((job) => job.completed);
  actionPanelEl.innerHTML = `
    <div class="panel-title">
      <div>
        <h2>Company Yard</h2>
        <p>${selected ? selected.scope : "Select a job to load the truck."}</p>
      </div>
      <span class="tag">${selected ? selected.difficulty : "Dispatch"}</span>
    </div>
    ${selected ? `
      <div class="metric-grid">
        ${metric("Bid", formatMoney(selected.payout))}
        ${metric("Due", formatTime(selected.dueHour))}
        ${metric("Job type", selected.kind)}
        ${metric("Risk", selected.difficulty)}
      </div>
      <button class="primary-button" data-action="start-job" ${missing.length ? "disabled" : ""}>
        Load truck and drive out
      </button>
      ${missing.length ? `<p class="small-note section-gap">Restock before starting: ${missing.join(", ")}.</p>` : `<p class="small-note section-gap">Starting the job adds 0.35 hr of loading and drive time.</p>`}
    ` : ""}
    ${allJobsDone ? `<button class="primary-button" data-action="next-day">Start next day</button>` : ""}
    <div class="section-gap">
      ${renderSupplies()}
    </div>
    ${renderLog()}
  `;
}

function renderProblemPanel() {
  const job = state.activeJob;
  const stage = job.stages.find((item) => item.key === state.modal.stageKey);
  const hazard = hazardOptions[state.modal.hazardType];
  const markedText = job.utilityMarked ? "Your utility locate gave you a warning, so this is manageable." : "This was not marked before digging, so the choice matters.";

  return `
    <div class="problem-box">
      <span class="tag warning">Field problem</span>
      <h3>${hazard.title}</h3>
      <p>${hazard.detail}</p>
      <p>${markedText}</p>
      <div class="problem-options">
        ${hazard.options.map((option) => {
          const missing = missingSupplies(option.uses);
          return `
            <button class="option-button" data-action="resolve-hazard" data-option-id="${option.id}" ${missing.length ? "disabled" : ""}>
              <strong>${option.label}</strong>
              <span>${formatProblemCost(option)}${missing.length ? ` - Missing ${missing.join(", ")}` : ""}</span>
            </button>
          `;
        }).join("")}
      </div>
      <p class="small-note">Problem found while working: ${stage.title}</p>
    </div>
    <div class="section-gap">
      ${renderSupplies()}
    </div>
    ${renderLog()}
  `;
}

function renderSupplies() {
  const rows = Object.entries(supplyCatalog).map(([key, item]) => `
    <div class="supply-row">
      <div>
        <strong>${item.label}</strong>
        <span>${formatMoney(item.price)} per ${item.unit}</span>
      </div>
      <div class="supply-count">${state.supplies[key] || 0}</div>
      <button class="plain-button" data-action="restock" data-item="${key}">
        Buy ${item.bundle}
      </button>
    </div>
  `).join("");

  return `
    <div class="panel-title">
      <div>
        <h3>Materials</h3>
        <p>Restock from the yard before or during a job. Running out costs time.</p>
      </div>
    </div>
    <div class="supplies">${rows}</div>
  `;
}

function renderLog() {
  return `
    <div class="section-gap">
      <div class="panel-title">
        <div>
          <h3>Job Log</h3>
        </div>
      </div>
      <div class="log-list">
        ${state.log.slice(0, 8).map((line) => `<div class="log-line">${line}</div>`).join("")}
      </div>
    </div>
  `;
}

function renderSceneReadout() {
  if (state.activeJob) {
    const next = getNextStage(state.activeJob);
    sceneReadoutEl.innerHTML = `
      <span>${state.activeJob.location} job site</span>
      <span>${next ? next.title : "Closeout ready"}</span>
    `;
    return;
  }

  sceneReadoutEl.innerHTML = `
    <span>Strong Perimeter yard</span>
    <span>${getSelectedJob() ? `Selected: ${getSelectedJob().title}` : "No active job"}</span>
  `;
}

function hudStat(label, value) {
  return `<div class="hud-stat"><span>${label}</span><strong>${value}</strong></div>`;
}

function metric(label, value) {
  return `<div class="metric"><b>${label}</b><strong>${value}</strong></div>`;
}

function progressItem(stage, nextStage) {
  const className = stage.done ? "is-done" : nextStage && nextStage.key === stage.key ? "is-current" : "";
  const detail = stage.hazard && (stage.hazardResolved || stage.hazard.revealed)
    ? `${stage.hazard.type} handled`
    : `${stage.time.toFixed(2)} hr estimate`;
  return `
    <div class="progress-item ${className}">
      <span class="progress-dot"></span>
      <div>
        <strong>${stage.title}</strong>
        <span>${detail}</span>
      </div>
    </div>
  `;
}

function getSelectedJob() {
  return state.jobs.find((job) => job.id === state.selectedJobId && !job.completed) || state.jobs.find((job) => !job.completed);
}

function startSelectedJob() {
  const selected = getSelectedJob();
  if (!selected) {
    return;
  }

  const missing = missingForJob(selected);
  if (missing.length) {
    addLog(`Cannot load out yet. Missing ${missing.join(", ")}.`);
    return;
  }

  state.activeJob = createActiveJob(selected);
  state.selectedJobId = selected.id;
  advanceTime(0.35);
  spendEnergy(2);
  addLog(`Loaded for ${selected.title} and drove to ${selected.location}.`);
}

function performNextStage() {
  const job = state.activeJob;
  if (!job) {
    return;
  }

  const stage = getNextStage(job);
  if (!stage) {
    finishJob();
    return;
  }

  if (stage.type === "dig" && stage.hazard && !stage.hazardResolved) {
    stage.hazard.revealed = true;
    state.modal = {
      type: "hazard",
      stageKey: stage.key,
      hazardType: stage.hazard.type
    };
    addLog(`${hazardOptions[stage.hazard.type].title} found at ${stage.title.toLowerCase()}.`);
    return;
  }

  completeStage(job, stage);
}

function completeStage(job, stage) {
  const missing = missingSupplies(stage.uses);
  if (missing.length) {
    addLog(`Work stopped. Missing ${missing.join(", ")}.`);
    return;
  }

  consumeSupplies(stage.uses);
  chargeJob(stage.cost || 0);
  advanceTime(adjustedTime(stage.time));
  spendEnergy(stage.energy || 4);
  job.quality = clamp(job.quality + (stage.quality || 0), 0, 100);
  stage.done = true;

  addLog(stage.note || `${stage.title} complete.`);

  if (!getNextStage(job)) {
    finishJob();
  }
}

function resolveHazard(optionId) {
  const job = state.activeJob;
  if (!job || !state.modal) {
    return;
  }

  const stage = job.stages.find((item) => item.key === state.modal.stageKey);
  const hazard = hazardOptions[state.modal.hazardType];
  const option = hazard.options.find((item) => item.id === optionId);
  if (!stage || !option) {
    return;
  }

  const missing = missingSupplies(option.uses);
  if (missing.length) {
    addLog(`Cannot solve that yet. Missing ${missing.join(", ")}.`);
    return;
  }

  consumeSupplies(option.uses);
  chargeJob(option.cost || 0);
  advanceTime(adjustedTime(option.time));
  spendEnergy(option.energy || 2);
  job.quality = clamp(job.quality + (option.quality || 0), 0, 100);
  state.reputation = clamp(state.reputation + (option.reputation || 0), 0, 100);
  stage.hazardResolved = true;
  stage.hazardChoice = option.label;
  state.modal = null;
  addLog(option.note);
  completeStage(job, stage);
}

function markUtilities() {
  const job = state.activeJob;
  if (!job || job.utilityMarked) {
    return;
  }

  chargeJob(45);
  advanceTime(0.45);
  spendEnergy(1);
  job.utilityMarked = true;
  job.quality = clamp(job.quality + 1, 0, 100);
  job.stages.forEach((stage) => {
    if (stage.hazard) {
      stage.hazard.revealed = true;
    }
  });
  addLog("Located utilities and irrigation before the next dig.");
}

function takeCrewBreak() {
  advanceTime(0.4);
  state.crewEnergy = clamp(state.crewEnergy + 24, 0, 100);
  addLog("Crew took water, shade, and a reset. Work speed improves.");
}

function restock(itemKey) {
  const item = supplyCatalog[itemKey];
  if (!item) {
    return;
  }

  const total = item.price * item.bundle;
  if (state.cash < total) {
    addLog(`Not enough cash to buy ${item.label.toLowerCase()}.`);
    return;
  }

  state.cash -= total;
  state.supplies[itemKey] = (state.supplies[itemKey] || 0) + item.bundle;
  addLog(`Bought ${item.bundle} ${item.label.toLowerCase()} for ${formatMoney(total)}.`);
}

function cancelJob() {
  if (!state.activeJob) {
    return;
  }

  state.cash -= 120;
  state.reputation = clamp(state.reputation - 7, 0, 100);
  advanceTime(0.35);
  addLog(`Walked away from ${state.activeJob.title}. Lost dispatch trust and a trip charge.`);
  state.activeJob = null;
  state.modal = null;
}

function finishJob() {
  const job = state.activeJob;
  if (!job) {
    return;
  }

  const lateHours = Math.max(0, state.clock - job.dueHour);
  const earlyHours = Math.max(0, job.dueHour - state.clock);
  const scheduleAdjustment = lateHours > 0 ? -Math.round(lateHours * 95) : Math.round(Math.min(120, earlyHours * 24));
  const qualityAdjustment = job.quality >= 90 ? 125 : job.quality >= 84 ? 60 : job.quality < 70 ? -160 : 0;
  const finalPayment = Math.max(0, job.payout + scheduleAdjustment + qualityAdjustment);
  const repChange = (job.quality >= 86 ? 3 : job.quality < 72 ? -5 : 1) + (lateHours > 0.25 ? -2 : 1);
  const net = finalPayment - job.costs;

  state.cash += finalPayment;
  state.reputation = clamp(state.reputation + repChange, 0, 100);
  state.completedJobs.unshift({
    title: job.title,
    net,
    quality: job.quality,
    paid: finalPayment
  });

  const postedJob = state.jobs.find((item) => item.id === job.id);
  if (postedJob) {
    postedJob.completed = true;
  }

  addLog(`Collected ${formatMoney(finalPayment)}. Net on job: ${formatMoney(net)}.`);
  state.activeJob = null;
  state.modal = null;

  const remaining = state.jobs.find((item) => !item.completed);
  state.selectedJobId = remaining ? remaining.id : null;
}

function startNextDay() {
  state.day += 1;
  state.clock = 7.5;
  state.crewEnergy = 92;
  state.cash -= 180;
  state.jobs = makeJobs();
  state.selectedJobId = state.jobs[0].id;
  state.activeJob = null;
  state.modal = null;
  addLog("New day started. Paid yard overhead and opened a fresh bid board.");
}

function getNextStage(job) {
  return job.stages.find((stage) => !stage.done);
}

function adjustedTime(hours) {
  if (state.crewEnergy < 24) {
    return hours * 1.28;
  }
  if (state.crewEnergy < 45) {
    return hours * 1.12;
  }
  return hours;
}

function advanceTime(hours) {
  state.clock += hours;
  if (state.activeJob) {
    state.activeJob.timeSpent += hours;
  }

  while (state.clock >= 24) {
    state.clock -= 24;
    state.day += 1;
  }
}

function spendEnergy(amount) {
  state.crewEnergy = clamp(state.crewEnergy - amount, 0, 100);
}

function chargeJob(amount) {
  if (!amount) {
    return;
  }
  state.cash -= amount;
  if (state.activeJob) {
    state.activeJob.costs += amount;
  }
}

function consumeSupplies(uses = {}) {
  Object.entries(uses).forEach(([key, amount]) => {
    state.supplies[key] = (state.supplies[key] || 0) - amount;
  });
}

function missingForJob(job) {
  return missingSupplies(job.required);
}

function missingSupplies(uses = {}) {
  return Object.entries(uses)
    .filter(([key, amount]) => (state.supplies[key] || 0) < amount)
    .map(([key, amount]) => `${amount} ${supplyCatalog[key].unit}${amount === 1 ? "" : "s"}`);
}

function formatProblemCost(option) {
  const cost = option.cost ? formatMoney(option.cost) : "$0";
  return `${cost} / ${option.time.toFixed(2)} hr / quality ${signed(option.quality || 0)}`;
}

function signed(number) {
  return number > 0 ? `+${number}` : `${number}`;
}

function addLog(message) {
  state.log.unshift(`${formatTime(state.clock)} - ${message}`);
  state.log = state.log.slice(0, 20);
}

function formatMoney(value) {
  return moneyFormatter.format(value);
}

function formatTime(hourValue) {
  const totalMinutes = Math.round(hourValue * 60);
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hours24 = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  const suffix = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.floor(rect.width * dpr));
  const height = Math.max(1, Math.floor(rect.height * dpr));

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawFrame() {
  resizeCanvas();
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if (state.activeJob) {
    drawJobSite(width, height);
  } else {
    drawYard(width, height);
  }

  requestAnimationFrame(drawFrame);
}

function drawYard(width, height) {
  drawSky(width, height);
  drawConcrete(width, height);

  const warehouseY = height * 0.2;
  const warehouseH = height * 0.38;
  drawBuilding(width * 0.06, warehouseY, width * 0.88, warehouseH);
  drawFenceRack(width * 0.1, height * 0.63, width * 0.24, height * 0.18);
  drawTruck(width * 0.5, height * 0.7, Math.min(width, height) * 0.0022);
  drawMaterialStacks(width * 0.68, height * 0.62, width * 0.22, height * 0.2);

  ctx.fillStyle = "#071c17";
  ctx.font = "900 22px Helvetica, Arial, sans-serif";
  ctx.fillText("STRONG PERIMETER", width * 0.1, warehouseY + 42);
  ctx.font = "700 13px Helvetica, Arial, sans-serif";
  ctx.fillText("Fence repair and installation dispatch yard", width * 0.1, warehouseY + 64);
}

function drawJobSite(width, height) {
  const job = state.activeJob;
  drawSky(width, height);

  ctx.fillStyle = "#7fb26d";
  ctx.fillRect(0, height * 0.48, width, height * 0.52);

  ctx.fillStyle = "#d8d3c6";
  ctx.fillRect(width * 0.02, height * 0.58, width * 0.96, height * 0.1);
  ctx.fillStyle = "#8c785f";
  ctx.fillRect(0, height * 0.68, width, height * 0.32);

  drawHouse(width * 0.64, height * 0.19, width * 0.26, height * 0.28);
  drawTree(width * 0.18, height * 0.5, Math.min(width, height) * 0.12);
  drawFenceJob(job, width, height);
  drawCrew(width * 0.13, height * 0.68, Math.min(width, height) * 0.0018);
  drawTruck(width * 0.25, height * 0.82, Math.min(width, height) * 0.00165);
}

function drawSky(width, height) {
  const sky = ctx.createLinearGradient(0, 0, 0, height * 0.72);
  sky.addColorStop(0, "#9cc7dc");
  sky.addColorStop(0.62, "#d7e6df");
  sky.addColorStop(1, "#f4ead0");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(243, 198, 92, 0.9)";
  ctx.beginPath();
  ctx.arc(width * 0.1, height * 0.14, Math.min(width, height) * 0.055, 0, Math.PI * 2);
  ctx.fill();
}

function drawConcrete(width, height) {
  ctx.fillStyle = "#c9c7bd";
  ctx.fillRect(0, height * 0.55, width, height * 0.45);

  ctx.strokeStyle = "rgba(86, 98, 104, 0.22)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 12; i += 1) {
    const y = height * 0.58 + i * height * 0.035;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y + Math.sin(i) * 8);
    ctx.stroke();
  }
}

function drawBuilding(x, y, width, height) {
  ctx.fillStyle = "#f3efe4";
  roundRect(x, y, width, height, 8);
  ctx.fill();

  ctx.strokeStyle = "rgba(86, 98, 104, 0.28)";
  ctx.lineWidth = 3;
  ctx.strokeRect(x + 8, y + 8, width - 16, height - 16);

  ctx.fillStyle = "#bec2bd";
  ctx.fillRect(x + width * 0.62, y + height * 0.28, width * 0.2, height * 0.5);
  ctx.strokeStyle = "#566268";
  ctx.lineWidth = 2;
  for (let i = 1; i < 7; i += 1) {
    const lineY = y + height * 0.28 + i * height * 0.07;
    ctx.beginPath();
    ctx.moveTo(x + width * 0.62, lineY);
    ctx.lineTo(x + width * 0.82, lineY);
    ctx.stroke();
  }
}

function drawFenceRack(x, y, width, height) {
  ctx.fillStyle = "#566268";
  ctx.fillRect(x, y + height * 0.82, width, height * 0.08);
  ctx.fillRect(x + width * 0.05, y, width * 0.04, height);
  ctx.fillRect(x + width * 0.9, y, width * 0.04, height);

  const samples = ["#b97942", "#6f4628", "#c5d1cd", "#20282a"];
  samples.forEach((color, index) => {
    const panelX = x + width * (0.13 + index * 0.2);
    ctx.fillStyle = color;
    ctx.fillRect(panelX, y + height * 0.12, width * 0.12, height * 0.68);
    ctx.strokeStyle = "rgba(24, 33, 30, 0.34)";
    ctx.strokeRect(panelX, y + height * 0.12, width * 0.12, height * 0.68);
  });
}

function drawMaterialStacks(x, y, width, height) {
  ctx.fillStyle = "#6f4628";
  for (let i = 0; i < 6; i += 1) {
    ctx.fillRect(x + i * width * 0.08, y + height * 0.35 - i * 3, width * 0.45, height * 0.055);
  }

  ctx.fillStyle = "#db7337";
  ctx.fillRect(x + width * 0.52, y + height * 0.26, width * 0.34, height * 0.48);
  ctx.fillStyle = "#fffaf1";
  ctx.fillRect(x + width * 0.56, y + height * 0.32, width * 0.26, height * 0.09);
}

function drawTruck(x, y, scale) {
  const s = scale * 100;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  ctx.fillStyle = "#f8f7f1";
  roundRect(-2.4, -0.72, 3.3, 0.82, 0.08);
  ctx.fill();
  roundRect(0.35, -1.15, 1.35, 1.05, 0.08);
  ctx.fill();
  roundRect(1.35, -0.86, 1.08, 0.72, 0.08);
  ctx.fill();

  ctx.fillStyle = "#18211e";
  ctx.fillRect(0.58, -0.98, 0.42, 0.36);
  ctx.fillRect(1.05, -0.98, 0.42, 0.36);
  ctx.fillRect(2.28, -0.62, 0.08, 0.28);
  ctx.fillStyle = "#db7337";
  ctx.fillRect(-1.35, -0.5, 0.9, 0.28);
  ctx.fillStyle = "#fffaf1";
  ctx.font = "700 0.12px Helvetica, Arial, sans-serif";
  ctx.fillText("SP", -1.08, -0.31);

  drawWheel(-1.55, 0.03);
  drawWheel(1.55, 0.03);
  ctx.restore();
}

function drawWheel(x, y) {
  ctx.fillStyle = "#151819";
  ctx.beginPath();
  ctx.arc(x, y, 0.28, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#aeb8b8";
  ctx.beginPath();
  ctx.arc(x, y, 0.13, 0, Math.PI * 2);
  ctx.fill();
}

function drawHouse(x, y, width, height) {
  ctx.fillStyle = "#e7dfcf";
  ctx.fillRect(x, y + height * 0.28, width, height * 0.72);
  ctx.fillStyle = "#73503a";
  ctx.beginPath();
  ctx.moveTo(x - width * 0.05, y + height * 0.3);
  ctx.lineTo(x + width * 0.5, y);
  ctx.lineTo(x + width * 1.05, y + height * 0.3);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#315f8f";
  ctx.fillRect(x + width * 0.16, y + height * 0.47, width * 0.2, height * 0.2);
  ctx.fillRect(x + width * 0.62, y + height * 0.47, width * 0.2, height * 0.2);
}

function drawTree(x, y, size) {
  ctx.strokeStyle = "#6f4628";
  ctx.lineWidth = size * 0.12;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + size * 0.04, y - size * 1.3);
  ctx.stroke();

  ctx.fillStyle = "#2d7a4f";
  ctx.beginPath();
  ctx.arc(x, y - size * 1.42, size * 0.65, 0, Math.PI * 2);
  ctx.fill();
}

function drawFenceJob(job, width, height) {
  const x1 = width * 0.18;
  const x2 = width * 0.86;
  const groundY = height * 0.68;
  const fenceH = height * 0.22;
  const digs = job.stages.filter((stage) => stage.type === "dig");
  const sets = job.stages.filter((stage) => stage.type === "set");
  const count = Math.max(2, digs.length || sets.length || 2);
  const railDone = isVisualDone(job, "rails");
  const picketsDone = isVisualDone(job, "pickets");
  const gateDone = isVisualDone(job, "gate");

  ctx.strokeStyle = "rgba(24, 33, 30, 0.35)";
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 7]);
  ctx.beginPath();
  ctx.moveTo(x1, groundY);
  ctx.lineTo(x2, groundY);
  ctx.stroke();
  ctx.setLineDash([]);

  if (railDone) {
    ctx.fillStyle = "#6f4628";
    ctx.fillRect(x1, groundY - fenceH * 0.74, x2 - x1, 8);
    ctx.fillRect(x1, groundY - fenceH * 0.32, x2 - x1, 8);
  }

  if (picketsDone) {
    const picketCount = 22;
    const gap = (x2 - x1) / picketCount;
    for (let i = 0; i < picketCount; i += 1) {
      ctx.fillStyle = i % 2 ? "#b97942" : "#c48954";
      ctx.fillRect(x1 + i * gap, groundY - fenceH, gap * 0.72, fenceH);
    }
  }

  for (let i = 0; i < count; i += 1) {
    const x = x1 + ((x2 - x1) / Math.max(1, count - 1)) * i;
    const digStage = digs[i];
    const setDone = sets.some((stage) => stage.done && (stage.hole === i || sets.length === 1));
    const dug = digStage && digStage.done;

    if (setDone) {
      ctx.fillStyle = "#566268";
      ctx.fillRect(x - 5, groundY - fenceH - 12, 10, fenceH + 26);
      ctx.fillStyle = "#d8d3c6";
      ctx.beginPath();
      ctx.ellipse(x, groundY + 8, 18, 7, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (dug) {
      ctx.fillStyle = "#3a2419";
      ctx.beginPath();
      ctx.ellipse(x, groundY + 8, 22, 10, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = "#db7337";
      ctx.fillRect(x - 3, groundY - 36, 6, 34);
      ctx.fillRect(x - 13, groundY - 36, 26, 5);
    }

    if (digStage && shouldShowHazard(job, digStage)) {
      drawHazard(digStage.hazard.type, x, groundY + 34);
    }
  }

  if (gateDone) {
    ctx.strokeStyle = "#20282a";
    ctx.lineWidth = 4;
    ctx.strokeRect(x2 - 90, groundY - fenceH, 70, fenceH);
    ctx.beginPath();
    ctx.moveTo(x2 - 86, groundY - fenceH + 8);
    ctx.lineTo(x2 - 24, groundY - 8);
    ctx.stroke();
  }

  const next = getNextStage(job);
  if (next) {
    ctx.fillStyle = "rgba(49, 95, 143, 0.9)";
    ctx.font = "800 13px Helvetica, Arial, sans-serif";
    ctx.fillText(`Next: ${next.title}`, x1, groundY - fenceH - 28);
  }
}

function shouldShowHazard(job, stage) {
  return Boolean(stage.hazard && (job.utilityMarked || stage.hazard.revealed || stage.hazardResolved));
}

function drawHazard(type, x, y) {
  if (type === "sprinkler") {
    ctx.strokeStyle = "#315f8f";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x - 36, y);
    ctx.lineTo(x + 36, y - 10);
    ctx.stroke();
    ctx.fillStyle = "#4aa3d8";
    ctx.beginPath();
    ctx.arc(x + 24, y - 8, 6, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  if (type === "rock") {
    ctx.fillStyle = "#75736b";
    for (let i = 0; i < 4; i += 1) {
      ctx.beginPath();
      ctx.ellipse(x - 28 + i * 18, y - i * 3, 13, 8, 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
    return;
  }

  if (type === "wire") {
    ctx.strokeStyle = "#db7337";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x - 34, y);
    ctx.bezierCurveTo(x - 12, y - 18, x + 12, y + 16, x + 34, y - 3);
    ctx.stroke();
    return;
  }

  ctx.strokeStyle = "#6f4628";
  ctx.lineWidth = 5;
  for (let i = 0; i < 3; i += 1) {
    ctx.beginPath();
    ctx.moveTo(x - 38, y - i * 6);
    ctx.bezierCurveTo(x - 10, y - 22, x + 12, y + 15, x + 38, y - 12 + i * 5);
    ctx.stroke();
  }
}

function drawCrew(x, y, scale) {
  const s = scale * 100;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  ctx.fillStyle = "#db7337";
  ctx.fillRect(-0.18, -0.78, 0.36, 0.48);
  ctx.fillStyle = "#b97942";
  ctx.beginPath();
  ctx.arc(0, -0.94, 0.17, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#18211e";
  ctx.lineWidth = 0.08;
  ctx.beginPath();
  ctx.moveTo(-0.18, -0.32);
  ctx.lineTo(-0.42, 0.15);
  ctx.moveTo(0.16, -0.32);
  ctx.lineTo(0.42, 0.15);
  ctx.moveTo(-0.1, -0.72);
  ctx.lineTo(-0.48, -0.42);
  ctx.moveTo(0.1, -0.72);
  ctx.lineTo(0.5, -0.48);
  ctx.stroke();
  ctx.restore();
}

function isVisualDone(job, visual) {
  return job.stages.some((stage) => stage.visual === visual && stage.done);
}

function roundRect(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
