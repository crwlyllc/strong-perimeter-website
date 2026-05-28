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
  const hotspotRings = [];
  const focusTargets = new Map();
  const clock = new THREE.Clock();

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x101815, 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const mats = {
    concrete: new THREE.MeshStandardMaterial({ color: 0x3a403d, roughness: 0.92, metalness: 0.02 }),
    wall: new THREE.MeshStandardMaterial({ color: 0x203a34, roughness: 0.86 }),
    wallDark: new THREE.MeshStandardMaterial({ color: 0x16251f, roughness: 0.9 }),
    steel: new THREE.MeshStandardMaterial({ color: 0x8d9aa0, roughness: 0.42, metalness: 0.58 }),
    darkSteel: new THREE.MeshStandardMaterial({ color: 0x20282a, roughness: 0.45, metalness: 0.64 }),
    green: new THREE.MeshStandardMaterial({ color: 0x004b3d, roughness: 0.58, metalness: 0.18 }),
    orange: new THREE.MeshStandardMaterial({ color: 0xdb7337, roughness: 0.62 }),
    wood: new THREE.MeshStandardMaterial({ color: 0xb97942, roughness: 0.78 }),
    woodDark: new THREE.MeshStandardMaterial({ color: 0x6f4628, roughness: 0.84 }),
    cream: new THREE.MeshStandardMaterial({ color: 0xfffaf1, roughness: 0.62 }),
    tire: new THREE.MeshStandardMaterial({ color: 0x111313, roughness: 0.7 }),
    glass: new THREE.MeshStandardMaterial({ color: 0x9fd5d0, roughness: 0.16, metalness: 0, transparent: true, opacity: 0.42 }),
    marker: new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18, depthWrite: false }),
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

    const grid = new THREE.GridHelper(28, 28, 0x52635d, 0x2c3632);
    grid.position.set(0, 0.012, -6);
    grid.material.transparent = true;
    grid.material.opacity = 0.28;
    scene.add(grid);

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
    truck.position.set(-8.6, 0.1, 3.6);
    truck.rotation.y = -0.08;

    const bed = box(3.8, 1.15, 2.25, 0.1, 1.0, 0, mats.cream);
    const cab = box(2.0, 1.7, 2.15, 2.55, 1.25, -0.05, mats.green);
    const hood = box(1.35, 0.85, 2.05, 4.1, 0.9, -0.05, mats.green);
    const bumper = box(0.18, 0.36, 2.25, 4.88, 0.46, -0.05, mats.steel);
    const windshield = box(0.05, 0.75, 1.55, 3.47, 1.75, -0.05, mats.glass);
    truck.add(bed, cab, hood, bumper, windshield);

    const truckLogo = createCanvasPanel({
      width: 1024,
      height: 512,
      background: "#fffaf1",
      accent: "#004b3d",
      title: "STRONG",
      kicker: "PERIMETER",
      lines: ["FENCE CREW"],
      dark: true
    });

    const logoPanel = new THREE.Mesh(
      new THREE.PlaneGeometry(2.35, 1.18),
      new THREE.MeshBasicMaterial({ map: truckLogo, toneMapped: false })
    );
    logoPanel.position.set(0.12, 1.22, 1.135);
    truck.add(logoPanel);

    [-1.2, 2.95].forEach((x) => {
      [-1.12, 1.12].forEach((z) => {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.36, 28), mats.tire);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(x, 0.46, z);
        wheel.castShadow = true;
        truck.add(wheel);

        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.38, 24), mats.steel);
        hub.rotation.z = Math.PI / 2;
        hub.position.copy(wheel.position);
        truck.add(hub);
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
    trailer.add(box(5.7, 0.28, 2.35, -0.4, 0.62, 0, mats.steel));
    trailer.add(box(5.25, 0.16, 0.18, -0.4, 1.12, -1.16, mats.darkSteel));
    trailer.add(box(5.25, 0.16, 0.18, -0.4, 1.12, 1.16, mats.darkSteel));
    trailer.add(box(0.12, 1.3, 0.12, -2.8, 1.25, -1.05, mats.darkSteel));
    trailer.add(box(0.12, 1.3, 0.12, 1.8, 1.25, -1.05, mats.darkSteel));
    trailer.add(box(0.12, 1.3, 0.12, -2.8, 1.25, 1.05, mats.darkSteel));
    trailer.add(box(0.12, 1.3, 0.12, 1.8, 1.25, 1.05, mats.darkSteel));

    for (let i = 0; i < 7; i += 1) {
      const rail = box(0.08, 1.15, 2.1, -2.3 + i * 0.65, 1.38, 0, mats.wood);
      trailer.add(rail);
    }

    [-1.35, 0.6].forEach((x) => {
      [-1.23, 1.23].forEach((z) => {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.32, 24), mats.tire);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(x, 0.43, z);
        wheel.castShadow = true;
        trailer.add(wheel);
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

      const marker = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.35, 0.035, 48), mats.marker.clone());
      marker.material.color.setHex(service.color);
      marker.material.opacity = 0.2;
      marker.position.set(0, 0.04, 0.08);
      group.add(marker);
      hotspotRings.push(marker);

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
    group.add(box(2.95, 0.22, 0.18, 0, 2.15, 0, mats.woodDark));
    group.add(box(2.95, 0.22, 0.18, 0, 0.85, 0, mats.woodDark));

    for (let i = 0; i < 9; i += 1) {
      const board = box(0.27, 2.2, 0.16, -1.05 + i * 0.26, 1.35, 0.04, mats.wood);
      board.rotation.z = (i % 2 === 0 ? -1 : 1) * 0.01;
      group.add(board);
    }
  }

  function createIronDisplay(group, material) {
    group.add(box(3.05, 0.16, 0.16, 0, 2.35, 0, mats.darkSteel));
    group.add(box(3.05, 0.16, 0.16, 0, 0.7, 0, mats.darkSteel));

    for (let i = 0; i < 11; i += 1) {
      const bar = box(0.07, 1.85, 0.07, -1.35 + i * 0.27, 1.5, 0, material);
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

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xdce5e1, transparent: true, opacity: 0.72 });

    for (let i = -7; i <= 7; i += 1) {
      const geometryA = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i * 0.25 - 0.8, 0.75, 0.03),
        new THREE.Vector3(i * 0.25 + 0.8, 2.25, 0.03)
      ]);
      const geometryB = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i * 0.25 - 0.8, 2.25, 0.035),
        new THREE.Vector3(i * 0.25 + 0.8, 0.75, 0.035)
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
    });

    [0.85, 1.45, 2.05].forEach((y) => {
      const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 3.05, 24), material);
      rail.rotation.z = Math.PI / 2;
      rail.position.set(0, y, 0);
      group.add(rail);
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

    const brace = box(0.08, 2.0, 0.06, 0, 1.5, 0.05, mats.steel);
    brace.rotation.z = Math.PI / 4;
    group.add(brace);
  }

  function buildLighting() {
    const hemisphere = new THREE.HemisphereLight(0xfff2dc, 0x0b1412, 1.0);
    scene.add(hemisphere);

    const sun = new THREE.DirectionalLight(0xffdfad, 2.1);
    sun.position.set(-6, 10, 8);
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

    [
      [-9, lampY, -11],
      [-3, lampY, -11],
      [3, lampY, -11],
      [9, lampY, -11],
      [-8, lampY - 0.5, 3]
    ].forEach(([x, y, z]) => {
      const lamp = new THREE.PointLight(0xfff0c6, 1.25, 13, 1.8);
      lamp.position.set(x, y, z);
      scene.add(lamp);

      const fixture = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.52, 0.18, 24), mats.darkSteel);
      fixture.position.set(x, y + 0.08, z);
      scene.add(fixture);
    });
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

    updateStatus(view.label);

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

  function updateStatus() {
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

    hotspotRings.forEach((ring, index) => {
      ring.material.opacity = 0.18 + Math.sin(elapsed * 1.8 + index) * 0.035;
      ring.rotation.y = elapsed * 0.12 + index;
    });

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
      if (hit) {
        updateStatus(hit.object.userData.hotspot.label);
      }
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
        updateStatus(hotspot.label);
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
