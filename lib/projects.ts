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
    slug: "omborim-chemical-warehouse",
    title: "omborim.uz - Chemical Warehouse Management",
    category: "Web Application",
    shortDescription: "Built responsive UIs for 300+ chemical warehouses to manage inventory, sales, and procurement. Integrated Faktura.uz & UzEx.uz APIs with optimized data tables.",
    description: [
      "Omborim.uz is a comprehensive chemical warehouse management system designed to serve over 300 chemical warehouses across Uzbekistan. The platform provides a unified solution for inventory management, sales tracking, and procurement processes.",
      "The application features seamless integration with Faktura.uz and UzEx.uz APIs, enabling automated data synchronization and streamlined business operations. Advanced data tables provide real-time insights into stock levels, sales performance, and supply chain metrics.",
      "Built with modern web technologies, the platform offers a responsive design that works seamlessly across desktop and mobile devices, ensuring warehouse managers can access critical information anywhere.",
    ],
    features: [
      "Inventory management system with real-time stock tracking",
      "Sales analytics dashboard with performance metrics",
      "Procurement workflow automation and supplier management",
      "Integration with Faktura.uz for automated invoicing",
      "UzEx.uz API integration for data exchange",
      "Advanced data tables with filtering and sorting capabilities",
      "Multi-warehouse management and reporting",
      "Mobile-responsive design for on-the-go access",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "Ant Design", "ShadCN", "TypeScript", "REST APIs"],
    coverImage: "/omborim/home.png",
    thumbnailImage: "/omborim/home.png",
    gallery: [
      { url: "/omborim/home.png", caption: "Main Dashboard Overview" },
      { url: "/omborim/invest.png", caption: "Inventory Management Interface" },
      { url: "/omborim/dashboard.png", caption: "Sales Analytics Dashboard" },
      { url: "/omborim/main.png", caption: "Main page" },
    ],
    timeline: "8 months (Q1-Q3 2023)",
    role: "Frontend Developer & UI/UX Designer",
    liveUrl: "https://omborim.uz",
    githubUrl: "#",
    relatedProjects: [
      {
        slug: "mycoal-supply-chain",
        title: "mycoal.uz - Coal Supply Chain Management",
        category: "Web Application",
        image: "/placeholder.svg?height=200&width=350",
      },
      {
        slug: "asdk-water-monitoring",
        title: "ASDK UGE - Water Reservoir Monitoring",
        category: "Web Application",
        image: "/placeholder.svg?height=200&width=350",
      },
    ],
  },
  {
    id: 2,
    slug: "mycoal-supply-chain",
    title: "mycoal.uz - Coal Supply Chain Management",
    category: "Web Application",
    shortDescription: "Developed dynamic dashboards for coal distribution and real-time delivery tracking with Angular, Material UI, and WebSocket.",
    description: [
      "MyCoal.uz is a sophisticated supply chain management platform designed specifically for the coal distribution industry. The system provides real-time visibility into the entire supply chain, from mining operations to end-customer delivery.",
      "The platform features dynamic dashboards that display key performance indicators, delivery statuses, and operational metrics in real-time. WebSocket integration ensures that all stakeholders receive instant updates on shipment status, route changes, and delivery confirmations.",
      "Advanced mapping functionality provides GPS tracking of delivery vehicles, route optimization suggestions, and geofenced delivery confirmations, ensuring efficient and transparent operations throughout the supply chain.",
    ],
    features: [
      "Real-time delivery tracking with GPS integration",
      "Dynamic dashboards with KPI monitoring",
      "WebSocket-powered live updates and notifications",
      "Route optimization and logistics planning",
      "Inventory management for coal storage facilities",
      "Customer portal for order tracking and management",
      "Automated reporting and analytics",
      "Mobile app for delivery drivers and field operations",
    ],
    technologies: ["Angular", "Material UI", "WebSocket", "Maps API", "TypeScript", "RxJS", "Progressive Web App"],
    coverImage: "/mycoal/home.png",
    thumbnailImage: "/mycoal/home.png",
    gallery: [
      { url: "/mycoal/home.png", caption: "Supply Chain Dashboard" },
      { url: "/mycoal/tracking.png", caption: "Real-time Delivery Tracking" },
      { url: "/mycoal/coal.png", caption: "Performance Analytics" },
      { url: "/mycoal/org.png", caption: "Mobile Driver Interface" },
    ],
    timeline: "6 months (Q2-Q4 2023)",
    role: "Angular Developer & System Architect",
    liveUrl: "https://mycoal.uz",
    githubUrl: "#",
    relatedProjects: [
      {
        slug: "omborim-chemical-warehouse",
        title: "omborim.uz - Chemical Warehouse Management",
        category: "Web Application",
        image: "/placeholder.svg?height=200&width=350",
      },
      {
        slug: "pharmacy-management",
        title: "Pharmacy Management System",
        category: "Web Application",
        image: "/placeholder.svg?height=200&width=350",
      },
    ],
  },
  {
    id: 3,
    slug: "asdk-water-monitoring",
    title: "ASDK UGE - Water Reservoir Monitoring",
    category: "Web Application",
    shortDescription: "Platform to monitor water reservoir analytics and digitized operations in Uzbekistan's hydro sector with real-time status indicators.",
    description: [
      "ASDK UGE is a comprehensive water reservoir monitoring platform developed for Uzbekistan's hydro sector digitization initiative. The system provides real-time monitoring and analytics for water reservoirs across the country.",
      "The platform features advanced data visualization tools that transform complex hydrological data into actionable insights. Real-time status indicators provide immediate alerts for water levels, flow rates, and system anomalies, enabling proactive management of water resources.",
      "Built with scalability in mind, the system supports monitoring of multiple reservoir sites simultaneously, with centralized dashboards for regional and national oversight of water resource management.",
    ],
    features: [
      "Real-time water level and flow rate monitoring",
      "Advanced analytics dashboard with predictive insights",
      "Automated alert system for critical thresholds",
      "Historical data analysis and trend reporting",
      "Multi-site monitoring with centralized control",
      "Integration with IoT sensors and monitoring devices",
      "Compliance reporting for regulatory requirements",
      "Mobile-responsive interface for field operations",
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
    relatedProjects: [
      {
        slug: "mycoal-supply-chain",
        title: "mycoal.uz - Coal Supply Chain Management",
        category: "Web Application",
        image: "/placeholder.svg?height=200&width=350",
      },
      {
        slug: "intreaty-legal-platform",
        title: "Intreaty.uz - Legal Document Comparison",
        category: "Web Application",
        image: "/placeholder.svg?height=200&width=350",
      },
    ],
  },
  {
    id: 4,
    slug: "intreaty-legal-platform",
    title: "Intreaty.uz - Legal Document Comparison",
    category: "Web Application",
    shortDescription: "Multi-language document viewer and diff-engine interface allowing users to compare legal texts in Uzbek, Russian, and English.",
    description: [
      "Intreaty.uz is an advanced legal document comparison platform designed to help legal professionals, researchers, and government officials analyze and compare legal documents across multiple languages. The system supports Uzbek, Russian, and English languages.",
      "The platform features a sophisticated diff-engine that highlights differences between document versions, making it easy to track changes, amendments, and variations in legal texts. This is particularly valuable for international treaty analysis and legal document review.",
      "Built with accessibility and usability in mind, the interface provides intuitive navigation through complex legal documents, with advanced search functionality and bookmark features for efficient document review and analysis.",
    ],
    features: [
      "Multi-language document support (Uzbek, Russian, English)",
      "Advanced diff-engine for document comparison",
      "Side-by-side document viewing interface",
      "Highlighted change tracking and annotations",
      "Full-text search across multiple documents",
      "Bookmark and note-taking functionality",
      "Document versioning and history tracking",
      "Export capabilities for comparison reports",
    ],
    technologies: ["Next.js", "Ant Design", "Document Processing", "TypeScript", "React", "PDF.js", "Natural Language Processing"],
    coverImage: "/yuridik/home.png",
    thumbnailImage: "/yuridik/home.png",
    gallery: [
      { url: "/yuridik/home.png", caption: "Document Comparison Interface" },
      { url: "/yuridik/docs.png", caption: "Multi-language Document Viewer" },
      { url: "/yuridik/team.png", caption: "Advanced Search Functionality" },
      { url: "/yuridik/faq.png", caption: "Annotation and Notes System" },
    ],
    client: "Legal Research Institute",
    timeline: "5 months (Q3-Q4 2023)",
    role: "Full-Stack Developer",
    liveUrl: "https://intreaty.uz",
    githubUrl: "#",
    relatedProjects: [
      {
        slug: "asdk-water-monitoring",
        title: "ASDK UGE - Water Reservoir Monitoring",
        category: "Web Application",
        image: "/placeholder.svg?height=200&width=350",
      },
      {
        slug: "crm-education-center",
        title: "CRM for Education Center",
        category: "Web Application",
        image: "/placeholder.svg?height=200&width=350",
      },
    ],
  },
  {
    id: 5,
    slug: "Yetkaz-logistics-platform",
    title: "Yetkaz - Smart Logistics Platform",
    category: "Web Application",
    shortDescription: "Comprehensive logistics platform connecting drivers with customers for cargo delivery services with real-time tracking and CRM functionality.",
    description: [
      "Yetkaz is a cutting-edge logistics platform designed to revolutionize cargo transportation in Uzbekistan. The platform connects customers who need cargo delivery with professional drivers, creating an efficient ecosystem for logistics services.",
      "The system features a guest booking interface similar to Booking.com, allowing users to place orders without registration, while registered users gain access to a comprehensive CRM system for managing their shipments, tracking delivery status, and maintaining delivery history.",
      "For drivers, the platform provides a dedicated dashboard to view available cargo orders, optimize routes, manage earnings, and communicate with customers. The system includes real-time GPS tracking, automated notifications, and comprehensive analytics for both customers and drivers.",
      "Advanced features include dynamic pricing based on distance and cargo type, automated route optimization, integration with payment gateways, and comprehensive reporting tools for business analytics and performance monitoring."
    ],
    features: [
      "Guest booking system for non-registered users",
      "Comprehensive CRM dashboard for registered customers",
      "Driver portal with order management and earnings tracking",
      "Real-time GPS tracking and route optimization",
      "Automated SMS/email notifications and status updates",
      "Dynamic pricing engine based on distance and cargo specifications",
      "Multi-payment gateway integration (Click, Payme, Uzcard)",
      "Advanced analytics and reporting dashboard",
      "Mobile-responsive design with PWA capabilities",
      "Multi-language support (Uzbek, Russian, English)",
      "Customer support chat system and ticketing",
      "Cargo insurance and damage claim management"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Redux Toolkit", "MongoDB", "Node.js", "Express.js", "Socket.io", "Tailwind CSS", "Ant Design", "Google Maps API", "Payment Gateway APIs", "PWA"],
    coverImage: "/yetkaz/hero.png",
    thumbnailImage: "/yetkaz/hero.png",
    gallery: [
      { url: "/yetkaz/hero.png", caption: "Platform Homepage with Booking Interface" },
      { url: "/yetkaz/seller.png", caption: "Customer CRM Dashboard" },
      { url: "/yetkaz/driver.png", caption: "Driver Order Management Portal" },
      { url: "/yetkaz/register.png", caption: "Platform Register Page" },
      { url: "/yetkaz/login.png", caption: "Platform Login Page" },
      { url: "/yetkaz/verify.png", caption: "Platform Verify Page" },
  
    ],
    client: "Yetkaz Logistics LLC",
    timeline: "12 months (Q1 2024-Q4 2024)",
    role: "Full-Stack Developer & Product Architect",
    liveUrl: "https://logiflow.uz",
    githubUrl: "https://github.com/logiflow/platform",
    relatedProjects: [
      {
        slug: "crm-education-center",
        title: "CRM for Education Center",
        category: "Web Application",
        image: "/placeholder.svg?height=200&width=350",
      },
      {
        slug: "pharmacy-management",
        title: "Pharmacy Management System",
        category: "Web Application",
        image: "/placeholder.svg?height=200&width=350",
      },
      {
        slug: "mobile-logistics-app",
        title: "LogiFlow Mobile App (React Native)",
        category: "Mobile Application",
        image: "/placeholder.svg?height=200&width=350",
      }
    ],
  },
   {
    id: 6,
    slug: "pharmacy-management",
    title: "Pharmacy Management System",
    category: "Web Application",
    shortDescription: "Complete pharmacy system with inventory tracking, sales management, and prescription handling with real-time stock updates.",
    description: [
      "The Pharmacy Management System is a comprehensive solution designed to streamline all aspects of pharmacy operations. From inventory management to prescription processing, the system provides a unified platform for efficient pharmacy administration.",
      "The system features real-time stock updates, ensuring accurate inventory levels and automatic reorder notifications. Advanced prescription management includes drug interaction checking, dosage verification, and automated refill reminders for enhanced patient safety.",
      "Built with healthcare compliance in mind, the system adheres to pharmaceutical regulations and provides detailed audit trails for all transactions. The intuitive interface ensures that pharmacy staff can quickly process prescriptions and manage daily operations efficiently.",
    ],
    features: [
      "Real-time inventory tracking with automatic reorder alerts",
      "Prescription management with drug interaction checking",
      "Sales analytics and reporting dashboard",
      "Customer profile management and prescription history",
      "Automated billing and insurance claim processing",
      "Barcode scanning for medication verification",
      "Supplier management and purchase order automation",
      "Compliance reporting and audit trail maintenance",
    ],
    technologies: ["Next.js", "React", "TypeScript", "TailwindCSS", "Node.js", "Spring Boot", "PostgreSQL", "REST APIs"],
    coverImage: "/apteka/call.png",
    thumbnailImage: "/apteka/call.png",
    gallery: [
      { url: "/apteka/call.png", caption: "Pharmacy Dashboard Overview" },
      { url: "/apteka/admin.png", caption: "Admin Users Management Interface" },
      { url: "/apteka/cash.png", caption: "Doctors Cashbacks" },
      { url: "/apteka/map.png", caption: "Admin Pharmacy Add Page" },
      { url: "/apteka/sell.png", caption: "Call Center Pills Sell Page" },
      { url: "/apteka/pharmacies.png", caption: "Call Center Pharmacies Page" },
    ],
    timeline: "7 months (Q1-Q3 2024)",
    role: "Full-Stack Developer",
    liveUrl: "#",
    githubUrl: "#",
    relatedProjects: [
      {
        slug: "mycoal-supply-chain",
        title: "mycoal.uz - Coal Supply Chain Management",
        category: "Web Application",
        image: "/placeholder.svg?height=200&width=350",
      },
      {
        slug: "crm-education-center",
        title: "CRM for Education Center",
        category: "Web Application",
        image: "/placeholder.svg?height=200&width=350",
      },
    ],
  },
   {
    id: 7,
    slug: "crm-education-center",
    title: "CRM for Education Center",
    category: "Web Application",
    shortDescription: "Custom CRM to manage student admissions, payments, schedules, and teacher performance with automated notifications.",
    description: [
      "The Education Center CRM is a comprehensive customer relationship management system specifically designed for educational institutions. It provides a centralized platform to manage student lifecycle from initial inquiry through graduation.",
      "The system streamlines admission processes with automated workflow management, handles complex scheduling for multiple courses and teachers, and provides detailed analytics on student performance and engagement. Payment processing integration ensures seamless fee collection and tracking.",
      "Advanced notification systems keep students, parents, and staff informed about important dates, assignments, and announcements. The platform also includes performance tracking tools for teachers and comprehensive reporting capabilities for administrators.",
    ],
    features: [
      "Student admission and enrollment management",
      "Automated payment processing and fee tracking",
      "Class scheduling and teacher assignment system",
      "Student performance tracking and grade management",
      "Automated notifications for students and parents",
      "Teacher performance analytics and evaluation tools",
      "Financial reporting and revenue analytics",
      "Parent portal for student progress monitoring",
    ],
    technologies: ["Next.js", "React", "Redux Toolkit", "MongoDB", "Spring Boot", "TypeScript", "Material-UI", "Payment Gateway Integration"],
    coverImage: "/tutor/teacher.png",
    thumbnailImage: "/tutor/teacher.png",
    gallery: [
      { url: "/tutor/teacher.png", caption: "Teacher Lesson" },
      { url: "/tutor/task.png", caption: "Task Management Interface" },
      { url: "/tutor/student.png", caption: "Student Dashboard" },
      { url: "/tutor/test.png", caption: "Lesson Tests" },
      { url: "/tutor/teacher-question.png", caption: "Teacher Questions" },
      { url: "/tutor/lessons.png", caption: "Lessons" },
    ],
    client: "Private Education Center",
    timeline: "9 months (Q2 2023-Q1 2024)",
    role: "Lead Developer & System Architect",
    liveUrl: "#",
    githubUrl: "#",
    relatedProjects: [
      {
        slug: "pharmacy-management",
        title: "Pharmacy Management System",
        category: "Web Application",
        image: "/placeholder.svg?height=200&width=350",
      },
      {
        slug: "intreaty-legal-platform",
        title: "Intreaty.uz - Legal Document Comparison",
        category: "Web Application",
        image: "/placeholder.svg?height=200&width=350",
      },
    ],
  },
  //  {
  //   id: 8,
  //   slug: "Auto Help Service",
  //   title: "Auto Help Service",
  //   category: "Web Application",
  //   shortDescription: "Custom CRM to manage student admissions, payments, schedules, and teacher performance with automated notifications.",
  //   description: [
  //     "The Education Center CRM is a comprehensive customer relationship management system specifically designed for educational institutions. It provides a centralized platform to manage student lifecycle from initial inquiry through graduation.",
  //     "The system streamlines admission processes with automated workflow management, handles complex scheduling for multiple courses and teachers, and provides detailed analytics on student performance and engagement. Payment processing integration ensures seamless fee collection and tracking.",
  //     "Advanced notification systems keep students, parents, and staff informed about important dates, assignments, and announcements. The platform also includes performance tracking tools for teachers and comprehensive reporting capabilities for administrators.",
  //   ],
  //   features: [
  //     "Student admission and enrollment management",
  //     "Automated payment processing and fee tracking",
  //     "Class scheduling and teacher assignment system",
  //     "Student performance tracking and grade management",
  //     "Automated notifications for students and parents",
  //     "Teacher performance analytics and evaluation tools",
  //     "Financial reporting and revenue analytics",
  //     "Parent portal for student progress monitoring",
  //   ],
  //   technologies: ["Next.js", "React", "Redux Toolkit", "MongoDB", "Spring Boot", "TypeScript", "Material-UI", "Payment Gateway Integration"],
  //   coverImage: "/placeholder.svg?height=200&width=350",
  //   thumbnailImage: "/placeholder.svg?height=200&width=350",
  //   gallery: [
  //     { url: "/placeholder.svg?height=200&width=350", caption: "CRM Dashboard Overview" },
  //     { url: "/placeholder.svg?height=200&width=350", caption: "Student Management Interface" },
  //     { url: "/placeholder.svg?height=200&width=350", caption: "Class Scheduling System" },
  //     { url: "/placeholder.svg?height=200&width=350", caption: "Performance Analytics Dashboard" },
  //   ],
  //   client: "Private Education Center",
  //   timeline: "9 months (Q2 2023-Q1 2024)",
  //   role: "Lead Developer & System Architect",
  //   liveUrl: "#",
  //   githubUrl: "#",
  //   relatedProjects: [
  //     {
  //       slug: "pharmacy-management",
  //       title: "Pharmacy Management System",
  //       category: "Web Application",
  //       image: "/placeholder.svg?height=200&width=350",
  //     },
  //     {
  //       slug: "intreaty-legal-platform",
  //       title: "Intreaty.uz - Legal Document Comparison",
  //       category: "Web Application",
  //       image: "/placeholder.svg?height=200&width=350",
  //     },
  //   ],
  // },
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
