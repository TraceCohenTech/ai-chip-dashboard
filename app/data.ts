// ─── Types ───────────────────────────────────────────────────────────────────

export type Segment =
  | "Datacenter"
  | "Photonics"
  | "Edge"
  | "Analog / In-Memory"
  | "Exotic / Neuromorphic"
  | "Interconnect / Networking"
  | "Infrastructure";

export type Status = "Private" | "Public" | "Acquired";

export interface Company {
  name: string;
  founded: number;
  hq: string;
  founders: string;
  segment: Segment;
  architecture: string;
  focus: string;
  fundingM: number;
  valuationM: number;
  investors: string;
  status: Status;
  whatTheyDo: string;
  edge: string;
}

export interface SegmentDatum {
  segment: Segment;
  count: number;
  totalFundingM: number;
}

export interface FundingTimelineDatum {
  year: number;
  count: number;
  totalFundingM: number;
}

export interface InvestorDatum {
  name: string;
  count: number;
}

export interface FocusDatum {
  focus: string;
  count: number;
}

export interface AggregateStats {
  totalCompanies: number;
  totalFundingB: number;
  medianFundingM: number;
  avgFoundedYear: number;
  publicCount: number;
  acquiredCount: number;
  privateCount: number;
}

// ─── Segment colors ─────────────────────────────────────────────────────────

export const segmentColors: Record<string, string> = {
  Datacenter: "#00D4FF",
  Photonics: "#FFB800",
  Edge: "#00FF88",
  "Analog / In-Memory": "#FF6B35",
  "Exotic / Neuromorphic": "#FF3366",
  "Interconnect / Networking": "#4488FF",
  Infrastructure: "#22DD66",
};

// ─── Companies ───────────────────────────────────────────────────────────────

