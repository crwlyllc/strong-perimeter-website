import * as THREE from "../js/vendor/three.module.min.js";

const canvas = document.getElementById("warehouse-canvas");
const fallbackEl = document.querySelector(".scene-fallback");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const serviceAreas = [
  {
    key: "wood",
    label: "Wood Fence",
    detail: "Privacy builds, board-on-board, stain, repair",
    short: "Wood fence display",
    url: "../wood-fence/",
    color: 0xb97942
  },
  {
    key: "wrought",
    label: "Wrought Iron",
    detail: "Rust repair, paint, restoration, replacement",
    short: "Wrought iron display",
    url: "../wrought-iron-fence/",
    color: 0x8da0a8
  },
  {
    key: "chain",
    label: "Chain Link",
    detail: "Fabric, posts, gates, commercial security",
    short: "Chain link display",
    url: "../chain-link-fence/",
    color: 0xc5d1cd
  },
  {
    key: "pipe",
    label: "Pipe Fence",
    detail: "Ranch perimeters, paint, weld repair",
    short: "Pipe fence display",
    url: "../pipe-fence/",
    color: 0xdb7337
  },
  {
    key: "pool",
    label: "Pool Safety",
    detail: "Code-aware barriers, gates, repair",
    short: "Pool safety display",
    url: "../pool-safety-fences/",
    color: 0x60b7b2
  },
  {
    key: "temporary",
    label: "Temporary",
    detail: "Job sites, panels, delivery, removal",
    short: "Temporary fencing display",
    url: "../temporary-fencing/",
    color: 0xd2aa54
  }
];

let renderer;

try {
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: "high-performance"
  });
} catch {
  canvas.hidden = true;
  fallbackEl.hidden = false;
}

