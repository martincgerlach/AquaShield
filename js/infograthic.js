const interactiveGuide = document.querySelector("[data-interactive-guide]");

function createSceneShell(content) {
  return `
    <svg viewBox="0 0 640 400" role="img" aria-label="Interactive flood safety house scene">
      <defs>
        <linearGradient id="waterLow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#7ecae7" />
          <stop offset="100%" stop-color="#4e94bf" />
        </linearGradient>
        <linearGradient id="waterHigh" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#6abce1" />
          <stop offset="100%" stop-color="#377eaa" />
        </linearGradient>
      </defs>
      ${content}
    </svg>
  `;
}

function createBasementScene() {
  return createSceneShell(`
    <rect width="640" height="400" fill="#eef8fe" />
    <rect y="280" width="640" height="120" fill="#d9edf8" />
    <rect x="170" y="116" width="300" height="120" fill="#ffffff" stroke="#1b4965" stroke-width="5" />
    <rect x="170" y="236" width="300" height="94" fill="#f0f4f8" stroke="#1b4965" stroke-width="5" />
    <polygon points="150,116 320,56 490,116" fill="#2d5673" />
    <line x1="170" y1="236" x2="470" y2="236" stroke="#1b4965" stroke-width="5" />
    <rect x="292" y="150" width="58" height="86" fill="#d7eefb" stroke="#1b4965" stroke-width="4" />
    <rect x="206" y="255" width="56" height="36" fill="#d7eefb" stroke="#1b4965" stroke-width="4" />
    <circle cx="322" cy="284" r="24" fill="#c5d8e6" stroke="#1b4965" stroke-width="4" />
    <path d="M474 292 H548 V262" fill="none" stroke="#1b4965" stroke-width="10" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M0 270 H640" stroke="#4e94bf" stroke-width="8" stroke-dasharray="18 12" />
    <text x="40" y="258" class="svg-label">Low water</text>
    <text x="176" y="352" class="svg-label">Basement</text>
    <text x="192" y="246" class="svg-label">Window</text>
    <text x="292" y="324" class="svg-label">Pump</text>
    <text x="488" y="250" class="svg-label">Pipe</text>

    <g class="svg-hotspot" data-hotspot="basement-window" tabindex="0">
      <rect class="hotspot-fill" x="198" y="248" width="72" height="50" rx="10" />
      <circle class="hotspot-dot" cx="234" cy="273" r="10" />
    </g>

    <g class="svg-hotspot" data-hotspot="sump-pump" tabindex="0">
      <rect class="hotspot-fill" x="286" y="248" width="72" height="74" rx="20" />
      <circle class="hotspot-dot" cx="322" cy="285" r="10" />
    </g>

    <g class="svg-hotspot" data-hotspot="drainage-pipe" tabindex="0">
      <path class="hotspot-stroke" d="M474 292 H548 V262" />
      <circle class="hotspot-dot" cx="548" cy="262" r="10" />
    </g>
  `);
}

function createRisingWaterScene() {
  return createSceneShell(`
    <rect width="640" height="400" fill="#eef8fe" />
    <rect x="170" y="110" width="300" height="200" fill="#ffffff" stroke="#1b4965" stroke-width="5" />
    <polygon points="150,110 320,50 490,110" fill="#2d5673" />
    <rect x="212" y="154" width="64" height="64" fill="#d7eefb" stroke="#1b4965" stroke-width="4" />
    <rect x="364" y="154" width="64" height="64" fill="#d7eefb" stroke="#1b4965" stroke-width="4" />
    <rect x="294" y="208" width="52" height="102" fill="#d2a27c" stroke="#1b4965" stroke-width="4" />
    <rect x="490" y="182" width="44" height="118" fill="#d9e4ec" stroke="#1b4965" stroke-width="4" />
    <path d="M0 222 H640 V400 H0 Z" fill="url(#waterHigh)" opacity="0.9" />
    <path d="M0 222 H640" stroke="#1b4965" stroke-width="4" stroke-dasharray="14 10" />
    <text x="40" y="208" class="svg-label">High water</text>
    <text x="205" y="146" class="svg-label">Window</text>
    <text x="292" y="338" class="svg-label">Door</text>
    <text x="480" y="172" class="svg-label">Power</text>

    <g class="svg-hotspot" data-hotspot="ground-window" tabindex="0">
      <rect class="hotspot-fill" x="206" y="148" width="78" height="78" rx="12" />
      <circle class="hotspot-dot" cx="245" cy="187" r="10" />
    </g>

    <g class="svg-hotspot" data-hotspot="front-door" tabindex="0">
      <rect class="hotspot-fill" x="284" y="200" width="72" height="118" rx="14" />
      <circle class="hotspot-dot" cx="320" cy="259" r="10" />
    </g>

    <g class="svg-hotspot" data-hotspot="electrical-panel" tabindex="0">
      <rect class="hotspot-fill" x="484" y="176" width="56" height="132" rx="18" />
      <circle class="hotspot-dot" cx="512" cy="212" r="10" />
    </g>
  `);
}