export const companies: Company[] = [
  {
    name: "Etched",
    founded: 2022,
    hq: "San Jose, CA",
    founders: "Gavin Uberti, Chris Zhu, Robert Wachen",
    segment: "Datacenter",
    architecture: "Transformer-only ASIC (Sohu)",
    focus: "Inference",
    fundingM: 800,
    valuationM: 5000,
    investors: "Stripes, Jane Street, Hudson River Trading, Jump Trading, Two Sigma, Peter Thiel, Ribbit, Primary VC, Radical Ventures, Positive Sum",
    status: "Private",
    whatTheyDo: "Hard-wires the transformer architecture directly into 4nm silicon (Sohu) via deep TSMC partnership; designed entire server rack in-house. One 8-chip server claims to replace ~160 H100s.",
    edge: "Extreme specialization + low-voltage inference; ~90% FLOPS utilization vs ~30% on GPUs. Risk: useless if transformers are replaced.",
  },
  {
    name: "Groq",
    founded: 2016,
    hq: "Mountain View, CA",
    founders: "Jonathan Ross, Douglas Wightman",
    segment: "Datacenter",
    architecture: "LPU / Tensor Streaming Processor (SRAM-based)",
    focus: "Inference",
    fundingM: 3000,
    valuationM: 6900,
    investors: "BlackRock, Samsung, Cisco, KDDI, Saudi PIF/Aramco, Social Capital, Tiger Global, D1, Disruptive, Altimeter",
    status: "Acquired",
    whatTheyDo: "Deterministic dataflow processor with on-chip SRAM at ~150 TB/s for ultra-low-latency token streaming; GroqCloud + GroqRack.",
    edge: "Speed/latency as the entire value prop; now effectively absorbed into Nvidia's roadmap as a chiplet.",
  },
  {
    name: "Cerebras Systems",
    founded: 2016,
    hq: "Sunnyvale, CA",
    founders: "Andrew Feldman, Gary Lauterbach, Jean-Philippe Fricker, Michael James, Sean Lie",
    segment: "Datacenter",
    architecture: "Wafer-Scale Engine (WSE-3)",
    focus: "Training + Inference",
    fundingM: 4000,
    valuationM: 66000,
    investors: "Benchmark, Foundation Capital, Tiger Global, Fidelity, AMD, Alpha Wave, G42, 1789 Capital, Valor",
    status: "Public",
    whatTheyDo: "Dinner-plate-sized single chip (WSE-3, TSMC 5nm) runs huge models on one piece of silicon. FY2025 revenue ~$510M (+76% YoY). $20B+ multi-year OpenAI compute deal.",
    edge: "Wafer-scale = no chip-to-chip bottleneck; fastest inference benchmarks. First AI-chip IPO of 2026.",
  },
  {
    name: "SambaNova Systems",
    founded: 2017,
    hq: "Palo Alto, CA",
    founders: "Rodrigo Liang, Kunle Olukotun, Christopher Re",
    segment: "Datacenter",
    architecture: "Reconfigurable Dataflow Unit (RDU, SN40L)",
    focus: "Training + Inference",
    fundingM: 1500,
    valuationM: 5000,
    investors: "SoftBank, BlackRock, Intel Capital, GV, Temasek",
    status: "Private",
    whatTheyDo: "3-tier memory RDU running enterprise gen-AI; one node supports up to 5T params; SambaNova Suite + Cloud.",
    edge: "GPU alternative for enterprise; Composition-of-Experts; very large memory per node.",
  },
  {
    name: "d-Matrix",
    founded: 2019,
    hq: "Santa Clara, CA",
    founders: "Sid Sheth, Sudeep Bhoja",
    segment: "Datacenter",
    architecture: "Digital in-memory compute (Corsair)",
    focus: "Inference",
    fundingM: 429,
    valuationM: 2000,
    investors: "BlackRock, Temasek, M12 (Microsoft), Nautilus, Industry Ventures",
    status: "Private",
    whatTheyDo: "Corsair inference platform entered full production June 2026; claims up to 10x faster inference and 5x better energy efficiency vs standalone Nvidia GPUs.",
    edge: "Digital in-memory compute kills the memory wall; production-stage, not just roadmap.",
  },
  {
    name: "Positron AI",
    founded: 2023,
    hq: "Reno, NV",
    founders: "Thomas Sohmers, Barrett Woodside, Edward Kmett",
    segment: "Datacenter",
    architecture: "Memory-centric inference ASIC (Atlas / Asimov)",
    focus: "Inference",
    fundingM: 307,
    valuationM: 1000,
    investors: "Arena, Jump Trading, Unless, QIA, Arm, Valor, Atreides, DFJ Growth",
    status: "Private",
    whatTheyDo: "Made-in-America inference silicon; gen-1 Atlas ~3x compute/W vs H100; gen-2 Asimov targets 2304GB RAM/device.",
    edge: "Memory capacity + tokens-per-watt; ingests model files without a new compiler.",
  },
  {
    name: "MatX",
    founded: 2024,
    hq: "Mountain View, CA",
    founders: "Reiner Pope, Mike Gunter",
    segment: "Datacenter",
    architecture: "LLM-optimized training/inference ASIC",
    focus: "Training + Inference",
    fundingM: 605,
    valuationM: 0,
    investors: "a16z, Spark, Homebrew",
    status: "Private",
    whatTheyDo: "Chips designed specifically around large language models, maximizing FLOPS for the biggest models rather than general workloads.",
    edge: "Ex-Google silicon talent; bet that the largest LLMs deserve dedicated training silicon.",
  },
  {
    name: "Esperanto Technologies",
    founded: 2014,
    hq: "Mountain View, CA",
    founders: "Dave Ditzel",
    segment: "Datacenter",
    architecture: "RISC-V many-core (ET-SoC-1)",
    focus: "Inference",
    fundingM: 160,
    valuationM: 0,
    investors: "Bosch, ARM, Western Digital, Cisco",
    status: "Private",
    whatTheyDo: "Thousand-core RISC-V inference SoCs aimed at energy-efficient recommendation/LLM inference.",
    edge: "Massive RISC-V core counts for power-efficient inference.",
  },
  {
    name: "Lemurian Labs",
    founded: 2018,
    hq: "Mountain View, CA",
    founders: "Jay Dawani, Vassil Dimitrov, Reiner Pope",
    segment: "Datacenter",
    architecture: "Novel number system + accelerator",
    focus: "Training + Inference",
    fundingM: 9,
    valuationM: 0,
    investors: "Oval Park, Good Growth",
    status: "Private",
    whatTheyDo: "Building a software stack and accelerator using a novel arithmetic (logarithmic-style) to cut energy/cost of AI compute.",
    edge: "Math-first approach to efficiency; software-led path to silicon.",
  },
  {
    name: "Rivos",
    founded: 2021,
    hq: "Santa Clara, CA",
    founders: "Puneet Kumar, Pradeep Kanapathipillai",
    segment: "Datacenter",
    architecture: "RISC-V CPU + GPU/AI accelerator",
    focus: "Training + Inference",
    fundingM: 250,
    valuationM: 0,
    investors: "Walden Catalyst, Intel Capital, MediaTek, Koch",
    status: "Acquired",
    whatTheyDo: "RISC-V data-center silicon combining CPU and AI/GPU acceleration.",
    edge: "Integrated RISC-V + accelerator; Meta bought it for in-house silicon.",
  },
  {
    name: "Cornami",
    founded: 2014,
    hq: "Campbell, CA",
    founders: "Paul Master, Wally Beddoe",
    segment: "Datacenter",
    architecture: "Reconfigurable streaming (FHE + AI)",
    focus: "FHE / Inference",
    fundingM: 90,
    valuationM: 0,
    investors: "SoftBank Vision-adjacent, Applied Ventures",
    status: "Private",
    whatTheyDo: "Reconfigurable compute fabric targeting fully homomorphic encryption and AI workloads.",
    edge: "Compute over encrypted data — privacy-preserving AI acceleration.",
  },
  {
    name: "Ventana Micro Systems",
    founded: 2018,
    hq: "Cupertino, CA",
    founders: "Balaji Baktha",
    segment: "Datacenter",
    architecture: "RISC-V data-center CPU + chiplets (Veyron)",
    focus: "AI host/CPU compute",
    fundingM: 60,
    valuationM: 0,
    investors: "Silver Lake-adjacent",
    status: "Private",
    whatTheyDo: "High-performance RISC-V server CPUs (Veyron) and chiplet platform to host AI accelerators.",
    edge: "RISC-V alternative to x86/ARM data-center CPUs for AI servers.",
  },
  {
    name: "Substrate",
    founded: 2023,
    hq: "San Francisco, CA",
    founders: "Jake Wetzel, Emir Haleva",
    segment: "Datacenter",
    architecture: "X-ray lithography-enabled custom ASIC fab model",
    focus: "Training + Inference",
    fundingM: 100,
    valuationM: 0,
    investors: "1517 Fund, Lux, Initialized",
    status: "Private",
    whatTheyDo: "Building a new fabrication approach (X-ray lithography) intended to make custom AI ASICs far cheaper/faster to produce.",
    edge: "Attacks the manufacturing/cost layer itself rather than chip architecture.",
  },
  // ── Photonics ──
  {
    name: "Lightmatter",
    founded: 2017,
    hq: "Mountain View, CA",
    founders: "Nicholas Harris, Darius Bunandar, Thomas Graham",
    segment: "Photonics",
    architecture: "Photonic compute (Envise) + interconnect (Passage)",
    focus: "Interconnect + Compute",
    fundingM: 850,
    valuationM: 4400,
    investors: "GV, Spark, Matrix, Viking, Fidelity, T. Rowe Price",
    status: "Private",
    whatTheyDo: "Passage 3D photonic interconnect (>200 Tbps I/O, claims 8x faster training) and Envise photonic processor; links thousands of GPUs with light.",
    edge: "Edgeless optical I/O for rack-scale scale-up under power constraints; full-stack photonics incl. lasers.",
  },
  {
    name: "Celestial AI",
    founded: 2020,
    hq: "Santa Clara, CA",
    founders: "Dave Lazovsky",
    segment: "Photonics",
    architecture: "Photonic Fabric (memory disaggregation)",
    focus: "Interconnect + memory",
    fundingM: 515,
    valuationM: 5500,
    investors: "Samsung Catalyst, Temasek, Fidelity, USIT, AMD-adjacent",
    status: "Acquired",
    whatTheyDo: "Photonic Fabric decouples memory from compute (14.4 Tbps, low latency) so AI clusters scale memory independently.",
    edge: "Optical memory disaggregation; hyperscaler design-ins drove the Marvell acquisition.",
  },
  {
    name: "Ayar Labs",
    founded: 2015,
    hq: "Santa Clara, CA",
    founders: "Alex Wright-Gladstein, Chen Sun, Mark Wade",
    segment: "Photonics",
    architecture: "Optical I/O chiplet (TeraPHY + SuperNova)",
    focus: "Optical interconnect",
    fundingM: 370,
    valuationM: 1000,
    investors: "Nvidia, AMD Ventures, Intel Capital, GlobalFoundries, 3M Ventures",
    status: "Private",
    whatTheyDo: "In-package optical I/O (2 Tbps TeraPHY chiplet + SuperNova multi-wavelength laser) replacing copper SerDes.",
    edge: "Co-packaged optics for inside/between-node bandwidth; backed by Nvidia, AMD, and Intel.",
  },
  {
    name: "Luminous Computing",
    founded: 2018,
    hq: "Santa Clara, CA",
    founders: "Marcus Gomez, Mitchell Nahmias, Michael Gao",
    segment: "Photonics",
    architecture: "Photonic AI accelerator",
    focus: "Compute",
    fundingM: 115,
    valuationM: 0,
    investors: "Bill Gates, 8VC, Neo, Third Kind",
    status: "Private",
    whatTheyDo: "Photonic accelerator chips aimed at large-scale AI training.",
    edge: "All-optical compute moonshot; earlier stage.",
  },
  {
    name: "Neurophos",
    founded: 2022,
    hq: "Austin, TX",
    founders: "Patrick Bowen, Andrew Walker",
    segment: "Photonics",
    architecture: "Optical compute via metasurface modulators",
    focus: "Inference",
    fundingM: 110,
    valuationM: 0,
    investors: "Microsoft (M12), Synthesis, Gates Frontier",
    status: "Private",
    whatTheyDo: "Metasurface-based optical modulators packed into large arrays for dense optical inference compute.",
    edge: "Metamaterials shrink optical compute elements dramatically.",
  },
  {
    name: "Xscape Photonics",
    founded: 2022,
    hq: "New York, NY",
    founders: "Vivek Raghunathan, Sajan Saini, Nicolas Dupuis",
    segment: "Photonics",
    architecture: "Multi-wavelength optical interconnect",
    focus: "Interconnect",
    fundingM: 57,
    valuationM: 0,
    investors: "IAG Capital, Fathom, NVIDIA (Inception-adjacent)",
    status: "Private",
    whatTheyDo: "Programmable multi-color photonic interconnect (ChromX) to raise bandwidth-per-fiber for GPU clusters.",
    edge: "Wavelength-parallelism to scale interconnect bandwidth and lower energy/bit.",
  },
  // ── Edge ──
  {
    name: "SiMa.ai",
    founded: 2018,
    hq: "San Jose, CA",
    founders: "Krishna Rangasayee",
    segment: "Edge",
    architecture: "MLSoC (ML accelerator + Arm + DSP)",
    focus: "Edge inference",
    fundingM: 355,
    valuationM: 0,
    investors: "Maverick, Point72, Dell Tech Capital, Amplify, Lip-Bu Tan",
    status: "Private",
    whatTheyDo: "MLSoC for multimodal edge (CV, CNNs, transformers, LLMs) <5W with no-code dev tools; targets robotics, automotive, aerospace/defense.",
    edge: "Full software-defined physical AI platform; ease-of-deployment focus.",
  },
  {
    name: "Kneron",
    founded: 2015,
    hq: "San Diego, CA",
    founders: "Albert Liu",
    segment: "Edge",
    architecture: "Full-stack edge AI SoC (KL series)",
    focus: "Edge inference",
    fundingM: 190,
    valuationM: 0,
    investors: "Horizons, Sequoia (China), Foxconn, Qualcomm, Alltek",
    status: "Private",
    whatTheyDo: "Low-power edge SoCs (KL730 ~7 TOPS) for on-device vision and reconfigurable NPU; pushes edge GPT.",
    edge: "Reconfigurable on-device NPU + privacy-first inference.",
  },
  {
    name: "Blaize",
    founded: 2011,
    hq: "El Dorado Hills, CA",
    founders: "Dinakar Munagala, Satyaki Koneru, Val Cook",
    segment: "Edge",
    architecture: "Graph Streaming Processor",
    focus: "Edge inference",
    fundingM: 330,
    valuationM: 0,
    investors: "DENSO, Mercedes, Samsung Catalyst, Franklin Templeton",
    status: "Public",
    whatTheyDo: "Graph-native edge inference SoCs + software for automotive, security, industrial.",
    edge: "Graph-streaming architecture; defense/industrial design wins. Among first AI-chip SPAC listings.",
  },
  {
    name: "Syntiant",
    founded: 2017,
    hq: "Irvine, CA",
    founders: "Kurt Busch, Jeremy Holleman, Pieter Vorenkamp",
    segment: "Edge",
    architecture: "Neural Decision Processors (NDP)",
    focus: "Always-on audio/sensor",
    fundingM: 120,
    valuationM: 0,
    investors: "Intel Capital, Microsoft (M12), Applied Ventures, Bosch",
    status: "Private",
    whatTheyDo: "Ultra-low-power NDP chips for voice/sensor wake and now edge vision transformers in battery devices.",
    edge: "Sub-milliwatt always-on speech/sensor inference at scale.",
  },
  {
    name: "Expedera",
    founded: 2018,
    hq: "Santa Clara, CA",
    founders: "Da Chuang, Siyad Ma, Sharad Chole",
    segment: "Edge",
    architecture: "Packet-based NPU IP (Origin)",
    focus: "On-device inference IP",
    fundingM: 30,
    valuationM: 0,
    investors: "Various",
    status: "Private",
    whatTheyDo: "Licensable NPU IP (Origin) embedded in SoCs for phones, autos, edge; scalable from 1 TOPS to 100s.",
    edge: "Packet-based dataflow NPU IP licensed into customers' own chips.",
  },
  {
    name: "Quadric",
    founded: 2016,
    hq: "Burlingame, CA",
    founders: "Veerbhan Kheterpal, Daniel Firu, Nigel Drego",
    segment: "Edge",
    architecture: "General-purpose NPU (Chimera GPNPU)",
    focus: "On-device inference IP",
    fundingM: 30,
    valuationM: 0,
    investors: "Denso, MegaChips, Leawood",
    status: "Private",
    whatTheyDo: "Chimera GPNPU IP that runs both classic C++ code and neural nets on one core for SoC designers.",
    edge: "Single programmable core for scalar+vector+matrix = future-proof against new models.",
  },
  {
    name: "Recogni",
    founded: 2017,
    hq: "San Jose, CA",
    founders: "RK Anand, Gilles Backhus, Eugene Feinberg",
    segment: "Edge",
    architecture: "Log-number-system inference (Pareto)",
    focus: "Inference (auto + datacenter)",
    fundingM: 165,
    valuationM: 0,
    investors: "Celesta, GreatPoint, Mayfield, BMW i Ventures, Toyota",
    status: "Private",
    whatTheyDo: "Pareto inference systems using a logarithmic number system for high tokens/W on gen-AI.",
    edge: "Math (log number system) cuts multiply energy; pivoting toward datacenter gen-AI.",
  },
  {
    name: "MemryX",
    founded: 2019,
    hq: "Ann Arbor, MI",
    founders: "Wei Lu",
    segment: "Edge",
    architecture: "In-memory compute accelerator (MX3)",
    focus: "Edge inference",
    fundingM: 50,
    valuationM: 0,
    investors: "Various",
    status: "Private",
    whatTheyDo: "MX3 edge in-memory compute accelerators with an easy compiler for adding AI to existing systems.",
    edge: "Plug-in in-memory edge accelerator with strong software ease-of-use.",
  },
  {
    name: "Femtosense",
    founded: 2018,
    hq: "San Jose, CA",
    founders: "Sam Fok, Alex Neckar",
    segment: "Edge",
    architecture: "Sparse neural processor (SPU)",
    focus: "Tiny always-on edge",
    fundingM: 10,
    valuationM: 0,
    investors: "Fine Structure, DCVC-adjacent",
    status: "Private",
    whatTheyDo: "Exploits sparsity to run audio/speech AI in tiny, cheap always-on devices.",
    edge: "Sparsity-first design for ultra-cheap, ultra-low-power inference.",
  },
  // ── Analog / In-Memory ──
  {
    name: "Mythic",
    founded: 2012,
    hq: "Austin, TX",
    founders: "Mike Henry, Dave Fick",
    segment: "Analog / In-Memory",
    architecture: "Analog Matrix Processor (flash + analog)",
    focus: "Edge inference",
    fundingM: 165,
    valuationM: 0,
    investors: "DCVC, Lux, Future Ventures, Atreides, Hewlett",
    status: "Private",
    whatTheyDo: "Analog compute-in-flash (AMP) delivering up to ~25 TOPS at very low power for edge vision/robotics.",
    edge: "Analog in-memory = big power/cost savings at the edge; survived a near-death in 2022.",
  },
  {
    name: "EnCharge AI",
    founded: 2022,
    hq: "Santa Clara, CA",
    founders: "Naveen Verma, Kailash Gopalakrishnan, Echere Iroaga",
    segment: "Analog / In-Memory",
    architecture: "Analog in-memory compute (charge-domain SRAM)",
    focus: "Inference (client/edge)",
    fundingM: 144,
    valuationM: 0,
    investors: "Tiger Global, RTX/Samsung Ventures, In-Q-Tel, Intel Capital",
    status: "Private",
    whatTheyDo: "Charge-domain analog in-memory compute promising ~20x better energy efficiency for AI inference on laptops/edge.",
    edge: "Precise switched-capacitor analog compute (vs noisy resistive analog); Princeton/DARPA roots.",
  },
  {
    name: "Sagence AI",
    founded: 2018,
    hq: "Santa Clara, CA",
    founders: "Vishal Sarin",
    segment: "Analog / In-Memory",
    architecture: "Analog in-memory compute",
    focus: "Inference",
    fundingM: 80,
    valuationM: 0,
    investors: "Vinod Khosla-adjacent",
    status: "Private",
    whatTheyDo: "Analog in-memory inference targeting GPT-class models at lower power/cost.",
    edge: "Analog compute aimed at datacenter-scale LLM inference economics.",
  },
  {
    name: "Anaflash",
    founded: 2019,
    hq: "San Jose, CA",
    founders: "Yoo Meng-Fan, Sheih Ru",
    segment: "Analog / In-Memory",
    architecture: "Embedded NVM analog in-memory compute",
    focus: "Ultra-low-power edge",
    fundingM: 10,
    valuationM: 0,
    investors: "Early-stage VCs",
    status: "Private",
    whatTheyDo: "Embeds non-volatile memory directly with analog compute for extremely low-power always-on edge inference.",
    edge: "NVM-based analog compute aimed at the smallest power budgets (sensors, wearables).",
  },
  // ── Exotic / Neuromorphic ──
  {
    name: "Unconventional AI",
    founded: 2025,
    hq: "USA",
    founders: "Naveen Rao, Michael Carbin, Sara Achour, MeeLan Lee",
    segment: "Exotic / Neuromorphic",
    architecture: "Brain-inspired analog/neuromorphic silicon",
    focus: "Training + Inference",
    fundingM: 475,
    valuationM: 4500,
    investors: "a16z, Lightspeed, Lux, DCVC, Jeff Bezos",
    status: "Private",
    whatTheyDo: "Building analog, brain-inspired hardware co-designed with new neural-net formulations to exploit the physics of silicon itself.",
    edge: "Founder sold Nervana (Intel) and MosaicML (Databricks); aims to break the digital paradigm.",
  },
  {
    name: "Extropic",
    founded: 2022,
    hq: "USA",
    founders: "Guillaume Verdon, Trevor McCourt",
    segment: "Exotic / Neuromorphic",
    architecture: "Thermodynamic / probabilistic computing",
    focus: "Generative AI sampling",
    fundingM: 14,
    valuationM: 0,
    investors: "Kindred, Buckley, HOF",
    status: "Private",
    whatTheyDo: "Probabilistic chips that harness thermal noise to natively sample from distributions for generative AI at very low energy.",
    edge: "Uses physical randomness as a compute primitive; potentially orders-of-magnitude energy gains for sampling.",
  },
  {
    name: "Normal Computing",
    founded: 2023,
    hq: "New York, NY",
    founders: "Faris Sbahi, Patrick Coles, Antonio Martinez",
    segment: "Exotic / Neuromorphic",
    architecture: "Thermodynamic computing",
    focus: "Efficient compute + EDA",
    fundingM: 50,
    valuationM: 0,
    investors: "Samsung Catalyst, First Spark, Celesta",
    status: "Private",
    whatTheyDo: "Taped out a thermodynamic prototype that uses randomness of physical systems to compute more efficiently than GPUs.",
    edge: "Targets the post-2030 AI energy wall at the hardware-physics level.",
  },
  {
    name: "Rain AI",
    founded: 2017,
    hq: "San Francisco, CA",
    founders: "Gordon Wilson, Jack Kendall, Juan Claudio Nino",
    segment: "Exotic / Neuromorphic",
    architecture: "Neuromorphic / analog compute-in-memory",
    focus: "Training + Inference",
    fundingM: 50,
    valuationM: 0,
    investors: "Prosperity7, Sam Altman, Grep VC",
    status: "Private",
    whatTheyDo: "Brain-inspired (neuromorphic) chips co-designing memory and compute for energy-efficient training and inference.",
    edge: "Analog NPU vision; OpenAI's Altman among early backers.",
  },
  // ── Interconnect / Networking ──
  {
    name: "Cornelis Networks",
    founded: 2020,
    hq: "Wayne, PA",
    founders: "Philip Murphy, Lisa Spelman",
    segment: "Interconnect / Networking",
    architecture: "Omni-Path fabric (CN5000)",
    focus: "Networking for AI",
    fundingM: 280,
    valuationM: 0,
    investors: "Intel Capital, DCVC, Catalyst, Chevron Tech Ventures",
    status: "Private",
    whatTheyDo: "High-performance interconnect fabric (spun out of Intel's Omni-Path) for scaling AI/HPC clusters.",
    edge: "Ethernet/InfiniBand alternative tuned for AI scale-out latency.",
  },
  {
    name: "Enfabrica",
    founded: 2020,
    hq: "Mountain View, CA",
    founders: "Rochan Sankar, Shrijeet Mukherjee",
    segment: "Interconnect / Networking",
    architecture: "Accelerated Compute Fabric SuperNIC (ACF-S)",
    focus: "GPU-scale networking",
    fundingM: 290,
    valuationM: 0,
    investors: "Sutter Hill, Nvidia, Atreides, IAG",
    status: "Acquired",
    whatTheyDo: "Network silicon that connects huge numbers of GPUs/accelerators with high-bandwidth memory-coherent fabric.",
    edge: "Attacks the GPU-to-GPU bottleneck; Nvidia took the team/IP.",
  },
  {
    name: "Astera Labs",
    founded: 2017,
    hq: "Santa Clara, CA",
    founders: "Jitendra Mohan, Sanjay Gajendra, Casey Morrison",
    segment: "Interconnect / Networking",
    architecture: "PCIe/CXL/Ethernet retimers & fabric (Aries/Taurus/Leo/Scorpio)",
    focus: "Connectivity for AI",
    fundingM: 860,
    valuationM: 0,
    investors: "Fidelity, Atreides, Sutter Hill, Intel, Nvidia",
    status: "Public",
    whatTheyDo: "Connectivity silicon (retimers, smart fabric, CXL memory controllers) that glues AI servers and racks together.",
    edge: "Capital-light connectivity play; rode the AI buildout to a big IPO.",
  },
  {
    name: "Eliyan",
    founded: 2021,
    hq: "Santa Clara, CA",
    founders: "Ramin Farjadrad, Syrus Ziai, Patrick Soheili",
    segment: "Interconnect / Networking",
    architecture: "NuLink die-to-die PHY (UCIe)",
    focus: "Chiplet interconnect",
    fundingM: 120,
    valuationM: 0,
    investors: "Samsung, Intel Capital, Micron, Cleveland Avenue, Tiger",
    status: "Private",
    whatTheyDo: "High-speed die-to-die interconnect (NuLink) letting chiplets/HBM connect on standard substrates without silicon interposers.",
    edge: "Lower-cost, higher-reach chiplet links than CoWoS-style packaging.",
  },
  {
    name: "Baya Systems",
    founded: 2024,
    hq: "San Jose, CA",
    founders: "Sailesh Kumar",
    segment: "Interconnect / Networking",
    architecture: "Network-on-chip / chiplet fabric (NeuraScale)",
    focus: "Interconnect IP",
    fundingM: 56,
    valuationM: 0,
    investors: "Matrix, Maverick, Intel Capital, Synopsys",
    status: "Private",
    whatTheyDo: "Software-driven NoC and chiplet interconnect IP to compose AI SoCs from many chiplets.",
    edge: "Fabric IP for the chiplet era; helps others build big AI silicon.",
  },
  {
    name: "Retym",
    founded: 2021,
    hq: "Santa Clara, CA",
    founders: "Manny Singh",
    segment: "Interconnect / Networking",
    architecture: "Programmable coherent DSP",
    focus: "Datacenter interconnect",
    fundingM: 180,
    valuationM: 0,
    investors: "Spark, Mayfield, Kleiner Perkins, Cisco, Microsoft (M12)",
    status: "Private",
    whatTheyDo: "Coherent DSP silicon to move AI data faster across and between data centers.",
    edge: "Coherent optics DSP for scale-across (data-center-to-data-center) AI traffic.",
  },
  // ── Infrastructure ──
  {
    name: "Auradine",
    founded: 2022,
    hq: "Santa Clara, CA",
    founders: "Rajiv Khemani, Sanjay Gajendra",
    segment: "Infrastructure",
    architecture: "Blockchain + AI infra chips",
    focus: "AI/Bitcoin infrastructure",
    fundingM: 300,
    valuationM: 1000,
    investors: "StepStone, GoldenTree, Mayfield, Celesta, Marathon",
    status: "Private",
    whatTheyDo: "Energy-efficient infrastructure silicon spanning Bitcoin mining and AI data-center systems.",
    edge: "Power-first datacenter silicon; unicorn straddling crypto + AI infra.",
  },
];

