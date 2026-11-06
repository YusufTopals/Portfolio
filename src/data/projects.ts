export interface ProjectImage {
    src: string
    alt: string
    width?: number
    height?: number
}

/** Bouwstenen waaruit een sprint-onderdeel bestaat. */
export type SprintBlock =
    /** Lopende tekst; optioneel met een vetgedrukte aanloop ("Welkomstscherm.") voor de eerste alinea */
    | { type: 'text'; paragraphs: string[]; lead?: string }
    /** Breed overzicht op volle contentbreedte, klikbaar (lightbox) */
    | { type: 'image-wide'; image: ProjectImage }
    /** Twee foto's: naast elkaar op desktop, onder elkaar op mobiel */
    | { type: 'image-pair'; images: [ProjectImage, ProjectImage] }
    /** Twee blokken naast elkaar: wat werkte / verbeterpunten */
    | { type: 'feedback'; positive: FeedbackList; attention: FeedbackList }
    /** Thema's met aantal (bijv. testers); balkbreedte = aantal t.o.v. het hoogste in de lijst */
    | { type: 'bars'; title: string; unit: string; items: BarItem[] }
    /** Kleine stat-blokjes naast elkaar, bijv. "14/16" */
    | { type: 'stats'; title?: string; items: StatItem[] }
    /** Opsomming, bijv. conclusies */
    | { type: 'list'; items: string[] }

export interface BarItem {
    label: string
    count: number
}

