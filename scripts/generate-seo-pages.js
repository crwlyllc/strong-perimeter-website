const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE_ORIGIN = "https://crwlyllc.github.io";
const BASE_PATH = "/strong-perimeter-website";
const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;
const LASTMOD = "2026-05-24";

const navLinks = [
  ["Services", "/services/"],
  ["Fence Types", "/fence-types/"],
  ["Service Areas", "/service-areas/"],
  ["Projects", "/projects/"],
  ["Reviews", "/reviews/"],
  ["Contact", "/contact/"]
];

const quoteServices = [
  "Wrought iron fence restoration",
  "Wrought iron fence repair",
  "Wrought iron fence painting",
  "Wrought iron fence installation/replacement",
  "Wood fence restoration",
  "Wood fence repair",
  "Wood fence staining",
  "Wood fence installation/replacement",
  "Chain link fence repair",
  "Chain link fence installation/replacement",
  "Pipe fence restoration",
  "Pipe fence repair",
  "Pipe fence painting",
  "Vinyl fence repair",
  "Vinyl fence installation/replacement",
  "Residential fencing",
  "Commercial fencing"
];

const images = {
  brandGreen: "/images/2026-Strong-Perimeter-Long-Logo-Green.svg",
  brandMark: "/images/Strong-Perimeter-Logo-No-Text.svg",
  wood: "/images/wood-fence-with-stone-posts-min.png",
  woodIcon: "/images/wood-fence-icon.svg",
  iron: "/images/wrought-iron-icon-1-min.png",
  chain: "/images/chain-link-fabric-500.png",
  google: "/images/images.png",
  afa: "/images/afa-p-500.png"
};

const materialLinks = [
  ["/wrought-iron-fence/", "Wrought iron fence"],
  ["/wood-fence/", "Wood fence"],
  ["/chain-link-fence/", "Chain link fence"],
  ["/pipe-fence/", "Pipe fence"],
  ["/vinyl-fence/", "Vinyl fence"]
];

const coreServiceLinks = [
  ["/fence-restoration/", "Fence restoration"],
  ["/fence-repair/", "Fence repair"],
  ["/fence-installation-replacement/", "Fence installation/replacement"],
  ["/fence-painting/", "Fence painting"],
  ["/fence-staining/", "Fence staining"]
];

const pages = [];

function addPage(page) {
  pages.push({
    image: images.wood,
    imageAlt: "Finished fence project by Strong Perimeter",
    ctaLabel: "Get a free quote",
    ctaHref: "/contact/",
    secondaryCtaLabel: "Call (214) 247-6369",
    secondaryCtaHref: "tel:+12142476369",
    highlights: [],
    sections: [],
    faqs: [],
    related: [],
    ...page
  });
}

function serviceCard(title, text, href) {
  return { title, text, href };
}