function createPipeBackflowScene() {
  return createSceneShell(`
    <rect width="640" height="400" fill="#eef8fe" />
    <rect y="282" width="640" height="118" fill="#d9edf8" />
    <rect x="160" y="120" width="300" height="114" fill="#ffffff" stroke="#1b4965" stroke-width="5" />
    <rect x="160" y="234" width="300" height="96" fill="#f0f4f8" stroke="#1b4965" stroke-width="5" />
    <polygon points="140,120 310,58 480,120" fill="#2d5673" />
    <rect x="280" y="150" width="60" height="84" fill="#d7eefb" stroke="#1b4965" stroke-width="4" />
    <path d="M174 136 V270 H140" fill="none" stroke="#1b4965" stroke-width="8" stroke-linecap="round" />
    <path d="M92 304 H250 V286 H322 V262" fill="none" stroke="#1b4965" stroke-width="10" stroke-linecap="round"
      stroke-linejoin="round" />
    <rect x="232" y="292" width="44" height="18" rx="6" fill="#f4a259" stroke="#1b4965" stroke-width="3" />
    <circle cx="322" cy="262" r="16" fill="#d7eefb" stroke="#1b4965" stroke-width="4" />
    <path d="M32 292 H92" stroke="#4e94bf" stroke-width="8" stroke-dasharray="14 10" />
    <text x="30" y="280" class="svg-label">Backflow</text>
    <text x="112" y="130" class="svg-label">Downspout</text>
    <text x="218" y="286" class="svg-label">Valve</text>
    <text x="294" y="248" class="svg-label">Drain</text>

    <g class="svg-hotspot" data-hotspot="downspout" tabindex="0">
      <path class="hotspot-stroke" d="M174 136 V270 H140" />
      <circle class="hotspot-dot" cx="174" cy="198" r="10" />
    </g>

    <g class="svg-hotspot" data-hotspot="backflow-valve" tabindex="0">
      <rect class="hotspot-fill" x="220" y="284" width="66" height="34" rx="12" />
      <circle class="hotspot-dot" cx="253" cy="301" r="10" />
    </g>

    <g class="svg-hotspot" data-hotspot="floor-drain" tabindex="0">
      <rect class="hotspot-fill" x="286" y="228" width="72" height="62" rx="16" />
      <circle class="hotspot-dot" cx="322" cy="259" r="10" />
    </g>
  `);
}