// ─── Aggregate stats ─────────────────────────────────────────────────────────

function computeAggregateStats(): AggregateStats {
  const fundings = companies.map((c) => c.fundingM).sort((a, b) => a - b);
  const totalFunding = fundings.reduce((s, v) => s + v, 0);
  const mid = Math.floor(fundings.length / 2);
  const median =
    fundings.length % 2 === 0
      ? (fundings[mid - 1] + fundings[mid]) / 2
      : fundings[mid];
  const avgYear = Math.round(
    companies.reduce((s, c) => s + c.founded, 0) / companies.length
  );

  return {
    totalCompanies: companies.length,
    totalFundingB: Math.round((totalFunding / 1000) * 10) / 10,
    medianFundingM: median,
    avgFoundedYear: avgYear,
    publicCount: companies.filter((c) => c.status === "Public").length,
    acquiredCount: companies.filter((c) => c.status === "Acquired").length,
    privateCount: companies.filter((c) => c.status === "Private").length,
  };
}

export const aggregateStats: AggregateStats = computeAggregateStats();

// ─── Segment data ────────────────────────────────────────────────────────────

function computeSegmentData(): SegmentDatum[] {
  const map = new Map<Segment, { count: number; totalFundingM: number }>();
  for (const c of companies) {
    const entry = map.get(c.segment) || { count: 0, totalFundingM: 0 };
    entry.count++;
    entry.totalFundingM += c.fundingM;
    map.set(c.segment, entry);
  }
  return Array.from(map.entries())
    .map(([segment, v]) => ({ segment, ...v }))
    .sort((a, b) => b.count - a.count);
}