function addActionHubPages() {
  addPage({
    slug: "services",
    title: "Fence Services in Dallas-Fort Worth | Strong Perimeter",
    description: "Explore Strong Perimeter fence restoration, repair, painting, staining, installation, and replacement services for residential and commercial properties in DFW.",
    eyebrow: "Fence services",
    h1: "Residential and commercial fence services across Dallas-Fort Worth",
    lead: "Strong Perimeter restores, repairs, paints, stains, installs, and replaces fences for homeowners, property managers, and commercial sites across DFW.",
    image: images.brandGreen,
    imageAlt: "Strong Perimeter logo",
    highlights: [
      serviceCard("Restore what can be saved", "Wrought iron, wood, and pipe fences often need targeted repair and a fresh finish before they need full replacement.", "/fence-restoration/"),
      serviceCard("Repair the weak points", "Posts, panels, pickets, rails, fabric, rust, storm damage, and alignment issues get scoped clearly before work starts.", "/fence-repair/"),
      serviceCard("Replace when it is time", "When the old fence has passed the point of smart repair, we help choose the right material and replacement plan.", "/fence-installation-replacement/")
    ],
    sections: [
      {
        eyebrow: "Service categories",
        title: "Start with the problem, then choose the right material.",
        body: "Most fence searches begin with a symptom: rust, leaning sections, broken boards, faded stain, loose chain link, or a full replacement need. The service path starts with what needs to be fixed, restored, painted, stained, installed, or replaced.",
        items: [
          "Restoration for wrought iron, wood, and pipe fencing.",
          "Repair for wrought iron, wood, chain link, pipe, and vinyl fencing.",
          "Painting for wrought iron and pipe fencing.",
          "Staining for wood fencing.",
          "Installation and replacement for wrought iron, wood, chain link, and vinyl fencing."
        ]
      },
      {
        eyebrow: "Property types",
        title: "The same field standards apply to homes and commercial sites.",
        body: "Residential customers usually care most about privacy, curb appeal, pets, pools, and HOA expectations. Commercial customers usually need perimeter control, clean access, durability, and fast communication.",
        items: [
          "Residential fence service for backyards, front yards, alleys, pools, and privacy needs.",
          "Commercial fence service for storefronts, lots, yards, facilities, and managed properties.",
          "Clear quote conversations before work starts."
        ]
      }
    ],
    related: [...coreServiceLinks, ...materialLinks]
  });

  addPage({
    slug: "fence-restoration",
    title: "Fence Restoration in Dallas-Fort Worth | Strong Perimeter",
    description: "Strong Perimeter restores wrought iron, wood, and pipe fences across DFW with repair, prep, painting, and staining services.",
    eyebrow: "Restoration",
    h1: "Fence restoration that brings the line back without rushing into replacement",
    lead: "Restoration is for fences with enough structure left to save. Strong Perimeter combines the right repairs with the right finish so the fence looks cared for again.",
    highlights: [
      serviceCard("Wrought iron restoration", "Rust, damaged sections, and tired paint can often be repaired and refinished into a cleaner, sharper fence line.", "/wrought-iron-fence-restoration/"),
      serviceCard("Wood fence restoration", "Aging boards, loose sections, and faded wood can be repaired and stained when the fence still has life left.", "/wood-fence-restoration/"),
      serviceCard("Pipe fence restoration", "Pipe fencing benefits from structural repair, rust-conscious prep, and a durable paint reset.", "/pipe-fence-restoration/")
    ],
    sections: [
      {
        eyebrow: "Best fit",
        title: "Restoration is right when the structure is still worth saving.",
        body: "A restoration visit looks at the whole fence line, not just the most obvious spot. The goal is to decide whether targeted repair and finish work will give the property the result it needs.",
        items: [
          "Surface rust or faded paint on iron or pipe fencing.",
          "Weathered wood fencing that needs repair and stain.",
          "Sections that look rough but are not fully failed.",
          "Commercial or residential properties that need a cleaner appearance without a full rebuild."
        ]
      }
    ],
    faqs: [
      ["What does fence restoration include?", "It depends on the material. Wrought iron and pipe restoration includes repair and painting. Wood restoration includes repair and staining."],
      ["Is restoration cheaper than replacement?", "It can be, when the posts and main structure are still sound. If the structure is too far gone, replacement may be the better long-term value."],
      ["Do you restore both residential and commercial fences?", "Yes. Strong Perimeter handles restoration for both residential and commercial properties across DFW."]
    ],
    related: [
      ["/wrought-iron-fence-restoration/", "Wrought iron restoration"],
      ["/wood-fence-restoration/", "Wood restoration"],
      ["/pipe-fence-restoration/", "Pipe restoration"],
      ["/restore-or-replace-fence/", "Restore or replace guide"]
    ]
  });

  addPage({
    slug: "fence-repair",
    title: "Fence Repair in Dallas-Fort Worth | Strong Perimeter",
    description: "Fence repair for wood, wrought iron, chain link, pipe, and vinyl fences across Dallas-Fort Worth. Residential and commercial service.",
    eyebrow: "Repair",
    h1: "Fence repair for the sections, posts, rails, panels, and finish issues that need attention",
    lead: "Strong Perimeter repairs the fence types DFW properties actually use: wrought iron, wood, chain link, pipe, and vinyl.",
    highlights: [
      serviceCard("Material-specific repairs", "Each material fails differently, so the repair plan should match the fence instead of using a generic patch.", "/fence-types/"),
      serviceCard("Storm and age damage", "Wind, soil movement, rust, rot, impact, and years of sun can all show up in different ways along the fence line.", "/storm-damaged-fence-repair/"),
      serviceCard("Repair or replace guidance", "If repair is not the smart move, we will say so and help scope replacement clearly.", "/repair-or-replace-fence/")
    ],
    sections: [
      {
        eyebrow: "Common repairs",
        title: "We repair the weak points that make a fence look tired or stop working.",
        body: "Repair work can be small and targeted or part of a larger restoration plan. The first step is understanding what failed and whether the rest of the line is stable.",
        items: [
          "Wrought iron rust, broken sections, bent pickets, and loose panels.",
          "Wood fence pickets, rails, posts, gates, leaning sections, and storm damage.",
          "Chain link fabric, rails, posts, tension, and access issues.",
          "Pipe fence rust, bent rails, broken sections, and loose posts.",
          "Vinyl cracked panels, damaged posts, and alignment issues."
        ]
      }
    ],
    faqs: [
      ["Can you repair one section of fence?", "Yes. If the rest of the fence is in usable shape, a targeted repair may be the right scope."],
      ["Do you repair commercial fences?", "Yes. Strong Perimeter handles residential and commercial fence repair."],
      ["When is replacement better than repair?", "Replacement is usually better when posts, structure, or too many sections are failing at once."]
    ],
    related: [
      ["/wrought-iron-fence-repair/", "Wrought iron fence repair"],
      ["/wood-fence-repair/", "Wood fence repair"],
      ["/chain-link-fence-repair/", "Chain link fence repair"],
      ["/pipe-fence-repair/", "Pipe fence repair"],
      ["/vinyl-fence-repair/", "Vinyl fence repair"]
    ]
  });

  addPage({
    slug: "fence-installation-replacement",
    title: "Fence Installation and Replacement in DFW | Strong Perimeter",
    description: "Strong Perimeter installs and replaces wrought iron, wood, chain link, and vinyl fences for homes and commercial properties across Dallas-Fort Worth.",
    eyebrow: "Installation and replacement",
    h1: "Fence installation and replacement for stronger, cleaner property lines",
    lead: "When repair or restoration is not enough, Strong Perimeter helps homeowners and commercial property owners choose the right material and replacement plan.",
    highlights: [
      serviceCard("Wood fencing", "Privacy, curb appeal, and backyard comfort with material and finish choices that fit the property.", "/wood-fence-installation-replacement/"),
      serviceCard("Wrought iron fencing", "Clean lines and long-term curb presence for front yards, pools, entries, and commercial frontage.", "/wrought-iron-fence-installation-replacement/"),
      serviceCard("Chain link and vinyl", "Practical perimeter control, pet containment, low-maintenance options, and commercial utility.", "/fence-types/")
    ],
    sections: [
      {
        eyebrow: "Process",
        title: "A good replacement starts with the old fence, the site, and the reason it failed.",
        body: "We look at access, slope, existing posts, demolition needs, gates, material choice, height, finish, and how the fence will be used before building the quote.",
        items: [
          "Wrought iron fence installation and replacement.",
          "Wood fence installation and replacement.",
          "Chain link fence installation and replacement.",
          "Vinyl fence installation and replacement.",
          "Residential and commercial replacement scopes."
        ]
      }
    ],
    faqs: [
      ["Which fence materials do you install?", "Strong Perimeter installs and replaces wrought iron, wood, chain link, and vinyl fences."],
      ["Do you remove the old fence?", "Removal can be included in the project scope when needed."],
      ["Can you help choose the material?", "Yes. The right material depends on privacy, security, maintenance, budget, and the look of the property."]
    ],
    related: [
      ["/wood-fence-installation-replacement/", "Wood installation/replacement"],
      ["/wrought-iron-fence-installation-replacement/", "Wrought iron installation/replacement"],
      ["/chain-link-fence-installation-replacement/", "Chain link installation/replacement"],
      ["/vinyl-fence-installation-replacement/", "Vinyl installation/replacement"]
    ]
  });

  addPage({
    slug: "fence-painting",
    title: "Fence Painting in Dallas-Fort Worth | Strong Perimeter",
    description: "Metal fence painting for wrought iron and pipe fences across DFW, including prep, rust-conscious repair, and finish work.",
    eyebrow: "Painting",
    h1: "Fence painting for wrought iron and pipe fences that need a cleaner finish",
    lead: "Strong Perimeter paints wrought iron and pipe fencing as part of standalone finish work or a larger restoration plan.",
    image: images.iron,
    imageAlt: "Wrought iron fence icon",
    highlights: [
      serviceCard("Wrought iron painting", "Rust, faded paint, and tired iron sections can be prepped and repainted for a sharper look.", "/wrought-iron-fence-painting/"),
      serviceCard("Pipe fence painting", "Pipe fencing often needs surface prep, rust attention, and consistent paint coverage.", "/pipe-fence-painting/"),
      serviceCard("Restoration-ready", "Painting works best when structural and rust issues are handled before finish work.", "/fence-restoration/")
    ],
    sections: [
      {
        eyebrow: "Prep matters",
        title: "Paint is only as good as the repair and prep underneath it.",
        body: "A clean final look starts before the first coat. We evaluate rust, loose sections, surface condition, access, and whether repair should happen before paint.",
        items: [
          "Wrought iron fence painting.",
          "Pipe fence painting.",
          "Rust-conscious prep and repair recommendations.",
          "Residential and commercial metal fence painting."
        ]
      }
    ],
    related: [
      ["/wrought-iron-fence-painting/", "Wrought iron painting"],
      ["/pipe-fence-painting/", "Pipe fence painting"],
      ["/wrought-iron-fence-restoration/", "Wrought iron restoration"],
      ["/pipe-fence-restoration/", "Pipe restoration"]
    ]
  });

  addPage({
    slug: "fence-staining",
    title: "Fence Staining in Dallas-Fort Worth | Strong Perimeter",
    description: "Wood fence staining in Dallas-Fort Worth for new, repaired, and restored wood fences. Residential and commercial service.",
    eyebrow: "Staining",
    h1: "Wood fence staining that helps the fence look finished and cared for",
    lead: "Strong Perimeter stains wood fences as a standalone service or as part of wood fence restoration after needed repairs.",
    image: images.wood,
    imageAlt: "Finished wood privacy fence",
    highlights: [
      serviceCard("New fence staining", "A new wood fence often needs time before stain. We help set expectations around timing and finish.", "/wood-fence-staining/"),
      serviceCard("Restoration staining", "A repaired older fence can look dramatically cleaner with the right prep and stain.", "/wood-fence-restoration/"),
      serviceCard("Color guidance", "The finish should fit the home, landscape, and existing exterior materials.", "/when-to-stain-a-new-fence/")
    ],
    sections: [
      {
        eyebrow: "Wood only",
        title: "Staining is for wood fences, and it should be planned with the condition of the wood.",
        body: "Stain decisions depend on age, exposure, moisture, previous finish, repair work, and the look the owner wants after the final walkthrough.",
        items: [
          "Wood fence staining.",
          "Staining after wood fence repair.",
          "Staining as part of wood fence restoration.",
          "Residential and commercial wood fence staining."
        ]
      }
    ],
    related: [
      ["/wood-fence-staining/", "Wood fence staining"],
      ["/wood-fence-restoration/", "Wood fence restoration"],
      ["/when-to-stain-a-new-fence/", "When to stain a new fence"],
      ["/wood-fence/", "Wood fence services"]
    ]
  });
}

