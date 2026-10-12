export interface ProjectImage {
    src: string
    alt: string
    width?: number
    height?: number
}

/** Bouwstenen waaruit een sprint-onderdeel bestaat. */
export type SprintBlock =
    | { type: 'text'; paragraphs: string[] }
    /** Breed overzicht op volle contentbreedte, klikbaar (lightbox) */
    | { type: 'image-wide'; image: ProjectImage }
    /** Twee foto's: naast elkaar op desktop, onder elkaar op mobiel */
    | { type: 'image-pair'; images: [ProjectImage, ProjectImage] }
    /** Twee blokken naast elkaar: wat werkte / verbeterpunten */
    | { type: 'feedback'; positive: FeedbackList; attention: FeedbackList }

export interface FeedbackList {
    title: string
    items: string[]
}

export interface SprintSection {
    /** Gebruikt als anker, bijv. 'sprint-1-eerste-design' */
    id: string
    title: string
    blocks: SprintBlock[]
}

export interface Sprint {
    number: number
    /** 'done' = gepubliceerd, 'soon' = getoond als "binnenkort" in de navigatie */
    status: 'done' | 'soon'
    goal?: string
    sections?: SprintSection[]
}

export interface Project {
    title: string
    description: string
    technologies: string[]
    category: string
    /** Externe link (bijv. GitLab) */
    link?: string
    /** Als gezet: project heeft een eigen detailpagina op /projects/:slug */
    slug?: string
    subtitle?: string
    thumbnail?: ProjectImage
    detail?: ProjectDetail
}

export interface ProjectDetail {
    heading: string
    seoDescription: string
    intro: string[]
    sprints: Sprint[]
}

const darkTechImg = (file: string, alt: string, width: number, height: number): ProjectImage => ({
    src: `/projects/dark-tech/${file}`,
    alt,
    width,
    height,
})

const darkTechImages = {
    eersteDesign: darkTechImg(
        'sprint1-eerste-design.png',
        'Eerste UI-design van de Stijlspiegel-app: welkomstscherm, stijlscan, feed, aanbeveling en voortgangsscherm',
        1468, 728,
    ),
    uitgebreidDesign: darkTechImg(
        'sprint1-uitgebreid-design.png',
        'Uitgebreid design na verwerking van de guerrilla-test-feedback',
        1384, 1102,
    ),
    prototype1: darkTechImg(
        'sprint1-fysiek-prototype-1.jpg',
        'Kartonnen schaalmodel van de winkelruimte met ingelijste spiegel aan de wand',
        1000, 1333,
    ),
    prototype2: darkTechImg(
        'sprint1-fysiek-prototype-2.jpg',
        'Kartonnen schaalmodel van de winkelruimte met zitbank voor de spiegel',
        1000, 1333,
    ),
}

