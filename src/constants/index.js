import linkMinimal from "../assets/projects/link-ingestor-v2.webp";
import chatMinimal from "../assets/projects/chat-backend-v2.webp";
import project4 from "../assets/projects/blog-auth-v2.webp";
import cyphireImg from "../assets/projects/cyphire-v2.webp";
import yupchaLogo from "../assets/yupcha_logo.webp";
import collegeLogo from "../assets/college logo.webp";

export const HERO_CONTENT = `I am a specialized Backend & Automation Engineer with a profound focus on intelligent systems and scalable infrastructure. I bridge the gap between robust backend architecture and Machine Learning, with deep expertise in PyTorch, YOLO, and ResNet architectures. My work spans from architecting high-performance FastAPI ecosystems to deploying containerized services via Kubernetes, always with a commitment to zero-downtime CI/CD and exceptional user experiences.`;

export const ABOUT_TEXT = `Backend developer at Yupcha, where I specialize in the intersection of automation, machine learning, and scalable cloud infrastructure. I design and build highly-efficient APIs, autonomous data pipelines, and intelligent computer vision systems using PyTorch and YOLO.

With a strong foundation in ResNet architectures and DevOps practices (Docker, Kubernetes), I focus on creating systems that are not just scalable, but also self-optimizing. I thrive on solving complex backend challenges and integrating ML models into production-grade environments with a focus on reliability and performance.`;


export const EXPERIENCES = [
  {
    year: "Sept 2025 - Jun 2026",
    role: "Automation Engineer & Backend Developer",
    company: "Yupcha",
    logo: yupchaLogo,
    description: "Spearheading automation initiatives and backend architecture to drive system scale and intelligence.",
    highlights: [
      "Architected enterprise-grade CI/CD pipelines ensuring 100% automated, zero-downtime production releases.",
      "Engineered core backend features and automation logic that significantly optimized the overall user experience.",
      "Developed and deployed computer vision models using PyTorch, YOLO, and ResNet for intelligent data processing.",
      "Deep expertise in ResNet architectures, implementing custom adaptations for specialized backend automation tasks.",
      "Managed robust containerized infrastructure using Docker and Kubernetes (K8s) for high-availability services.",
      "Built high-performance RESTful APIs with FastAPI, leveraging PostgreSQL and Redis for real-time data handling."
    ],
    technologies: ["Python", "FastAPI", "PyTorch", "YOLO", "Docker", "Kubernetes", "CI/CD"],
  },
];


export const PROJECTS = [
  {
    title: "Cyphire",
    image: cyphireImg,
    description:
      "An immutable platform for digitally-signed credentials anchored on the Polygon blockchain. Backend services integrate FastAPI with Web3.py for secure blockchain transactions, async processing, and fault-tolerant API design.",
    technologies: ["FastAPI", "Web3.py", "Polygon", "PostgreSQL", "Solidity"],
    github: "https://github.com/TanmoyFRu/Cyphire",
  },
  {
    title: "Link Ingestor API",
    image: linkMinimal,
    description:
      "A high-performance autonomous system for large-scale webpage data ingestion. Features intelligent backlink discovery via Bing Search API and async processing architecture.",
    technologies: ["FastAPI", "PostgreSQL", "Redis", "Celery", "Docker"],
    github: "https://github.com/TanmoyFRu/Link-Ingestor-API",
  },
  {
    title: "ChatApp Backend",
    image: chatMinimal,
    description:
      "A scalable messaging backend integrated with Google Gemini AI for real-time intelligent responses. Uses Celery for non-blocking AI task processing and conversation context management.",
    technologies: ["FastAPI", "Gemini AI", "Redis", "Celery", "PostgreSQL"],
    github: "https://github.com/TanmoyFRu/ChatApp-Backend",
  },
  {
    title: "User-Blog Authentication API",
    image: project4,
    imageScale: "scale-[1.6]",
    description:
      "A secure RESTful API with JWT authentication and full CRUD capabilities. Implements complex relational mapping between users and content with robust password hashing.",
    technologies: ["FastAPI", "JWT", "SQLAlchemy", "SQLite"],
    github: "https://github.com/TanmoyFRu/User-Blog-Authentication-API",
  },
];

export const EDUCATION = [
  {
    year: "2021 - 2025",
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Techno College of Engineering Agartala",
    logo: collegeLogo,
    description: "Focusing on the convergence of software engineering and intelligent systems development.",
    focusAreas: [
      "Backend System Architecture",
      "Scalable Cloud Infrastructure",
      "Machine Learning Integrations",
      "Autonomous System Design",
      "Advanced Data Structures"
    ],
  },
];



export const CONTACT = {
  address: "Barjala, Agartala, Tripura 799002",
  phoneNo: "+91 87941 40550",
  email: "tanmoydn2003@gmail.com",
};