function addFenceTypeAndBuyerPages() {
  addPage({
    slug: "fence-types",
    title: "Fence Types for DFW Homes and Businesses | Strong Perimeter",
    description: "Compare wrought iron, wood, chain link, pipe, and vinyl fence options for residential and commercial properties across Dallas-Fort Worth.",
    eyebrow: "Fence types",
    h1: "Choose the fence type that fits the property, the use, and the maintenance reality",
    lead: "The best fence is not always the most expensive one. It is the material that matches the property, the exposure, the security need, the privacy goal, and the owner preference.",
    image: images.wood,
    imageAlt: "Wood privacy fence with stone columns",
    highlights: [
      serviceCard("Wood", "Best for privacy, backyard comfort, and a warm residential look.", "/wood-fence/"),
      serviceCard("Wrought iron", "Best for visibility, curb appeal, pools, entries, and ornamental security.", "/wrought-iron-fence/"),
      serviceCard("Chain link", "Best for practical boundaries, pets, utility areas, and commercial perimeter control.", "/chain-link-fence/")
    ],
    sections: [
      {
        eyebrow: "Materials",
        title: "Every material has a different job.",
        body: "Strong Perimeter focuses on the fence types we actually service: wrought iron, wood, chain link, pipe, and vinyl.",
        items: [
          "Wrought iron: restoration, repair, painting, installation, and replacement.",
          "Wood: restoration, repair, staining, installation, and replacement.",
          "Chain link: repair, installation, and replacement.",
          "Pipe: restoration, repair, and painting.",
          "Vinyl: repair, installation, and replacement."
        ]
      }
    ],
    related: materialLinks
  });

  addPage({
    slug: "residential-fencing",
    title: "Residential Fence Services in DFW | Strong Perimeter",
    description: "Residential fence restoration, repair, staining, painting, installation, and replacement for homeowners across Dallas-Fort Worth.",
    eyebrow: "Residential fencing",
    h1: "Residential fencing for privacy, pets, pools, repairs, and curb appeal",
    lead: "Homeowners usually need a fence to solve more than one thing: privacy, safety, appearance, pets, neighbors, alleys, HOA expectations, and long-term maintenance.",
    highlights: [
      serviceCard("Privacy and backyard comfort", "Wood and vinyl are common choices when privacy is the priority.", "/privacy-fence-installation/"),
      serviceCard("Repair before replacement", "A damaged fence does not always need a full rebuild.", "/fence-repair/"),
      serviceCard("A better finished look", "Staining, painting, and restoration can make an older fence feel cared for again.", "/fence-restoration/")
    ],
    sections: [
      {
        eyebrow: "Homeowner needs",
        title: "We match the scope to the property instead of forcing a one-size quote.",
        body: "Residential projects can be small repair visits, full backyard replacements, iron restoration, wood staining, or vinyl replacement.",
        items: [
          "Wrought iron, wood, chain link, pipe, and vinyl services.",
          "Privacy, pets, pools, alleys, gates, and curb appeal considerations.",
          "Clear quote communication before work starts."
        ]
      }
    ],
    related: [...coreServiceLinks, ...materialLinks]
  });

  addPage({
    slug: "commercial-fencing",
    title: "Commercial Fence Services in DFW | Strong Perimeter",
    description: "Commercial fence repair, restoration, painting, installation, and replacement for properties across Dallas-Fort Worth.",
    eyebrow: "Commercial fencing",
    h1: "Commercial fencing for properties that need clear scope, access, and durable perimeter work",
    lead: "Commercial sites need dependable communication, practical materials, and clean execution. Strong Perimeter services wrought iron, wood, chain link, pipe, and vinyl fences for commercial properties.",
    highlights: [
      serviceCard("Practical boundaries", "Chain link and pipe fencing often work well for utility, lots, yards, and property separation.", "/chain-link-fence/"),
      serviceCard("Frontage and appearance", "Wrought iron restoration, painting, and replacement can improve the public-facing edge of a property.", "/wrought-iron-fence/"),
      serviceCard("Managed property repairs", "Repair scopes can be planned around access, safety, timing, and tenant or customer impact.", "/fence-repair/")
    ],
    sections: [
      {
        eyebrow: "Commercial scope",
        title: "The best commercial fence page is not flashy. It is clear.",
        body: "Commercial buyers usually need to understand what can be repaired, what should be replaced, how access will work, and how quickly they can get a quote.",
        items: [
          "Commercial fence repair and replacement.",
          "Wrought iron and pipe painting/restoration.",
          "Chain link installation and repair.",
          "Clear communication for owners, managers, and operators."
        ]
      }
    ],
    related: [
      ["/chain-link-fence/", "Chain link fence"],
      ["/pipe-fence/", "Pipe fence"],
      ["/wrought-iron-fence/", "Wrought iron fence"],
      ["/fence-repair/", "Fence repair"]
    ]
  });
}

function addMaterialPages() {
  const materials = [
    {
      slug: "wrought-iron-fence",
      name: "Wrought Iron Fence",
      image: images.iron,
      title: "Wrought Iron Fence Services in DFW | Strong Perimeter",
      description: "Wrought iron fence restoration, repair, painting, installation, and replacement for residential and commercial properties in Dallas-Fort Worth.",
      h1: "Wrought iron fence restoration, repair, painting, installation, and replacement",
      lead: "Wrought iron works best when the lines are clean, the sections are solid, and rust is handled before it takes over the finish.",
      items: [
        "Restoration for rusty, tired, or partially damaged iron fences.",
        "Repair for bent sections, broken pickets, loose panels, and gate issues.",
        "Painting for iron fencing that needs a fresh, consistent finish.",
        "Installation and replacement for residential and commercial properties."
      ],
      related: [
        ["/wrought-iron-fence-restoration/", "Wrought iron restoration"],
        ["/wrought-iron-fence-repair/", "Wrought iron repair"],
        ["/wrought-iron-fence-painting/", "Wrought iron painting"],
        ["/wrought-iron-fence-installation-replacement/", "Wrought iron installation/replacement"]
      ]
    },
    {
      slug: "wood-fence",
      name: "Wood Fence",
      image: images.wood,
      title: "Wood Fence Services in DFW | Strong Perimeter",
      description: "Wood fence restoration, repair, staining, installation, and replacement for homes and commercial properties across Dallas-Fort Worth.",
      h1: "Wood fence restoration, repair, staining, installation, and replacement",
      lead: "Wood fencing is the workhorse for DFW privacy and backyard comfort, but sun, storms, age, and soil movement can change the scope quickly.",
      items: [
        "Restoration with repair and staining when the fence can be saved.",
        "Repair for pickets, rails, posts, leaning sections, and storm damage.",
        "Staining for new, repaired, and restored wood fences.",
        "Installation and replacement for privacy and property-line fencing."
      ],
      related: [
        ["/wood-fence-restoration/", "Wood restoration"],
        ["/wood-fence-repair/", "Wood repair"],
        ["/wood-fence-staining/", "Wood staining"],
        ["/wood-fence-installation-replacement/", "Wood installation/replacement"]
      ]
    },
    {
      slug: "chain-link-fence",
      name: "Chain Link Fence",
      image: images.chain,
      title: "Chain Link Fence Services in DFW | Strong Perimeter",
      description: "Chain link fence repair, installation, and replacement for residential and commercial properties in Dallas-Fort Worth.",
      h1: "Chain link fence repair, installation, and replacement",
      lead: "Chain link is practical, durable, and useful for homes, yards, commercial spaces, pet containment, and perimeter control.",
      items: [
        "Repair for loose fabric, damaged posts, bent rails, and tension issues.",
        "Installation for residential and commercial boundary needs.",
        "Replacement when existing chain link is too damaged to repair cleanly.",
        "Gate and access considerations during scope."
      ],
      related: [
        ["/chain-link-fence-repair/", "Chain link repair"],
        ["/chain-link-fence-installation-replacement/", "Chain link installation/replacement"],
        ["/commercial-fencing/", "Commercial fencing"],
        ["/residential-fencing/", "Residential fencing"]
      ]
    },
    {
      slug: "pipe-fence",
      name: "Pipe Fence",
      image: images.brandMark,
      title: "Pipe Fence Services in DFW | Strong Perimeter",
      description: "Pipe fence restoration, repair, and painting for residential and commercial properties across Dallas-Fort Worth.",
      h1: "Pipe fence restoration, repair, and painting",
      lead: "Pipe fencing needs a practical eye: structural issues first, rust and prep next, then a finish that makes the line look intentional again.",
      items: [
        "Restoration with repair and painting.",
        "Repair for bent rails, loose posts, broken sections, and rust damage.",
        "Painting for pipe fences that need a cleaner, consistent finish.",
        "Residential, commercial, and perimeter applications."
      ],
      related: [
        ["/pipe-fence-restoration/", "Pipe restoration"],
        ["/pipe-fence-repair/", "Pipe repair"],
        ["/pipe-fence-painting/", "Pipe painting"],
        ["/commercial-fencing/", "Commercial fencing"]
      ]
    },
    {
      slug: "vinyl-fence",
      name: "Vinyl Fence",
      image: images.brandGreen,
      title: "Vinyl Fence Services in DFW | Strong Perimeter",
      description: "Vinyl fence repair, installation, and replacement for residential and commercial properties across Dallas-Fort Worth.",
      h1: "Vinyl fence repair, installation, and replacement",
      lead: "Vinyl fencing is a low-maintenance option when it is installed well and repaired with the right parts and alignment.",
      items: [
        "Repair for cracked panels, damaged posts, alignment issues, and storm damage.",
        "Installation for privacy and low-maintenance fence goals.",
        "Replacement when panels or posts are too damaged to repair cleanly.",
        "Residential and commercial vinyl fence service."
      ],
      related: [
        ["/vinyl-fence-repair/", "Vinyl repair"],
        ["/vinyl-fence-installation-replacement/", "Vinyl installation/replacement"],
        ["/wood-vs-vinyl-fence/", "Wood vs vinyl guide"],
        ["/residential-fencing/", "Residential fencing"]
      ]
    }
  ];

  materials.forEach((material) => {
    addPage({
      slug: material.slug,
      title: material.title,
      description: material.description,
      eyebrow: "Fence type",
      h1: material.h1,
      lead: material.lead,
      image: material.image,
      imageAlt: `${material.name} service page`,
      highlights: material.related.slice(0, 3).map(([href, label]) => serviceCard(label, `Learn more about ${label.toLowerCase()} with Strong Perimeter.`, href)),
      sections: [
        {
          eyebrow: material.name,
          title: "What Strong Perimeter does for this fence type",
          body: "Start here when you know the fence material and need to choose the right next action: restoration, repair, painting, staining, installation, or replacement.",
          items: material.items
        }
      ],
      faqs: [
        [`Do you service ${material.name.toLowerCase()} for homes and businesses?`, "Yes. Strong Perimeter works with both residential and commercial customers."],
        ["Can you help decide between repair and replacement?", "Yes. The quote conversation makes the smartest scope clear before work starts."],
        ["Do you serve all of DFW?", "Strong Perimeter serves Dallas-Fort Worth and nearby communities."]
      ],
      related: material.related
    });
  });
}