export const segmentData: SegmentDatum[] = computeSegmentData();

// ─── Funding timeline ────────────────────────────────────────────────────────

function computeFundingTimeline(): FundingTimelineDatum[] {
  const map = new Map<number, { count: number; totalFundingM: number }>();
  for (let y = 2011; y <= 2025; y++) {
    map.set(y, { count: 0, totalFundingM: 0 });
  }
  for (const c of companies) {
    if (c.founded >= 2011 && c.founded <= 2025) {
      const entry = map.get(c.founded)!;
      entry.count++;
      entry.totalFundingM += c.fundingM;
    }
  }
  return Array.from(map.entries())
    .map(([year, v]) => ({ year, ...v }))
    .sort((a, b) => a.year - b.year);
}

export const fundingTimeline: FundingTimelineDatum[] = computeFundingTimeline();

// ─── Top investors ───────────────────────────────────────────────────────────

function computeTopInvestors(): InvestorDatum[] {
  const counts = new Map<string, number>();
  for (const c of companies) {
    const names = c.investors
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const name of names) {
      counts.set(name, (counts.get(name) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
}

export const topInvestors: InvestorDatum[] = computeTopInvestors();

// ─── Focus data ──────────────────────────────────────────────────────────────

function consolidateFocus(raw: string): string {
  const lower = raw.toLowerCase();
  if (lower.includes("interconnect") || lower.includes("networking") || lower.includes("connectivity") || lower.includes("optical interconnect") || lower.includes("fabric")) {
    return "Interconnect / Networking";
  }
  if (lower.includes("edge") || lower.includes("always-on") || lower.includes("tiny") || lower.includes("on-device") || lower.includes("ultra-low")) {
    return "Edge";
  }
  if (lower.includes("training") && lower.includes("inference")) {
    return "Training + Inference";
  }
  if (lower.includes("inference") || lower.includes("sampling")) {
    return "Inference";
  }
  return "Other";
}

function computeFocusData(): FocusDatum[] {
  const map = new Map<string, number>();
  for (const c of companies) {
    const focus = consolidateFocus(c.focus);
    map.set(focus, (map.get(focus) || 0) + 1);
  }
  return Array.from(map.entries())
    .map(([focus, count]) => ({ focus, count }))
    .sort((a, b) => b.count - a.count);
}

export const focusData: FocusDatum[] = computeFocusData();
