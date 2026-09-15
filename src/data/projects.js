import medislotImg from "../assets/projects/mock-medislot.svg";
import storageImg from "../assets/projects/mock-storage.svg";
import aiChatImg from "../assets/projects/mock-ai-chat.svg";
import vvisaImg from "../assets/projects/mock-vvisa.svg";

export const PROJECTS = [
  {
    slug: "medislot",
    title: "MediSlot",
    tag: "Healthcare",
    number: "01",
    desc: "A smart healthcare booking system for doctor consultations and patient scheduling, with a responsive frontend and JDBC-driven MySQL persistence.",
    stack: ["HTML/CSS/JS", "JDBC", "MySQL"],
    image: medislotImg,
    architecture: ["USER", "HTML/CSS/JS", "JDBC", "MySQL"],
    overview: "MediSlot models the core workflow of a healthcare booking product: patients discover availability, select a consultation slot, and persist booking information for later retrieval.",
    problem: "Appointment scheduling needs a clear user flow and reliable persistence so that booking information remains consistent between the interface and database.",
    approach: "The project separates the browser experience from the persistence layer. A responsive HTML, CSS, and JavaScript interface collects booking data, JDBC handles database interaction, and MySQL stores the resulting records.",
    decisions: ["Kept the booking flow focused on the primary patient action.", "Used JDBC as an explicit persistence boundary.", "Designed the interface to remain usable across desktop and mobile widths."],
  },
  {
    slug: "decentralized-file-storage",
    title: "Decentralized File Storage Platform",
    tag: "Blockchain",
    number: "02",
    desc: "An IPFS-based platform for distributed file storage, retrieval, and tracking with a browser-oriented interface.",
    stack: ["HTML/CSS/JS", "Bootstrap", "IPFS"],
    image: storageImg,
    architecture: ["USER", "APP", "IPFS", "DISTRIBUTED"],
    overview: "This project explores how a familiar upload and retrieval experience can sit on top of distributed storage rather than a single traditional file server.",
    problem: "Centralized file storage creates a single storage boundary. The project needed a simple interface for working with content addressed through a distributed network.",
    approach: "The browser interface presents upload and retrieval actions while IPFS provides the distributed content layer and content addressing model.",
    decisions: ["Used IPFS as the storage primitive instead of presenting it as a decorative blockchain feature.", "Kept the interaction model familiar for users who do not need to understand the underlying network.", "Made retrieval and tracking visible parts of the product flow."],
  },
  {
    slug: "local-ai-chat",
    title: "Local AI Chat Application",
    tag: "AI / LLM",
    number: "03",
    desc: "A privacy-first React and Vite chat interface that streams responses from a local Ollama model without a cloud API dependency.",
    stack: ["React", "Vite", "Ollama"],
    image: aiChatImg,
    architecture: ["BROWSER", "REACT", "OLLAMA", "LOCAL LLM"],
    overview: "The application provides a familiar chat experience while keeping model execution local through Ollama, making the interaction useful for experimentation without sending prompts to a hosted provider.",
    problem: "Cloud AI APIs can add cost, latency, and privacy constraints. A local interface needs to communicate progress clearly while a model is generating a response.",
    approach: "React manages the conversation UI and uses Fetch with ReadableStream to display model output incrementally from Ollama's REST API.",
    decisions: ["Used streaming output so users see progress rather than waiting for one large response.", "Kept the model boundary local and explicit.", "Built the interface on browser primitives and a lightweight Vite runtime."],
  },
  {
    slug: "vvisa-journey",
    title: "VVISA - Journey by VVISA",
    tag: "Product",
    number: "04",
    desc: "Internal tools and an AI-powered travel-journey feature for VVISA, a live visa and tourism consultancy platform.",
    stack: ["React", "Node.js", "AI pipelines"],
    image: vvisaImg,
    architecture: ["USER", "REACT", "AI PIPELINE", "PLATFORM"],
    overview: "This work focused on internal product tooling and a cinematic travel-journey experience for a live tourism platform.",
    problem: "A visa and tourism platform needs internal workflows that reduce operational friction while presenting travel information in a way that feels useful and engaging to visitors.",
    approach: "The work combined React product interfaces with Node.js-backed tooling and an AI-assisted content pipeline, while keeping private infrastructure and customer information out of the public portfolio.",
    decisions: ["Presented only public, high-level product context.", "Separated internal tooling concerns from the public travel experience.", "Used AI as an experience and automation layer rather than a substitute for product structure."],
  },
];

export function getProject(slug) {
  return PROJECTS.find((project) => project.slug === slug);
}