function addSpecificServicePages() {
  const specific = [
    ["wrought-iron-fence-restoration", "Wrought Iron Fence Restoration", "Restoration includes repairs and painting for wrought iron fences that still have structure worth saving.", images.iron, ["Rust assessment", "Broken or loose section repair", "Surface prep before paint", "Fresh paint finish", "Residential and commercial iron restoration"]],
    ["wrought-iron-fence-repair", "Wrought Iron Fence Repair", "Repair for bent, rusted, broken, or loose wrought iron fence sections across DFW.", images.iron, ["Bent pickets and panels", "Loose sections", "Rust-damaged areas", "Gate and alignment issues", "Repair vs restoration guidance"]],
    ["wrought-iron-fence-painting", "Wrought Iron Fence Painting", "Painting for wrought iron fences that need rust-conscious prep and a cleaner finish.", images.iron, ["Surface prep", "Rust attention", "Primer and paint expectations", "Finish consistency", "Residential and commercial painting"]],
    ["wrought-iron-fence-installation-replacement", "Wrought Iron Fence Installation and Replacement", "Installation and replacement for wrought iron fences on homes, pools, entries, and commercial frontage.", images.iron, ["New iron fence installation", "Full replacement", "Front yard and pool applications", "Commercial frontage", "Style and access planning"]],
    ["wood-fence-restoration", "Wood Fence Restoration", "Restoration includes repairs and staining for wood fences that can be saved.", images.wood, ["Picket, rail, and post repair", "Leaning section correction", "Prep for stain", "Stain finish", "Restore or replace guidance"]],
    ["wood-fence-repair", "Wood Fence Repair", "Repair for wood fences with broken boards, leaning posts, storm damage, rot, or sagging sections.", images.wood, ["Broken boards", "Leaning posts", "Rotten rails", "Storm damage", "Gate and alignment issues"]],
    ["wood-fence-staining", "Wood Fence Staining", "Staining for new, repaired, and restored wood fences across Dallas-Fort Worth.", images.wood, ["New fence stain timing", "Color guidance", "Prep expectations", "Restoration staining", "Maintenance planning"]],
    ["wood-fence-installation-replacement", "Wood Fence Installation and Replacement", "Wood fence installation and replacement for privacy, backyard comfort, and property-line fencing.", images.wood, ["Privacy fence layout", "Replacement planning", "Post and material choices", "Staining add-on", "Residential and commercial wood fencing"]],
    ["chain-link-fence-repair", "Chain Link Fence Repair", "Repair for chain link fences with loose fabric, damaged posts, bent rails, and access issues.", images.chain, ["Loose fabric", "Bent rails", "Damaged posts", "Tension issues", "Residential and commercial chain link repair"]],
    ["chain-link-fence-installation-replacement", "Chain Link Fence Installation and Replacement", "Chain link fence installation and replacement for homes, commercial sites, pet areas, and practical boundaries.", images.chain, ["New chain link installation", "Full replacement", "Commercial perimeter needs", "Pet and utility areas", "Access and gate planning"]],
    ["pipe-fence-restoration", "Pipe Fence Restoration", "Restoration includes repairs and painting for pipe fences that need structural and finish work.", images.brandMark, ["Rust assessment", "Bent or broken section repair", "Post and rail attention", "Paint prep", "Final paint finish"]],
    ["pipe-fence-repair", "Pipe Fence Repair", "Repair for pipe fencing with rust, bent rails, broken sections, loose posts, or gate issues.", images.brandMark, ["Bent rails", "Loose posts", "Rust damage", "Broken sections", "Repair before painting"]],
    ["pipe-fence-painting", "Pipe Fence Painting", "Painting for pipe fences that need a cleaner, more consistent finish.", images.brandMark, ["Surface prep", "Rust attention", "Paint coverage", "Commercial and residential pipe fences", "Maintenance expectations"]],
    ["vinyl-fence-repair", "Vinyl Fence Repair", "Repair for vinyl fences with cracked panels, damaged posts, gate alignment issues, or storm damage.", images.brandGreen, ["Cracked panels", "Damaged posts", "Loose sections", "Gate alignment", "Repair or replace guidance"]],
    ["vinyl-fence-installation-replacement", "Vinyl Fence Installation and Replacement", "Vinyl fence installation and replacement for low-maintenance privacy and property-line needs.", images.brandGreen, ["New vinyl installation", "Full replacement", "Privacy applications", "Color and style planning", "Residential and commercial vinyl fencing"]]
  ];

  specific.forEach(([slug, name, lead, image, items]) => {
    const material = name.split(" Fence")[0].toLowerCase();
    const baseSlug = slug
      .replace("-restoration", "")
      .replace("-repair", "")
      .replace("-painting", "")
      .replace("-staining", "")
      .replace("-installation-replacement", "");

    addPage({
      slug,
      title: `${name} in Dallas-Fort Worth | Strong Perimeter`,
      description: `${name} for residential and commercial properties across Dallas-Fort Worth. Request a clear fence quote from Strong Perimeter.`,
      eyebrow: "Fence service",
      h1: `${name} in Dallas-Fort Worth`,
      lead,
      image,
      imageAlt: `${name} by Strong Perimeter`,
      highlights: [
        serviceCard("Residential", "Clear guidance for homes, backyards, alleys, privacy needs, and curb appeal.", "/residential-fencing/"),
        serviceCard("Commercial", "Practical scope, access planning, and clean communication for commercial properties.", "/commercial-fencing/"),
        serviceCard("Project proof", "Photos, videos, and case studies help show what this service looks like in the field.", "/projects/")
      ],
      sections: [
        {
          eyebrow: "Scope",
          title: `What is included with ${name.toLowerCase()}`,
          body: "The quote makes the scope easy to understand: what needs attention, what can stay, what needs replacement, and what finish work is expected.",
          items
        },
        {
          eyebrow: "Field judgment",
          title: "The right answer depends on the condition of the whole fence line.",
          body: "A single bad section can be a simple repair, or it can be the first sign that the fence needs restoration or replacement. Strong Perimeter helps sort that out before work starts.",
          items: [
            "Condition of posts, rails, panels, fabric, or pickets.",
            "Exposure to sun, water, rust, soil movement, and wind.",
            "Residential or commercial use.",
            "Appearance expectations after the final walkthrough."
          ]
        }
      ],
      faqs: [
        [`Do you provide ${name.toLowerCase()} for commercial properties?`, "Yes. Strong Perimeter handles both residential and commercial work."],
        ["Can you quote repair and replacement options?", "Yes. When both options make sense, the quote conversation can compare the scopes."],
        ["How do I get started?", "Send the project address, fence type, photos if available, and what you want fixed or changed."]
      ],
      related: [
        [`/${baseSlug}/`, `${capitalizeWords(material)} fence services`],
        ["/fence-repair/", "Fence repair"],
        ["/fence-restoration/", "Fence restoration"],
        ["/fence-installation-replacement/", "Installation/replacement"]
      ]
    });
  });
}

