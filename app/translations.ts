/**
 * Every human-readable string in the site, in both languages. Plain objects —
 * no i18n library. `LangProvider` picks one by `lang` and hands it over as `t`.
 *
 * `es` is typed as `Translations`, so a key that is missing, misspelled or
 * added to only one language fails `tsc` instead of silently rendering English.
 *
 * NOT translated, on purpose — industry terminology and proper nouns read the
 * same to a Spanish-speaking developer, and translating them looks amateurish:
 * frontend · full stack · backend · stack · deploy · landing page · web app ·
 * e-commerce · auth · dashboard · CRUD · source · demo · job titles · company,
 * project and technology names. Those live in `app/data/portfolio.ts`.
 */

const en = {
    nav: {
        about: "about",
        work: "work",
        stack: "stack",
        projects: "projects",
        contact: "contact",
    },

    hero: {
        // the two display lines; order flips between languages
        titleLine1: "Full stack",
        titleLine2: "Developer",
        tagline:
            "I build interfaces with modern tooling and keep the code clean, efficient and scalable — from the design file to the deploy.",
        ctaProjects: "./projects",
        ctaContact: "./contact",
    },

    about: {
        heading: "about me",
        intro: "Hi — I'm Manuel Haas, a full stack developer based in Mexico.",
        secondary:
            "Four years shipping web and mobile products: design systems, animation work, and the unglamorous performance passes that make them feel instant.",
        support:
            "Most of my work sits between design and implementation — I build the components, then keep them consistent as the product grows.",
        certificationsLabel: "CERTIFICATIONS",
        counters: {
            shippedProjects: "SHIPPED PROJECTS",
            yearsBuilding: "YEARS BUILDING",
            toolsInRotation: "TOOLS IN ROTATION",
        },
    },

    stack: {
        heading: "stack",
        hint: "languages — click one to see the projects built with it",
    },

    experience: {
        heading: "experience",
        // job titles stay in English in both languages
        jobs: {
            espectroBiomedico: {
                period: "Aug 2024 — May 2025",
                length: "10 months",
                place: "Espectro Biomédico",
                role: "Software developer (volunteer) · Kotlin & Android",
            },
            logbookPlatform: {
                period: "Aug 2023 — Dec 2023",
                length: "5 months",
                place: "Internal Logbook Platform",
                role: "Full-stack developer (internship) · React",
            },
            jfxStudios: {
                period: "Jan 2023 — Aug 2023",
                length: "8 months",
                place: "JFX Studios",
                role: "Mobile developer · Kotlin, Firebase & Google Maps",
            },
        },
    },

    projects: {
        heading: "projects",
        // renders as `filtered: <tech> · <count>`
        filtered: "filtered:",
        clear: "clear ✕",
        // `{tech}` is replaced with the active technology
        empty: "no projects tagged {tech} yet —",
        clearFilter: "clear filter",
        // renders above each card title as `PROJECT 01 · 2025` — the number is
        // the card's position in the list, not a month
        projectLabel: "PROJECT",
        visitSite: "visit site ↗",
        viewOnStore: "Google Play ↗",
        // click a screenshot to see it full size over the page
        shotZoom: "see larger",
        shotClose: "close",
        seeAll: "see all projects →",
        // keyed by project slug; `facts` renders top-to-bottom as written;
        // `shots` is the alt text for each screenshot, same order as the
        // `shots` paths in `app/data/portfolio.ts`
        items: {
            "LeagueAPI": {
                blurb:
                    "Android app to search for any summoner and explore their match history in League of Legends, displaying detailed per-match statistics — powered by the official Riot Games API.",
                shots: ["Main screen", "Match detail"],
                facts: [
                    { label: "ROLE", value: "Solo build" },
                    { label: "YEAR", value: "2025" },
                    { label: "PLATFORM", value: "Android" },
                    { label: "STATUS", value: "Completed" },
                ],
            },
            "school-inventory": {
                blurb:
                    "Android app for keeping a school's inventory: register items, browse them and update them from the device, stored locally with Room.",
                shots: [
                    "Inventory list",
                    "Item detail",
                    "New item",
                    "Search",
                    "Categories",
                    "Loans",
                ],
                facts: [
                    { label: "ROLE", value: "Solo build" },
                    { label: "YEAR", value: "2025" },
                    { label: "PLATFORM", value: "Android" },
                    { label: "STATUS", value: "Completed" },
                ],
            },
            mashuezus: {
                blurb:
                    "Android app to help with the care of your pet, published on Google Play and built at JFX Studios: a live map of pets with Google Maps and geolocation, a directory of vets, adoptions and local events, all kept in sync with Firebase.",
                shots: ["Main menu", "Pets map", "Vets", "Adoptions", "Events"],
                facts: [
                    { label: "ROLE", value: "Mobile developer · JFX Studios" },
                    { label: "YEAR", value: "2023" },
                    { label: "PLATFORM", value: "Android" },
                    { label: "STATUS", value: "Published" },
                ],
            },
        },
    },

    nameBand: {
        line1: "FULL STACK",
        line2: "DEVELOPER",
        downloadCv: "download CV ↓",
    },

    contact: {
        heading: "contact",
        intro:
            "Tell me about the project. I reply within a day, usually with questions.",
        downloadCv: "download CV ↓",
        form: {
            name: "FULL NAME",
            namePlaceholder: "Your name",
            email: "EMAIL",
            emailPlaceholder: "you@company.com",
            enquiry: "ENQUIRY TYPE",
            enquiryOptions: {
                webApp: "Web app",
                landingPage: "Landing page",
                mobileApp: "Mobile app",
                other: "Something else",
            },
            message: "MESSAGE",
            messagePlaceholder: "What are you building?",
            submit: "send message →",
            sending: "sending…",
            sent: "Message sent. I'll get back to you within a day.",
            invalid: "Check your name, email and message, then send it again.",
            badEmail: "That email address can't receive mail. Check it for typos.",
            failed: "The message couldn't be sent. Try again, or write to me on LinkedIn.",
        },
    },

    footer: {
        links: {
            home: "home",
            about: "about",
            stack: "stack",
            experience: "experience",
            featuredProjects: "featured projects",
            allProjects: "all projects",
            contact: "contact",
        },
        buildNote: "built with too much coffee",
    },

    meta: {
        title: "Manuel Haas — Full stack developer",
        description:
            "I build interfaces with modern tooling and keep the code clean, efficient and scalable — from the design file to the deploy.",
    },
}

