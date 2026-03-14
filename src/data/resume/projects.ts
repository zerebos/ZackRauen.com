export const key = [
    {
        title: "BetterDiscord",
        type: "Open Source",
        slug: "/projects/betterdiscord",
        github: "BetterDiscord/BetterDiscord",
        blurb: "Created and led a widely adopted client modification for Discord, using React, Node, and reverse-engineering techniques to integrate cleanly with a closed-source platform. Grew the project to ~9,000 GitHub stars and over 50M downloads, establishing it as the most popular Discord mod.",
    },
    {
        title: "betterdiscord.app",
        type: "Open Source",
        github: "BetterDiscord/betterdiscord.app",
        blurb: "Rebuilt a legacy codebase into a modern TypeScript + SvelteKit + Bun + Drizzle stack using AI-assisted workflows. Migrated to production within one month, now serving ~100M monthly requests with improved reliability and reduced hardware usage. The modern stack also enabled other developers to contribute new features and fixes more easily.",
    },
    {
        title: "Ghostty Config",
        type: "Open Source",
        github: "zerebos/ghostty-config",
        blurb: "Developed a macOS-style configuration UI for the Ghostty terminal using SvelteKit SPA mode, with automated updates powered by AI-driven maintenance workflows. Reached 3,000+ GitHub stars and is actively used by the Ghostty community and is influencing plans for future native settings UI integration.",
    },
    {
        title: "Trilium Notes",
        type: "Open Source",
        github: "TriliumNext/Trilium",
        blurb: "Contributed major improvements to the Trilium Notes ecosystem, including a full rewrite of the extension system, a redesign of public share pages, and improvements to both developer tooling and user-facing extensions. Helped revitalize the project, leading to a surge of community contributions and 10,000+ new GitHub stars.",
    },
    {
        title: "CLI Tools",
        type: "IBM Internal",
        blurb: "Modernized internal IBM CLI tools by rewriting system-dependent utilities in Go for cross-platform compatibility, including mainframe support. The new tools became widely adopted across teams due to improved usability and local development workflows. Used real developer feedback to make improvements over existing systems.",
    },
    {
        title: "DumpXTR",
        type: "IBM Internal",
        blurb: "Revived a defunct mainframe memory-dump extraction library by converting it into a modern Go-based ecosystem with CLI tools, language bindings, and WASM support. Enabled multiple teams to build improved debugging workflows on top of the new system. Used internal AI coding agents to accelerate the conversion process.",
    },
    {
        title: "Homelab",
        type: "Personal",
        blurb: "Engineered a multi-server homelab environment with reproducible Docker deployments, automated backups, UPS-aware shutdown orchestration, custom dashboards, multi-node monitoring/analytics, and centralized log monitoring. Supports daily use by myself, friends, and family with production-grade reliability.",
    },
];


export const academic = [
    {
        title: "Autonomous Vehicle Robotics",
        type: "Computer Engineering Senior Design",
        slug: "/projects/car",
        github: "zerebos/Intelligent-Line-And-Marker-Tracking-Car",
        blurb: "Led a small team that designed and developed a small autonomous car that followed a track made from a black line. The car detected sign posts, turning as directed at intersections. When placed away from the track, the car successfully located the track. The car was controlled by a K64F microcontroller programmed to use both mechanical front steering as well as tank-drive style differential.",
    },
    {
        title: "Hardware & Software Interaction",
        type: "Computer Engineering Lab",
        github: "zerebos/Hangman",
        blurb: "Designed and implemented a working Hangman GUI that connects to a serial adapter interfaced to an external PS/2 keyboard. The software included threading to send data to an external LCD display asynchronously. This project also included grabbing and converting the data for the serial adapter via hardware.",
    }
];


export default [...key, ...academic];