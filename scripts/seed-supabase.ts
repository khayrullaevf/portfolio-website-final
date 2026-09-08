// One-off migration: seeds Supabase with the data that is actually rendered
// on the site today (not the unused/legacy JSON duplicates).
// Run once against a fresh DB (after applying supabase/migrations/0001_init.sql):
//   pnpm tsx scripts/seed-supabase.ts

import fs from "node:fs"
import path from "node:path"
import { createClient } from "@supabase/supabase-js"

// Minimal .env.local loader so this script doesn't need an extra dependency.
function loadEnvLocal() {
  const envPath = path.resolve(process.cwd(), ".env.local")
  if (!fs.existsSync(envPath)) return
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eq = trimmed.indexOf("=")
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim()
    if (!process.env[key]) process.env[key] = value
  }
}
loadEnvLocal()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

async function main() {
  console.log("Seeding personal_info...")
  await supabase
    .from("personal_info")
    .update({
      name: "Fazliddin Khayrullaev",
      title: "Software Engineer",
      location: "Tashkent, UZB",
      avatar_url: "/me/image.png",
      email: "fazliddinkhayrullaev4@gmail.com",
      phone: "+998 99 948-37-79",
      working_hours: "Monday - Friday, 9am - 6pm UZT",
      available_for_work: true,
      badges: ["Frontend", "React", "Next.js", "Team Lead"],
    })
    .eq("id", 1)

  console.log("Seeding social_links...")
  await supabase.from("social_links").insert([
    { platform: "GitHub", url: "#", icon: "Github", sort_order: 0 },
    { platform: "LinkedIn", url: "#", icon: "Linkedin", sort_order: 1 },
    {
      platform: "Telegram",
      url: "https://t.me/fazliddinkhayrullaev",
      icon: "MessageCircle",
      sort_order: 2,
    },
  ])

  console.log("Seeding about_info...")
  await supabase
    .from("about_info")
    .update({
      bio: "Frontend Developer with around 3 years of experience specializing in React, Next.js, and Angular, with a strong focus on scalable UI architecture and high-performance systems. Proven leadership as a team lead managing a 6-person development team delivering enterprise solutions across healthcare, education, and logistics. Passionate about clean code, performance optimization, and cross-functional collaboration.",
      focus: [
        "Building scalable frontend systems with React, Next.js, and Angular",
        "Leading cross-functional development teams and code review processes",
        "Integrating payment systems and optimizing API performance",
      ],
      interests: [
        "Clean Code",
        "Performance Optimization",
        "Team Leadership",
        "System Architecture",
        "Real-time Applications",
      ],
    })
    .eq("id", 1)

  console.log("Seeding languages...")
  await supabase.from("languages").insert([
    { name: "Uzbek", proficiency: "Native", level: 100, flag: "🇺🇿", sort_order: 0 },
    { name: "English", proficiency: "C1 (IELTS 7)", level: 85, flag: "🇺🇸", sort_order: 1 },
    { name: "Russian", proficiency: "A2", level: 40, flag: "🇷🇺", sort_order: 2 },
  ])

  console.log("Seeding meta_info...")
  await supabase
    .from("meta_info")
    .update({
      title: "Fazliddin Khayrullaev | Software Engineer",
      description:
        "Frontend Developer with 2+ years of experience specializing in React, Next.js, and Angular",
    })
    .eq("id", 1)

  console.log("Seeding experience...")
  const soffPlatforms =
    "Developing and maintaining multiple digital platforms including ilmiyish.uz (scientific works marketplace), soff.uz (digital academic marketplace), soffcrm.uz (CRM system for educational centers), and soffia.uz (AI-powered presentation creation platform). Building scalable frontend architectures with Next.js, implementing responsive UI/UX designs, and optimizing platform performance."
  await supabase.from("experience").insert([
    {
      title: "Frontend (Next.js) Developer",
      company: "SoffHub",
      location: "Tashkent, Uzbekistan",
      period: "Oct 2025 – Present",
      description: soffPlatforms,
      technologies: ["Next.js", "React", "TypeScript", "TailwindCSS", "MongoDB", "AI/ML Integration"],
      is_active: true,
      sort_order: 0,
    },
    {
      title: "Team Lead & Frontend Developer",
      company: "Freelance Projects",
      location: "Tashkent, Uzbekistan",
      period: "May 2025 – Present",
      description:
        "Founded and led a 6-person cross-functional team (3 Java backend, 1 frontend developer) delivering full-stack web solutions. Architected scalable frontend systems using Next.js, React, TypeScript and TailwindCSS. Directed project planning and code review processes, ensuring high-quality deliverables across multiple client projects.",
      technologies: ["Next.js", "React", "TypeScript", "TailwindCSS", "Team Leadership"],
      is_active: false,
      sort_order: 1,
    },
    {
      title: "Frontend Developer",
      company: "TenzorSoft",
      location: "Tashkent, Uzbekistan",
      period: "Feb 2025 – Aug 2025",
      description:
        "Engineered complex platforms including omborim.uz (chemical warehouse management system for 300+ warehouses with Faktura.uz & UzEx.uz API integrations) and mycoal.uz (coal supply chain management with real-time GPS tracking and WebSocket integration). Used React/Next.js/Angular with payment systems and SMS services integration.",
      technologies: [
        "React",
        "Next.js",
        "Angular",
        "Material UI",
        "WebSocket",
        "Maps API",
        "Payme",
        "Click",
      ],
      is_active: false,
      sort_order: 2,
    },
    {
      title: "Frontend Developer",
      company: "UzbekGidroEnergo",
      location: "Tashkent, Uzbekistan",
      period: "Feb 2024 – Jan 2025",
      description:
        "Developed real-time water aggregation and reservoir monitoring dashboards with Angular, Tailwind CSS, and Ant Design. Collaborated with backend team to digitize hydro infrastructure operations. Built real-time monitoring dashboards for water management, implemented data visualization for reservoir analytics, and digitized hydro infrastructure operations.",
      technologies: ["Angular", "Tailwind CSS", "Ant Design", "Data Visualization", "Real-time Systems"],
      is_active: false,
      sort_order: 3,
    },
  ])

  console.log("Seeding certifications & education...")
  await supabase.from("certifications").insert([
    {
      name: "Frontend Developer Certification",
      issuer: "Na'jot Ta'lim",
      date: "2024",
      logo_url: "/placeholder.svg?height=40&width=40",
      pdf_url: "/certificates/najot.pdf",
      sort_order: 0,
    },
    {
      name: "IELTS band 7.0",
      issuer: "IDP IELTS",
      date: "2021",
      logo_url: "/placeholder.svg?height=40&width=40",
      pdf_url: "/certificates/ielts.pdf",
      sort_order: 1,
    },
  ])
  await supabase.from("education").insert([
    {
      degree: "Bachelor's in Software Engineering",
      institution: "TUIT (Online Education)",
      year: "2024–2028",
      logo_url: "/generic-art-school-logo.png",
      sort_order: 0,
    },
    {
      degree: "Frontend Development",
      institution: "Najot Ta'lim",
      year: "2023–2024",
      logo_url: "/generic-military-logo.png",
      sort_order: 1,
    },
  ])

  console.log("Seeding skills...")
  const skills = [
    { name: "JavaScript", level: 95, category: "Language", color: "#f7df1e" },
    { name: "TypeScript", level: 90, category: "Language", color: "#3178c6" },
    { name: "React", level: 95, category: "Frontend", color: "#61dafb" },
    { name: "Next.js", level: 92, category: "Frontend", color: "#000000" },
    { name: "Angular", level: 85, category: "Frontend", color: "#dd0031" },
    { name: "Tailwind CSS", level: 95, category: "UI Library", color: "#06b6d4" },
    { name: "Material UI", level: 88, category: "UI Library", color: "#0081cb" },
    { name: "Ant Design", level: 90, category: "UI Library", color: "#1890ff" },
    { name: "ShadCN", level: 85, category: "UI Library", color: "#000000" },
    { name: "Team Leadership", level: 88, category: "Soft Skills", color: "#e91e63" },
    { name: "Project Management", level: 85, category: "Soft Skills", color: "#9c27b0" },
    { name: "Cross-functional Collaboration", level: 92, category: "Soft Skills", color: "#673ab7" },
    { name: "Mentoring", level: 80, category: "Soft Skills", color: "#3f51b5" },
    { name: "Problem Solving", level: 95, category: "Soft Skills", color: "#2196f3" },
    { name: "Node.js", level: 80, category: "Backend", color: "#339933" },
    { name: "Express.js", level: 78, category: "Backend", color: "#000000" },
    { name: "MongoDB", level: 85, category: "Database", color: "#47a248" },
    { name: "PostgreSQL", level: 75, category: "Database", color: "#336791" },
    { name: "WebSocket", level: 80, category: "Real-time", color: "#ff6b6b" },
    { name: "Docker", level: 70, category: "DevOps", color: "#2496ed" },
    { name: "GitLab CI/CD", level: 75, category: "DevOps", color: "#fc6d26" },
    { name: "Git", level: 92, category: "Tools", color: "#f05032" },
    { name: "Payme Integration", level: 88, category: "API", color: "#00bcd4" },
    { name: "Click Integration", level: 85, category: "API", color: "#2196f3" },
    { name: "Firebase", level: 82, category: "API", color: "#ffca28" },
    { name: "OAuth 2.0", level: 78, category: "API", color: "#4caf50" },
    { name: "RESTful APIs", level: 90, category: "Architecture", color: "#9c27b0" },
    { name: "Microservices", level: 75, category: "Architecture", color: "#ff9800" },
  ]
  await supabase
    .from("skills")
    .insert(skills.map((s, i) => ({ ...s, sort_order: i })))

  console.log("Seeding projects...")
  interface ProjectSeed {
    slug: string
    title: string
    category: string
    short_description: string
    description: string[]
    features: string[]
    technologies: string[]
    cover_image_url: string
    thumbnail_image_url: string
    client?: string
    timeline: string
    role: string
    live_url?: string
    github_url?: string
    sort_order: number
    gallery: { url: string; caption?: string }[]
  }
  const projects: ProjectSeed[] = [
    {
      slug: "soff-digital-marketplace",
      title: "soff.uz - Digital Academic Marketplace",
      category: "Web Application",
      short_description:
        "Full-featured marketplace platform for buying and selling digital academic products including diploma works, course projects, and educational materials.",
      description: [
        "soff.uz is a comprehensive digital marketplace designed to connect students, educators, and professionals with quality academic resources and educational materials.",
        "The platform features secure user authentication, advanced search and filtering systems, rating and review mechanisms, and integrated payment gateways for seamless transactions.",
        "Built with modern web technologies, the platform offers responsive design across all devices with real-time notifications, secure document delivery, and comprehensive analytics dashboards for sellers and buyers.",
      ],
      features: [
        "Secure user authentication and role-based access control",
        "Advanced search with category-based browsing and filtering",
        "Rating and review system for transparency",
        "Integrated payment gateway (Payme, Click)",
        "Real-time notifications and order tracking",
        "Secure document delivery mechanism",
        "Seller analytics dashboard",
        "Mobile-responsive design",
      ],
      technologies: ["Next.js", "React", "TypeScript", "MongoDB", "Tailwind CSS", "Redux Toolkit"],
      cover_image_url: "/soff/home.jpg",
      thumbnail_image_url: "/soff/home.jpg",
      timeline: "Ongoing",
      role: "Frontend Next JS Developer",
      live_url: "https://soff.uz",
      github_url: "#",
      sort_order: 0,
      gallery: [
        { url: "/soff/home.jpg", caption: "Marketplace Homepage" },
        { url: "/soff/products.jpg", caption: "Products Listing" },
        { url: "/soff/seller.jpg", caption: "Seller Dashboard" },
        { url: "/soff/checkout.jpg", caption: "Secure Checkout" },
      ],
    },
    {
      slug: "soffcrm-educational-crm",
      title: "soffcrm.uz - CRM System for Educational Centers",
      category: "Web Application",
      short_description:
        "Comprehensive CRM system for managing student admissions, payments, schedules, and teacher performance with automated workflows.",
      description: [
        "soffcrm.uz is a powerful CRM solution designed specifically for educational institutions to streamline their operations and improve student management.",
        "The system provides integrated student and teacher portals, automated notification systems, comprehensive attendance tracking, course management tools, and detailed financial reporting with advanced analytics.",
        "Built with scalability in mind, the platform manages student admissions, payment processing, course scheduling, and performance analytics in one unified dashboard.",
      ],
      features: [
        "Student portal with enrollment and course management",
        "Teacher portal with attendance and grading tools",
        "Automated notification system for students and parents",
        "Attendance tracking and performance analytics",
        "Course and schedule management",
        "Payment processing and financial reports",
        "Detailed analytics dashboard",
        "Multi-user role management",
      ],
      technologies: [
        "Next.js",
        "React",
        "Redux Toolkit",
        "MongoDB",
        "Java",
        "Spring Boot",
        "Tailwind CSS",
        "Ant Design",
      ],
      cover_image_url: "/soffcrm/home.jpg",
      thumbnail_image_url: "/soffcrm/home.jpg",
      timeline: "Ongoing",
      role: "Frontend Next JS Developer",
      live_url: "#",
      github_url: "#",
      sort_order: 1,
      gallery: [
        { url: "/soffcrm/dashboard.jpg", caption: "Admin Dashboard" },
        { url: "/soffcrm/student_m.jpg", caption: "Student Management" },
        { url: "/soffcrm/payment.jpg", caption: "Payment Tracking" },
        { url: "/soffcrm/finance.jpg", caption: "Financial Reports" },
      ],
    },
    {
      slug: "ilmiyish-scientific-marketplace",
      title: "ilmiyish.uz - Scientific Works Marketplace",
      category: "Web Application",
      short_description:
        "Specialized marketplace for academic researchers and students to publish and purchase scientific research papers, theses, and academic publications.",
      description: [
        "ilmiyish.uz is a dedicated platform for the academic research community, enabling researchers, students, and institutions to share and access scientific publications.",
        "The platform features category-based browsing, advanced search with comprehensive filters, secure document delivery mechanisms, and a user verification system to ensure quality content.",
        "Built with researcher needs in mind, the system provides analytics dashboards for authors, peer review capabilities, citation tracking, and easy access to scientific knowledge.",
      ],
      features: [
        "Category-based browsing of scientific papers",
        "Advanced search with academic filters",
        "User verification system for quality assurance",
        "Secure document delivery and download management",
        "Author analytics and publication tracking",
        "Citation and reference management",
        "Peer review workflow support",
        "Mobile-responsive interface",
      ],
      technologies: ["Next.js", "React", "TypeScript", "MongoDB", "Tailwind CSS", "Node.js", "Express.js"],
      cover_image_url: "/ilmiyish/home.jpg",
      thumbnail_image_url: "/ilmiyish/home.jpg",
      timeline: "Ongoing",
      role: "Frontend Next JS Developer",
      live_url: "#",
      github_url: "#",
      sort_order: 2,
      gallery: [
        { url: "/ilmiyish/home.jpg", caption: "Research Papers Listing" },
        { url: "/ilmiyish/search.jpg", caption: "Advanced Search Interface" },
        { url: "/ilmiyish/paper.jpg", caption: "Paper Details View" },
        { url: "/ilmiyish/author.jpg", caption: "Author Dashboard" },
      ],
    },
    {
      slug: "soffia-ai-presentation",
      title: "Soffia AI - AI-Powered Presentation Creation Platform",
      category: "Web Application",
      short_description:
        "AI-powered platform for creating professional presentations and academic reports (referatlar) with automated content generation, flexible pricing plans, and multi-language support.",
      description: [
        "Soffia AI is an innovative AI-powered platform designed to revolutionize how users create professional presentations and academic reports. The platform enables users to generate complete presentations from a simple topic input, with AI handling slide creation, content structuring, and formatting.",
        "The platform features a comprehensive pricing system with three flexible plans: 10-15 pages (5,000 so'm), 15-20 pages (7,000 so'm - most popular), and 20-25 pages (10,000 so'm). Advanced features include multi-language support (primarily Uzbek), customizable slide counts (10-25 slides), author attribution, optional AI-generated images, and template selection.",
        "Built with modern web technologies, Soffia AI provides an intuitive interface with sidebar navigation, real-time content generation, and seamless user experience. The platform offers multiple services including presentations (Taqdimot) and reports (Referatlar), with additional features like scientific works, thesis, articles, and video creation coming soon.",
      ],
      features: [
        "AI-powered automatic presentation and report generation from topic input",
        "Flexible pricing plans: 10-15 pages (5,000 so'm), 15-20 pages (7,000 so'm), 20-25 pages (10,000 so'm)",
        "Multi-language support with Uzbek as primary language",
        "Customizable slide count with slider control (10-25 slides)",
        "Author attribution and metadata management",
        "Optional AI-generated images toggle for presentations",
        "Template selection (Shablonlar) with quick options (Qisqa, O'rta, Uzun)",
        "Sidebar navigation with service categories (Taqdimot, Referatlar)",
        "Real-time content generation and preview",
        "User authentication and account management",
        "Responsive design for all devices",
        "Voice input support (microphone icon)",
      ],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AI/ML Integration", "Node.js", "MongoDB"],
      cover_image_url: "/soffia/home.png",
      thumbnail_image_url: "/soffia/home.png",
      timeline: "Ongoing",
      role: "Frontend Next JS Developer",
      live_url: "https://soffia.uz",
      github_url: "#",
      sort_order: 3,
      gallery: [
        { url: "/soffia/home.png", caption: "Soffia AI Homepage - Presentation Creation" },
        { url: "/soffia/pricing.png", caption: "Pricing Plans Page" },
        { url: "/soffia/create.png", caption: "Dashboard with Sidebar Navigation" },
        { url: "/soffia/referatlar.png", caption: "Referatlar (Reports) Creation Interface" },
      ],
    },
    {
      slug: "omborim-chemical-warehouse",
      title: "omborim.uz - Chemical Warehouse Management System",
      category: "Web Application",
      short_description:
        "Comprehensive inventory management system for 300+ chemical warehouses with real-time stock tracking and API integrations.",
      description: [
        "omborim.uz is a comprehensive chemical warehouse management system designed to serve over 300 chemical warehouses across Uzbekistan, providing unified inventory management and procurement solutions.",
        "The platform features seamless integration with Faktura.uz for automated invoicing and UzEx.uz for data exchange, enabling automated data synchronization and streamlined business operations.",
        "Advanced data tables provide real-time insights into stock levels, sales performance, and supply chain metrics. Built with modern web technologies, the platform offers responsive design that works seamlessly across desktop and mobile devices.",
      ],
      features: [
        "Real-time inventory tracking and stock management",
        "Sales analytics dashboard with performance metrics",
        "Procurement workflow automation",
        "Faktura.uz API integration for automated invoicing",
        "UzEx.uz API integration for data exchange",
        "Advanced data tables with filtering and sorting",
        "Multi-warehouse management and reporting",
        "Mobile-responsive design",
      ],
      technologies: ["React", "Next.js", "Tailwind CSS", "Ant Design", "ShadCN", "TypeScript", "REST APIs"],
      cover_image_url: "/omborim/home.png",
      thumbnail_image_url: "/omborim/home.png",
      timeline: "8 months (Q1-Q3 2023)",
      role: "Frontend Developer & UI/UX Designer",
      live_url: "https://omborim.uz",
      github_url: "#",
      sort_order: 4,
      gallery: [
        { url: "/omborim/home.png", caption: "Main Dashboard Overview" },
        { url: "/omborim/invest.png", caption: "Inventory Management" },
        { url: "/omborim/dashboard.png", caption: "Sales Analytics" },
        { url: "/omborim/main.png", caption: "Warehouse Overview" },
      ],
    },
    {
      slug: "mycoal-supply-chain",
      title: "mycoal.uz - Coal Supply Chain Management",
      category: "Web Application",
      short_description:
        "Dynamic supply chain platform for coal distribution with real-time delivery tracking, GPS integration, and logistics optimization.",
      description: [
        "mycoal.uz is a sophisticated supply chain management platform designed specifically for the coal distribution industry, providing real-time visibility into the entire supply chain from mining to delivery.",
        "The platform features dynamic dashboards displaying KPIs, delivery statuses, and operational metrics in real-time. WebSocket integration ensures all stakeholders receive instant updates on shipment status, route changes, and delivery confirmations.",
        "Advanced mapping functionality provides GPS tracking of delivery vehicles, route optimization suggestions, geofenced delivery confirmations, and comprehensive logistics analytics for efficient operations.",
      ],
      features: [
        "Real-time GPS-based delivery tracking",
        "Dynamic dashboards with KPI monitoring",
        "WebSocket-powered live status updates",
        "Route optimization and logistics planning",
        "Inventory management for storage facilities",
        "Customer portal for order tracking",
        "Automated reporting and analytics",
        "Mobile driver interface for field operations",
      ],
      technologies: ["Angular", "Material UI", "WebSocket", "Maps API", "TypeScript", "RxJS", "Progressive Web App"],
      cover_image_url: "/mycoal/home.png",
      thumbnail_image_url: "/mycoal/home.png",
      timeline: "6 months (Q2-Q4 2023)",
      role: "Angular Developer & System Architect",
      live_url: "https://mycoal.uz",
      github_url: "#",
      sort_order: 5,
      gallery: [
        { url: "/mycoal/home.png", caption: "Supply Chain Dashboard" },
        { url: "/mycoal/tracking.png", caption: "Real-time Delivery Tracking" },
        { url: "/mycoal/coal.png", caption: "Performance Analytics" },
        { url: "/mycoal/org.png", caption: "Driver Mobile Interface" },
      ],
    },
    {
      slug: "asdk-water-monitoring",
      title: "ASDK UGE - Water Reservoir Monitoring System",
      category: "Web Application",
      short_description:
        "Real-time water reservoir monitoring platform for Uzbekistan's hydro sector with advanced analytics and IoT integration.",
      description: [
        "ASDK UGE is a comprehensive water reservoir monitoring platform developed for Uzbekistan's hydro sector digitization initiative, providing real-time monitoring and analytics for water resources nationwide.",
        "The platform features advanced data visualization tools that transform complex hydrological data into actionable insights. Real-time status indicators provide immediate alerts for water levels, flow rates, and system anomalies.",
        "Built with IoT sensor integration, the system supports monitoring of multiple reservoir sites simultaneously with centralized dashboards for regional and national oversight of water resource management.",
      ],
      features: [
        "Real-time water level and flow rate monitoring",
        "Advanced analytics with predictive insights",
        "Automated alert system for critical thresholds",
        "Historical data analysis and trend reporting",
        "Multi-site centralized monitoring dashboard",
        "IoT sensor and device integration",
        "Compliance reporting for regulatory requirements",
        "Mobile-responsive interface",
      ],
      technologies: [
        "Angular",
        "Tailwind CSS",
        "Angular Material",
        "PrimeNG",
        "Chart.js",
        "WebSocket",
        "IoT Integration",
      ],
      cover_image_url: "/asdk/home.png",
      thumbnail_image_url: "/asdk/home.png",
      client: "Ministry of Water Resources, Uzbekistan",
      timeline: "10 months (Q1 2023-Q1 2024)",
      role: "Senior Frontend Developer",
      live_url: "https://asdk-uge.web.app",
      github_url: "#",
      sort_order: 6,
      gallery: [
        { url: "/asdk/home.png", caption: "Real-time Monitoring Dashboard" },
        { url: "/asdk/water.png", caption: "Water Analytics Interface" },
        { url: "/asdk/map.png", caption: "Alert Management System" },
        { url: "/asdk/1.png", caption: "Compliance Reporting" },
      ],
    },
    {
      slug: "intreaty-legal-platform",
      title: "Intreaty.uz - Legal Document Comparison Tool",
      category: "Web Application",
      short_description:
        "Multi-language document viewer with advanced diff-engine for comparing legal texts across Uzbek, Russian, and English.",
      description: [
        "Intreaty.uz is an advanced legal document comparison platform designed to help legal professionals, researchers, and government officials analyze and compare legal documents across multiple languages.",
        "The platform features a sophisticated diff-engine that highlights differences between document versions, making it easy to track changes, amendments, and variations in legal texts. Particularly valuable for international treaty analysis and legal document review.",
        "Built with accessibility and usability in mind, the interface provides intuitive navigation through complex documents with advanced search functionality, bookmark features, and chatbot UI for enhanced user experience.",
      ],
      features: [
        "Multi-language support (Uzbek, Russian, English)",
        "Advanced diff-engine for document comparison",
        "Side-by-side document viewing interface",
        "Highlighted change tracking and annotations",
        "Full-text search across documents",
        "Bookmark and note-taking functionality",
        "Document versioning and history tracking",
        "Export capabilities for comparison reports",
      ],
      technologies: ["Next.js", "Ant Design", "React", "TypeScript", "PDF.js", "Natural Language Processing"],
      cover_image_url: "/yuridik/home.png",
      thumbnail_image_url: "/yuridik/home.png",
      client: "Legal Research Institute",
      timeline: "5 months (Q3-Q4 2023)",
      role: "Full-Stack Developer",
      live_url: "https://intreaty.uz",
      github_url: "#",
      sort_order: 7,
      gallery: [
        { url: "/yuridik/home.png", caption: "Document Comparison Interface" },
        { url: "/yuridik/docs.png", caption: "Multi-language Document Viewer" },
        { url: "/yuridik/team.png", caption: "Advanced Search Functionality" },
        { url: "/yuridik/faq.png", caption: "Annotation System" },
      ],
    },
    {
      slug: "yetkaz-logistics-platform",
      title: "Yetkaz - Smart Logistics Platform",
      category: "Web Application",
      short_description:
        "Comprehensive auction-based cargo-driver matchmaking platform with real-time tracking, CRM, and multi-payment gateway integration.",
      description: [
        "Yetkaz is a cutting-edge logistics platform designed to revolutionize cargo transportation in Uzbekistan by connecting customers needing delivery with professional drivers in an efficient ecosystem.",
        "The system features a guest booking interface allowing users to place orders without registration, while registered users access a comprehensive CRM for managing shipments, tracking delivery status, and maintaining delivery history.",
        "For drivers, the platform provides a dedicated dashboard to view cargo orders, optimize routes, manage earnings, and communicate with customers. Advanced features include real-time GPS tracking, automated notifications, dynamic pricing based on cargo specifications, and comprehensive analytics.",
      ],
      features: [
        "Guest booking system for non-registered users",
        "Comprehensive CRM dashboard for customers",
        "Driver portal with order management and earnings tracking",
        "Real-time GPS tracking and route optimization",
        "Automated SMS/email notifications",
        "Dynamic pricing engine",
        "Multi-payment gateway integration (Payme, Click, Uzcard)",
        "Advanced analytics and reporting",
        "Mobile-responsive design with PWA",
        "Multi-language support",
        "Customer support chat system",
        "Cargo insurance and damage claim management",
      ],
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Redux Toolkit",
        "MongoDB",
        "Node.js",
        "Express.js",
        "Socket.io",
        "Tailwind CSS",
        "Ant Design",
        "Google Maps API",
      ],
      cover_image_url: "/yetkaz/hero.png",
      thumbnail_image_url: "/yetkaz/hero.png",
      client: "Yetkaz Logistics LLC",
      timeline: "12 months (Q1 2024-Q4 2024)",
      role: "Full-Stack Developer & Product Architect",
      live_url: "https://logiflow.uz",
      github_url: "https://github.com/logiflow/platform",
      sort_order: 8,
      gallery: [
        { url: "/yetkaz/hero.png", caption: "Platform Homepage" },
        { url: "/yetkaz/seller.png", caption: "Customer CRM Dashboard" },
        { url: "/yetkaz/driver.png", caption: "Driver Order Portal" },
        { url: "/yetkaz/register.png", caption: "Registration Page" },
        { url: "/yetkaz/login.png", caption: "Login Page" },
        { url: "/yetkaz/verify.png", caption: "Verification Page" },
      ],
    },
    {
      slug: "pharmacy-management",
      title: "Pharmacy Management System",
      category: "Web Application",
      short_description:
        "Complete pharmacy solution with real-time inventory tracking, sales management, prescription handling, and billing automation.",
      description: [
        "The Pharmacy Management System is a comprehensive solution designed to streamline all aspects of pharmacy operations from inventory management to prescription processing.",
        "The system features real-time stock updates ensuring accurate inventory levels and automatic reorder notifications. Advanced prescription management includes drug interaction checking, dosage verification, and automated refill reminders.",
        "Built with healthcare compliance in mind, the system adheres to pharmaceutical regulations and provides detailed audit trails for all transactions. The intuitive interface ensures pharmacy staff can quickly process prescriptions and manage daily operations efficiently.",
      ],
      features: [
        "Real-time inventory tracking with auto-reorder alerts",
        "Prescription management with drug interaction checking",
        "Sales analytics and reporting dashboard",
        "Customer profile management",
        "Automated billing and insurance claim processing",
        "Barcode scanning for medication verification",
        "Supplier management and purchase automation",
        "Compliance reporting and audit trails",
      ],
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Spring Boot",
        "PostgreSQL",
        "REST APIs",
      ],
      cover_image_url: "/apteka/call.png",
      thumbnail_image_url: "/apteka/call.png",
      timeline: "7 months (Q1-Q3 2024)",
      role: "Full-Stack Developer",
      live_url: "#",
      github_url: "#",
      sort_order: 9,
      gallery: [
        { url: "/apteka/call.png", caption: "Pharmacy Dashboard" },
        { url: "/apteka/admin.png", caption: "Admin Users Management" },
        { url: "/apteka/cash.png", caption: "Doctors Cashbacks" },
        { url: "/apteka/map.png", caption: "Pharmacy Management" },
        { url: "/apteka/sell.png", caption: "Call Center Sales" },
        { url: "/apteka/pharmacies.png", caption: "Pharmacies Directory" },
      ],
    },
  ]

  for (const { gallery, ...project } of projects) {
    const { data: inserted, error } = await supabase
      .from("projects")
      .insert(project)
      .select("id")
      .single()

    if (error) {
      console.error(`Failed to insert project ${project.slug}:`, error.message)
      continue
    }

    await supabase.from("project_gallery").insert(
      gallery.map((g, i) => ({ project_id: inserted.id, url: g.url, caption: g.caption, sort_order: i })),
    )
  }

  console.log("Done.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