function addSupportPages() {
  addPage({
    slug: "service-areas",
    title: "Dallas-Fort Worth Fence Service Areas | Strong Perimeter",
    description: "Strong Perimeter provides residential and commercial fence services across Dallas-Fort Worth and nearby communities.",
    eyebrow: "Service areas",
    h1: "Fence service across Dallas-Fort Worth",
    lead: "Strong Perimeter serves homes and commercial properties across DFW with restoration, repair, painting, staining, installation, and replacement services.",
    highlights: [
      serviceCard("Dallas", "Fence repair, restoration, staining, painting, installation, and replacement in and around Dallas.", "/contact/"),
      serviceCard("Fort Worth", "Residential and commercial fence services for properties across the Fort Worth side of the metroplex.", "/contact/"),
      serviceCard("DFW suburbs", "Service coverage extends across nearby communities based on project scope and scheduling.", "/contact/")
    ],
    sections: [
      {
        eyebrow: "Coverage",
        title: "Service-area pages get stronger with real project proof.",
        body: "The best local pages include real project photos, reviews, and local details. Strong Perimeter can expand city pages as each city gains proof from completed work.",
        items: [
          "Dallas, Fort Worth, Plano, Frisco, Arlington, McKinney, Allen, and Richardson are first candidates.",
          "Each city page needs photos, project notes, reviews, and service-specific internal links.",
          "This hub can rank now while the proof library grows."
        ]
      }
    ],
    related: [...coreServiceLinks, ...materialLinks]
  });

  addPage({
    slug: "projects",
    title: "Fence Projects and Gallery | Strong Perimeter",
    description: "View Strong Perimeter fence project categories for wood, wrought iron, chain link, pipe, vinyl, restorations, repairs, staining, and painting.",
    eyebrow: "Projects",
    h1: "Project proof for the fence work people want to inspect",
    lead: "Photos and videos matter in fencing. This gallery hub organizes projects by material and service so buyers can see the kind of work they are requesting.",
    highlights: [
      serviceCard("Wrought iron restorations", "Before and after proof is especially valuable for rust, repair, and paint work.", "/projects/wrought-iron-fences/"),
      serviceCard("Wood fences", "Wood project photos show privacy layout, finish, posts, and staining detail.", "/projects/wood-fences/"),
      serviceCard("Repair details", "Repair photos help buyers recognize similar problems on their own property.", "/projects/fence-repairs/")
    ],
    sections: [
      {
        eyebrow: "Gallery plan",
        title: "Every project can help future customers compare the work.",
        body: "The strongest gallery pages use real filenames, real captions, and plain descriptions of the material, city, problem, and result.",
        items: [
          "Capture before, during, and after photos.",
          "Label each project by material, service, city, and property type.",
          "Link every project back to the matching service and material page."
        ]
      }
    ],
    related: [
      ["/projects/wood-fences/", "Wood fence projects"],
      ["/projects/wrought-iron-fences/", "Wrought iron projects"],
      ["/projects/chain-link-fences/", "Chain link projects"],
      ["/projects/pipe-fences/", "Pipe fence projects"],
      ["/projects/vinyl-fences/", "Vinyl fence projects"]
    ]
  });

  [
    ["projects/wood-fences", "Wood Fence Projects", "Wood fence projects show privacy layout, repair details, staining quality, and final curb presence.", images.wood],
    ["projects/wrought-iron-fences", "Wrought Iron Fence Projects", "Wrought iron projects show rust, repair, painting, restoration, installation, and replacement examples.", images.iron],
    ["projects/chain-link-fences", "Chain Link Fence Projects", "Chain link projects show practical repair, installation, replacement, access, and commercial perimeter work.", images.chain],
    ["projects/pipe-fences", "Pipe Fence Projects", "Pipe fence projects show restoration, repair, painting, rust prep, and finished perimeter lines.", images.brandMark],
    ["projects/vinyl-fences", "Vinyl Fence Projects", "Vinyl projects show repair, replacement, panel alignment, privacy layouts, and clean installs.", images.brandGreen],
    ["projects/fence-restorations", "Fence Restoration Projects", "Restoration projects document the before condition, repair scope, finish work, and final result.", images.wood],
    ["projects/fence-repairs", "Fence Repair Projects", "Repair projects show the damaged area, the fix, and the fence line after the work is complete.", images.wood],
    ["projects/fence-staining-painting", "Fence Staining and Painting Projects", "Finish projects show wood staining, iron painting, pipe painting, prep, color, and final detail.", images.iron]
  ].forEach(([slug, name, lead, image]) => {
    addPage({
      slug,
      title: `${name} | Strong Perimeter`,
      description: `${name} by Strong Perimeter in Dallas-Fort Worth. Browse project categories and request a fence quote.`,
      eyebrow: "Project category",
      h1: name,
      lead,
      image,
      imageAlt: name,
      highlights: [
        serviceCard("Before photos", "Capture the real condition before work starts.", "/projects/"),
        serviceCard("Scope notes", "Explain what was repaired, restored, painted, stained, installed, or replaced.", "/services/"),
        serviceCard("After photos", "Show the finished line from multiple angles.", "/contact/")
      ],
      sections: [
        {
          eyebrow: "Project library",
          title: "This category gets stronger as real field photos are added.",
          body: "Individual case studies make each category more useful for buyers comparing similar work.",
          items: [
            "Use descriptive filenames.",
            "Add city, material, and service in captions.",
            "Link each case study to the related service page."
          ]
        }
      ],
      related: [...coreServiceLinks, ...materialLinks]
    });
  });

  addPage({
    slug: "reviews",
    title: "Strong Perimeter Reviews | DFW Fence Company",
    description: "Read what Strong Perimeter customers notice about communication, professionalism, repairs, restoration, installation, painting, and staining.",
    eyebrow: "Reviews",
    h1: "Customers remember the communication as much as the finished fence",
    lead: "Reviews help future customers connect real customer language to the work performed: repair, restoration, staining, painting, installation, and replacement.",
    image: images.brandGreen,
    imageAlt: "Strong Perimeter logo",
    highlights: [
      serviceCard("Communication", "Clear estimates, schedule expectations, and straightforward next steps.", "/contact/"),
      serviceCard("Finish quality", "Repairs, restoration, painting, and staining need to look intentional when the crew leaves.", "/projects/"),
      serviceCard("Professional crews", "A better jobsite experience is part of the product.", "/about/")
    ],
    sections: [
      {
        eyebrow: "Review details",
        title: "Ask for reviews that mention the service and city naturally.",
        body: "The best reviews help future customers and search engines understand what happened without sounding scripted.",
        items: [
          "Ask happy customers to mention the fence type if it feels natural.",
          "Ask them to mention the service: repair, restoration, staining, painting, installation, or replacement.",
          "Ask them to mention the city or neighborhood only when they are comfortable doing so."
        ]
      }
    ],
    related: [...coreServiceLinks, ...materialLinks]
  });

  addPage({
    slug: "about",
    title: "About Strong Perimeter | DFW Fence Company",
    description: "Learn about Strong Perimeter, a Dallas-Fort Worth fence company focused on clear communication, quality work, and practical fence guidance.",
    eyebrow: "About",
    h1: "A fence company built around quality, communication, and field judgment",
    lead: "Strong Perimeter helps homeowners and commercial property owners understand the right scope before work starts, then follows through with clean restoration, repair, finish, installation, and replacement work.",
    image: images.brandGreen,
    imageAlt: "Strong Perimeter logo",
    highlights: [
      serviceCard("Field-aware guidance", "The right scope depends on the actual condition of the fence line.", "/services/"),
      serviceCard("Real people", "Customers can see who they are working with before the crew arrives.", "/team/"),
      serviceCard("Visible proof", "Project photos, reviews, and service pages show the work clearly.", "/projects/")
    ],
    sections: [
      {
        eyebrow: "What matters",
        title: "The finished fence and the process both count.",
        body: "Fence buyers want a result that looks right, but they also want the estimate, schedule, crew, and final walkthrough to feel steady.",
        items: [
          "Clear service recommendations.",
          "Residential and commercial fence work.",
          "Wrought iron, wood, chain link, pipe, and vinyl services.",
          "A practical repair, restore, or replace conversation."
        ]
      }
    ],
    related: [
      ["/team/", "Team"],
      ["/reviews/", "Reviews"],
      ["/projects/", "Projects"],
      ["/contact/", "Contact"]
    ]
  });

  addPage({
    slug: "team",
    title: "Strong Perimeter Team | DFW Fence Company",
    description: "Meet the Strong Perimeter team behind residential and commercial fence restoration, repair, painting, staining, installation, and replacement in DFW.",
    eyebrow: "Team",
    h1: "The people behind the fence work",
    lead: "Strong Perimeter is led by a team focused on clear estimates, clean execution, and a better experience from first call to final walkthrough.",
    image: "/images/daniel-wade-1200-min.jpg",
    imageAlt: "Daniel Wade of Strong Perimeter",
    highlights: [
      serviceCard("Daniel Wade", "Founder and CEO focused on quality, communication, and finish standards.", "/contact/"),
      serviceCard("Robert Hill", "Sales Manager helping customers sort through scope, material, and scheduling.", "/contact/"),
      serviceCard("Crew leadership", "Field execution focused on straight lines, clean details, and dependable work.", "/projects/")
    ],
    sections: [
      {
        eyebrow: "How the team helps",
        title: "Good fence work gets easier when the communication is clear.",
        body: "The team supports trust, especially for higher-value restoration, replacement, and commercial projects.",
        items: [
          "Clear estimate conversations.",
          "Material and finish recommendations.",
          "Respectful crews and site awareness.",
          "Final walkthrough expectations."
        ]
      }
    ],
    related: [
      ["/about/", "About Strong Perimeter"],
      ["/reviews/", "Reviews"],
      ["/projects/", "Projects"],
      ["/services/", "Services"]
    ]
  });

  addPage({
    slug: "contact",
    title: "Request a Fence Quote | Strong Perimeter",
    description: "Request a free quote for fence restoration, repair, painting, staining, installation, or replacement in Dallas-Fort Worth.",
    eyebrow: "Request a quote",
    h1: "Tell us what the fence needs and we will help map the next step",
    lead: "Send the address, fence type, photos if you have them, and whether you need restoration, repair, painting, staining, installation, or replacement.",
    image: images.brandGreen,
    imageAlt: "Strong Perimeter logo",
    highlights: [
      serviceCard("Call", "Speak with Strong Perimeter at (214) 247-6369.", "tel:+12142476369"),
      serviceCard("Email", "Send project details to sales@strongperimeter.com.", "mailto:sales@strongperimeter.com"),
      serviceCard("Quote form", "Use the form below to open a prefilled quote email.", "#quote")
    ],
    sections: [
      {
        eyebrow: "What helps",
        title: "The best first message includes the basics.",
        body: "A few clear details help us respond faster and avoid vague back-and-forth.",
        items: [
          "Project address or city.",
          "Fence type if you know it.",
          "Whether you need restoration, repair, painting, staining, installation, or replacement.",
          "Photos of the fence line or damaged sections when available.",
          "Residential or commercial property."
        ]
      }
    ],
    related: [...coreServiceLinks, ...materialLinks]
  });
}

