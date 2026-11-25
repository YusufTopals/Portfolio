export interface ProjectImage {
    src: string
    alt: string
    width?: number
    height?: number
}

/** Bouwstenen waaruit een stap (of een deel van de terugblik) bestaat. */
export type SprintBlock =
    /** Lopende tekst; optioneel met een vetgedrukte aanloop voor de eerste alinea */
    | { type: 'text'; paragraphs: string[]; lead?: string }
    /** Klein tussenkopje binnen een stap, bijv. een scherm van de app */
    | { type: 'heading'; text: string }
    /** Breed overzicht op volle contentbreedte, klikbaar (lightbox) */
    | { type: 'image-wide'; image: ProjectImage }
    /** Twee foto's: naast elkaar op desktop, onder elkaar op mobiel */
    | { type: 'image-pair'; images: [ProjectImage, ProjectImage] }
    /** Twee beelden naast elkaar (gestapeld op mobiel), niet bijgesneden; standaard gelabeld Design / Eindproduct */
    | { type: 'compare'; design: ProjectImage; result: ProjectImage; labels?: [string, string] }
    /** Twee blokken naast elkaar, bijv. wat werkte / wat niet werkte */
    | { type: 'feedback'; positive: FeedbackList; attention: FeedbackList }
    /** Thema's met aantal (bijv. testers); balkbreedte = aantal t.o.v. het hoogste in de lijst */
    | { type: 'bars'; title: string; unit: string; items: BarItem[] }
    /** Kleine stat-blokjes naast elkaar, bijv. "14/16" */
    | { type: 'stats'; title?: string; items: StatItem[] }
    /** 2 of 3 afbeeldingen naast elkaar (desktop), gestapeld op mobiel; staand formaat */
    | { type: 'image-row'; images: ProjectImage[] }
    /** Genummerde opsomming; een item kan een vetgedrukte aanloop hebben */
    | { type: 'list'; title?: string; items: (string | ListItem)[] }
    /** Genummerde tijdlijn, bijv. de flow van de ervaring */
    | { type: 'timeline'; items: string[] }
    /** Feedback-loop: verbeterpunt uit vorige sprint → wat ik deed → wat de test liet zien */
    | { type: 'loop'; title?: string; columns: [string, string, string]; rows: LoopRow[] }
    /** Korte, anonieme citaten */
    | { type: 'quotes'; title?: string; items: string[] }
    /** Twee kolommen met pijl ertussen, bijv. probleem → oplossing */
    | { type: 'insights'; title?: string; columns: [string, string]; rows: InsightRow[] }
    /** Open feedbackvraag aan de lezer, met knop naar de contactpagina */
    | { type: 'question'; question: string }

export interface ListItem {
    lead: string
    text: string
}

export interface LoopRow {
    from: string
    did: string
    /** Leeg = nog niet getest */
    result?: string
}

export interface InsightRow {
    insight: string
    action: string
}

/** Punt in een genummerde tijdlijn; met target wordt het een link naar die sectie */
export interface TimelinePhase {
    label: string
    text?: string
    target?: string
}

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

/** Eén genummerde stap in een sprint ("Stap 2.1"); eerst beelden, dan tekst */
export interface SprintSection {
    /** Gebruikt als anker, bijv. 'sprint-1-eerste-design' */
    id: string
    title: string
    blocks: SprintBlock[]
}

/** Onderdeel van de terugblik, bijv. "Wat ik leerde"; zonder titel = alleen de blokken */
export interface ReviewPart {
    title?: string
    blocks: SprintBlock[]
}

/** Eén meetpunt door de sprints heen ("voor → na"); voeg per sprint een stap toe */
export interface Iteration {
    label: string
    steps: { sprint: number; text: string }[]
}

export interface Sprint {
    number: number
    /** 'done' = gepubliceerd, 'soon' = getoond als "binnenkort" */
    status: 'done' | 'soon'
    /** Concrete titel onder "Sprint N" */
    title?: string
    /** Korte inleidende alinea */
    intro?: string
    /** Genummerde stappen */
    sections?: SprintSection[]
    /** Terugblik; alleen onderdelen met content */
    review?: ReviewPart[]
    /** Fotogalerij onderaan de sprint; standaard aan (alle beelden uit de stappen) */
    gallery?: boolean
}

