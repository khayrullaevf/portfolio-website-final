export interface ProjectGalleryImage {
  url: string
  caption?: string
}

export interface RelatedProject {
  slug: string
  title: string
  category: string
  image: string
}

export interface Project {
  id: number
  slug: string
  title: string
  category: string
  shortDescription: string
  description: string[]
  features: string[]
  technologies: string[]
  coverImage: string
  thumbnailImage: string
  gallery?: ProjectGalleryImage[]
  client?: string
  timeline: string
  role: string
  liveUrl?: string
  githubUrl?: string
  relatedProjects?: RelatedProject[]
}

const projects: Project[] = [
  {
    id: 1,
    slug: "soff-digital-marketplace",
    title: "soff.uz - Digital Academic Marketplace",
    category: "Web Application",
    shortDescription: "Full-featured marketplace platform for buying and selling digital academic products including diploma works, course projects, and educational materials.",
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
    coverImage: "/soff/home.jpg",
    thumbnailImage: "/soff/home.jpg",
    gallery: [
      { url: "/soff/home.jpg", caption: "Marketplace Homepage" },
      { url: "/soff/products.jpg", caption: "Products Listing" },
      { url: "/soff/seller.jpg", caption: "Seller Dashboard" },
      { url: "/soff/checkout.jpg", caption: "Secure Checkout" },
    ],
    timeline: "Ongoing",
    role: "Frontend Next JS Developer",
    liveUrl: "https://soff.uz",
    githubUrl: "#",
  },
  {
    id: 2,
    slug: "soffcrm-educational-crm",
    title: "soffcrm.uz - CRM System for Educational Centers",
    category: "Web Application",
    shortDescription: "Comprehensive CRM system for managing student admissions, payments, schedules, and teacher performance with automated workflows.",
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
    technologies: ["Next.js", "React", "Redux Toolkit", "MongoDB", "Java", "Spring Boot", "Tailwind CSS", "Ant Design"],
    coverImage: "/soffcrm/home.jpg",
    thumbnailImage: "/soffcrm/home.jpg",
    gallery: [
      { url: "/soffcrm/home.jpg", caption: "Admin Dashboard" },
      { url: "/soffcrm/home.jpg", caption: "Student Management" },
      { url: "/soffcrm/home.jpg", caption: "Payment Tracking" },
      { url: "/soffcrm/home.jpg", caption: "Financial Reports" },
    ],
    timeline: "Ongoing",
    role: "Frontend Next JS Developer",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    slug: "ilmiyish-scientific-marketplace",
    title: "ilmiyish.uz - Scientific Works Marketplace",
    category: "Web Application",
    shortDescription: "Specialized marketplace for academic researchers and students to publish and purchase scientific research papers, theses, and academic publications.",
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
    coverImage: "/ilmiyish/home.jpg",
    thumbnailImage: "/ilmiyish/home.jpg",
    gallery: [
      { url: "/ilmiyish/home.jpg", caption: "Research Papers Listing" },
      { url: "/ilmiyish/search.jpg", caption: "Advanced Search Interface" },
      { url: "/ilmiyish/paper.jpg", caption: "Paper Details View" },
      { url: "/ilmiyish/author.jpg", caption: "Author Dashboard" },
    ],
    timeline: "Ongoing",
    role: "Frontend Next JS Developer",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    slug: "omborim-chemical-warehouse",
    title: "omborim.uz - Chemical Warehouse Management System",
    category: "Web Application",
    shortDescription: "Comprehensive inventory management system for 300+ chemical warehouses with real-time stock tracking and API integrations.",
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
    coverImage: "/omborim/home.png",
    thumbnailImage: "/omborim/home.png",
    gallery: [
      { url: "/omborim/home.png", caption: "Main Dashboard Overview" },
      { url: "/omborim/invest.png", caption: "Inventory Management" },
      { url: "/omborim/dashboard.png", caption: "Sales Analytics" },
      { url: "/omborim/main.png", caption: "Warehouse Overview" },
    ],
    timeline: "8 months (Q1-Q3 2023)",
    role: "Frontend Developer & UI/UX Designer",
    liveUrl: "https://omborim.uz",
    githubUrl: "#",
  },
  {
    id: 5,
    slug: "mycoal-supply-chain",
    title: "mycoal.uz - Coal Supply Chain Management",
    category: "Web Application",
    shortDescription: "Dynamic supply chain platform for coal distribution with real-time delivery tracking, GPS integration, and logistics optimization.",
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
    coverImage: "/mycoal/home.png",
    thumbnailImage: "/mycoal/home.png",
    gallery: [
      { url: "/mycoal/home.png", caption: "Supply Chain Dashboard" },
      { url: "/mycoal/tracking.png", caption: "Real-time Delivery Tracking" },
      { url: "/mycoal/coal.png", caption: "Performance Analytics" },
      { url: "/mycoal/org.png", caption: "Driver Mobile Interface" },
    ],
    timeline: "6 months (Q2-Q4 2023)",
    role: "Angular Developer & System Architect",
    liveUrl: "https://mycoal.uz",
    githubUrl: "#",
  },
  {
    id: 6,
    slug: "asdk-water-monitoring",
    title: "ASDK UGE - Water Reservoir Monitoring System",
    category: "Web Application",
    shortDescription: "Real-time water reservoir monitoring platform for Uzbekistan's hydro sector with advanced analytics and IoT integration.",
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
    technologies: ["Angular", "Tailwind CSS", "Angular Material", "PrimeNG", "Chart.js", "WebSocket", "IoT Integration"],
    coverImage: "/asdk/home.png",
    thumbnailImage: "/asdk/home.png",
    gallery: [
      { url: "/asdk/home.png", caption: "Real-time Monitoring Dashboard" },
      { url: "/asdk/water.png", caption: "Water Analytics Interface" },
      { url: "/asdk/map.png", caption: "Alert Management System" },
      { url: "/asdk/1.png", caption: "Compliance Reporting" },
    ],
    client: "Ministry of Water Resources, Uzbekistan",
    timeline: "10 months (Q1 2023-Q1 2024)",
    role: "Senior Frontend Developer",
    liveUrl: "https://asdk-uge.web.app",
    githubUrl: "#",
  },
  {
    id: 7,
    slug: "intreaty-legal-platform",
    title: "Intreaty.uz - Legal Document Comparison Tool",
    category: "Web Application",
    shortDescription: "Multi-language document viewer with advanced diff-engine for comparing legal texts across Uzbek, Russian, and English.",
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
    coverImage: "/yuridik/home.png",
    thumbnailImage: "/yuridik/home.png",
    gallery: [
      { url: "/yuridik/home.png", caption: "Document Comparison Interface" },
      { url: "/yuridik/docs.png", caption: "Multi-language Document Viewer" },
      { url: "/yuridik/team.png", caption: "Advanced Search Functionality" },
      { url: "/yuridik/faq.png", caption: "Annotation System" },
    ],
    client: "Legal Research Institute",
    timeline: "5 months (Q3-Q4 2023)",
    role: "Full-Stack Developer",
    liveUrl: "https://intreaty.uz",
    githubUrl: "#",
  },
  {
    id: 8,
    slug: "yetkaz-logistics-platform",
    title: "Yetkaz - Smart Logistics Platform",
    category: "Web Application",
    shortDescription: "Comprehensive auction-based cargo-driver matchmaking platform with real-time tracking, CRM, and multi-payment gateway integration.",
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
    technologies: ["Next.js", "React", "TypeScript", "Redux Toolkit", "MongoDB", "Node.js", "Express.js", "Socket.io", "Tailwind CSS", "Ant Design", "Google Maps API"],
    coverImage: "/yetkaz/hero.png",
    thumbnailImage: "/yetkaz/hero.png",
    gallery: [
      { url: "/yetkaz/hero.png", caption: "Platform Homepage" },
      { url: "/yetkaz/seller.png", caption: "Customer CRM Dashboard" },
      { url: "/yetkaz/driver.png", caption: "Driver Order Portal" },
      { url: "/yetkaz/register.png", caption: "Registration Page" },
      { url: "/yetkaz/login.png", caption: "Login Page" },
      { url: "/yetkaz/verify.png", caption: "Verification Page" },
    ],
    client: "Yetkaz Logistics LLC",
    timeline: "12 months (Q1 2024-Q4 2024)",
    role: "Full-Stack Developer & Product Architect",
    liveUrl: "https://logiflow.uz",
    githubUrl: "https://github.com/logiflow/platform",
  },
  {
    id: 9,
    slug: "pharmacy-management",
    title: "Pharmacy Management System",
    category: "Web Application",
    shortDescription: "Complete pharmacy solution with real-time inventory tracking, sales management, prescription handling, and billing automation.",
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
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Spring Boot", "PostgreSQL", "REST APIs"],
    coverImage: "/apteka/call.png",
    thumbnailImage: "/apteka/call.png",
    gallery: [
      { url: "/apteka/call.png", caption: "Pharmacy Dashboard" },
      { url: "/apteka/admin.png", caption: "Admin Users Management" },
      { url: "/apteka/cash.png", caption: "Doctors Cashbacks" },
      { url: "/apteka/map.png", caption: "Pharmacy Management" },
      { url: "/apteka/sell.png", caption: "Call Center Sales" },
      { url: "/apteka/pharmacies.png", caption: "Pharmacies Directory" },
    ],
    timeline: "7 months (Q1-Q3 2024)",
    role: "Full-Stack Developer",
    liveUrl: "#",
    githubUrl: "#",
  },
]

export { projects }

// Add these functions after the projects array export

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getRelatedProjects(currentSlug: string, limit = 2): RelatedProject[] {
  const currentProject = getProjectBySlug(currentSlug)
  if (!currentProject || !currentProject.relatedProjects) {
    // If no related projects defined, return random projects
    return projects
      .filter((project) => project.slug !== currentSlug)
      .slice(0, limit)
      .map((project) => ({
        slug: project.slug,
        title: project.title,
        category: project.category,
        image: project.thumbnailImage,
      }))
  }

  return currentProject.relatedProjects.slice(0, limit)
}