function addCostAndGuidePages() {
  const guides = [
    ["fence-cost-dfw", "Fence Cost in Dallas-Fort Worth", "Fence cost depends on material, length, height, removal, access, repair scope, finish work, and whether the project is residential or commercial.", ["Linear footage and height", "Material choice", "Removal or replacement needs", "Repair or restoration scope", "Painting or staining", "Access and scheduling"]],
    ["fence-cost-calculator", "Fence Cost Calculator", "Use a planning calculator page to help buyers understand the inputs that change a fence quote before they request an estimate.", ["Fence length", "Fence height", "Material", "Repair, restoration, installation, or replacement", "Finish work", "Residential or commercial use"]],
    ["fence-restoration-cost-dfw", "Fence Restoration Cost in DFW", "Restoration cost changes with repair scope, prep requirements, finish work, and how much of the fence line can be saved.", ["Condition of existing posts and sections", "Rust, rot, or storm damage", "Painting or staining prep", "Material type", "Access and property type"]],
    ["restore-or-replace-fence", "Restore or Replace a Fence", "The right call depends on structure, appearance goals, repair cost, finish needs, and how long the owner wants the fence to last.", ["Posts and structural stability", "Number of failed sections", "Rust or rot depth", "Finish expectations", "Budget and timeline"]],
    ["repair-or-replace-fence", "Repair or Replace a Fence", "Repair is smart when the damage is isolated. Replacement is usually smarter when the structure has failed across the line.", ["Isolated damage", "Repeated failures", "Post movement", "Material age", "Safety and security needs"]],
    ["best-fence-for-privacy", "Best Fence for Privacy", "Privacy fence decisions usually come down to material, height, layout, visibility, maintenance, and HOA expectations.", ["Wood privacy fencing", "Vinyl privacy fencing", "Height and layout", "Stain or finish", "Neighbor and alley views"]],
    ["best-fence-for-dogs", "Best Fence for Dogs", "Dog fence decisions depend on size, digging, jumping, visibility, gate security, and whether privacy matters.", ["Fence height", "Bottom gaps", "Gate latches", "Visibility", "Wood, vinyl, or chain link fit"]],
    ["when-to-stain-a-new-fence", "When to Stain a New Wood Fence", "New wood fence staining depends on moisture, weather, wood condition, and the finish goal.", ["Wood moisture", "Sun exposure", "Weather window", "Color selection", "Maintenance timeline"]],
    ["do-i-need-a-permit-for-a-fence-in-dfw", "Do I Need a Permit for a Fence in DFW?", "Fence rules can vary by city, HOA, height, location, pool use, and property type. Confirm requirements before building.", ["City requirements", "HOA approval", "Height and front-yard limits", "Pool fencing rules", "Commercial property requirements"]],
    ["wood-vs-vinyl-fence", "Wood vs Vinyl Fence", "Wood and vinyl both solve privacy needs, but they differ in look, maintenance, repair, replacement, and upfront planning.", ["Privacy", "Maintenance", "Repairability", "Style", "Cost factors"]],
    ["wood-vs-chain-link-fence", "Wood vs Chain Link Fence", "Wood usually wins on privacy. Chain link usually wins on practical boundaries, visibility, utility, and commercial use.", ["Privacy", "Pets", "Visibility", "Security", "Maintenance"]],
    ["wrought-iron-fence-restoration-vs-replacement", "Wrought Iron Fence Restoration vs Replacement", "Wrought iron restoration is best when the structure is sound. Replacement is better when rust and failure are widespread.", ["Rust depth", "Panel condition", "Paint failure", "Gate alignment", "Desired final look"]],
    ["wood-fence-restoration-vs-replacement", "Wood Fence Restoration vs Replacement", "Wood fence restoration makes sense when posts and enough boards can be saved. Replacement is better when the line is broadly failing.", ["Post condition", "Rot", "Leaning sections", "Stain outcome", "Privacy goals"]],
    ["pipe-fence-painting-vs-replacement", "Pipe Fence Painting vs Replacement", "Pipe fence painting helps when the structure is usable. Replacement is better when rails, posts, or welds are too compromised.", ["Rust", "Bent rails", "Loose posts", "Paint prep", "Commercial use"]],
    ["vinyl-fence-repair-or-replace", "Vinyl Fence Repair or Replace", "Vinyl fence repair works when the damage is isolated and parts can be matched. Replacement makes sense when panels and posts are widely damaged.", ["Panel damage", "Post condition", "Parts match", "Wind damage", "Privacy expectations"]],
    ["privacy-fence-installation", "Privacy Fence Installation", "Privacy fencing is usually about comfort, neighbors, pets, pools, alleys, and the look of the backyard.", ["Wood privacy fences", "Vinyl privacy fences", "Height and layout", "Stain and finish", "HOA expectations"]],
    ["pool-fence-installation", "Pool Fence Installation", "Pool fence planning should prioritize visibility, access, safety expectations, and local requirements.", ["Wrought iron visibility", "Gate and latch planning", "Height and spacing", "Local requirements", "Appearance around the pool"]],
    ["dog-fence-installation", "Dog Fence Installation", "Dog fence planning should match the dog, the yard, and the owner's privacy expectations.", ["Height", "Gaps", "Digging", "Visibility", "Gate security"]],
    ["security-fencing", "Security Fencing", "Security fencing should match the property type, visibility needs, access points, and maintenance expectations.", ["Chain link", "Wrought iron", "Pipe fence", "Commercial access", "Perimeter control"]],
    ["storm-damaged-fence-repair", "Storm Damaged Fence Repair", "Storm damage can show up as leaning posts, broken panels, loose fabric, bent sections, or damaged vinyl.", ["Wood storm repair", "Chain link damage", "Vinyl panels", "Post movement", "Repair vs replacement"]],
    ["hoa-fence-installation", "HOA Fence Installation", "HOA fence projects need clear material, height, color, and placement planning before work starts.", ["Material approval", "Height limits", "Color and style", "Neighbor-facing details", "Documentation"]]
  ];

  guides.forEach(([slug, name, lead, items]) => {
    addPage({
      slug,
      title: `${name} | Strong Perimeter`,
      description: `${lead} Strong Perimeter serves residential and commercial fence customers across Dallas-Fort Worth.`,
      eyebrow: "Fence guide",
      h1: name,
      lead,
      image: slug.includes("wood") || slug.includes("privacy") ? images.wood : slug.includes("chain") ? images.chain : slug.includes("iron") || slug.includes("pipe") ? images.iron : images.brandGreen,
      imageAlt: name,
      highlights: [
        serviceCard("Start with the goal", "Privacy, security, repair, restoration, finish, and replacement all point to different scopes.", "/services/"),
        serviceCard("Match the material", "Wrought iron, wood, chain link, pipe, and vinyl behave differently in the field.", "/fence-types/"),
        serviceCard("Quote the real property", "Photos and address details help turn planning guidance into an actual estimate.", "/contact/")
      ],
      sections: [
        {
          eyebrow: "Decision factors",
          title: "What changes the answer",
          body: "These factors help buyers understand the variables before they request a quote.",
          items
        },
        {
          eyebrow: "DFW note",
          title: "Local conditions matter.",
          body: "Heat, sun, storms, soil movement, property access, HOA expectations, and commercial security needs can all change the right fence scope.",
          items: [
            "Get photos of the full fence line, not only the worst spot.",
            "Decide whether appearance, privacy, security, budget, or speed matters most.",
            "Ask whether repair, restoration, or replacement will create the best long-term result."
          ]
        }
      ],
      faqs: [
        ["Can Strong Perimeter help me choose the right option?", "Yes. The quote process clarifies material, scope, finish, and timeline."],
        ["Do you work on residential and commercial fences?", "Yes. Strong Perimeter handles both property types."],
        ["Should I send photos before requesting a quote?", "Photos are helpful, especially for repair, restoration, painting, and staining projects."]
      ],
      related: [...coreServiceLinks, ...materialLinks]
    });
  });
}