/** Kaartje in "Hoe het project zich ontwikkelde" */
export interface SprintCard {
    sprint: number
    text: string
    image?: ProjectImage
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
    /** Korte voortgangsregel op de projectkaart, bijv. "In ontwikkeling – Sprint 2 van 4" */
    status?: string
    thumbnail?: ProjectImage
    detail?: ProjectDetail
}

export interface ProjectDetail {
    heading: string
    seoDescription: string
    /** Samenvatting direct onder de titel */
    summary?: ProjectSummary
    /** Kleine infokaart: rol, team, studio, status */
    info?: { label: string; value: string }[]
    /** Rij met de beste beelden van het project (lightbox) */
    highlights?: ProjectImage[]
    /** Over het project: persoonlijke inleiding */
    intro: string[]
    /** Mijn rol */
    role?: string
    /** Wat we gebruikten (lege lijsten worden niet getoond) */
    tools?: { hardware: string[]; software: string[] }
    /** Hoe het project zich ontwikkelde: één kaartje per sprint */
    cards?: SprintCard[]
    /** Iteraties met cijfers: voor → na */
    iterations?: Iteration[]
    sprints: Sprint[]
    /** Afsluitende secties onderaan (eindresultaat, geleerd, anders doen) */
    closing?: { id: string; title: string; text: string }[]
}