export interface StatItem {
    value: string
    label: string
}

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
    sprint2Welkom: darkTechImg(
        'sprint2-welkom.jpg',
        'Welkomstscherm met live-tijdlijn van de Stijlspiegel',
        1600, 781,
    ),
    sprint2Stijlscan: darkTechImg(
        'sprint2-stijlscan.jpg',
        'Stijlscan met score en drie aandachtspunten',
        1600, 1087,
    ),
    sprint2Feed: darkTechImg(
        'sprint2-feed.jpg',
        'Feed met vrienden, trends en aanbevelingen',
        1600, 1198,
    ),
    sprint2Profiel: darkTechImg(
        'sprint2-profiel.jpg',
        'Profielpagina met gegevens gemeten door de Stijlspiegel',
        1600, 1241,
    ),
    sprint2Dashboard: darkTechImg(
        'sprint2-dashboard.jpg',
        'Dashboard met beïnvloedingsscore en gebruikte tactieken',
        1600, 1243,
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
            seoDescription: 'Devlog van Smaakmanipulatie (Dark Tech, semester 1): een spiegel-installatie en werkende app die laten zien hoe makkelijk je smaak te sturen is, getest met 21 bezoekers op Society.',
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
                {
                    number: 2,
                    status: 'done',
                    goal: 'Het design uit sprint 1 omzetten naar een werkende app (front-end en back-end) en het prototype testen met echte bezoekers op Society.',
                    sections: [
                        {
                            id: 'sprint-2-app',
                            title: '1. De app gerealiseerd',
                            blocks: [
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'Ik heb mijn Figma-design uit sprint 1 gerealiseerd als werkende app, zowel de front-end als de back-end. De werknaam is nu Smaakmanipulate. De flow uit sprint 1 werkt nu echt: de Stijlspiegel herkent je, maakt een lichaamsscan en past je feed daarop aan.',
                                    ],
                                },
                                {
                                    type: 'text',
                                    lead: 'Figma-design.',
                                    paragraphs: [
                                        'Dit is het design uit Figma waar ik vanuit ben gegaan. Hieronder per scherm hoe het in de werkende app is geworden.',
                                    ],
                                },
                                { type: 'image-wide', image: darkTechImages.uitgebreidDesign },
                                {
                                    type: 'text',
                                    lead: 'Welkomstscherm.',
                                    paragraphs: [
                                        'Na herkenning door de Stijlspiegel log je automatisch in. Een live-tijdlijn laat stap voor stap zien wat de spiegel deed: herkend, lichaamsscan, feed aangepast, activiteit van vrienden toegevoegd.',
                                    ],
                                },
                                { type: 'image-wide', image: darkTechImages.sprint2Welkom },
                                {
                                    type: 'text',
                                    lead: 'Stijlscan.',
                                    paragraphs: [
                                        'De foto uit de spiegel krijgt een stijlscore (62/100), afgezet tegen het gemiddelde van je vrienden (78). Drie aandachtspunten wijzen aan wat er "mis" is, zoals schoenen die niet waterdicht zijn omdat er morgen regen wordt verwacht.',
                                    ],
                                },
                                { type: 'image-wide', image: darkTechImages.sprint2Stijlscan },
                                {
                                    type: 'text',
                                    lead: 'Feed.',
                                    paragraphs: [
                                        'Vrienden bovenaan, trends uit je stad en aanbevelingen met "-20% via de spiegel": sociale druk en exclusiviteit als sturingsmiddel.',
                                    ],
                                },
                                { type: 'image-wide', image: darkTechImages.sprint2Feed },
                                {
                                    type: 'text',
                                    lead: 'Profiel.',
                                    paragraphs: [
                                        'Laat zien wat de spiegel van je weet: persoonlijke gegevens, maar ook lengte, kledingmaat en postuur, "gemeten zonder dat je iets hoefde te doen".',
                                    ],
                                },
                                { type: 'image-wide', image: darkTechImages.sprint2Profiel },
                                {
                                    type: 'text',
                                    lead: 'Dashboard.',
                                    paragraphs: [
                                        'Nieuw in deze sprint en een direct antwoord op twee verbeterpunten uit sprint 1: er werd geen bewustzijn gecreëerd en er waren geen statistieken. Het dashboard toont een live beïnvloedingsscore, momenten van beïnvloeding, gedeelde datapunten en welke tactieken er op je zijn gebruikt (onzekerheid uit je scan, score onder vrienden, sociale druk, exclusieve spiegelprijs).',
                                    ],
                                },
                                { type: 'image-wide', image: darkTechImages.sprint2Dashboard },
                            ],
                        },
                        {
                            id: 'sprint-2-usertest',
                            title: '2. Usertest op Society',
                            blocks: [
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'Op Society hebben 21 bezoekers het prototype getest: de spiegel met ingebouwd scherm en camera, waarop je accessoires kiest. Daarna vulden ze een formulier in met drie open vragen en twee keuzevragen. Hieronder staan de antwoorden gegroepeerd per thema.',
                                    ],
                                },
                                {
                                    type: 'bars',
                                    title: 'Wat goed werkte',
                                    unit: 'aantal testers',
                                    items: [
                                        { label: 'De spiegel met ingebouwd scherm ziet er goed uit', count: 9 },
                                        { label: 'Technisch werkte het meteen, de camera herkende je', count: 4 },
                                        { label: 'Makkelijk en duidelijk', count: 4 },
                                        { label: 'Creatief, innovatief concept', count: 3 },
                                        { label: 'Jezelf en het product tegelijk zien', count: 2 },
                                    ],
                                },
                                {
                                    type: 'bars',
                                    title: 'Wat minder goed werkte',
                                    unit: 'aantal testers',
                                    items: [
                                        { label: 'De dark kant / manipulatie was niet duidelijk genoeg', count: 6 },
                                        { label: 'Weinig keuze, beperkte inhoud op het scherm', count: 5 },
                                        { label: 'Weinig interactie of reactie na een keuze', count: 3 },
                                        { label: 'Aanbevelingen pasten niet bij de persoon (bijv. oorbellen voor een man)', count: 3 },
                                        { label: 'Tempo: te traag of juist te snel', count: 2 },
                                        { label: 'Instructies niet altijd duidelijk', count: 1 },
                                    ],
                                },
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'Opvallend: één tester raakte geïrriteerd ("ik bepaal het zelf wel"). Dat is precies de weerstand tegen beïnvloeding waar het project over gaat.',
                                    ],
                                },
                                {
                                    type: 'bars',
                                    title: 'Suggesties van testers',
                                    unit: 'aantal testers',
                                    items: [
                                        { label: 'Het product op jezelf zien (AR / try-on)', count: 6 },
                                        { label: 'Meer interactie, ook na een keuze', count: 5 },
                                        { label: 'Het verhaal scherper: wat is er dark, waar moet je over nadenken?', count: 4 },
                                        { label: 'Andere bediening: knoppen of handgebaren in plaats van een toetsenbord', count: 2 },
                                        { label: 'De spiegel analyseert jou en zegt wat beter kan, in plaats van zelf kiezen', count: 2 },
                                        { label: 'Fysiek: aan de muur hangen, transparant display voor een beter beeld', count: 2 },
                                    ],
                                },
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'Een tester vroeg ook of je mensen wel moet stimuleren om nog meer te kopen (duurzaamheid).',
                                    ],
                                },
                                {
                                    type: 'stats',
                                    title: 'Keuzevragen',
                                    items: [
                                        { value: '14/16', label: 'testers willen de spiegel verticaal (2 horizontaal)' },
                                        { value: '12/16', label: 'zouden de bedieningsknoppen onder de spiegel plaatsen (2 links, 2 rechts)' },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                // Sprint 3–4: zet status op 'done' en vul goal + sections (zelfde vorm als Sprint 1 en 2).
                // Afbeeldingen: zet ze in public/projects/dark-tech/ en voeg ze toe aan darkTechImages hierboven.
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
        slug: 'kapper-template',
        title: 'Kapper Template',
        description: 'Een herbruikbare website-template voor barbershops: hero met snelle afspraakzoeker, diensten met prijzen, galerij, online afspraak plannen in drie stappen, reviews en contact met openingstijden.',
        technologies: ['React', 'TanStack Start', 'TypeScript', 'Tailwind CSS', 'Motion'],
        link: 'https://github.com/YusufTopals/Kapper-Template',
        category: 'Website',
        thumbnail: {
            src: '/projects/kapper-template/hero.jpg',
            alt: 'Homepagina van de Kapper Template met de kop "Scherp geknipt. Rustig afgewerkt." en een afspraakzoeker',
            width: 1440,
            height: 940,
        },
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
