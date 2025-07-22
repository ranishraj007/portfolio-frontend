export interface PortfolioData {
  about: {
    name: string;
    title: string;
    address: string;
    contact: string;
    email: string;
    github: string;
    linkedin: string;
    summary: string;
  };
  experience: Array<{
    company: string;
    location: string;
    role: string;
    duration: string;
    responsibilities: string[];
  }>;
  education: Array<{
    institution: string;
    location: string;
    degree: string;
    duration: string;
  }>;
  projects: Array<{
    name: string;
    description: string[];
    url?: string;
  }>;
  skills: string[];
  languages: string[];
}

export const portfolioData: PortfolioData = {
  about: {
    name: "Ranish Raj Shrestha",
    title: "Computer Engineer (Frontend Developer)",
    address: "Chandragiri-09, Kathmandu",
    contact: "9840800899",
    email: "ranish.raj.shrestha@gmail.com",
    github: "https://github.com/ranishraj007",
    linkedin: "https://www.linkedin.com/in/ranish-raj-shrestha-89aa33207/",
    summary:
      "Highly motivated and detail-oriented developer with a solid foundation in front-end technologies and a growing proficiency in React. Possess a diverse skill set ranging from traditional programming languages to modern web development frameworks. Skilled in designing and developing CSS and SASS components, complemented by practical knowledge in database tools and queries. Eager to contribute to a dynamic development team and advance in the field of React development.",
  },
  experience: [
    {
      company: "Youth Innovation Lab",
      location: "Baluwatar, Kathmandu",
      role: "Frontend Developer (React) Junior",
      duration: "Oct. 2024 - Present",
      responsibilities: [
        "Developed and deployed multiple web applications using React.",
        "Implemented and tested hooks for client state management.",
        "Integrated RESTful APIs and Axios for data retrieval and editing.",
        "Collaborated with designers and backend teams to ensure seamless development.",
      ],
    },
    {
      company: "Youth Innovation Lab",
      location: "Baluwatar, Kathmandu",
      role: "Frontend Developer (React) Intern",
      duration: "Jul. 2024 - Oct. 2024",
      responsibilities: [
        "Gained hands-on experience with React, state management, and component lifecycle.",
        "Implemented React Router for navigation and applied various styling techniques.",
      ],
    },
    {
      company: "Entegra Sources Pvt. Ltd",
      location: "Baneshwor, Kathmandu",
      role: "Electronics Circuit Designer",
      duration: "Apr. 2023 - Jun. 2024",
      responsibilities: [
        "Designed and tested electronic circuits using Proteus and Arduino IDE.",
        "Troubleshoot circuit layouts and documented designs.",
      ],
    },
    {
      company: "Mediflow Solution Pvt. Ltd",
      location: "Battisputali, Kathmandu",
      role: "Web Developer Intern",
      duration: "Jul. 2020 - Nov. 2020",
      responsibilities: [
        "Assisted in developing responsive websites and debugging web applications.",
      ],
    },
  ],
  education: [
    {
      institution: "Acme Engineering College",
      location: "Kathmandu",
      degree: "Bachelor in Computer Engineering",
      duration: "Aug. 2017 - Aug. 2022",
    },
    {
      institution: "V.S Niketan College",
      location: "Kathmandu",
      degree: "HSEB (+2 science)",
      duration: "Jun. 2013 - Sep. 2015",
    },
    {
      institution: "Pushpasaadan Boarding High School",
      location: "Kathmandu",
      degree: "SLC",
      duration: "Feb. 2007 - Apr. 2013",
    },
  ],
  projects: [
    {
      name: "National Platform for Disaster Risk Reduction (NPDRR)",
      description: [
        "Built reusable React components using Tailwind CSS and Redux Toolkit.",
        "Integrated APIs for dynamic content and created fully responsive pages with optimized layout.",
        "Collaborated closely with team members to ensure smooth workflow and consistency in design and development.",
        "Focused on modular code, reusability, and accessibility.",
      ],
    },
    {
      name: "HEAT AI",
      description: [
        "Worked with a team to build multilingual, responsive, and interactive pages using React, Tailwind CSS, Redux Toolkit, and Mapbox integration.",
        "Implemented custom hooks for language switching and location rendering.",
        "Integrated APIs for dynamic data rendering and ensured accessibility across multiple devices.",
        "Focused on performance optimization and clean component structure.",
      ],
      url: "https://heatai.org/",
    },
    {
      name: "Youth Innovation Lab (Yi Lab) Frontend Development",
      description: [
        "Developed user-friendly, API-integrated interfaces using React, Tailwind CSS, and React Query for state and data management.",
        "Built reusable components, handled dynamic routing with React Router, and ensured responsiveness across devices.",
        "Collaborated with UI/UX team, performed extensive testing and debugging to ensure stability and scalability.",
      ],
      url: "https://youthinnovationlab.org/",
    },
    {
      name: "Shikshya",
      description: [
        "Contributed to frontend development using React, focusing on testing, debugging, and fixing bugs to improve platform stability and user experience.",
      ],
      url: "https://shikshya.org/",
    },
    {
      name: "Creators Mela",
      description: [
        "Built responsive and visually appealing event pages using React and Tailwind CSS, with an emphasis on performance optimization and smooth user navigation.",
      ],
      url: "https://usembassynepal.events/",
    },
    {
      name: "United States Youth Council (USYC)",
      description: [
        "Collaborated on building an interactive, mobile-friendly website using React and Tailwind CSS, with a focus on clean layout design, responsive UI components, and optimized performance.",
      ],
      url: "https://www.usycn.org/",
    },
    {
      name: "NDRRMA (National Disaster Risk Reduction & Management Authority)",
      description: [
        "Reviewed and maintained the existing React-based codebase to ensure stability and performance.",
        "Debugged critical issues, improved UI consistency, and implemented new features to enhance user experience and functionality.",
        "Collaborated with the team to ensure the application met government standards and was optimized for cross-device compatibility.",
      ],
      url: "https://ndrrma.gov.np",
    },
  ],
  skills: [
    "HTML",
    "CSS",
    "Javascript",
    "Redux",
    "Redux Toolkit",
    "React Query",
    "Microsoft Office Word",
    "Excel",
    "PowerPoint",
    "Time management",
    "Communication",
    "Problem Solving",
    "GIT",
    "GitHub",
    "Bootstrap",
    "Tailwind",
    "Restful APIs integration",
    "Analyzing",
    "Observing",
    "Critical thinking",
    "MapBox Studio",
    "MapBox GL JS",
  ],
  languages: ["Nepali", "English", "Newwari", "Hindi"],
};