if (renderer) {
  const warehouseHeight = 17.6;
  const warehouseWallY = warehouseHeight / 2 - 0.15;
  const roofBeamY = warehouseHeight - 0.95;
  const roofCrossBeamY = warehouseHeight - 0.82;
  const lampY = warehouseHeight - 2.45;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x101815);
  scene.fog = new THREE.Fog(0x101815, 18, 42);

  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const hotspotMeshes = [];
  const focusTargets = new Map();
  const clock = new THREE.Clock();

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x101815, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const textures = {
    concrete: createConcreteTexture(),
    wall: createCorrugatedTexture(0x1f3a34, 0x2c4a42),
    wallDark: createCorrugatedTexture(0x15241f, 0x20352f),
    steel: createBrushedMetalTexture(0x8d9aa0, 0xb3bec1),
    darkSteel: createBrushedMetalTexture(0x20282a, 0x3a4444),
    wood: createWoodTexture(0xb97942, 0x6f4628),
    rubber: createRubberTexture()
  };

  const mats = {
    concrete: new THREE.MeshStandardMaterial({ map: textures.concrete, color: 0xb8b3a8, roughness: 0.96, metalness: 0.01 }),
    wall: new THREE.MeshStandardMaterial({ map: textures.wall, color: 0xffffff, roughness: 0.78, metalness: 0.2 }),
    wallDark: new THREE.MeshStandardMaterial({ map: textures.wallDark, color: 0xffffff, roughness: 0.84, metalness: 0.18 }),
    steel: new THREE.MeshStandardMaterial({ map: textures.steel, color: 0xffffff, roughness: 0.34, metalness: 0.68 }),
    darkSteel: new THREE.MeshStandardMaterial({ map: textures.darkSteel, color: 0xffffff, roughness: 0.42, metalness: 0.72 }),
    green: new THREE.MeshStandardMaterial({ color: 0x004b3d, roughness: 0.48, metalness: 0.16 }),
    orange: new THREE.MeshStandardMaterial({ color: 0xdb7337, roughness: 0.62 }),
    wood: new THREE.MeshStandardMaterial({ map: textures.wood, color: 0xffffff, roughness: 0.82 }),
    woodDark: new THREE.MeshStandardMaterial({ map: textures.wood, color: 0x6f4628, roughness: 0.88 }),
    cream: new THREE.MeshStandardMaterial({ color: 0xfffaf1, roughness: 0.54 }),
    tire: new THREE.MeshStandardMaterial({ map: textures.rubber, color: 0x111313, roughness: 0.86 }),
    glass: new THREE.MeshPhysicalMaterial({ color: 0x9fd5d0, roughness: 0.06, metalness: 0, transparent: true, opacity: 0.42, transmission: 0.12 }),
    hit: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
  };

  const cameraState = {
    target: new THREE.Vector3(0, 2.35, -8.5),
    yaw: 0,
    pitch: 0.16,
    radius: 21,
    tween: null
  };

  buildWarehouse();
  buildBrandWall();
  buildTruckAndTrailer();
  buildServiceDisplays();
  buildLighting();
  updateOrbitCamera();
  resizeRenderer();
  renderer.setAnimationLoop(animate);

  window.addEventListener("resize", resizeRenderer);
  canvas.addEventListener("pointerdown", handlePointerDown);
  canvas.addEventListener("pointermove", handlePointerMove);
  canvas.addEventListener("pointerup", handlePointerUp);
  canvas.addEventListener("pointercancel", handlePointerCancel);
  canvas.addEventListener("wheel", handleWheel, { passive: false });

  window.strongPerimeterWarehouse = {
    focus: focusScene
  };

  function buildWarehouse() {
    const floor = new THREE.Mesh(new THREE.BoxGeometry(28, 0.22, 36), mats.concrete);
    floor.position.set(0, -0.12, -6);
    floor.receiveShadow = true;
    scene.add(floor);

    const jointMaterial = new THREE.MeshBasicMaterial({ color: 0x171b19, transparent: true, opacity: 0.42 });
    for (let x = -10.5; x <= 10.5; x += 7) {
      const joint = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.018, 35.5), jointMaterial);
      joint.position.set(x, 0.012, -6);
      scene.add(joint);
    }

    for (let z = -20; z <= 8; z += 7) {
      const joint = new THREE.Mesh(new THREE.BoxGeometry(27.5, 0.018, 0.035), jointMaterial);
      joint.position.set(0, 0.014, z);
      scene.add(joint);
    }

    const tireMarkMaterial = new THREE.MeshBasicMaterial({ color: 0x0f1211, transparent: true, opacity: 0.16 });
    [-8.9, -7.55, 7.55, 8.9].forEach((x) => {
      const mark = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.02, 15.5), tireMarkMaterial);
      mark.position.set(x, 0.028, -3.5);
      mark.rotation.y = x < 0 ? -0.035 : 0.035;
      scene.add(mark);
    });

    const backWall = new THREE.Mesh(new THREE.BoxGeometry(28, warehouseHeight, 0.32), mats.wall);
    backWall.position.set(0, warehouseWallY, -24);
    backWall.receiveShadow = true;
    scene.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.32, warehouseHeight, 36), mats.wallDark);
    leftWall.position.set(-14, warehouseWallY, -6);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.32, warehouseHeight, 36), mats.wallDark);
    rightWall.position.set(14, warehouseWallY, -6);
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    const roof = new THREE.Mesh(new THREE.BoxGeometry(28.4, 0.3, 36.4), mats.wallDark);
    roof.position.set(0, warehouseHeight - 0.08, -6);
    roof.receiveShadow = true;
    scene.add(roof);

    for (let x = -13.2; x <= 13.2; x += 1.2) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.04, warehouseHeight - 0.6, 0.08), mats.darkSteel);
      rib.position.set(x, warehouseWallY, -23.56);
      rib.receiveShadow = true;
      scene.add(rib);
    }

    [-13.56, 13.56].forEach((x) => {
      for (let z = -22.4; z <= 10.4; z += 1.2) {
        const rib = new THREE.Mesh(new THREE.BoxGeometry(0.08, warehouseHeight - 0.6, 0.04), mats.darkSteel);
        rib.position.set(x, warehouseWallY, z);
        rib.receiveShadow = true;
        scene.add(rib);
      }
    });

    [-12.9, 12.9].forEach((x) => addWarehouseColumn(x, -22.7));
    [-18, -10, -2, 6].forEach((z) => {
      addWarehouseColumn(-13.15, z);
      addWarehouseColumn(13.15, z);
    });

    const rollup = new THREE.Mesh(new THREE.BoxGeometry(8.5, 5.2, 0.18), new THREE.MeshStandardMaterial({
      color: 0x9ba69e,
      metalness: 0.46,
      roughness: 0.58
    }));
    rollup.position.set(8.3, 2.6, -23.79);
    rollup.receiveShadow = true;
    scene.add(rollup);

    for (let y = 0.9; y < 5.1; y += 0.55) {
      const seam = new THREE.Mesh(new THREE.BoxGeometry(8.6, 0.035, 0.08), mats.darkSteel);
      seam.position.set(8.3, y, -23.67);
      scene.add(seam);
    }

    [-4.1, 4.1, 12.2].forEach((x) => {
      addBollard(x, -20.95);
    });

    for (let x = -12; x <= 12; x += 6) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.34, 35), mats.darkSteel);
      beam.position.set(x, roofBeamY, -6);
      beam.castShadow = true;
      scene.add(beam);
    }

    for (let z = -22; z <= 8; z += 6) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(27, 0.28, 0.34), mats.darkSteel);
      beam.position.set(0, roofCrossBeamY, z);
      beam.castShadow = true;
      scene.add(beam);
    }

    const aisleLineMaterial = new THREE.MeshBasicMaterial({ color: 0xdb7337, transparent: true, opacity: 0.64 });
    [-4.3, 4.3].forEach((x) => {
      const line = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.025, 23), aisleLineMaterial);
      line.position.set(x, 0.035, -6.5);
      scene.add(line);
    });

    addMaterialRack(11.7, -9.8, Math.PI / 2);
    addMaterialRack(-12.1, -3.4, -Math.PI / 2);
    addPalletStack(9.9, 4.4, 0.12);
    addPalletStack(-10.6, 7.1, -0.08);

    const overviewPosition = new THREE.Vector3(0, 8.2, 16.5);
    const overviewTarget = new THREE.Vector3(0, 4.15, -9.5);
    focusTargets.set("overview", { position: overviewPosition, target: overviewTarget, label: "Warehouse overview" });
  }

  function buildBrandWall() {
    const sign = createCanvasPanel({
      width: 2048,
      height: 1024,
      background: "#fffaf1",
      accent: "#db7337",
      title: "FENCE REPAIR INSTALL RESTORE",
      kicker: "STRONG PERIMETER",
      primaryLine: "(214) 247-6369",
      lines: [
        "DFW RESIDENTIAL + COMMERCIAL",
        "FREE QUOTES",
        "WOOD | IRON | CHAIN LINK | GATES"
      ],
      dark: true
    });

    const signMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(12.8, 6.4),
      new THREE.MeshBasicMaterial({ map: sign, toneMapped: false })
    );
    signMesh.position.set(-4.7, 6.35, -23.78);
    signMesh.castShadow = true;
    scene.add(signMesh);

    const signFrame = new THREE.Mesh(new THREE.BoxGeometry(13.15, 6.75, 0.22), mats.darkSteel);
    signFrame.position.set(-4.7, 6.35, -23.92);
    signFrame.receiveShadow = true;
    scene.add(signFrame);
    signFrame.renderOrder = -1;

    const quoteBoardTexture = createCanvasPanel({
      width: 1024,
      height: 1024,
      background: "#004b3d",
      accent: "#d2aa54",
      title: "GET A FREE QUOTE",
      kicker: "START HERE",
      primaryLine: "(214) 247-6369",
      lines: ["Fence repair", "Fence installation", "Gates + perimeter work"],
      dark: false
    });

    const quoteBoard = new THREE.Mesh(
      new THREE.PlaneGeometry(4.8, 4.8),
      new THREE.MeshBasicMaterial({ map: quoteBoardTexture, toneMapped: false })
    );
    quoteBoard.position.set(5.6, 5.45, -23.76);
    scene.add(quoteBoard);

    const hit = new THREE.Mesh(new THREE.BoxGeometry(5.1, 5.1, 0.6), mats.hit);
    hit.position.copy(quoteBoard.position);
    hit.userData.hotspot = {
      key: "quote",
      label: "Quote wall",
      url: "../quote/"
    };
    hotspotMeshes.push(hit);
    scene.add(hit);

    focusTargets.set("brand", {
      position: new THREE.Vector3(-2.2, 7.0, -10.8),
      target: new THREE.Vector3(-2.2, 5.9, -23.7),
      label: "Brand wall"
    });
  }

  function buildTruckAndTrailer() {
    const truck = new THREE.Group();
    truck.position.set(-8.35, 0.1, 3.6);
    truck.rotation.y = -0.08;

    const truckWhite = new THREE.MeshStandardMaterial({ color: 0xf8f7f1, roughness: 0.48, metalness: 0.08 });
    const blackTrim = new THREE.MeshStandardMaterial({ color: 0x171b1b, roughness: 0.62, metalness: 0.34 });
    const headlight = new THREE.MeshBasicMaterial({ color: 0xfff1c7 });
    const taillight = new THREE.MeshBasicMaterial({ color: 0xc43224 });

    const bed = box(4.95, 1.22, 2.42, -0.95, 1.02, 0, truckWhite);
    const crewCab = box(3.15, 1.92, 2.38, 2.25, 1.35, -0.03, truckWhite);
    const hood = box(1.6, 0.92, 2.28, 4.63, 0.96, -0.03, truckWhite);
    const frontBumper = box(0.24, 0.42, 2.5, 5.56, 0.5, -0.03, mats.steel);
    const grille = box(0.12, 0.86, 1.48, 5.42, 0.98, -0.03, blackTrim);
    const rearBumper = box(0.22, 0.38, 2.42, -3.55, 0.48, 0, mats.steel);
    const windshield = box(0.06, 0.82, 1.65, 3.82, 1.84, -0.03, mats.glass);
    truck.add(bed, crewCab, hood, frontBumper, grille, rearBumper, windshield);

    [0.72, 0.98, 1.24].forEach((y) => {
      truck.add(box(0.14, 0.045, 1.54, 5.5, y, -0.03, mats.steel));
    });

    [-0.92, 0.92].forEach((z) => {
      truck.add(box(0.08, 0.36, 0.42, 5.52, 1.0, z, headlight));
      truck.add(box(0.08, 0.42, 0.28, -3.66, 1.0, z, taillight));
    });

    [1.18, -1.25].forEach((z) => {
      const sideMultiplier = z > 0 ? 1 : -1;
      const windowDepth = 0.06;
      const windowZ = z;
      const frontWindow = box(0.86, 0.62, windowDepth, 2.95, 1.78, windowZ, mats.glass);
      const rearWindow = box(0.86, 0.62, windowDepth, 1.85, 1.78, windowZ, mats.glass);
      const bedTrim = box(4.55, 0.08, 0.05, -0.98, 1.62, windowZ, blackTrim);
      const stepRail = box(3.5, 0.1, 0.12, 1.45, 0.54, sideMultiplier * 1.34, blackTrim);
      truck.add(frontWindow, rearWindow, bedTrim, stepRail);

      [1.72, 2.72].forEach((x) => {
        truck.add(box(0.34, 0.06, 0.055, x, 1.28, sideMultiplier * 1.285, blackTrim));
      });

      const mirrorArm = box(0.06, 0.06, 0.44, 3.7, 1.6, sideMultiplier * 1.45, blackTrim);
      const mirror = box(0.12, 0.42, 0.28, 3.7, 1.58, sideMultiplier * 1.68, blackTrim);
      truck.add(mirrorArm, mirror);
    });

    [0.85, 1.78, 2.72, 3.44].forEach((x) => {
      truck.add(box(0.035, 1.18, 0.045, x, 1.2, 1.22, blackTrim));
      truck.add(box(0.035, 1.18, 0.045, x, 1.2, -1.28, blackTrim));
    });

    const roofMarker = new THREE.MeshBasicMaterial({ color: 0xffb24a });
    [-0.45, 0, 0.45].forEach((z) => {
      truck.add(box(0.16, 0.06, 0.11, 2.95, 2.34, z, roofMarker));
    });

    truck.add(box(1.35, 0.035, 0.05, 4.55, 1.44, 1.15, blackTrim));
    truck.add(box(1.35, 0.035, 0.05, 4.55, 1.44, -1.21, blackTrim));
    truck.add(box(0.08, 0.62, 2.05, -3.42, 1.15, 0, blackTrim));

    const truckLogo = createCanvasPanel({
      width: 1024,
      height: 512,
      background: "#fffaf1",
      accent: "#004b3d",
      title: "STRONG PERIMETER",
      kicker: "2025 F-350 CREW CAB",
      lines: ["8 FT BED", "FENCE CREW"],
      dark: true
    });

    const logoPanel = new THREE.Mesh(
      new THREE.PlaneGeometry(2.9, 1.45),
      new THREE.MeshBasicMaterial({ map: truckLogo, toneMapped: false })
    );
    logoPanel.position.set(-0.72, 1.22, 1.235);
    truck.add(logoPanel);

    [-2.55, 3.85].forEach((x) => {
      [-1.25, 1.25].forEach((z) => {
        addWheel(truck, x, z, 0.56, 0.44);
        const flare = new THREE.Mesh(new THREE.TorusGeometry(0.64, 0.035, 10, 32), blackTrim);
        flare.position.set(x, 0.62, z > 0 ? 1.255 : -1.255);
        truck.add(flare);
      });
    });

    truck.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(truck);

    const trailer = new THREE.Group();
    trailer.position.set(-7.7, 0.1, 0.0);
    trailer.rotation.y = -0.08;
    trailer.add(box(5.7, 0.22, 2.35, -0.4, 0.62, 0, mats.wood));
    trailer.add(box(5.25, 0.16, 0.18, -0.4, 1.12, -1.16, mats.darkSteel));
    trailer.add(box(5.25, 0.16, 0.18, -0.4, 1.12, 1.16, mats.darkSteel));
    trailer.add(box(0.12, 1.3, 0.12, -2.8, 1.25, -1.05, mats.darkSteel));
    trailer.add(box(0.12, 1.3, 0.12, 1.8, 1.25, -1.05, mats.darkSteel));
    trailer.add(box(0.12, 1.3, 0.12, -2.8, 1.25, 1.05, mats.darkSteel));
    trailer.add(box(0.12, 1.3, 0.12, 1.8, 1.25, 1.05, mats.darkSteel));
    trailer.add(box(2.4, 0.12, 0.12, 2.75, 0.78, 0, mats.darkSteel));
    trailer.add(box(1.4, 0.12, 0.12, 3.12, 0.78, 0.48, mats.darkSteel));
    trailer.add(box(1.4, 0.12, 0.12, 3.12, 0.78, -0.48, mats.darkSteel));
    trailer.add(box(0.4, 0.12, 0.4, 4.05, 0.68, 0, mats.steel));

    for (let i = 0; i < 7; i += 1) {
      const rail = box(0.08, 1.15, 2.1, -2.3 + i * 0.65, 1.38, 0, mats.wood);
      trailer.add(rail);
    }

    [-1.35, 0.6].forEach((x) => {
      [-1.23, 1.23].forEach((z) => {
        addWheel(trailer, x, z, 0.42, 0.32);
      });
    });

    [-1.35, 0.6].forEach((x) => {
      [-1.23, 1.23].forEach((z) => {
        trailer.add(box(0.9, 0.16, 0.12, x, 0.96, z > 0 ? 1.25 : -1.25, mats.darkSteel));
      });
    });

    trailer.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(trailer);

    focusTargets.set("truck", {
      position: new THREE.Vector3(-8.7, 3.1, 9.4),
      target: new THREE.Vector3(-7.4, 1.35, 1.5),
      label: "Crew truck and trailer"
    });
  }

  function buildServiceDisplays() {
    const spacing = 4.05;
    const startX = -10.2;
    const z = -13.8;

    serviceAreas.forEach((service, index) => {
      const group = new THREE.Group();
      group.position.set(startX + index * spacing, 0, z);
      group.userData.service = service;

      const colorMaterial = new THREE.MeshStandardMaterial({
        color: service.color,
        roughness: 0.58,
        metalness: service.key === "wood" ? 0.05 : 0.38
      });

      const bayPaint = new THREE.MeshBasicMaterial({ color: service.color, transparent: true, opacity: 0.26 });
      const frontStripe = box(3.25, 0.018, 0.06, 0, 0.045, 1.12, bayPaint);
      const leftStripe = box(0.06, 0.018, 2.2, -1.62, 0.045, 0.05, bayPaint);
      const rightStripe = box(0.06, 0.018, 2.2, 1.62, 0.045, 0.05, bayPaint);
      group.add(frontStripe, leftStripe, rightStripe);

      const signTexture = createCanvasPanel({
        width: 1024,
        height: 512,
        background: "#fffaf1",
        accent: `#${service.color.toString(16).padStart(6, "0")}`,
        title: service.label.toUpperCase(),
        kicker: "WAREHOUSE BAY",
        lines: service.detail.split(", "),
        dark: true
      });

      const sign = new THREE.Mesh(
        new THREE.PlaneGeometry(3.25, 1.6),
        new THREE.MeshBasicMaterial({ map: signTexture, toneMapped: false })
      );
      sign.position.set(0, 3.35, -0.18);
      group.add(sign);

      const frame = new THREE.Mesh(new THREE.BoxGeometry(3.42, 1.76, 0.16), mats.darkSteel);
      frame.position.set(0, 3.35, -0.28);
      group.add(frame);
      frame.renderOrder = -1;

      if (service.key === "wood") {
        createWoodDisplay(group, colorMaterial);
      } else if (service.key === "wrought") {
        createIronDisplay(group, colorMaterial);
      } else if (service.key === "chain") {
        createChainDisplay(group);
      } else if (service.key === "pipe") {
        createPipeDisplay(group, colorMaterial);
      } else if (service.key === "pool") {
        createPoolDisplay(group);
      } else {
        createTemporaryDisplay(group, colorMaterial);
      }

      const hit = new THREE.Mesh(new THREE.BoxGeometry(3.75, 4.4, 1.25), mats.hit);
      hit.position.set(0, 2.05, 0);
      hit.userData.hotspot = {
        key: service.key,
        label: service.short,
        url: service.url
      };
      group.add(hit);
      hotspotMeshes.push(hit);

      group.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      scene.add(group);
      focusTargets.set(service.key, {
        position: new THREE.Vector3(group.position.x, 2.85, -8.0),
        target: new THREE.Vector3(group.position.x, 1.9, -13.7),
        label: service.short
      });
    });
  }

  function createWoodDisplay(group) {
    group.add(box(0.22, 2.5, 0.24, -1.35, 1.25, 0, mats.woodDark));
    group.add(box(0.22, 2.5, 0.24, 1.35, 1.25, 0, mats.woodDark));
    group.add(box(0.34, 0.1, 0.34, -1.35, 2.54, 0, mats.woodDark));
    group.add(box(0.34, 0.1, 0.34, 1.35, 2.54, 0, mats.woodDark));
    group.add(box(2.95, 0.22, 0.18, 0, 2.15, 0, mats.woodDark));
    group.add(box(2.95, 0.22, 0.18, 0, 0.85, 0, mats.woodDark));

    for (let i = 0; i < 9; i += 1) {
      const board = box(0.25, 2.22, 0.16, -1.04 + i * 0.26, 1.34, 0.04, mats.wood);
      board.rotation.z = (i % 2 === 0 ? -1 : 1) * 0.01;
      group.add(board);

      [0.62, 2.04].forEach((y) => {
        const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.012, 10), mats.darkSteel);
        screw.rotation.x = Math.PI / 2;
        screw.position.set(-1.04 + i * 0.26, y, 0.13);
        group.add(screw);
      });
    }
  }

  function createIronDisplay(group, material) {
    group.add(box(3.05, 0.16, 0.16, 0, 2.35, 0, mats.darkSteel));
    group.add(box(3.05, 0.16, 0.16, 0, 0.7, 0, mats.darkSteel));
    group.add(box(0.5, 0.08, 0.32, -1.45, 0.18, 0, mats.darkSteel));
    group.add(box(0.5, 0.08, 0.32, 1.45, 0.18, 0, mats.darkSteel));

    for (let i = 0; i < 11; i += 1) {
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.85, 18), material);
      bar.position.set(-1.35 + i * 0.27, 1.5, 0);
      group.add(bar);

      const finial = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.24, 12), material);
      finial.position.set(-1.35 + i * 0.27, 2.62, 0);
      group.add(finial);
    }
  }

  function createChainDisplay(group) {
    const frameMaterial = mats.steel;
    group.add(box(3.05, 0.12, 0.12, 0, 2.25, 0, frameMaterial));
    group.add(box(3.05, 0.12, 0.12, 0, 0.75, 0, frameMaterial));
    group.add(box(0.14, 2.05, 0.14, -1.45, 1.5, 0, frameMaterial));
    group.add(box(0.14, 2.05, 0.14, 1.45, 1.5, 0, frameMaterial));
    group.add(box(0.18, 0.18, 0.18, -1.45, 2.55, 0, frameMaterial));
    group.add(box(0.18, 0.18, 0.18, 1.45, 2.55, 0, frameMaterial));

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xdce5e1, transparent: true, opacity: 0.58 });

    for (let i = -10; i <= 10; i += 1) {
      const geometryA = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i * 0.18 - 0.7, 0.75, 0.03),
        new THREE.Vector3(i * 0.18 + 0.7, 2.25, 0.03)
      ]);
      const geometryB = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i * 0.18 - 0.7, 2.25, 0.035),
        new THREE.Vector3(i * 0.18 + 0.7, 0.75, 0.035)
      ]);
      group.add(new THREE.Line(geometryA, lineMaterial));
      group.add(new THREE.Line(geometryB, lineMaterial));
    }
  }

  function createPipeDisplay(group, material) {
    [-1.35, 1.35].forEach((x) => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.25, 24), material);
      post.position.set(x, 1.45, 0);
      group.add(post);
      group.add(box(0.48, 0.08, 0.48, x, 0.16, 0, mats.concrete));
    });

    [0.85, 1.45, 2.05].forEach((y) => {
      const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 3.05, 24), material);
      rail.rotation.z = Math.PI / 2;
      rail.position.set(0, y, 0);
      group.add(rail);

      [-1.35, 1.35].forEach((x) => {
        const weldCollar = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.012, 8, 24), mats.darkSteel);
        weldCollar.rotation.y = Math.PI / 2;
        weldCollar.position.set(x, y, 0);
        group.add(weldCollar);
      });
    });
  }

  function createPoolDisplay(group) {
    group.add(box(0.13, 2.15, 0.13, -1.45, 1.45, 0, mats.darkSteel));
    group.add(box(0.13, 2.15, 0.13, 1.45, 1.45, 0, mats.darkSteel));
    group.add(box(3.0, 0.12, 0.12, 0, 2.35, 0, mats.darkSteel));
    group.add(box(3.0, 0.12, 0.12, 0, 0.65, 0, mats.darkSteel));

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 1.55), mats.glass);
    mesh.position.set(0, 1.48, 0.02);
    group.add(mesh);

    const stripeMaterial = new THREE.MeshBasicMaterial({ color: 0x60b7b2, transparent: true, opacity: 0.52 });
    for (let i = 0; i < 6; i += 1) {
      const stripe = box(0.04, 1.45, 0.03, -1.08 + i * 0.43, 1.48, 0.06, stripeMaterial);
      group.add(stripe);
    }
  }

  function createTemporaryDisplay(group, material) {
    group.add(box(3.05, 0.12, 0.12, 0, 2.28, 0, material));
    group.add(box(3.05, 0.12, 0.12, 0, 0.78, 0, material));
    group.add(box(0.12, 1.85, 0.12, -1.45, 1.52, 0, material));
    group.add(box(0.12, 1.85, 0.12, 1.45, 1.52, 0, material));
    group.add(box(1.1, 0.1, 0.28, -1.45, 0.15, 0.2, mats.darkSteel));
    group.add(box(1.1, 0.1, 0.28, 1.45, 0.15, 0.2, mats.darkSteel));

    for (let i = 0; i < 9; i += 1) {
      const bar = box(0.045, 1.5, 0.045, -1.08 + i * 0.27, 1.52, 0.02, mats.steel);
      group.add(bar);
    }

    const meshLineMaterial = new THREE.LineBasicMaterial({ color: 0xcbd4cf, transparent: true, opacity: 0.45 });
    for (let i = -6; i <= 6; i += 1) {
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i * 0.25 - 0.7, 0.82, 0.055),
        new THREE.Vector3(i * 0.25 + 0.7, 2.2, 0.055)
      ]), meshLineMaterial));
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i * 0.25 - 0.7, 2.2, 0.06),
        new THREE.Vector3(i * 0.25 + 0.7, 0.82, 0.06)
      ]), meshLineMaterial));
    }

    const brace = box(0.08, 2.0, 0.06, 0, 1.5, 0.05, mats.steel);
    brace.rotation.z = Math.PI / 4;
    group.add(brace);
    group.add(box(0.78, 0.16, 0.38, -1.45, 0.1, 0.35, mats.concrete));
    group.add(box(0.78, 0.16, 0.38, 1.45, 0.1, 0.35, mats.concrete));
  }

  function addWarehouseColumn(x, z) {
    const column = new THREE.Group();
    const height = warehouseHeight - 0.7;
    column.position.set(x, 0, z);
    column.add(box(0.28, height, 0.12, 0, height / 2, 0, mats.darkSteel));
    column.add(box(0.72, height, 0.08, 0, height / 2, 0.16, mats.darkSteel));
    column.add(box(0.72, height, 0.08, 0, height / 2, -0.16, mats.darkSteel));
    column.add(box(0.9, 0.08, 0.62, 0, 0.08, 0, mats.steel));
    column.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(column);
  }

  function addBollard(x, z) {
    const bollard = new THREE.Mesh(
      new THREE.CylinderGeometry(0.13, 0.13, 1.05, 24),
      new THREE.MeshStandardMaterial({ color: 0xd2aa54, roughness: 0.48, metalness: 0.28 })
    );
    bollard.position.set(x, 0.55, z);
    bollard.castShadow = true;
    bollard.receiveShadow = true;
    scene.add(bollard);

    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.035, 24), mats.darkSteel);
    cap.position.set(x, 1.1, z);
    cap.castShadow = true;
    scene.add(cap);
  }

  function addMaterialRack(x, z, rotationY) {
    const rack = new THREE.Group();
    rack.position.set(x, 0, z);
    rack.rotation.y = rotationY;
    const rackPaint = new THREE.MeshStandardMaterial({ color: 0xc56a2d, roughness: 0.46, metalness: 0.38 });

    [-1.8, 1.8].forEach((railX) => {
      [-0.7, 0.7].forEach((railZ) => {
        rack.add(box(0.12, 2.9, 0.12, railX, 1.45, railZ, rackPaint));
      });
    });

    [0.85, 1.75, 2.65].forEach((y) => {
      rack.add(box(3.8, 0.12, 0.12, 0, y, -0.7, rackPaint));
      rack.add(box(3.8, 0.12, 0.12, 0, y, 0.7, rackPaint));
      rack.add(box(0.12, 0.12, 1.52, -1.8, y, 0, rackPaint));
      rack.add(box(0.12, 0.12, 1.52, 1.8, y, 0, rackPaint));
    });

    for (let i = 0; i < 6; i += 1) {
      const panel = box(0.16, 1.7, 0.08, -1.32 + i * 0.52, 1.56, 0.04, mats.wood);
      panel.rotation.z = (i % 2 === 0 ? 1 : -1) * 0.04;
      rack.add(panel);
    }

    rack.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(rack);
  }

  function addPalletStack(x, z, rotationY) {
    const stack = new THREE.Group();
    stack.position.set(x, 0.02, z);
    stack.rotation.y = rotationY;

    for (let level = 0; level < 3; level += 1) {
      const y = 0.14 + level * 0.24;
      [-0.55, 0, 0.55].forEach((slatZ) => {
        stack.add(box(1.7, 0.08, 0.18, 0, y, slatZ, mats.woodDark));
      });
      [-0.62, 0.62].forEach((slatX) => {
        stack.add(box(0.16, 0.1, 1.4, slatX, y - 0.08, 0, mats.woodDark));
      });
    }

    for (let i = 0; i < 8; i += 1) {
      const bundle = box(0.11, 1.25, 0.1, -0.7 + i * 0.2, 1.25, 0.05, mats.wood);
      bundle.rotation.z = 0.02;
      stack.add(bundle);
    }

    stack.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(stack);
  }

  function addWheel(group, x, z, radius, width) {
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, width, 36), mats.tire);
    tire.rotation.x = Math.PI / 2;
    tire.position.set(x, 0.46, z);
    tire.castShadow = true;
    tire.receiveShadow = true;
    group.add(tire);

    const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.42, radius * 0.42, width + 0.025, 28), mats.steel);
    hub.rotation.x = Math.PI / 2;
    hub.position.copy(tire.position);
    hub.castShadow = true;
    group.add(hub);

    [-1, 1].forEach((side) => {
      const sidewall = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.76, 0.028, 10, 32), mats.darkSteel);
      sidewall.position.set(x, 0.46, z + side * width * 0.52);
      sidewall.castShadow = true;
      group.add(sidewall);
    });
  }

  function buildLighting() {
    const hemisphere = new THREE.HemisphereLight(0xfff2dc, 0x0b1412, 0.62);
    scene.add(hemisphere);

    const sun = new THREE.DirectionalLight(0xffdfad, 1.35);
    sun.position.set(8, 7, 11);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 36;
    sun.shadow.camera.left = -18;
    sun.shadow.camera.right = 18;
    sun.shadow.camera.top = 18;
    sun.shadow.camera.bottom = -18;
    scene.add(sun);

    const lightBarMaterial = new THREE.MeshBasicMaterial({ color: 0xfff4dc });
    const fixtureHousing = new THREE.MeshStandardMaterial({ color: 0x252c2c, roughness: 0.42, metalness: 0.55 });

    [
      [-9, lampY, -11],
      [-3, lampY, -11],
      [3, lampY, -11],
      [9, lampY, -11],
      [-8, lampY - 0.5, 3]
    ].forEach(([x, y, z]) => {
      const lamp = new THREE.PointLight(0xfff0c6, 1.85, 18, 1.65);
      lamp.position.set(x, y, z);
      lamp.castShadow = true;
      scene.add(lamp);

      const fixture = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.12, 0.28), fixtureHousing);
      fixture.position.set(x, y + 0.1, z);
      fixture.castShadow = true;
      scene.add(fixture);

      const lens = new THREE.Mesh(new THREE.BoxGeometry(2.38, 0.035, 0.16), lightBarMaterial);
      lens.position.set(x, y - 0.005, z);
      scene.add(lens);
    });
  }

  function createConcreteTexture() {
    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = 1024;
    textureCanvas.height = 1024;
    const ctx = textureCanvas.getContext("2d");
    const random = seededRandom(42);

    ctx.fillStyle = "#a6a196";
    ctx.fillRect(0, 0, textureCanvas.width, textureCanvas.height);

    for (let i = 0; i < 9000; i += 1) {
      const shade = Math.round(120 + random() * 62);
      ctx.fillStyle = `rgba(${shade}, ${shade - 3}, ${shade - 9}, ${0.07 + random() * 0.12})`;
      const size = 1 + random() * 3;
      ctx.fillRect(random() * 1024, random() * 1024, size, size);
    }

    ctx.strokeStyle = "rgba(70, 68, 62, 0.36)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 14; i += 1) {
      ctx.beginPath();
      let x = random() * 1024;
      let y = random() * 1024;
      ctx.moveTo(x, y);
      for (let step = 0; step < 6; step += 1) {
        x += (random() - 0.5) * 120;
        y += (random() - 0.5) * 120;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    return finishTexture(textureCanvas, 3.8, 4.8);
  }

  function createCorrugatedTexture(baseHex, ribHex) {
    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = 512;
    textureCanvas.height = 512;
    const ctx = textureCanvas.getContext("2d");
    const random = seededRandom(baseHex);
    const base = hexToRgb(baseHex);
    const rib = hexToRgb(ribHex);

    ctx.fillStyle = rgb(base);
    ctx.fillRect(0, 0, 512, 512);

    for (let x = 0; x < 512; x += 24) {
      const width = 8 + Math.round(random() * 3);
      ctx.fillStyle = `rgba(${rib.r}, ${rib.g}, ${rib.b}, 0.74)`;
      ctx.fillRect(x, 0, width, 512);
      ctx.fillStyle = "rgba(255, 255, 255, 0.045)";
      ctx.fillRect(x + width, 0, 2, 512);
    }

    for (let i = 0; i < 1700; i += 1) {
      const noise = Math.round(25 + random() * 70);
      ctx.fillStyle = `rgba(${noise}, ${noise + 6}, ${noise + 4}, 0.035)`;
      ctx.fillRect(random() * 512, random() * 512, 1 + random() * 2, 1 + random() * 6);
    }

    return finishTexture(textureCanvas, 5.5, 3.5);
  }

  function createBrushedMetalTexture(baseHex, highlightHex) {
    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = 512;
    textureCanvas.height = 256;
    const ctx = textureCanvas.getContext("2d");
    const random = seededRandom(baseHex + highlightHex);
    const base = hexToRgb(baseHex);
    const highlight = hexToRgb(highlightHex);

    ctx.fillStyle = rgb(base);
    ctx.fillRect(0, 0, 512, 256);

    for (let y = 0; y < 256; y += 2) {
      const alpha = 0.05 + random() * 0.12;
      ctx.strokeStyle = `rgba(${highlight.r}, ${highlight.g}, ${highlight.b}, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y + (random() - 0.5) * 1.4);
      ctx.stroke();
    }

    return finishTexture(textureCanvas, 2.5, 2);
  }

  function createWoodTexture(baseHex, darkHex) {
    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = 512;
    textureCanvas.height = 1024;
    const ctx = textureCanvas.getContext("2d");
    const random = seededRandom(baseHex + darkHex);
    const base = hexToRgb(baseHex);
    const dark = hexToRgb(darkHex);

    ctx.fillStyle = rgb(base);
    ctx.fillRect(0, 0, 512, 1024);

    for (let y = 0; y < 1024; y += 8) {
      const wave = Math.sin(y * 0.028) * 16 + Math.sin(y * 0.011) * 28;
      ctx.strokeStyle = `rgba(${dark.r}, ${dark.g}, ${dark.b}, ${0.16 + random() * 0.18})`;
      ctx.lineWidth = 1 + random() * 2.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(170, y + wave, 340, y - wave, 512, y + wave * 0.5);
      ctx.stroke();
    }

    for (let i = 0; i < 12; i += 1) {
      ctx.strokeStyle = `rgba(${dark.r}, ${dark.g}, ${dark.b}, 0.22)`;
      ctx.strokeRect(random() * 420, random() * 920, 45 + random() * 60, 18 + random() * 40);
    }

    return finishTexture(textureCanvas, 1.2, 2.8);
  }

  function createRubberTexture() {
    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = 512;
    textureCanvas.height = 512;
    const ctx = textureCanvas.getContext("2d");
    const random = seededRandom(777);

    ctx.fillStyle = "#151818";
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 2600; i += 1) {
      const shade = Math.round(12 + random() * 26);
      ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, 0.22)`;
      ctx.fillRect(random() * 512, random() * 512, 1 + random() * 3, 1 + random() * 3);
    }

    ctx.strokeStyle = "rgba(70, 74, 72, 0.32)";
    ctx.lineWidth = 8;
    for (let x = -512; x < 512; x += 42) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 512, 512);
      ctx.stroke();
    }

    return finishTexture(textureCanvas, 2, 2);
  }

  function finishTexture(textureCanvas, repeatX, repeatY) {
    const texture = new THREE.CanvasTexture(textureCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
    texture.anisotropy = 8;
    return texture;
  }

  function seededRandom(seed) {
    let value = seed >>> 0;
    return () => {
      value = (value * 1664525 + 1013904223) >>> 0;
      return value / 4294967296;
    };
  }

  function hexToRgb(hex) {
    return {
      r: (hex >> 16) & 255,
      g: (hex >> 8) & 255,
      b: hex & 255
    };
  }

  function rgb(color) {
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  }

  function createCanvasPanel(options) {
    const canvasTexture = document.createElement("canvas");
    canvasTexture.width = options.width;
    canvasTexture.height = options.height;

    const ctx = canvasTexture.getContext("2d");
    const w = canvasTexture.width;
    const h = canvasTexture.height;
    const pad = Math.round(w * 0.07);

    ctx.fillStyle = options.background;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = options.accent;
    ctx.fillRect(0, 0, Math.round(w * 0.055), h);
    ctx.fillRect(0, h - Math.round(h * 0.08), w, Math.round(h * 0.08));

    ctx.fillStyle = options.dark ? "#004b3d" : "#fffaf1";
    ctx.font = `800 ${Math.round(h * 0.07)}px Arial, sans-serif`;
    ctx.fillText(options.kicker, pad, Math.round(h * 0.18));

    ctx.fillStyle = options.dark ? "#17211e" : "#fffaf1";
    ctx.font = `900 ${Math.round(h * 0.13)}px Arial, sans-serif`;
    wrapCanvasText(ctx, options.title, pad, Math.round(h * 0.36), w - pad * 1.4, Math.round(h * 0.135));

    if (options.primaryLine) {
      const bannerY = Math.round(h * 0.52);
      const bannerH = Math.round(h * 0.17);
      ctx.fillStyle = options.accent;
      ctx.fillRect(pad, bannerY, w - pad * 1.35, bannerH);
      ctx.fillStyle = options.dark ? "#17211e" : "#071c17";
      ctx.font = `900 ${Math.round(h * 0.095)}px Arial, sans-serif`;
      ctx.fillText(options.primaryLine, pad + Math.round(w * 0.025), bannerY + Math.round(h * 0.115));
    }

    ctx.fillStyle = options.dark ? "#394541" : "rgba(255, 250, 241, 0.82)";
    ctx.font = `800 ${Math.round(h * 0.055)}px Arial, sans-serif`;
    options.lines.forEach((line, index) => {
      ctx.fillText(line, pad, Math.round(h * 0.78) + index * Math.round(h * 0.07));
    });

    const texture = new THREE.CanvasTexture(canvasTexture);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    return texture;
  }

  function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    let lineIndex = 0;

    words.forEach((word) => {
      const testLine = line ? `${line} ${word}` : word;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        ctx.fillText(line, x, y + lineIndex * lineHeight);
        line = word;
        lineIndex += 1;
      } else {
        line = testLine;
      }
    });

    ctx.fillText(line, x, y + lineIndex * lineHeight);
  }

  function box(width, height, depth, x, y, z, material) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    mesh.position.set(x, y, z);
    return mesh;
  }

  function focusScene(key) {
    const view = focusTargets.get(key);
    if (!view) {
      return;
    }

    const startPosition = camera.position.clone();
    const startTarget = cameraState.target.clone();

    cameraState.tween = {
      start: clock.elapsedTime,
      duration: reduceMotion ? 0.01 : 1.05,
      startPosition,
      startTarget,
      endPosition: view.position.clone(),
      endTarget: view.target.clone()
    };
  }

  function updateOrbitCamera() {
    const radius = cameraState.radius;
    const cosPitch = Math.cos(cameraState.pitch);
    camera.position.set(
      cameraState.target.x + Math.sin(cameraState.yaw) * cosPitch * radius,
      cameraState.target.y + Math.sin(cameraState.pitch) * radius,
      cameraState.target.z + Math.cos(cameraState.yaw) * cosPitch * radius
    );
    camera.lookAt(cameraState.target);
  }

  function syncOrbitFromCamera() {
    const offset = camera.position.clone().sub(cameraState.target);
    cameraState.radius = THREE.MathUtils.clamp(offset.length(), 7, 28);
    cameraState.pitch = THREE.MathUtils.clamp(Math.asin(offset.y / cameraState.radius), -0.15, 0.48);
    cameraState.yaw = Math.atan2(offset.x, offset.z);
  }

  function animate() {
    const elapsed = clock.elapsedTime;

    if (cameraState.tween) {
      const t = THREE.MathUtils.clamp((elapsed - cameraState.tween.start) / cameraState.tween.duration, 0, 1);
      const eased = t * t * (3 - 2 * t);
      camera.position.lerpVectors(cameraState.tween.startPosition, cameraState.tween.endPosition, eased);
      cameraState.target.lerpVectors(cameraState.tween.startTarget, cameraState.tween.endTarget, eased);
      camera.lookAt(cameraState.target);

      if (t >= 1) {
        cameraState.tween = null;
        syncOrbitFromCamera();
      }
    } else {
      updateOrbitCamera();
    }

    renderer.render(scene, camera);
  }

  function resizeRenderer() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  let drag = null;

  function handlePointerDown(event) {
    drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      moved: false
    };
    canvas.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event) {
    if (!drag) {
      const hit = pickHotspot(event);
      canvas.style.cursor = hit ? "pointer" : "grab";
      return;
    }

    const deltaX = event.clientX - drag.lastX;
    const deltaY = event.clientY - drag.lastY;
    const totalMove = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);

    if (totalMove > 4) {
      drag.moved = true;
      cameraState.tween = null;
      cameraState.yaw -= deltaX * 0.006;
      cameraState.pitch = THREE.MathUtils.clamp(cameraState.pitch + deltaY * 0.0045, -0.1, 0.46);
    }

    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
  }

  function handlePointerUp(event) {
    if (!drag) {
      return;
    }

    const didDrag = drag.moved;
    canvas.releasePointerCapture(drag.pointerId);
    drag = null;

    if (!didDrag) {
      const hit = pickHotspot(event);
      if (hit) {
        const hotspot = hit.object.userData.hotspot;
        window.location.href = hotspot.url;
      }
    }
  }

  function handlePointerCancel() {
    drag = null;
  }

  function handleWheel(event) {
    event.preventDefault();
    cameraState.tween = null;
    cameraState.radius = THREE.MathUtils.clamp(cameraState.radius + event.deltaY * 0.018, 7, 28);
  }

  function pickHotspot(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    raycaster.setFromCamera(pointer, camera);
    const intersections = raycaster.intersectObjects(hotspotMeshes, true);
    return intersections.find((item) => item.object.userData.hotspot);
  }
}