export type Translations = typeof en

const es: Translations = {
    nav: {
        about: "sobre mí",
        work: "experiencia",
        stack: "stack",
        projects: "proyectos",
        contact: "contacto",
    },

    hero: {
        // Spanish puts the noun first: "Desarrollador / Full stack"
        titleLine1: "Desarrollador",
        titleLine2: "Full stack",
        tagline:
            "Construyo interfaces con herramientas modernas y mantengo el código limpio, eficiente y escalable — del archivo de diseño al deploy.",
        ctaProjects: "./proyectos",
        ctaContact: "./contacto",
    },

    about: {
        heading: "sobre mí",
        intro: "Hola — soy Manuel Haas, desarrollador full stack con base en México.",
        secondary:
            "Cuatro años lanzando productos web y móviles: design systems, trabajo de animación y esos ajustes de rendimiento poco glamorosos que los hacen sentir instantáneos.",
        support:
            "Casi todo mi trabajo vive entre el diseño y la implementación — construyo los componentes y después los mantengo consistentes mientras el producto crece.",
        certificationsLabel: "CERTIFICACIONES",
        counters: {
            shippedProjects: "PROYECTOS ENTREGADOS",
            yearsBuilding: "AÑOS CONSTRUYENDO",
            toolsInRotation: "HERRAMIENTAS EN ROTACIÓN",
        },
    },

    stack: {
        heading: "stack",
        hint: "lenguajes — haz clic en uno para ver los proyectos hechos con él",
    },

    experience: {
        heading: "experiencia",
        jobs: {
            espectroBiomedico: {
                period: "ago 2024 — may 2025",
                length: "10 meses",
                place: "Espectro Biomédico",
                role: "Software developer (voluntario) · Kotlin y Android",
            },
            logbookPlatform: {
                period: "ago 2023 — dic 2023",
                length: "5 meses",
                place: "Internal Logbook Platform",
                role: "Full-stack developer (prácticas) · React",
            },
            jfxStudios: {
                period: "ene 2023 — ago 2023",
                length: "8 meses",
                place: "JFX Studios",
                role: "Mobile developer · Kotlin, Firebase y Google Maps",
            },
        },
    },

    projects: {
        heading: "proyectos",
        filtered: "filtrado:",
        clear: "limpiar ✕",
        empty: "todavía no hay proyectos con {tech} —",
        clearFilter: "limpiar filtro",
        projectLabel: "PROYECTO",
        visitSite: "visitar sitio ↗",
        viewOnStore: "Google Play ↗",
        shotZoom: "ver más grande",
        shotClose: "cerrar",
        seeAll: "ver todos los proyectos →",
        items: {
            "LeagueAPI": {
                blurb:
                    "App Android para buscar cualquier invocador y explorar su historial de partidas en League of Legends Mostrando estadísticas detalladas por partida — consumiendo la API oficial de Riot Games.",
                shots: ["Pantalla principal", "Detalle de partida"],
                facts: [
                    { label: "ROL", value: "Proyecto individual" },
                    { label: "AÑO", value: "2025" },
                    { label: "PLATAFORMA", value: "Android" },
                    { label: "ESTADO", value: "Terminado" },
                ],
            },
            "school-inventory": {
                blurb:
                    "App Android para llevar el inventario de una escuela: registrar artículos, consultarlos y actualizarlos desde el dispositivo, con almacenamiento local en Room.",
                shots: [
                    "Listado de inventario",
                    "Detalle de artículo",
                    "Alta de artículo",
                    "Búsqueda",
                    "Categorías",
                    "Préstamos",
                ],
                facts: [
                    { label: "ROL", value: "Proyecto individual" },
                    { label: "AÑO", value: "2025" },
                    { label: "PLATAFORMA", value: "Android" },
                    { label: "ESTADO", value: "Terminado" },
                ],
            },
            mashuezus: {
                blurb:
                    "App Android para que ayude al cuidado de su mascota, publicada en Google Play y desarrollada en JFX Studios: mapa de mascotas en tiempo real con Google Maps y geolocalización, directorio de veterinarios, adopciones y eventos locales, todo sincronizado con Firebase.",
                shots: ["Menú principal", "Mapa de mascotas", "Veterinarios", "Adopciones", "Eventos"],
                facts: [
                    { label: "ROL", value: "Mobile developer · JFX Studios" },
                    { label: "AÑO", value: "2023" },
                    { label: "PLATAFORMA", value: "Android" },
                    { label: "ESTADO", value: "Publicado" },
                ],
            },
        },
    },

    nameBand: {
        line1: "DESARROLLADOR",
        line2: "FULL STACK",
        downloadCv: "descargar CV ↓",
    },

    contact: {
        heading: "contacto",
        intro:
            "Cuéntame sobre el proyecto. Respondo en un día, normalmente con preguntas.",
        downloadCv: "descargar CV ↓",
        form: {
            name: "NOMBRE COMPLETO",
            namePlaceholder: "Tu nombre",
            email: "CORREO",
            emailPlaceholder: "tu@empresa.com",
            enquiry: "TIPO DE CONSULTA",
            enquiryOptions: {
                webApp: "Web app",
                landingPage: "Landing page",
                mobileApp: "Mobile app",
                other: "Otra cosa",
            },
            message: "MENSAJE",
            messagePlaceholder: "¿Qué estás construyendo?",
            submit: "enviar mensaje →",
            sending: "enviando…",
            sent: "Mensaje enviado. Te respondo en un día.",
            invalid: "Revisa tu nombre, correo y mensaje, y vuelve a enviarlo.",
            badEmail: "Ese correo no puede recibir mensajes. Revisa que esté bien escrito.",
            failed: "No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme por LinkedIn.",
        },
    },

    footer: {
        links: {
            home: "inicio",
            about: "sobre mí",
            stack: "stack",
            experience: "experiencia",
            featuredProjects: "proyectos destacados",
            allProjects: "todos los proyectos",
            contact: "contacto",
        },
        buildNote: "hecho con demasiado café",
    },

    meta: {
        title: "Manuel Haas — Full stack developer",
        description:
            "Construyo interfaces con herramientas modernas y mantengo el código limpio, eficiente y escalable — del archivo de diseño al deploy.",
    },
}

export const translations = { en, es }

export type Lang = keyof typeof translations