export const projects: Project[] = [
    {
        slug: 'dark-tech-semester-1',
        title: 'Dark Tech – Semester 1',
        subtitle: 'Smaakmanipulatie',
        description: 'Een installatie en app die laten zien hoe makkelijk je smaak te sturen is – via herhaling, sociale bevestiging en een spiegel die meekijkt.',
        technologies: ['UX/UI Design', 'Prototyping', 'User Testing', 'Dark Patterns'],
        category: 'Design',
        thumbnail: darkTechImages.eersteDesign,
        detail: {
            heading: 'Dark Tech – Semester 1: Smaakmanipulatie',
            seoDescription: 'Devlog van het schoolproject Smaakmanipulatie (Dark Tech, semester 1): een installatie en app die laten zien hoe makkelijk je smaak te sturen is.',
            intro: [
                'Dit is de devlog van mijn bijdrage aan het schoolproject Smaakmanipulatie, onderdeel van Dark Tech in semester 1. Het project bestaat uit een fysieke installatie en een app, en loopt in vier sprints. Per sprint laat ik zien wat ik heb gemaakt, getest en geleerd.',
                'Het idee: we laten mensen ervaren hoe hun smaak in kleding gemanipuleerd kan worden – via herhaling en sociale bevestiging. Iets wat je eerst lelijk vindt, ga je na honderd keer zien toch mooi vinden. Aan het eind krijgt de bezoeker inzicht in hoe hij gemanipuleerd is.',
            ],
            sprints: [
                {
                    number: 1,
                    status: 'done',
                    goal: 'Een eerste werkend concept van de app neerzetten, dit laten testen door buitenstaanders (guerrilla test), en op basis daarvan het design verbeteren en uitbreiden.',
                    sections: [
                        {
                            id: 'sprint-1-eerste-design',
                            title: '1. Eerste design',
                            blocks: [
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'Ik heb een eerste UI-design gemaakt voor de app die hoort bij de "Stijlspiegel" (de spiegel-installatie in de winkel). De flow: een bezoeker wordt automatisch ingelogd via de spiegel, krijgt een stijlscan met een score en aandachtspunten, en komt in een feed terecht met gepersonaliseerde kledingaanbevelingen – inclusief een voortgangsscherm met statistieken.',
                                    ],
                                },
                                { type: 'image-wide', image: darkTechImages.eersteDesign },
                            ],
                        },
                        {
                            id: 'sprint-1-guerrilla-test',
                            title: '2. Guerrilla test',
                            blocks: [
                                {
                                    type: 'text',
                                    paragraphs: ['Met dit eerste design heb ik een guerrilla test afgenomen. De belangrijkste resultaten:'],
                                },
                                {
                                    type: 'feedback',
                                    positive: {
                                        title: 'Wat goed werkte',
                                        items: [
                                            'Welkomstpagina ziet er goed uit',
                                            'Scorescherm is overzichtelijk, met duidelijke aandachtspunten',
                                            'Suggesties en het kopen van suggesties zien er goed uit',
                                            'De app spreekt voor zich – geen uitleg nodig',
                                        ],
                                    },
                                    attention: {
                                        title: 'Verbeterpunten',
                                        items: [
                                            'Het fysieke prototype was onduidelijk zonder toelichting; testers moesten gokken',
                                            'Nergens in de app wordt daadwerkelijk bewustzijn gecreëerd rond het onderwerp (manipulatie van smaak)',
                                            'Statistieken zijn nergens terug te zien',
                                        ],
                                    },
                                },
                            ],
                        },
                        {
                            id: 'sprint-1-feedback-verwerkt',
                            title: '3. Feedback verwerkt + uitgebreid naar meer schermen',
                            blocks: [
                                {
                                    type: 'text',
                                    paragraphs: ['Op basis van deze feedback heb ik het design aangepast en uitgebreid naar meer schermen.'],
                                },
                                { type: 'image-wide', image: darkTechImages.uitgebreidDesign },
                            ],
                        },
                        {
                            id: 'sprint-1-fysiek-prototype',
                            title: '4. Fysiek prototype',
                            blocks: [
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'Het fysieke prototype en de app vullen elkaar aan. Het prototype stelt een winkel voor met een spiegel die bezoekers subtiel fotografeert; die foto\'s vormen de input voor de stijlscan in de app – vandaar dat je in de app automatisch wordt ingelogd via de "Stijlspiegel" en meteen een score en aandachtspunten te zien krijgt. Ik heb dit concept tastbaar gemaakt met een kartonnen schaalmodel van de winkelruimte: een ingelijste "spiegel" aan de wand en een zitbank. Dit sluit ook aan op het verbeterpunt uit de guerrilla test dat het fysieke prototype zonder toelichting onduidelijk was – testers begrepen niet meteen dat de spiegel hen fotografeert.',
                                    ],
                                },
                                { type: 'image-pair', images: [darkTechImages.prototype1, darkTechImages.prototype2] },
                            ],
                        },
                    ],
                },
                // Sprint 2–4: zet status op 'done' en vul goal + sections (zelfde vorm als Sprint 1).
                // Afbeeldingen: zet ze in public/projects/dark-tech/ en voeg ze toe aan darkTechImages hierboven.
                { number: 2, status: 'soon' },
                { number: 3, status: 'soon' },
                { number: 4, status: 'soon' },
            ],
        },
    },
    {
        slug: 'ai-stylist-mirror',
        title: 'AI Stylist Mirror',
        description: 'Mijn Dark Tech semesterproject over AI-styling, smaakmanipulatie en de vraag waar persoonlijk advies overgaat in sturen.',
        technologies: ['React Native', 'Expo', 'Supabase', 'AI', 'Dashboard'],
        category: 'Mobile AI App',
        thumbnail: { src: '/ai-stylist/ai-stylist-home.jpg', alt: 'Algemeen startscherm van AI Stylist Mirror', width: 700, height: 1155 },
    },
    {
        title: 'Dokkie',
        description: 'Een betaalapp waarin ik TypeScript, DOM-structuur en object-georienteerd programmeren heb toegepast.',
        technologies: ['HTML', 'CSS', 'TypeScript'],
        link: 'https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2023-2024/out-e-cs-se/PB1-topaly1.git',
        category: 'Frontend',
    },
    {
        title: 'Code Exchange',
        description: 'Een Q&A platform waarin gebruikers vragen kunnen plaatsen en antwoorden kunnen bekijken.',
        technologies: ['HTML', 'CSS', 'TypeScript', 'OOP'],
        link: 'https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2023-2024/out-e-cs-se/blok-2/sooxeequulee88.git',
        category: 'Frontend',
    },
    {
        title: 'The Game',
        description: 'Een interactieve browsergame gebouwd met Lit, TypeScript en duidelijke game-logica.',
        technologies: ['TypeScript', 'Lit', 'Game Engine', 'OOP'],
        link: 'https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2023-2024/out-e-cs-se/blok-3/riizooxoovoo10.git',
        category: 'Game',
    },
    {
        title: 'Webshop',
        description: 'Een fullstack webshop met authenticatie, databasekoppeling en beheerfunctionaliteit.',
        technologies: ['Node.js', 'Express', 'MySQL', 'TypeScript', 'Lit'],
        link: 'https://gitlab.fdmci.hva.nl/propedeuse-hbo-ict/onderwijs/student-projecten/2023-2024/out-e-cs-se/blok-4/haayaazoosii78.git',
        category: 'Fullstack',
    },
    {
        title: 'Elections',
        description: 'Een applicatie voor verkiezingsdata met Spring Boot, Vue en een duidelijke frontend.',
        technologies: ['Java', 'Spring Boot', 'Vue', 'TailwindCSS'],
        link: 'https://gitlab.fdmci.hva.nl/semester-3-hbo-ict/onderwijs/student-projecten/2024-2025/out-s-se-gd/semester-1/luuhiijaafee13.git',
        category: 'Fullstack',
    },
]

export const findProject = (slug: string) => projects.find((project) => project.slug === slug)