addActionHubPages();
addFenceTypeAndBuyerPages();
addMaterialPages();
addSpecificServicePages();
addSupportPages();
addCostAndGuidePages();

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function capitalizeWords(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function withBase(href) {
  if (
    !href ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  if (href === "/") {
    return `${BASE_PATH}/`;
  }

  if (href.startsWith("/")) {
    return `${BASE_PATH}${href}`;
  }

  return href;
}

function absoluteUrl(href) {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return href;
  }

  return `${SITE_ORIGIN}${withBase(href)}`;
}

function pageUrl(slug) {
  return `${SITE_URL}/${slug.replace(/^\/|\/$/g, "")}/`;
}

function renderLinks(links, className = "link-grid") {
  return `<div class="${className}">${links.map(([href, label]) => `<a href="${withBase(href)}">${escapeHtml(label)}</a>`).join("")}</div>`;
}

function renderHeader() {
  return `
  <header class="site-header" id="top">
    <div class="site-header__inner">
      <a class="brand" href="${withBase("/")}" aria-label="Strong Perimeter home">
        <span class="brand-mark brand-mark--full">
          <img src="${withBase(images.brandGreen)}" alt="Strong Perimeter">
        </span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav class="site-nav" id="site-nav" aria-label="Primary">
        ${navLinks.map(([label, href]) => `<a href="${withBase(href)}">${label}</a>`).join("")}
        <a class="nav-cta" href="${withBase("/contact/")}">Get a free quote</a>
      </nav>
    </div>
  </header>`;
}

function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="site-footer__top">
      <a class="brand brand--footer" href="${withBase("/")}" aria-label="Strong Perimeter home">
        <span class="brand-mark brand-mark--full">
          <img src="${withBase(images.brandGreen)}" alt="Strong Perimeter">
        </span>
      </a>
      <div class="footer-callout">
        <a href="tel:+12142476369">(214) 247-6369</a>
        <p>Dallas-Fort Worth fence restoration, repair, painting, staining, installation, and replacement.</p>
      </div>
    </div>
    <div class="footer-links">
      <a href="${withBase("/services/")}">Services</a>
      <a href="${withBase("/fence-restoration/")}">Restoration</a>
      <a href="${withBase("/fence-repair/")}">Repair</a>
      <a href="${withBase("/fence-types/")}">Fence types</a>
      <a href="${withBase("/residential-fencing/")}">Residential</a>
      <a href="${withBase("/commercial-fencing/")}">Commercial</a>
      <a href="${withBase("/service-areas/")}">Service areas</a>
      <a href="${withBase("/projects/")}">Projects</a>
      <a href="${withBase("/reviews/")}">Reviews</a>
      <a href="${withBase("/privacy-policy.html")}">Privacy policy</a>
    </div>
    <div class="footer-meta">
      <p><a href="mailto:sales@strongperimeter.com">sales@strongperimeter.com</a></p>
      <p>Serving Dallas-Fort Worth</p>
      <p>&copy; <span id="year">2026</span> Strong Perimeter. All rights reserved.</p>
    </div>
  </footer>`;
}

function renderQuoteForm() {
  return `
  <section class="section section--contact" id="quote">
    <div class="section-shell">
      <div class="contact-shell">
        <div class="contact-copy">
          <p class="eyebrow eyebrow--green">Request a quote</p>
          <h2>Send the project details and we will help map the cleanest next step.</h2>
          <p>Tell us the fence type, address, whether it is residential or commercial, and what you want restored, repaired, painted, stained, installed, or replaced.</p>
          <ul class="contact-list">
            <li>Call <a href="tel:+12142476369">(214) 247-6369</a></li>
            <li>Email <a href="mailto:sales@strongperimeter.com">sales@strongperimeter.com</a></li>
            <li>Serving Dallas-Fort Worth</li>
          </ul>
        </div>
        <form class="quote-form" id="quote-form" data-to="sales@strongperimeter.com">
          <label>
            <span>Name</span>
            <input type="text" id="quote-name" name="name" placeholder="Your name" required>
          </label>
          <label>
            <span>Email</span>
            <input type="email" id="quote-email" name="email" placeholder="you@example.com" required>
          </label>
          <label>
            <span>Phone</span>
            <input type="tel" id="quote-phone" name="phone" placeholder="(214) 555-0123" required>
          </label>
          <label>
            <span>Project address</span>
            <input type="text" id="quote-address" name="address" placeholder="Street, city, or neighborhood">
          </label>
          <label>
            <span>Fence service</span>
            <select id="quote-service" name="service">
              ${quoteServices.map((service) => `<option value="${escapeHtml(service)}">${escapeHtml(service)}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>Timing</span>
            <select id="quote-timeline" name="timeline">
              <option value="As soon as possible">As soon as possible</option>
              <option value="Within the next month">Within the next month</option>
              <option value="Just gathering quotes">Just gathering quotes</option>
            </select>
          </label>
          <label class="full-width">
            <span>Project details</span>
            <textarea id="quote-details" name="details" rows="6" placeholder="Tell us what is going on with the fence. Photos are helpful if you email them too."></textarea>
          </label>
          <button class="button button--solid full-width" type="submit">Open quote email</button>
          <p class="form-note">Submitting opens a prefilled email draft to sales@strongperimeter.com in your default mail app.</p>
        </form>
      </div>
    </div>
  </section>`;
}

function renderSchema(page) {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Strong Perimeter",
      url: SITE_URL,
      telephone: "+1-214-247-6369",
      image: absoluteUrl(images.wood),
      areaServed: "Dallas-Fort Worth",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dallas",
        addressRegion: "TX",
        addressCountry: "US"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.h1,
      serviceType: page.eyebrow || "Fence service",
      provider: {
        "@type": "LocalBusiness",
        name: "Strong Perimeter"
      },
      areaServed: "Dallas-Fort Worth",
      url: pageUrl(page.slug)
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL
        },
        {
          "@type": "ListItem",
          position: 2,
          name: page.h1,
          item: pageUrl(page.slug)
        }
      ]
    }
  ];

  if (page.faqs.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer
        }
      }))
    });
  }

  return JSON.stringify(schemas).replaceAll("<", "\\u003c");
}

