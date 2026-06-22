export interface FaqItem {
    question: string;
    answer: string;
}

// Single source of truth voor alle FAQ's. Wordt gebruikt door de losse
// functionaliteitenpagina's en door de gebundelde /veelgestelde-vragen hub.
export const faqsByPage: Record<string, Array<FaqItem>> = {
    voorraad: [
        {
            question: "Kan ik terugzien waarom de voorraad van een product is veranderd?",
            answer: "Ja. Per product vind je een complete voorraadhistorie met elke mutatie: verkopen, picks, retouren, leveringen, handmatige correcties en voorraadtellingen. Per mutatie zie je de reden, het oude en nieuwe aantal, de locatie, de datum en wie de mutatie heeft gedaan.",
        },
        {
            question: "Kunnen concurrenten zien hoeveel voorraad ik heb?",
            answer: "Niet als je fictieve voorraad gebruikt. Je stelt een vast aantal in (bijvoorbeeld 400) plus een drempel (bijvoorbeeld 20). Zolang je werkelijke voorraad boven de drempel zit, stuurt ShopLinkr het fictieve aantal naar je kanalen. Komt je voorraad onder de drempel, dan schakelt ShopLinkr automatisch over op je echte aantallen, zodat je nooit een product verkoopt dat je niet hebt.",
        },
        {
            question: "Wat gebeurt er met de voorraad bij een retour?",
            answer: "Bij het verwerken van een retour vink je per item aan of het terug op voorraad moet en kies je de locatie. ShopLinkr werkt de voorraad bij en synchroniseert de mutatie direct naar het gekoppelde kanaal.",
        },
    ],
    producten: [
        {
            question: "Hoe gaat ShopLinkr om met varianten van hetzelfde product, zoals maten of kleuren?",
            answer: "Je groepeert die producten in een variantgroep. Elke variant blijft een zelfstandig product met eigen EAN, voorraad en listing, maar in het productoverzicht zie je het hoofdproduct met de gecombineerde voorraad en het aantal varianten. Een product kan maar in één variantgroep tegelijk zitten.",
        },
        {
            question: "Wat gebeurt er met de bundelvoorraad als ik een los onderdeel verkoop?",
            answer: "De bundelvoorraad volgt altijd het schaarste onderdeel. Verkoop je een onderdeel los, dan zakt de bundelvoorraad mee, zodat je nooit meer bundels aanbiedt dan je kunt samenstellen. Een product mag in meerdere bundels tegelijk voorkomen en blijft daarnaast los verkoopbaar.",
        },
        {
            question: "Werkt ShopLinkr ook voor producten die ik op gewicht of lengte verkoop, zoals brokken of stof?",
            answer: "Ja, met voorraadbronnen. Je houdt de basisvoorraad bij in kilo, meter of liter en koppelt varianten zoals 500 gram of 1 meter aan die bron. Bij elke verkoop gaat de juiste hoeveelheid van de bron af en berekent ShopLinkr per variant hoeveel er nog beschikbaar is.",
        },
        {
            question: "Krijgt een bundel automatisch onbeperkte voorraad als alle sub-producten dat hebben?",
            answer: "Ja. Zodra elk sub-product in de bundel op onbeperkte voorraad staat, krijgt de bundel die status automatisch. Je hoeft dat niet handmatig in te stellen. Komt één van de sub-producten weer op normale voorraad, dan verliest de bundel die status ook weer.",
        },
        {
            question: "Kan hetzelfde product in meerdere bundels tegelijk zitten?",
            answer: "Ja. Een sub-product kan in meerdere bundels tegelijk voorkomen en je bepaalt per bundel hoe vaak het meegaat. Elke bundel rekent zijn beschikbaarheid zelfstandig uit op basis van de gedeelde voorraad, dus de aantallen blijven altijd in balans.",
        },
        {
            question: "Worden bundels meegenomen in een voorraadtelling?",
            answer: "Nee. Een bundel is een afgeleide van zijn sub-producten en heeft geen eigen fysieke voorraad. Tijdens een voorraadtelling tel je alleen de losse producten. De bundelvoorraad wordt daarna automatisch herberekend op basis van de getelde aantallen.",
        },
        {
            question: "Wat gebeurt er als ik een product archiveer dat in een bundel of variantgroep zit?",
            answer: "Het product wordt losgekoppeld van bundels. Zit het in een variantgroep, dan wijst ShopLinkr automatisch een ander product als hoofdproduct aan. Komt het product later weer binnen via een kanaal, dan herstelt ShopLinkr het op basis van de EAN-code.",
        },
    ],
    bestellingen: [
        {
            question: "Kan ik bestellingen van verschillende verkoopkanalen samenvoegen?",
            answer: "Ja. Heeft één klant op zowel Bol als Shopify een order geplaatst? Dan voeg je die samen tot één zending. ShopLinkr signaleert dat er meerdere open bestellingen voor hetzelfde afleveradres staan en biedt de samenvoeging direct aan.",
        },
        {
            question: "Kan ik telefonische orders of B2B-zendingen ook in ShopLinkr maken?",
            answer: "Ja, met handmatige zendingen. Je vult de klantgegevens en het afleveradres in, kiest een vervoerder en ShopLinkr genereert het verzendlabel. De zending hoeft niet gekoppeld te zijn aan een bestelling uit je verkoopkanaal.",
        },
        {
            question: "Wat gebeurt er als een klant iets bestelt dat niet op voorraad ligt?",
            answer: "De bestelling krijgt automatisch de status <strong>Backorder</strong> en wacht op voorraad. Zodra je een levering ontvangt en de voorraad weer aanvult, gaat de bestelling automatisch over naar <strong>Open</strong> en kun je hem op de normale manier verwerken. Je kunt backorders aanzetten of uitzetten per bedrijf, per verkoopkanaal of per product.",
        },
        {
            question: "Welke vervoerders worden ondersteund?",
            answer: "ShopLinkr ondersteunt onder andere PostNL, DPD en GLS. Je koppelt zoveel vervoerders als je nodig hebt en kiest per bestelling de juiste. <a href=\"/integraties\">Bekijk de volledige lijst op de integraties-pagina</a>.",
        },
    ],
    picklijsten: [
        {
            question: "Wanneer kies ik voor single bestellingen, een picklijst zonder bakken of een picklijst met bakken?",
            answer: "Heb je veel orders met maar één product? Dan filter je apart op single bestellingen en verwerk je ze in bulk. Een picklijst zonder bakken werkt prima bij kleinere batches waar je alles in één grote bak verzamelt, of simpelweg de ruimte niet hebt om met losse bakken te gaan werken. Bij grotere volumes of orders met meerdere producten geven bakken net die extra controle die fouten voorkomt.",
        },
        {
            question: "Werkt AutoPrint met elke printer?",
            answer: "AutoPrint werkt met vrijwel elke printer en herkent je apparaten automatisch zodra je de koppeling installeert. Je koppelt elke printer aan een inpakstation, zodat de labels altijd op de juiste plek worden geprint. Voor Zebra-printers raden we de ZPL-modus aan.",
        },
        {
            question: "Wat zijn bakken en wanneer is het de moeite waard om ermee te werken?",
            answer: "Bakken zijn fysieke kratten met een unieke barcode die je tijdens het picken aan een bestelling koppelt. Je maakt ze in bulk aan via de wizard en print de barcodelabels uit ShopLinkr. Werk je met orders die uit meerdere producten bestaan of pick je in grotere batches? Dan voorkom je met bakken dat producten in de verkeerde doos belanden.",
        },
        {
            question: "Welke hardware heb ik nodig om te kunnen picken?",
            answer: "Een handscanner. Je ziet per stap welk product je moet pakken en waar het ligt in je magazijn, en na elke succesvolle scan verschijnt het volgende product. Een telefoon of computer werkt prima om de picklijst weer te geven, maar voor de scans zelf is een echte handscanner nodig. Deze kunnen wij leveren uit voorraad en direct op de juiste manier instellen voor je. Neem hiervoor contact op met onze support.",
        },
        {
            question: "Hoe stel ik een vaste filtercombinatie in voor terugkerende pickrondes?",
            answer: "Ga naar Picklijsten, klik op Picklijst genereren en stel de filters in die je vaak gebruikt, bijvoorbeeld verkoopkanaal, pakkettype en locatie. Klik rechtsboven op Opgeslagen filters en daarna op Filters opslaan, geef de set een herkenbare naam zoals \"Brievenbuspakketten webshop\" en sla op. De volgende keer staat de combinatie als snelkeuze klaar voor je hele team.",
        },
    ],
    leveringen: [
        {
            question: "Kun je een levering vanuit een inkoopadvies aanmaken?",
            answer: "Ja. Het inkoopadvies berekent op basis van je voorraad, backorders en verwachte verkoop wat je per leverancier moet bestellen. Ben je tevreden met het advies, dan zet je het in één klik om naar leveringen. ShopLinkr maakt per leverancier een levering aan met de geadviseerde producten en aantallen, met status <strong>Concept</strong> en klaar om te bestellen.",
        },
        {
            question: "Hoe verwerk je een levering waarvan je minder ontvangt dan besteld?",
            answer: "Tijdens het ontvangen vul je per regel het werkelijke aantal in. Het verschil blijft staan onder Verwacht, zodat je het later alsnog kunt ontvangen als er nog wat nakomt. Rond je de levering af terwijl er nog items openstaan? Dan vind je die terug onder Niet ontvangen.",
        },
        {
            question: "Wat gebeurt er met backorders zodra je een levering ontvangt?",
            answer: "Backorders voor producten in de levering komen automatisch vrij zodra je de voorraad ontvangt. De bestellingen springen terug naar <strong>Open</strong> en je kunt ze gewoon picken en verzenden. Je hoeft niet eerst alle backorders zelf na te lopen.",
        },
        {
            question: "Kun je een ontvangst ongedaan maken?",
            answer: "Ja. Heb je per ongeluk een product ontvangen of de verkeerde locatie gekozen, dan kun je de ontvangst ongedaan maken. De voorraad wordt weer afgeschreven van de locatie, zodat je het product opnieuw kunt ontvangen.",
        },
        {
            question: "Hoe koppel je een levering aan een specifieke magazijnlocatie?",
            answer: "Per ontvangen regel kies je de locatie waar het product naartoe gaat. Zo kun je een levering verdelen over meerdere locaties of zones in je magazijn. Elke ontvangst wordt vastgelegd als voorraadmutatie met de reden Levering ontvangen, zodat je later precies kunt terugzien welke stuks naar welke locatie zijn gegaan.",
        },
    ],
    retouren: [
        {
            question: "Hoe komen retouren binnen in ShopLinkr?",
            answer: "Retouren komen automatisch vanuit je gekoppelde verkoopkanaal binnen in ShopLinkr. Je verwerkt ze op één plek en de status en voorraad gaan daarna automatisch terug naar het kanaal.",
        },
        {
            question: "Kan ik per item bepalen of het terug op voorraad gaat?",
            answer: "Ja, dat bepaal je per item. Met de schakelaar Toevoegen aan voorraad zet je een product terug de verkoopbare voorraad in en kies je de magazijnlocatie, bij bundels per subproduct. Laat je die schakelaar uit, dan telt het item niet mee als verkoopbaar.",
        },
        {
            question: "Kan ik foto's toevoegen aan een retour?",
            answer: "Ja, je voegt foto's toe per retouritem. Handig als bewijs bij beschadigde of incomplete retouren, bijvoorbeeld bij een geschil met een klant of om intern vast te leggen in welke staat een product binnenkwam.",
        },
        {
            question: "Wat gebeurt er met de status op het verkoopkanaal?",
            answer: "Zodra je een retour verwerkt, koppelt ShopLinkr de verwerking automatisch terug naar je verkoopkanaal. Jij hoeft daarvoor niet apart in te loggen. Tegelijk wordt je voorraad aangepast, zodat elk gekoppeld kanaal direct de juiste aantallen laat zien.",
        },
    ],
    vervoerders: [
        {
            question: "Welke vervoerders worden ondersteund?",
            answer: "Alle bekende vervoerders en verzendplatformen, zoals PostNL, DPD en GLS. Je koppelt er zoveel als je nodig hebt en kiest per bestelling de juiste. <a href=\"/integraties\">Bekijk de volledige lijst en de koppelinstructies op de integraties-pagina</a>.",
        },
        {
            question: "Kun je meerdere accounts van dezelfde vervoerder koppelen?",
            answer: "Ja. Per koppeling vul je eigen inloggegevens of API-keys in, dus je kunt bijvoorbeeld twee DPD-contracten of meerdere Sendcloud-accounts naast elkaar koppelen. Handig als je werkt met verschillende verzendlocaties of merken die elk een eigen contract hebben.",
        },
        {
            question: "Wat doet AutoPrint precies?",
            answer: "AutoPrint stuurt verzendlabels automatisch naar de printer bij je inpakstation zodra je een bestelling verwerkt. Daarvoor gebruiken we PrintNode, een softwaretool die je installeert op een computer in je magazijn. PrintNode draait op de achtergrond en pikt elk nieuw label op, zodat je niet meer per order op print hoeft te klikken. <a href=\"/support/auto-print-instellen\">Lees hoe je AutoPrint instelt</a>.",
        },
        {
            question: "Kun je per bestelling een andere vervoerder kiezen?",
            answer: "Ja. Zolang de vervoerder gekoppeld is, kies je per bestelling welke je gebruikt. Wil je dat niet handmatig doen? Met onze <a href=\"/support/wat-zijn-regels\">regelsfunctie</a> laat je ShopLinkr automatisch de juiste vervoerder selecteren op basis van gewicht, bestemming, kanaal of producttype.",
        },
        {
            question: "Wat als je vervoerder niet in de lijst staat?",
            answer: "Laat het ons weten. We breiden de koppelingen geregeld uit en kijken graag of we jouw vervoerder kunnen toevoegen. Vaak werkt het ook al via een verzendplatform als Sendcloud, MyParcel of ParcelPro: één koppeling geeft je toegang tot tientallen vervoerders.",
        },
    ],
    locatiebeheer: [
        {
            question: "Hoe diep gaat de hiërarchie van locaties?",
            answer: "Zo diep als je magazijn vraagt. Je maakt een locatie aan en kiest optioneel een bovenliggende locatie. Een veelgebruikte opbouw is gangpad, stelling, plank en bak, eventueel met een zone als bovenste niveau. Producten koppel je aan de onderste laag, zodat je picker meteen ziet waar hij moet zijn.",
        },
        {
            question: "Wat is het verschil tussen een picklocatie en een bulklocatie?",
            answer: "Een picklocatie is de plek waar je dagelijks uit pickt, meestal goed bereikbaar en dicht bij het inpakstation. Een bulklocatie houdt grotere hoeveelheden op pallets of in hoge stellingen. ShopLinkr pakt eerst de picklocatie aan en gaat pas door naar de bulklocatie als die leeg is. Zo houd je je magazijn in beweging zonder pickers naar moeilijke plekken te sturen.",
        },
        {
            question: "Wat als een product op meerdere locaties ligt?",
            answer: "Geen probleem. Een product mag op meerdere locaties tegelijk staan, bijvoorbeeld een paar stuks op de picklocatie en de rest in de bulk. In het productoverzicht zie je per locatie hoeveel stuks er liggen, en op de picklijst krijgt je picker de juiste locatie te zien op basis van de pick-volgorde.",
        },
        {
            question: "Zie ik de locatie ook tijdens het verwerken van een bestelling?",
            answer: "Ja. Op de bestellingenpagina staat per regel de locatie van het product, op de picklijst zie je voor elk product waar het ligt en op het productoverzicht staat per locatie hoeveel stuks er beschikbaar zijn. Of je nu losse bestellingen verwerkt of een ronde samenstelt, je picker weet meteen waar hij moet zijn.",
        },
        {
            question: "Hoe verplaats ik voorraad van de ene locatie naar de andere?",
            answer: "Open het product, klik op Voorraad bijwerken en kies Verplaatsen. Selecteer de bronlocatie, de doellocatie en het aantal stuks. Wil je alles overzetten? Zet dan de schakelaar 'Alle voorraad verplaatsen' aan. De verplaatsing verschijnt meteen in de voorraadmutaties van het product.",
        },
    ],
    inkoopadvies: [
        {
            question: "Op basis van welke periode rekent het inkoopadvies?",
            answer: "Bij het onderdeel Verwachte verkoop kies je de adviesperiode: 14 dagen, 28 dagen, 3 maanden of een eigen periode. ShopLinkr pakt de gemiddelde verkoop per dag van een product en rekent uit hoeveel je in die periode nodig hebt. De snelkeuze Slim inkopen combineert die prognose met backorders, drempels en de levertijd van je leverancier.",
        },
        {
            question: "Houdt het advies rekening met de levertijd van mijn leverancier?",
            answer: "Ja, als je het onderdeel Levertijd meetellen aanzet. De levertijd wordt dan opgeteld bij de adviesperiode. Heb je 14 dagen adviesperiode en 3 dagen levertijd, dan rekent het advies met 17 dagen aan verwachte verkoop. De levertijd komt uit het product zelf, of valt terug op de standaard levertijd uit je bedrijfsinstellingen.",
        },
        {
            question: "Werkt het inkoopadvies ook als ik per doos of in vaste veelvouden inkoop?",
            answer: "Ja. Heb je op een product een minimale inkoophoeveelheid of een veelvoud ingesteld? Dan rondt het advies daar automatisch op af. Een berekend advies van 17 stuks bij dozen van 12 wordt 24 stuks. Het geadviseerde aantal kan daardoor iets afwijken van een pure berekening.",
        },
        {
            question: "Wat is het verschil met voorraadnotificaties?",
            answer: "Voorraadnotificaties sturen je een e-mail zodra een product onder een ingestelde grens komt: een signaal per product, op het moment dat het nodig is. Het inkoopadvies kijkt breder en rekent door: voor de leveranciers die je selecteert bepaalt ShopLinkr hoeveel van elk product je het beste kunt bijbestellen, inclusief backorders, drempels, verwachte verkoop en levertijd. Beide werken prima naast elkaar.",
        },
        {
            question: "Kan ik het advies handmatig aanpassen voordat ik het omzet?",
            answer: "Ja. Op de advies-detailpagina zie je per regel het geadviseerde aantal en de reden waarom het product is opgenomen. Je kunt regels aanpassen, verwijderen of zelf toevoegen voordat je het advies omzet naar leveringen. De leveringen krijgen vervolgens de status <strong>Concept</strong>, dus ook daarna kun je nog bijwerken.",
        },
    ],
    rapporten: [
        {
            question: "Welke rapporten zijn standaard beschikbaar in ShopLinkr?",
            answer: "Je vindt vier vaste rapporten onder Rapporten in het menu: Product prestaties, Nooit verkochte producten, Voorraadwaarde en ABC-analyse. Elk rapport heeft eigen filters en beantwoordt een specifieke vraag over je assortiment, je voorraad of je verkoop.",
        },
        {
            question: "Kun je rapporten exporteren?",
            answer: "Ja, elk rapport heeft een exportknop en je krijgt het als Excel-bestand. Handig om door te sturen naar je boekhouder of mee te nemen in je eigen analyse.",
        },
        {
            question: "Hoe vaak wordt de ABC-analyse bijgewerkt en waar kijkt hij naar?",
            answer: "De analyse draait elke nacht automatisch over de pickfrequentie van de afgelopen 90 dagen. Werk je met picklijsten, dan telt elke keer dat een product op een lijst staat als een pick. Werk je zonder picklijsten, dan kijkt ShopLinkr naar hoe vaak een product in bestellingen voorkomt. Het gaat om hoe vaak een medewerker naar een product toe moet lopen, niet om de aantallen die gepickt worden.",
        },
        {
            question: "Kan ik in het rapport Nooit verkochte producten filteren op verkoopkanaal?",
            answer: "Ja. Naast periode, tags en verpakkingstype kun je in dit rapport filteren op verkoopkanaal. Zo zie je bijvoorbeeld welke producten in je Shopify-shop niet bewegen terwijl ze op Bol wel verkopen, of andersom.",
        },
        {
            question: "Waarom verschilt het voorraadwaarde-rapport van de voorraadwaarde bij een product zelf?",
            answer: "In het productscherm zie je de actuele voorraadwaarde van dat ene product. Het rapport zet je hele assortiment naast elkaar op een gekozen datum, inclusief de totaalwaarde over alles, en je kunt naar historische datums springen om trends te zien. Producten zonder inkoopprijs krijgen in beide gevallen waarde nul. Bundels tellen in het rapport niet apart mee, omdat hun waarde uit de losse producten komt.",
        },
    ],
    regels: [
        {
            question: "Op welke voorwaarden kan ik een regel laten reageren?",
            answer: "Op tientallen velden, verdeeld over klantgegevens en bestelling. Denk aan verkoopkanaal, totaalgewicht, totaalbedrag, aantal producten, verpakkingstype, specifiek product, tag, servicepunt, verzendmethode en besteldatum. Voor klantgegevens kies je per veld of het om het verzendadres of factuuradres gaat, en daarbinnen om naam, e-mail, postcode, land en meer.",
        },
        {
            question: "Welke acties kan ShopLinkr automatisch uitvoeren?",
            answer: "Een ruime set acties. Denk aan een verzendoptie instellen, een tag toevoegen of een bestelling op hoge prioriteit zetten. Je kunt meerdere acties combineren binnen één regel.",
        },
        {
            question: "Kan ik meerdere voorwaarden in één regel combineren?",
            answer: "Ja. Binnen een groep voorwaarden bepaal je of alle voorwaarden moeten kloppen, of dat één voorwaarde al voldoende is. Zo maak je een regel die alleen geldt bij een specifieke combinatie, of juist een regel die meerdere situaties tegelijk afvangt.",
        },
        {
            question: "Wat gebeurt er als twee regels op dezelfde bestelling van toepassing zijn?",
            answer: "Regels worden afgewerkt in de volgorde waarin ze staan. Per regel kies je of het hierbij stopt zodra deze raakt, of dat ShopLinkr de volgende regels nog blijft controleren. Zo bepaal je zelf welke regel voorgaat bij overlap.",
        },
        {
            question: "Worden regels ook toegepast op bestaande bestellingen?",
            answer: "Nee, alleen op nieuwe bestellingen die binnenkomen nadat je de regel hebt opgeslagen. De regel is direct actief en wordt vanaf dat moment toegepast op elke nieuwe bestelling die aan de voorwaarden voldoet.",
        },
    ],
    gebruikers: [
        {
            question: "Kost een extra gebruiker iets?",
            answer: "Nee. Bij ShopLinkr betaal je niet per gebruiker. Of je nu met z'n tweeën werkt of met een team van twintig, je rekening blijft hetzelfde. Nodig dus gerust iedereen uit die meewerkt in je magazijn.",
        },
        {
            question: "Welke standaardrollen zitten er in ShopLinkr?",
            answer: "Er staan vijf rollen klaar: Beheerder (volledige toegang), Magazijn (bestellingen verwerken en voorraad bijwerken), Administratie (rapporten en exports), Klantenservice (bestellingen en retouren) en Inkoop (leveranciers en leveringen). De Beheerder-rol kun je niet wijzigen of verwijderen, de andere standaardrollen pas je naar wens aan.",
        },
        {
            question: "Kan ik zelf rollen aanmaken?",
            answer: "Ja. Via Instellingen > Rollen klik je op Rol aanmaken, geef je een naam zoals Teamleider of Stagiair en vink je per onderdeel aan wat deze rol mag. Of dupliceer een standaardrol en pas hem aan, zo hoef je niet vanaf nul te beginnen.",
        },
        {
            question: "Welke rechten kun je per rol toekennen?",
            answer: "Rechten zijn gegroepeerd per onderdeel: bestellingen, producten, voorraad, instellingen en meer. Per onderdeel kies je of een gebruiker mag bekijken, aanmaken, bewerken of verwijderen. Daarnaast zijn er specifieke rechten, zoals bestellingen verwerken, producten exporteren of financiële inzichten bekijken.",
        },
        {
            question: "Werken tweefactorauthenticatie en QR-login samen?",
            answer: "Ja. Tweefactorauthenticatie zet je per gebruiker aan via Instellingen > Beveiliging en werkt met Google Authenticator, Microsoft Authenticator, Authy of 1Password. QR-login is bedoeld voor snel wisselen op gedeelde stations. Heb je 2FA aan staan, dan vraagt ShopLinkr na de QR-scan ook nog om de 6-cijferige code.",
        },
    ],
    klanten: [
        {
            question: "Kan ik klantgegevens en adressen rechtstreeks in ShopLinkr aanpassen?",
            answer: "Ja. Vanuit een bestelling open je het verzend- of factuurprofiel en werk je naam, contactgegevens, bedrijfsgegevens en adres direct bij. De nieuwe gegevens komen meteen op het verzendlabel en de bezorgopties worden opnieuw opgehaald.",
        },
        {
            question: "Gaat een wijziging die ik in ShopLinkr maak terug naar het verkoopkanaal?",
            answer: "Nee. Aanpassingen aan klantgegevens en adressen blijven binnen ShopLinkr en worden gebruikt voor jouw verzending en administratie.",
        },
        {
            question: "Worden mijn aanpassingen niet overschreven door een sync van het kanaal?",
            answer: "Nee. Zodra je een veld handmatig aanpast, laat een latere sync vanuit het verkoopkanaal dat veld met rust. Wat jij aanpast, blijft staan.",
        },
        {
            question: "Welke gegevens van een klant zie ik per bestelling?",
            answer: "Aanhef, voor- en achternaam met eventueel tussenvoegsel, e-mailadres, telefoonnummer, bedrijfsnaam, btw- en KvK-nummer, plus een volledig adres met straat, huisnummer, postcode, plaats en land.",
        },
        {
            question: "Hoe veilig worden klantgegevens opgeslagen?",
            answer: "Alle persoonsgegevens, zoals namen, adressen en contactgegevens, worden versleuteld opgeslagen in onze database. Daarnaast bepaal je met rollen en rechten per gebruiker wie de klantgegevens mag inzien, zodat alleen de juiste mensen erbij kunnen.",
        },
        {
            question: "Kan ik bestellingen van dezelfde klant samenvoegen tot één zending?",
            answer: "Ja, op basis van het afleveradres. Hebben meerdere openstaande bestellingen hetzelfde verzendadres, dan herkent ShopLinkr dat en kun je ze samenvoegen tot één zending. Dat werkt ook als de bestellingen van verschillende verkoopkanalen komen.",
        },
    ],
    prijzen: [
        {
            question: "Wat als ik in een maand meer orders heb dan verwacht?",
            answer: "Je rekening schaalt automatisch mee. Elke order valt binnen een staffel met een eigen tarief, en je betaalt netjes per staffel die je raakt. De maand erop reken je weer af op basis van dat volume. Geen contractwijzigingen, geen verrassingen.",
        },
        {
            question: "Kan ik mijn abonnement pauzeren of opzeggen?",
            answer: "Opzeggen kan elke maand zonder opzegtermijn. Pauzeren is mogelijk, bijvoorbeeld in een rustig seizoen. Stuur ons een bericht en we regelen het.",
        },
        {
            question: "Welke verkoopkanalen en vervoerders worden ondersteund?",
            answer: "Bol, Shopify, WooCommerce, Lightspeed, Kaufland en koppelingen met PostNL, DPD, GLS, MyParcel, Sendcloud, Sendy, QLS, ParcelPro en Innosend. We breiden het aanbod continu uit op basis van klantvraag.",
        },
        {
            question: "Hoe werkt de gratis trial van 14 dagen?",
            answer: "Je krijgt twee weken volledige toegang tot alle features. Je hoeft geen creditcard achter te laten. Na de trial bepaal je zelf of je doorgaat. Doe je niets, dan stopt het account automatisch.",
        },
        {
            question: "Is migratie van een ander systeem inbegrepen?",
            answer: "Ja. We zetten samen met jou de eerste setup op, importeren je producten en voorraad en helpen met de koppelingen naar je kanalen. Daar betaal je niets extra voor.",
        },
        {
            question: "Wat is er inbegrepen in de support?",
            answer: "Toegang tot onze chat en mail support, met een reactietijd van doorgaans binnen 2 uur tijdens kantooruren. Geen tickets in een wachtrij, geen losse support-pakketten. Voor inrichtingsvragen plannen we ook graag een korte call.",
        },
        {
            question: "Wat als ik later vragen heb of meer wil weten?",
            answer: "Plan een demo of stuur ons een bericht. We denken graag mee over de inrichting voor jouw magazijn, vrijblijvend.",
        },
    ],
    contact: [
        {
            question: "Hoe snel krijg ik antwoord?",
            answer: "Tijdens kantooruren reageren we doorgaans binnen 2 uur. Stuur je iets in het weekend? Dan hoor je vrijwel altijd op maandagochtend van ons.",
        },
        {
            question: "Kan ik ook bellen of via WhatsApp?",
            answer: "Bellen of een WhatsApp sturen kan op +31 6 49 78 12 12, maandag tot en met vrijdag van 08:30 tot 17:00. Voor korte vragen werkt WhatsApp, mail of het formulier vaak het snelst, omdat we dan direct kunnen meekijken.",
        },
        {
            question: "Ik ben nog geen klant. Kan ik toch contact opnemen?",
            answer: "Absoluut. Of je nu oriënteert, twijfelt tussen tools of een specifieke vraag hebt, we denken graag mee. Helemaal vrijblijvend.",
        },
        {
            question: "Wat als ik liever eerst zelf rondkijk?",
            answer: "Je kunt ShopLinkr 14 dagen gratis proberen, zonder creditcard. Loop je ergens tegenaan, dan staan we voor je klaar.",
        },
    ],
};

export interface FaqCategory {
    title: string;
    intro: string;
    pages: Array<string>;
}

export const faqCategories: Array<FaqCategory> = [
    {
        title: "Voorraad en producten",
        intro: "Alles over voorraadbeheer, producttypes, locaties en inkoop.",
        pages: ["voorraad","producten","locatiebeheer","inkoopadvies"],
    },
    {
        title: "Orderverwerking en verzending",
        intro: "Van binnenkomende bestelling tot verzendklaar pakket.",
        pages: ["bestellingen","picklijsten","leveringen","vervoerders","retouren"],
    },
    {
        title: "Automatisering, klanten en team",
        intro: "Regels, klantgegevens, gebruikers en rapportage.",
        pages: ["regels","klanten","gebruikers","rapporten"],
    },
    {
        title: "Prijzen en account",
        intro: "Het prijsmodel, starten en contact.",
        pages: ["prijzen","contact"],
    },
];