export interface ProjectSummary {
    /** Eén zin die het project samenvat */
    tagline: string
    /** Kleine labels; vervangen de technologieën onder de titel */
    tags: string[]
    /** Demovideo; leeg = niet getoond */
    video?: { src: string; poster?: string }
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
    storyUi: darkTechImg(
        'sprint2-userstory-ui.jpg',
        'User story: simpele, interactieve en uniforme UI voor de spiegel',
        1184, 1390,
    ),
    storyFrontend: darkTechImg(
        'sprint2-userstory-frontend.jpg',
        'User story: frontend opzetten in Vue',
        1208, 1364,
    ),
    storyVragenlijst: darkTechImg(
        'sprint2-userstory-vragenlijst.jpg',
        'User story: vragenlijst voor Society 5.0',
        1210, 1360,
    ),
    sprint3DesignScore: darkTechImg(
        'sprint3-design-score.jpg',
        'Design van het scorescherm na de scan',
        366, 564,
    ),
    sprint3EindScore: darkTechImg(
        'sprint3-eind-score.jpg',
        'Eindproduct van het scorescherm na de scan',
        1292, 1400,
    ),
    sprint3DesignOverzicht: darkTechImg(
        'sprint3-design-overzicht.jpg',
        'Design van het overzichtsscherm aan het eind',
        354, 550,
    ),
    sprint3EindCheckout: darkTechImg(
        'sprint3-eind-checkout.jpg',
        'Eindproduct van het laatste scherm: checkout met totaal € 0,00',
        1818, 1342,
    ),
    storyScorescherm: darkTechImg(
        'story-scorescherm.jpg',
        'User story in GitLab: scherm na het afronden van de scan',
        1198, 1302,
    ),
    storyOverzichtsscherm: darkTechImg(
        'story-overzichtsscherm.jpg',
        'User story in GitLab: overzichtsscherm',
        1202, 1312,
    ),
    storyErvaring: darkTechImg(
        'story-ervaring.jpg',
        'User story in GitLab: ervaring samenstellen',
        1190, 1306,
    ),
    sprint3FeedbackScore: darkTechImg(
        'sprint3-feedback-scorescherm.jpg',
        'Chat met een groepsgenoot: haar en mijn ontwerp van het scorescherm naast elkaar, met haar feedback',
        1898, 1272,
    ),
    sprint3FeedbackOverzicht: darkTechImg(
        'sprint3-feedback-overzicht.jpg',
        'Chat met een groepsgenoot: feedback op het overzichtsscherm en haar aangepaste checkout met witte achtergronden',
        1876, 1198,
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
        status: 'In ontwikkeling – Sprint 3 van 4',
        description: 'Een installatie en app die laten zien hoe makkelijk je smaak te sturen is – via herhaling, sociale bevestiging en een spiegel die meekijkt.',
        technologies: ['UX/UI Design', 'Prototyping', 'User Testing', 'Dark Patterns'],
        category: 'Design',
        thumbnail: darkTechImages.eersteDesign,
        detail: {
            heading: 'Dark Tech – Semester 1: Smaakmanipulatie',
            summary: {
                tagline: 'Een spiegel die je ongemerkt scant en je smaak in kleding probeert te sturen, en je aan het eind laat zien hoe.',
                tags: ['Vue', 'TypeScript', 'Camera', 'Spiegel', 'Usertesting', 'Dark Tech'],
                // AANVULLEN: video: { src: '/projects/dark-tech/demo.mp4' }
            },
            info: [
                { label: 'Rol', value: 'Creative Technologist' },
                { label: 'Team', value: 'Groepsproject' },
                { label: 'Studio', value: 'Dark Tech, semester 1, HvA' },
                { label: 'Status', value: 'Sprint 3 van 4' },
            ],
            highlights: [
                darkTechImages.prototype1,
                darkTechImages.sprint2Welkom,
                darkTechImages.sprint2Stijlscan,
                darkTechImages.sprint2Dashboard,
                darkTechImages.sprint3EindScore,
                darkTechImages.sprint3EindCheckout,
            ],
            seoDescription: 'Devlog van Smaakmanipulatie (Dark Tech, semester 1): van user stories in GitLab naar een werkende app en spiegel-installatie, getest met 21 bezoekers op Society 5.0.',
            intro: [
                'Dit is de devlog van mijn bijdrage aan het schoolproject Smaakmanipulatie, onderdeel van Dark Tech in semester 1. Het project bestaat uit een fysieke installatie en een app, en loopt in vier sprints. Per sprint laat ik zien wat ik heb gemaakt, getest en geleerd.',
                'Het idee: we laten mensen ervaren hoe hun smaak in kleding gemanipuleerd kan worden – via herhaling en sociale bevestiging. Iets wat je eerst lelijk vindt, ga je na honderd keer zien toch mooi vinden. Aan het eind krijgt de bezoeker inzicht in hoe hij gemanipuleerd is.',
            ],
            role: 'UI-design van de app maken, user stories uitwerken, front-end en back-end van de app bouwen, de vragenlijst voor de usertest maken en de feedback analyseren.',
            tools: {
                // AANVULLEN: computer / Raspberry Pi en overige onderdelen
                hardware: ['Spiegel met ingebouwd scherm', 'Camera', 'Toetsenbord voor de bediening'],
                software: ['Vue met TypeScript (front-end)', 'Back-end met pyboot', 'GitLab (user stories)'],
            },
            cards: [
                { sprint: 1, text: 'Eerste design en een kartonnen prototype van de spiegel', image: darkTechImages.prototype1 },
                { sprint: 2, text: 'Een echte spiegel met scherm en camera, en een werkende app', image: darkTechImages.sprint2Dashboard },
                { sprint: 3, text: 'Alle onderdelen samengevoegd tot één ervaring', image: darkTechImages.sprint3EindScore },
            ],
            iterations: [
                {
                    label: 'Bewustzijn over manipulatie',
                    steps: [
                        { sprint: 1, text: 'Ontbrak volledig' },
                        { sprint: 2, text: 'Dashboard gebouwd, maar bij de spiegel zeiden nog 6 van de 21 testers dat de dark kant niet overkwam' },
                    ],
                },
            ],
            sprints: [
                {
                    number: 1,
                    status: 'done',
                    title: 'Eerste design, guerrilla test en kartonnen prototype',
                    intro: 'In sprint 1 heb ik het eerste design van de app gemaakt en getest met een guerrilla test. Met de feedback heb ik het design verbeterd en uitgebreid, en we hebben een kartonnen prototype gemaakt van de spiegel in de winkel.',
                    sections: [
                        {
                            id: 'sprint-1-eerste-design',
                            title: 'Het eerste design',
                            blocks: [
                                { type: 'image-wide', image: darkTechImages.eersteDesign },
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'Ik heb een eerste UI-design gemaakt voor de app die hoort bij de "Stijlspiegel" (de spiegel-installatie in de winkel). De flow: een bezoeker wordt automatisch ingelogd via de spiegel, krijgt een stijlscan met een score en aandachtspunten, en komt in een feed terecht met gepersonaliseerde kledingaanbevelingen – inclusief een voortgangsscherm met statistieken.',
                                    ],
                                },
                            ],
                        },
                        {
                            id: 'sprint-1-guerrilla-test',
                            title: 'Guerrilla test',
                            blocks: [
                                {
                                    type: 'text',
                                    paragraphs: ['Met dit eerste design heb ik een guerrilla test afgenomen. Wat goed werkte en wat niet, staat in de terugblik onderaan deze sprint.'],
                                },
                            ],
                        },
                        {
                            id: 'sprint-1-feedback-verwerkt',
                            title: 'Design aanpassen en uitbreiden',
                            blocks: [
                                { type: 'image-wide', image: darkTechImages.uitgebreidDesign },
                                {
                                    type: 'text',
                                    paragraphs: ['Op basis van de feedback heb ik het design aangepast en uitgebreid naar meer schermen.'],
                                },
                            ],
                        },
                        {
                            id: 'sprint-1-fysiek-prototype',
                            title: 'Kartonnen prototype van de spiegel',
                            blocks: [
                                { type: 'image-pair', images: [darkTechImages.prototype1, darkTechImages.prototype2] },
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'Het fysieke prototype en de app vullen elkaar aan. Het prototype stelt een winkel voor met een spiegel die bezoekers subtiel fotografeert; die foto\'s vormen de input voor de stijlscan in de app – vandaar dat je in de app automatisch wordt ingelogd via de "Stijlspiegel" en meteen een score en aandachtspunten te zien krijgt. Ik heb dit concept tastbaar gemaakt met een kartonnen schaalmodel van de winkelruimte: een ingelijste "spiegel" aan de wand en een zitbank. Dit sluit ook aan op het verbeterpunt uit de guerrilla test dat het fysieke prototype zonder toelichting onduidelijk was – testers begrepen niet meteen dat de spiegel hen fotografeert.',
                                    ],
                                },
                            ],
                        },
                    ],
                    review: [
                        {
                            blocks: [
                                {
                                    type: 'feedback',
                                    positive: {
                                        title: 'Wat werkte',
                                        items: [
                                            'Welkomstpagina ziet er goed uit',
                                            'Scorescherm is overzichtelijk, met duidelijke aandachtspunten',
                                            'Suggesties en het kopen van suggesties zien er goed uit',
                                            'De app spreekt voor zich – geen uitleg nodig',
                                        ],
                                    },
                                    attention: {
                                        title: 'Wat niet werkte',
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
                            title: 'Dit neem ik mee naar sprint 2',
                            blocks: [
                                {
                                    type: 'list',
                                    items: [
                                        'Bewustzijn over manipulatie in de app laten zien',
                                        'Statistieken toevoegen',
                                        'Het fysieke deel duidelijker maken',
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    number: 2,
                    status: 'done',
                    title: 'De app bouwen en testen op Society 5.0',
                    intro: 'In sprint 2 hebben we het werk opgedeeld in user stories. Daarna heb ik de app gebouwd, front-end en back-end, en een vragenlijst gemaakt voor de usertest op Society 5.0. Daar hebben 21 bezoekers ons prototype getest.',
                    sections: [
                        {
                            id: 'sprint-2-plannen',
                            title: 'User stories opstellen',
                            blocks: [
                                {
                                    type: 'image-row',
                                    images: [darkTechImages.storyUi, darkTechImages.storyFrontend, darkTechImages.storyVragenlijst],
                                },
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'We zijn de sprint begonnen met het opstellen van user stories in GitLab. Met de hele groep aan één product moet voor iedereen duidelijk zijn wat er af moet zijn en wanneer iets echt klaar is.',
                                        'Elke story heeft een vaste opbouw: user story, beschrijving, requirements, acceptatiecriteria en een Definition of Done. Die laatste is voor elke story hetzelfde: geen storingen, het product werkt zoals omschreven, het werk is in standaard Nederlands of Engels geschreven, en een medestudent heeft het gereviewd.',
                                        'Ik werkte onder andere aan deze stories:',
                                    ],
                                },
                                {
                                    type: 'list',
                                    items: [
                                        { lead: 'Nep-ervaring & UI:', text: '"Als gebruiker wil ik een simpele, interactieve en uniforme UI, zodat ik zonder moeite alle functies van de spiegel kan ervaren." De UI moet eruitzien alsof de functies van de spiegel werken, met ruimte om echte functionaliteit later te integreren. Eerste onderdeel af: een idle-scherm met animatie.' },
                                        { lead: 'Frontend opzetten:', text: 'het Vue-framework (TypeScript) opzetten met voorbeeldbestanden, zodat de rest van de groep meteen aan de front-end kon werken.' },
                                        { lead: 'Vragenlijst:', text: 'een vragenlijst voor Society 5.0, zodat testers feedback kunnen geven waarmee we een betere versie maken.' },
                                    ],
                                },
                            ],
                        },
                        {
                            id: 'sprint-2-bouwen',
                            title: 'De app bouwen',
                            blocks: [
                                { type: 'image-wide', image: darkTechImages.uitgebreidDesign },
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'Ik heb de app gebouwd, zowel de front-end als de back-end. De flow uit sprint 1 werkt nu echt: de Stijlspiegel herkent je, maakt een lichaamsscan en past je feed daarop aan.',
                                    ],
                                },
                                { type: 'heading', text: 'Welkomstscherm' },
                                { type: 'image-wide', image: darkTechImages.sprint2Welkom },
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'Na herkenning door de Stijlspiegel log je automatisch in. Een live-tijdlijn laat stap voor stap zien wat de spiegel deed: herkend, lichaamsscan, feed aangepast, activiteit van vrienden toegevoegd.',
                                    ],
                                },
                                { type: 'heading', text: 'Stijlscan' },
                                { type: 'image-wide', image: darkTechImages.sprint2Stijlscan },
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'De foto uit de spiegel krijgt een stijlscore (62/100), afgezet tegen het gemiddelde van je vrienden (78). Drie aandachtspunten wijzen aan wat er "mis" is, zoals schoenen die niet waterdicht zijn omdat er morgen regen wordt verwacht.',
                                    ],
                                },
                                { type: 'heading', text: 'Feed' },
                                { type: 'image-wide', image: darkTechImages.sprint2Feed },
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'Vrienden bovenaan, trends uit je stad en aanbevelingen met "-20% via de spiegel": sociale druk en exclusiviteit als sturingsmiddel.',
                                    ],
                                },
                                { type: 'heading', text: 'Profiel' },
                                { type: 'image-wide', image: darkTechImages.sprint2Profiel },
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'Laat zien wat de spiegel van je weet: persoonlijke gegevens, maar ook lengte, kledingmaat en postuur, "gemeten zonder dat je iets hoefde te doen".',
                                    ],
                                },
                                { type: 'heading', text: 'Dashboard' },
                                { type: 'image-wide', image: darkTechImages.sprint2Dashboard },
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'Nieuw in deze sprint. Het toont een live beïnvloedingsscore, momenten van beïnvloeding, gedeelde datapunten en welke tactieken er op je zijn gebruikt (onzekerheid uit je scan, score onder vrienden, sociale druk, exclusieve spiegelprijs).',
                                    ],
                                },
                            ],
                        },
                        {
                            id: 'sprint-2-veranderd',
                            title: 'Wat ik veranderde na sprint 1',
                            blocks: [
                                {
                                    type: 'loop',
                                    columns: ['Verbeterpunt uit sprint 1', 'Wat ik deed in sprint 2', 'Wat de test liet zien'],
                                    rows: [
                                        { from: 'Nergens in de app wordt bewustzijn gecreëerd', did: 'Dashboard dat laat zien welke tactieken op je zijn gebruikt', result: 'De dark kant kwam bij de spiegel nog niet over (6 testers)' },
                                        { from: 'Statistieken zijn nergens terug te zien', did: 'Dashboard met beïnvloedingsscore, momenten en datapunten' },
                                        { from: 'Fysiek prototype onduidelijk zonder toelichting', did: 'Echte spiegel met ingebouwd scherm en camera', result: 'Spiegel werd het meest gewaardeerd (9 testers)' },
                                    ],
                                },
                            ],
                        },
                        {
                            id: 'sprint-2-vragenlijst',
                            title: 'De vragenlijst',
                            blocks: [
                                {
                                    type: 'text',
                                    paragraphs: ['Voor de test op Society 5.0 heb ik de vragenlijst gemaakt:'],
                                },
                                {
                                    type: 'list',
                                    items: [
                                        'Wat vond je goed aan de ervaring?',
                                        'Wat vond je minder goed aan de ervaring?',
                                        'Hoe zou jij het anders doen?',
                                        'Welke oriëntatie zou je fijner vinden om hem thuis te hebben? (verticaal / horizontaal)',
                                        'Waar zou je de knoppen om te bewegen plaatsen als ze op de spiegel zitten? (onder / links / rechts)',
                                    ],
                                },
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'De open vragen geven ruimte voor wat wij zelf niet hadden bedacht. De twee keuzevragen gaan direct over het fysieke ontwerp, zodat we die keuzes op data kunnen baseren in plaats van op onze eigen voorkeur.',
                                    ],
                                },
                            ],
                        },
                        {
                            id: 'sprint-2-testen',
                            title: 'Testen op Society 5.0',
                            blocks: [
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'Bezoekers van Society 5.0 doorliepen de ervaring met de spiegel (ingebouwd scherm en camera, accessoires kiezen) en vulden daarna de vragenlijst in. Dat leverde 21 ingevulde vragenlijsten op.',
                                    ],
                                },
                                {
                                    type: 'quotes',
                                    title: 'Wat testers zeiden',
                                    items: [
                                        'Ik was duidelijk in beeld. De spiegel gaf mij een persoonlijk advies.',
                                        'Het verhaal wat jullie met het prototype willen vertellen is mij nog niet helemaal duidelijk.',
                                        'Er lijkt niet te worden gekeken naar wat ik aan heb en gejudged erop.',
                                        'Wekt mijn irritatie op. \'Ik bepaal het zelf wel.\'',
                                        'Would like to see the products on me.',
                                        'Moet je echt stimuleren dat iemand nog meer koopt?',
                                    ],
                                },
                            ],
                        },
                        {
                            id: 'sprint-2-analyseren',
                            title: 'Resultaten van de test',
                            blocks: [
                                {
                                    type: 'text',
                                    paragraphs: ['Ik heb alle antwoorden gelezen, per thema gegroepeerd en geteld hoeveel testers iets noemden.'],
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
                                        'Opvallend: één tester raakte geïrriteerd ("ik bepaal het zelf wel"). Dat is precies de weerstand tegen beïnvloeding waar het project over gaat. Een andere tester vroeg of je mensen wel moet stimuleren om nog meer te kopen.',
                                    ],
                                },
                                {
                                    type: 'stats',
                                    title: 'Keuzevragen',
                                    items: [
                                        { value: '14/16', label: 'wil de spiegel verticaal' },
                                        { value: '12/16', label: 'wil de knoppen onder de spiegel' },
                                    ],
                                },
                            ],
                        },
                    ],
                    review: [
                        {
                            title: 'Feedback van medestudenten',
                            blocks: [
                                {
                                    type: 'feedback',
                                    positive: {
                                        title: 'Wat goed was',
                                        items: [
                                            'De spiegel is mooi',
                                            'De portfoliosite is duidelijk',
                                        ],
                                    },
                                    attention: {
                                        title: 'Verbeterpunt',
                                        items: [
                                            'Meer proces tonen, dus mijn portfolio uitbreiden',
                                        ],
                                    },
                                },
                            ],
                        },
                        {
                            title: 'Wat ik leerde',
                            blocks: [
                                {
                                    type: 'list',
                                    items: [
                                        'Een werkend en mooi prototype is nog geen overgebracht verhaal: de spiegel kreeg de meeste complimenten, maar het grootste kritiekpunt was dat de dark kant niet overkwam.',
                                        'Door user stories met vaste acceptatiecriteria en een Definition of Done was helder wat "af" betekende, ook voor het werk van groepsgenoten.',
                                        'Open vragen gaven inzichten die we zelf niet hadden bedacht (zoals AR en duurzaamheid); de keuzevragen gaven harde onderbouwing voor ontwerpkeuzes.',
                                    ],
                                },
                            ],
                        },
                        {
                            title: 'Waar ik nog tegenaan loop',
                            blocks: [
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'De dark kant komt bij de spiegel nog niet over. In de app laat het dashboard de manipulatie wel zien, maar 6 van de 21 testers merkten er bij de spiegel niets van. Hier loop ik vast: maak ik het te duidelijk, dan werkt de manipulatie niet meer. Maak ik het te subtiel, dan merkt niemand het.',
                                        'De aanbevelingen pasten ook niet altijd bij wie er voor de spiegel stond, zoals oorbellen voor een man. Dat werkte gewoon nog niet.',
                                    ],
                                },
                                {
                                    type: 'question',
                                    question: 'Heb jij een idee hoe je manipulatie kunt laten voelen zonder dat het meteen duidelijk is?',
                                },
                            ],
                        },
                        {
                            title: 'Dit neem ik mee naar sprint 3',
                            blocks: [
                                {
                                    type: 'list',
                                    items: [
                                        'Het dark-verhaal zichtbaar maken in de installatie zelf',
                                        'Spiegel en app tijdens de ervaring zichtbaar aan elkaar koppelen',
                                        'Producten op de gebruiker tonen, meer keuze en feedback na elke keuze',
                                        'Aanbevelingen afstemmen op wie er voor de spiegel staat',
                                        'Verticale opstelling met knoppen onder de spiegel in plaats van een toetsenbord',
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    number: 3,
                    status: 'done',
                    title: 'Van design naar realisatie: één volledige ervaring',
                    intro: 'In sprint 3 moesten alle losse onderdelen één geheel worden. Ik ging daarbij van design naar realisatie: eerst de designs maken, ze checken met een groepsgenoot, ze aanpassen na elkaars feedback, en ze daarna bouwen en aan elkaar koppelen.',
                    sections: [
                        {
                            id: 'sprint-3-user-stories',
                            title: 'User stories opstellen',
                            blocks: [
                                {
                                    type: 'image-row',
                                    images: [darkTechImages.storyScorescherm, darkTechImages.storyOverzichtsscherm, darkTechImages.storyErvaring],
                                },
                                {
                                    type: 'text',
                                    paragraphs: ['Ik werkte aan drie user stories: het scorescherm na de scan, het overzichtsscherm aan het eind, en het samenvoegen van alle onderdelen tot één ervaring van begin tot eind.'],
                                },
                            ],
                        },
                        {
                            id: 'sprint-3-designs',
                            title: 'De eerste designs',
                            blocks: [
                                {
                                    type: 'compare',
                                    labels: ['Scorescherm', 'Overzichtsscherm'],
                                    design: darkTechImages.sprint3DesignScore,
                                    result: darkTechImages.sprint3DesignOverzicht,
                                },
                                {
                                    type: 'text',
                                    lead: 'Scorescherm.',
                                    paragraphs: ['Na de scan zie je een score voor je outfit, korte punten over wat goed is en wat beter kan, en een knop om verder te gaan naar de aanbevelingen.'],
                                },
                                {
                                    type: 'text',
                                    lead: 'Overzichtsscherm.',
                                    paragraphs: ['Tijdens de ervaring kun je aanbevelingen accepteren of afwijzen. Aan het eind zie je je score, een kleine foto van je scan en alle aanbevelingen die je hebt gekozen.'],
                                },
                            ],
                        },
                        {
                            id: 'sprint-3-feedback',
                            title: 'Designs checken met een groepsgenoot',
                            blocks: [
                                {
                                    type: 'text',
                                    paragraphs: ['Mijn designs heb ik eerst samen met een groepsgenoot gecheckt. We gaven elkaar feedback en wisselden ideeën uit.'],
                                },
                                { type: 'heading', text: 'Scorescherm' },
                                { type: 'image-wide', image: darkTechImages.sprint3FeedbackScore },
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'Mijn groepsgenoot had in de les ook het resultaatscherm herontworpen. Ik heb haar mijn design gestuurd, zodat we ze naast elkaar konden leggen.',
                                        'Zij vond mijn versie vooral mooi in de stijl van de spiegel en niet te overweldigend. Wel is het scherm klein, dus het gezichtje kon groter.',
                                        'Ze vroeg zich ook af hoe we aan een afbeelding van de complete outfit komen. Een LLM kan iets verkeerds genereren, waardoor dat misschien niet stabiel werkt.',
                                    ],
                                },
                                { type: 'heading', text: 'Overzichtsscherm' },
                                { type: 'image-wide', image: darkTechImages.sprint3FeedbackOverzicht },
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'Ze vond het overzichtsscherm er netjes uitzien, maar vroeg zich af of het herhalen van de outfit score niet overbodig is. Ook kon de afbeelding van de gebruiker verkeerd zijn, en zat er nog geen prijs bij.',
                                        'Ze had mijn ontwerp aangepast tot een checkout met prijzen en witte achtergronden, omdat donkergrijs misschien niet zichtbaar is.',
                                        'Ik legde uit dat de afbeelding de foto van de eerste scan is, en geen foto van de gebruiker met de items erop. Daarna spraken we af om de goede aspecten van beide ontwerpen te combineren. De witte achtergrond vond ik een goed idee.',
                                    ],
                                },
                            ],
                        },
                        {
                            id: 'sprint-3-realisatie',
                            title: 'Van design naar realisatie',
                            blocks: [
                                {
                                    type: 'text',
                                    paragraphs: ['Na het uitwisselen van ideeën heb ik de designs aangepast, omdat sommige keuzes achteraf minder logisch waren. Daarna heb ik de schermen gebouwd.'],
                                },
                                { type: 'heading', text: 'Scorescherm' },
                                { type: 'compare', design: darkTechImages.sprint3DesignScore, result: darkTechImages.sprint3EindScore },
                                { type: 'heading', text: 'Overzicht en checkout' },
                                { type: 'compare', design: darkTechImages.sprint3DesignOverzicht, result: darkTechImages.sprint3EindCheckout },
                                {
                                    type: 'text',
                                    paragraphs: ['Het laatste scherm is een checkout: "That\'s it for today!", totaal € 0,00, verwachte levertijd 4 minuten.'],
                                },
                            ],
                        },
                        {
                            id: 'sprint-3-ervaring',
                            title: 'De hele ervaring aan elkaar koppelen',
                            blocks: [
                                {
                                    type: 'text',
                                    paragraphs: ['Voor de laatste user story hoefde ik niks nieuws te maken, maar moest ik zorgen dat alles samenwerkt. De flow:'],
                                },
                                {
                                    type: 'timeline',
                                    items: [
                                        'Idle-scherm',
                                        'Inloggen: de camera vindt je, of iemand achter de schermen drukt op enter',
                                        'Homescherm, met een pop-up die je naar het scanscherm stuurt',
                                        'Scan: de webcam maakt een foto en de AI genereert een antwoord',
                                        'Scorescherm met de resultaten',
                                        'Aanbevelingen uit een vast profiel, uitgekozen door de AI. De laatste aanbeveling gaat altijd over plastische chirurgie.',
                                        'Resultaat: alles wat je "gekocht" hebt, met een lage totaalprijs',
                                        'Het scherm blijft staan tot de gebruiker wegloopt of iemand op enter drukt. Daarna wordt alle informatie gewist, zodat de volgende gebruiker geen gegevens van de vorige ziet.',
                                    ],
                                },
                                {
                                    type: 'text',
                                    paragraphs: ['Tech: front-end in Vue, back-end met pyboot.'],
                                },
                            ],
                        },
                    ],
                    review: [
                        {
                            title: 'Problemen en oplossingen',
                            blocks: [
                                {
                                    type: 'insights',
                                    columns: ['Probleem', 'Oplossing'],
                                    rows: [
                                        {
                                            insight: 'Er waren veel losse onderdelen die nog geen geheel vormden.',
                                            action: 'Een aparte user story om de hele ervaring samen te stellen, waarbij ik continu met de rest van het team overlegde om alles op elkaar af te stemmen.',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            title: 'Dit neem ik mee naar sprint 4',
                            blocks: [
                                {
                                    type: 'text',
                                    paragraphs: ['De usertests afnemen en de feedback verwerken.'],
                                },
                            ],
                        },
                    ],
                },
                // Sprint 4: zet status op 'done' en vul title, intro, sections en review (zelfde vorm als Sprint 3),
                // en voeg een kaartje toe aan cards hierboven.
                // Afbeeldingen: zet ze in public/projects/dark-tech/ en voeg ze toe aan darkTechImages hierboven.
                { number: 4, status: 'soon' },
            ],
            closing: [
                { id: 'eindresultaat', title: 'Eindresultaat', text: 'Volgt na sprint 4.' },
                { id: 'geleerd', title: 'Wat ik heb geleerd', text: 'Volgt na sprint 4.' },
                { id: 'anders', title: 'Wat ik volgende keer anders zou doen', text: 'Volgt na sprint 4.' },
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