function renderPage(page) {
  const canonical = pageUrl(page.slug);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex, nofollow">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${escapeHtml(page.title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${absoluteUrl(page.image)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(page.title)}">
  <meta name="twitter:description" content="${escapeHtml(page.description)}">
  <meta name="twitter:image" content="${absoluteUrl(page.image)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Onest:wght@500;700&amp;family=Red+Hat+Display:wght@400;500;600;700&amp;family=Red+Hat+Text:wght@400;500;700&amp;display=swap" rel="stylesheet">
  <link rel="icon" href="${withBase("/images/favicon.jpg")}" type="image/jpeg">
  <link rel="apple-touch-icon" href="${withBase("/images/webclip.jpg")}">
  <link rel="stylesheet" href="${withBase("/styles.css")}">
  <script type="application/ld+json">${renderSchema(page)}</script>
  <script defer src="${withBase("/script.js")}"></script>
</head>
<body>
${renderHeader()}
  <main>
    <section class="page-hero">
      <div class="section-shell page-hero__grid">
        <div class="page-hero__copy">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="${withBase("/")}">Home</a>
            <span>/</span>
            <span>${escapeHtml(page.h1)}</span>
          </nav>
          <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
          <h1>${escapeHtml(page.h1)}</h1>
          <p class="page-lead">${escapeHtml(page.lead)}</p>
          <div class="hero-actions">
            <a class="button button--solid" href="${withBase(page.ctaHref)}">${escapeHtml(page.ctaLabel)}</a>
            <a class="button button--ghost" href="${page.secondaryCtaHref}">${escapeHtml(page.secondaryCtaLabel)}</a>
          </div>
        </div>
        <aside class="page-hero-card" aria-label="Strong Perimeter service summary">
          <div class="page-hero-card__media">
            <img src="${withBase(page.image)}" alt="${escapeHtml(page.imageAlt)}">
          </div>
          <div class="page-hero-card__body">
            <p class="card-kicker">Strong Perimeter</p>
            <h2>Clear scope, cleaner finish, residential and commercial service.</h2>
            <ul class="service-list">
              <li>Dallas-Fort Worth service area</li>
              <li>Fence restoration, repair, painting, staining, installation, and replacement</li>
              <li>Fast quote support and practical material guidance</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>

    <section class="ticker" aria-label="Fence services">
      <div class="ticker-track">
        <span>Wrought iron restoration</span>
        <span>Wood fence staining</span>
        <span>Chain link repair</span>
        <span>Pipe fence painting</span>
        <span>Vinyl fence replacement</span>
        <span>Residential fencing</span>
        <span>Commercial fencing</span>
        <span>Dallas-Fort Worth</span>
        <span>Wrought iron restoration</span>
        <span>Wood fence staining</span>
        <span>Chain link repair</span>
        <span>Pipe fence painting</span>
        <span>Vinyl fence replacement</span>
        <span>Residential fencing</span>
        <span>Commercial fencing</span>
        <span>Dallas-Fort Worth</span>
      </div>
    </section>

    ${page.highlights.length ? `
    <section class="section page-section">
      <div class="section-shell">
        <div class="section-heading">
          <p class="eyebrow eyebrow--green">Where to start</p>
          <h2>Choose the page that matches what you need next.</h2>
        </div>
        <div class="feature-grid">
          ${page.highlights.map((card) => `
          <a class="feature-card" href="${withBase(card.href)}">
            <span class="panel-tag">Strong Perimeter</span>
            <h3>${escapeHtml(card.title)}</h3>
            <p>${escapeHtml(card.text)}</p>
          </a>`).join("")}
        </div>
      </div>
    </section>` : ""}

    ${page.sections.map((section) => `
    <section class="section page-section">
      <div class="section-shell split-block">
        <div class="section-heading">
          <p class="eyebrow eyebrow--green">${escapeHtml(section.eyebrow)}</p>
          <h2>${escapeHtml(section.title)}</h2>
          <p>${escapeHtml(section.body)}</p>
        </div>
        <div class="content-panel">
          <ul class="service-list">
            ${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </div>
      </div>
    </section>`).join("")}

    ${page.related.length ? `
    <section class="section page-section">
      <div class="section-shell">
        <div class="section-heading section-heading--center">
          <p class="eyebrow eyebrow--green">Related pages</p>
          <h2>Keep moving through the right fence path.</h2>
        </div>
        ${renderLinks(page.related)}
      </div>
    </section>` : ""}

    ${page.faqs.length ? `
    <section class="section page-section">
      <div class="section-shell split-block">
        <div class="section-heading">
          <p class="eyebrow eyebrow--green">Questions</p>
          <h2>Common questions before requesting a quote.</h2>
        </div>
        <div class="faq-list">
          ${page.faqs.map(([question, answer]) => `
          <details>
            <summary>${escapeHtml(question)}</summary>
            <p>${escapeHtml(answer)}</p>
          </details>`).join("")}
        </div>
      </div>
    </section>` : ""}

${renderQuoteForm()}
  </main>
${renderFooter()}
</body>
</html>`;
}

function writePage(page) {
  const dir = path.join(ROOT, page.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), renderPage(page));
}

function writeSitemap() {
  const urls = [
    { loc: `${SITE_URL}/`, priority: "1.0" },
    { loc: `${SITE_URL}/privacy-policy.html`, priority: "0.3" },
    ...pages.map((page) => ({ loc: pageUrl(page.slug), priority: page.slug.includes("/") ? "0.6" : "0.8" }))
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <priority>${url.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml);
}

function writeRobots() {
  const robots = `User-agent: *
Allow: /

# Build mode: pages use meta robots noindex, nofollow until launch.

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(ROOT, "robots.txt"), robots);
}

pages.forEach(writePage);
writeSitemap();
writeRobots();

console.log(`Generated ${pages.length} SEO pages, sitemap.xml, and robots.txt.`);