if (interactiveGuide) {
  const tabs = interactiveGuide.querySelectorAll("[data-scenario-tab]");
  const scenarioFigure = document.getElementById("scenario-figure");
  const scenarioBadge = document.getElementById("scenario-badge");
  const scenarioPanelTitle = document.getElementById("scenario-panel-title");
  const scenarioPanelCopy = document.getElementById("scenario-panel-copy");
  const scenarioWaterLevel = document.getElementById("scenario-water-level");
  const scenarioRisk = document.getElementById("scenario-risk");
  const scenarioActions = document.getElementById("scenario-actions");

  const scenarios = {
    basement: {
      badge: "Low water",
      defaultHotspot: "basement-window",
      svg: createBasementScene(),
      hotspots: {
        "basement-window": {
          title: "Basement window",
          waterLevel: "Low water is outside.",
          risk: "Water may enter here first.",
          copy: "Block this window early if it is safe.",
          actions: [
            "Put a barrier over the window.",
            "Move things off the basement floor.",
            "Watch the water level.",
          ],
        },
        "sump-pump": {
          title: "Sump pump",
          waterLevel: "Water pressure is rising below.",
          risk: "If it stops, the basement may flood.",
          copy: "Check the pump before the water gets higher.",
          actions: [
            "Test that the pump works.",
            "Check that power is available.",
            "Leave the basement if water comes in.",
          ],
        },
        "drainage-pipe": {
          title: "Pipe",
          waterLevel: "Water is pushing in the pipe.",
          risk: "Dirty water may come back inside.",
          copy: "Pipes can flood the basement very fast.",
          actions: [
            "Check the backflow valve.",
            "Seal the drain if it is safe.",
            "Stay away from dirty water.",
          ],
        },
      },
    },
    "rising-water": {
      badge: "High water",
      defaultHotspot: "ground-window",
      svg: createRisingWaterScene(),
      hotspots: {
        "ground-window": {
          title: "Window",
          waterLevel: "High water is at the window.",
          risk: "Water can break in here.",
          copy: "Protect the window only if it is still safe.",
          actions: [
            "Board or block the window.",
            "Move people and pets away.",
            "Go to higher ground if told to leave.",
          ],
        },
        "front-door": {
          title: "Door",
          waterLevel: "High water is at the door.",
          risk: "Water can come in under the door.",
          copy: "The door becomes a weak point very quickly.",
          actions: [
            "Use sandbags if it is safe.",
            "Do not open the door to check.",
            "Keep your exit path clear.",
          ],
        },
        "electrical-panel": {
          title: "Power",
          waterLevel: "High water is near the power area.",
          risk: "There is a shock risk here.",
          copy: "Do not touch power equipment in floodwater.",
          actions: [
            "Turn power off only if safe.",
            "Keep away from cables and outlets.",
            "Call for help if the system floods.",
          ],
        },
      },
    },
    "pipe-backflow": {
      badge: "Backflow risk",
      defaultHotspot: "backflow-valve",
      svg: createPipeBackflowScene(),
      hotspots: {
        downspout: {
          title: "Downspout",
          waterLevel: "Water is gathering by the house.",
          risk: "More water can push into the drains.",
          copy: "Move roof water away from the house.",
          actions: [
            "Extend the downspout away from the wall.",
            "Clear leaves and dirt.",
            "Check it often.",
          ],
        },
        "backflow-valve": {
          title: "Valve",
          waterLevel: "Pressure is building in the pipe.",
          risk: "Dirty water can come back inside.",
          copy: "This valve helps stop water from coming back in.",
          actions: [
            "Close or check the valve.",
            "Use less water in the house.",
            "Stay away from dirty backflow water.",
          ],
        },
        "floor-drain": {
          title: "Drain",
          waterLevel: "Water is reaching the floor drain.",
          risk: "Backflow may come up here first.",
          copy: "This drain can be the first place water appears.",
          actions: [
            "Seal the drain if it is safe.",
            "Move things away from the drain.",
            "Leave if dirty water appears.",
          ],
        },
      },
    },
  };

  let activeScenarioId = "basement";
  let activeHotspotId = scenarios[activeScenarioId].defaultHotspot;

  function renderPanel(scenarioId, hotspotId) {
    const hotspot = scenarios[scenarioId].hotspots[hotspotId];

    scenarioPanelTitle.textContent = hotspot.title;
    scenarioPanelCopy.textContent = hotspot.copy;
    scenarioWaterLevel.textContent = hotspot.waterLevel;
    scenarioRisk.textContent = hotspot.risk;
    scenarioActions.innerHTML = hotspot.actions
      .map((action) => `<li>${action}</li>`)
      .join("");
  }

  function syncHotspotState() {
    const hotspotNodes = scenarioFigure.querySelectorAll("[data-hotspot]");

    hotspotNodes.forEach((node) => {
      const isActive = node.getAttribute("data-hotspot") === activeHotspotId;
      node.classList.toggle("is-active", isActive);
    });
  }

  function bindHotspots() {
    const hotspotNodes = scenarioFigure.querySelectorAll("[data-hotspot]");

    hotspotNodes.forEach((node) => {
      const hotspotId = node.getAttribute("data-hotspot");
      const hotspotConfig = scenarios[activeScenarioId].hotspots[hotspotId];

      node.setAttribute("role", "button");
      node.setAttribute("aria-label", hotspotConfig.title);

      node.addEventListener("click", () => {
        activeHotspotId = hotspotId;
        syncHotspotState();
        renderPanel(activeScenarioId, activeHotspotId);
      });

      node.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }

        event.preventDefault();
        activeHotspotId = hotspotId;
        syncHotspotState();
        renderPanel(activeScenarioId, activeHotspotId);
      });
    });
  }

  function renderScenario(scenarioId) {
    const scenario = scenarios[scenarioId];

    activeScenarioId = scenarioId;
    activeHotspotId = scenario.defaultHotspot;

    tabs.forEach((tab) => {
      const isActive = tab.getAttribute("data-scenario-tab") === scenarioId;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    scenarioBadge.textContent = scenario.badge;
    scenarioFigure.innerHTML = scenario.svg;
    bindHotspots();
    syncHotspotState();
    renderPanel(activeScenarioId, activeHotspotId);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      renderScenario(tab.getAttribute("data-scenario-tab"));
    });
  });

  renderScenario(activeScenarioId);
}
