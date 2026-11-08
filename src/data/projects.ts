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
    /** 2 of 3 afbeeldingen naast elkaar (desktop), gestapeld op mobiel; staand formaat */
    | { type: 'image-row'; images: ProjectImage[] }
    /** Genummerde opsomming; een item kan een vetgedrukte aanloop hebben */
    | { type: 'list'; title?: string; items: (string | ListItem)[] }
    /** Procesblok bovenaan een sectie: Wat / Waarom / Hoe / Resultaat */
    | { type: 'process'; what: string; why: string; how: string; result: string }
    /** Feedback-loop: verbeterpunt uit vorige sprint → wat ik deed → wat de test liet zien */
    | { type: 'loop'; title: string; columns: [string, string, string]; rows: LoopRow[] }
    /** Korte, anonieme citaten */
    | { type: 'quotes'; title?: string; items: string[] }
    /** Inzicht → actie voor de volgende sprint */
    | { type: 'insights'; title: string; columns: [string, string]; rows: InsightRow[] }

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

/** Compacte kaart bovenaan een sprint */
export interface SprintOverview {
    goal: string
    role: string
    methods: string
    result: string
}

/** Fase in de procestijdlijn; target = id van de bijbehorende sectie */
export interface TimelinePhase {
    label: string
    text: string
    target: string
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
    /** Titel naast "Sprint N", bijv. "Van design naar werkend prototype" */
    title?: string
    /** Eenvoudig doel-blok (Sprint 1) */
    goal?: string
    /** Uitgebreid overzicht: doel, rol, methodes, resultaat (vervangt goal) */
    overview?: SprintOverview
    /** Procestijdlijn met fases die naar secties linken */
    timeline?: TimelinePhase[]
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
    /** Korte voortgangsregel op de projectkaart, bijv. "In ontwikkeling – Sprint 2 van 4" */
    status?: string
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
        status: 'In ontwikkeling – Sprint 2 van 4',
        description: 'Een installatie en app die laten zien hoe makkelijk je smaak te sturen is – via herhaling, sociale bevestiging en een spiegel die meekijkt.',
        technologies: ['UX/UI Design', 'Prototyping', 'User Testing', 'Dark Patterns'],
        category: 'Design',
        thumbnail: darkTechImages.eersteDesign,
        detail: {
            heading: 'Dark Tech – Semester 1: Smaakmanipulatie',
            seoDescription: 'Devlog van Smaakmanipulatie (Dark Tech, semester 1): van user stories in GitLab naar een werkende app en spiegel-installatie, getest met 21 bezoekers op Society 5.0.',
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
                    title: 'Van design naar werkend prototype',
                    overview: {
                        goal: 'Het werk opdelen in user stories, het design uit sprint 1 omzetten naar een werkende app (front-end en back-end), en het prototype testen met echte bezoekers op Society 5.0 met een vragenlijst die ik zelf heb gemaakt.',
                        role: 'User stories uitwerken, front-end en back-end van de app bouwen, vragenlijst voor de usertest maken, feedback analyseren.',
                        methods: 'User stories (GitLab), prototyping, usertest op locatie, vragenlijst, thematische analyse van open antwoorden.',
                        result: 'Een werkende app met 5 kernschermen, getest door 21 bezoekers, met concrete acties voor sprint 3.',
                    },
                    timeline: [
                        { label: 'Plannen', text: 'User stories opstellen', target: 'sprint-2-plannen' },
                        { label: 'Bouwen', text: 'De app realiseren', target: 'sprint-2-bouwen' },
                        { label: 'Testvoorbereiding', text: 'Vragenlijst maken', target: 'sprint-2-vragenlijst' },
                        { label: 'Testen', text: 'Usertest op Society 5.0', target: 'sprint-2-testen' },
                        { label: 'Analyseren', text: 'Feedback ordenen en conclusies trekken', target: 'sprint-2-analyseren' },
                    ],
                    sections: [
                        {
                            id: 'sprint-2-plannen',
                            title: '1. Plannen: user stories',
                            blocks: [
                                {
                                    type: 'process',
                                    what: 'Het werk voor deze sprint vastleggen in user stories.',
                                    why: 'Met vijf mensen aan één product moet voor iedereen duidelijk zijn wat er af moet zijn en wanneer iets echt klaar is.',
                                    how: 'User stories in GitLab (project extreme-profiling), elk met een vaste opbouw.',
                                    result: 'Een backlog waar de hele groep mee aan de slag kon.',
                                },
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'We zijn de sprint begonnen met het opstellen van user stories in GitLab. Elke story heeft een vaste opbouw: user story, beschrijving, requirements, acceptatiecriteria en een Definition of Done. Die laatste is voor elke story hetzelfde: geen storingen, het product werkt zoals omschreven, het werk is in standaard Nederlands of Engels geschreven, en een medestudent heeft het gereviewd.',
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
                                {
                                    type: 'image-row',
                                    images: [darkTechImages.storyUi, darkTechImages.storyFrontend, darkTechImages.storyVragenlijst],
                                },
                            ],
                        },
                        {
                            id: 'sprint-2-bouwen',
                            title: '2. Bouwen: de app gerealiseerd',
                            blocks: [
                                {
                                    type: 'process',
                                    what: 'Het design uit sprint 1 omzetten naar een werkende app.',
                                    why: 'Op Society 5.0 moesten bezoekers de ervaring echt kunnen doorlopen.',
                                    how: 'Front-end in Vue met TypeScript, plus een back-end. Ik heb de schermen uit het sprint 1-design één voor één gebouwd en de feedback uit de guerrilla test meegenomen.',
                                    result: '5 werkende kernschermen onder de werknaam Smaakmanipulate.',
                                },
                                {
                                    type: 'text',
                                    paragraphs: [
                                        'Ik heb de app gebouwd, zowel de front-end als de back-end. De flow uit sprint 1 werkt nu echt: de Stijlspiegel herkent je, maakt een lichaamsscan en past je feed daarop aan.',
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
                                        'Nieuw in deze sprint. Het toont een live beïnvloedingsscore, momenten van beïnvloeding, gedeelde datapunten en welke tactieken er op je zijn gebruikt (onzekerheid uit je scan, score onder vrienden, sociale druk, exclusieve spiegelprijs).',
                                    ],
                                },
                                { type: 'image-wide', image: darkTechImages.sprint2Dashboard },
                                {
                                    type: 'loop',
                                    title: 'Van sprint 1 naar sprint 2',
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
                            title: '3. Testvoorbereiding: de vragenlijst',
                            blocks: [
                                {
                                    type: 'process',
                                    what: 'Een vragenlijst voor de usertest op Society 5.0.',
                                    why: 'Open feedback van echte bezoekers verzamelen, en daarnaast keuzes over het fysieke ontwerp onderbouwen met data.',
                                    how: 'Eisen uit de user story: de vragen gaan over het project, minimaal drie vragen, open vragen. Aangevuld met twee keuzevragen over het ontwerp van de spiegel.',
                                    result: '3 open vragen en 2 keuzevragen.',
                                },
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
                            title: '4. Testen: usertest op Society 5.0',
                            blocks: [
                                {
                                    type: 'process',
                                    what: 'Het prototype laten testen door bezoekers van Society 5.0.',
                                    why: 'Testen met mensen die het project niet kennen, net als bij de guerrilla test in sprint 1, maar nu met een werkend prototype en een grotere groep.',
                                    how: 'Bezoekers doorliepen de ervaring met de spiegel (ingebouwd scherm en camera, accessoires kiezen) en vulden daarna de vragenlijst in.',
                                    result: '21 ingevulde vragenlijsten.',
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
                            title: '5. Analyseren: van feedback naar inzichten',
                            blocks: [
                                {
                                    type: 'process',
                                    what: 'De 21 antwoorden ordenen tot bruikbare inzichten.',
                                    why: 'Losse antwoorden zijn lastig om op te sturen; patronen laten zien wat het belangrijkst is.',
                                    how: 'Elk open antwoord gelezen, gegroepeerd per thema en per thema geteld hoeveel testers het noemden. De keuzevragen geteld.',
                                    result: 'Een top-3 aan problemen en concrete acties voor sprint 3.',
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
                                {
                                    type: 'insights',
                                    title: 'Inzicht → actie voor sprint 3',
                                    columns: ['Inzicht', 'Actie in sprint 3'],
                                    rows: [
                                        { insight: 'Het dashboard laat de manipulatie zien, maar testers van de spiegel zagen dat niet', action: 'Het dark-verhaal zichtbaar maken in de installatie zelf' },
                                        { insight: 'Twee testers vroegen om een analyse van hun uiterlijk, en dat is precies wat de stijlscan in de app doet', action: 'Spiegel en app tijdens de ervaring zichtbaar aan elkaar koppelen' },
                                        { insight: 'Testers wilden producten op zichzelf zien en een reactie na hun keuze', action: 'Producten op de gebruiker tonen, meer keuze en feedback na elke keuze' },
                                        { insight: 'Aanbevelingen pasten niet altijd bij de persoon', action: 'Aanbevelingen afstemmen op wie er voor de spiegel staat' },
                                        { insight: '14/16 verticaal, 12/16 knoppen onder', action: 'Verticale opstelling met knoppen onder de spiegel in plaats van een toetsenbord' },
                                    ],
                                },
                            ],
                        },
                        {
                            id: 'sprint-2-geleerd',
                            title: 'Wat ik leerde deze sprint',
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
                    ],
                },
                // Sprint 3–4: zet status op 'done' en vul title, overview, timeline en sections (zelfde vorm als Sprint 2).
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
