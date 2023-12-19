# Gestore di Giochi di Ruolo

Il Gestore di Giochi di Ruolo (RPG Manager) è un plugin per Obsidian progettato per semplificare la creazione e l'esecuzione di campagne di giochi di ruolo. Il plugin è agnostico rispetto al sistema, il che significa che puoi usarlo se stai gestendo una campagna di D&D, Call of Cthulhu o qualsiasi altro gioco di ruolo da tavolo.

## Indice

- [1. Introduzione](#1-introduzione)
  - [1.1 Panoramica del Plugin](#11-panoramica-del-plugin)
  - [1.2 Caratteristiche Principali](#12-caratteristiche-principali)
  - [1.3 Pubblico di Riferimento (Plotters, Sandboxers, GM Pigri)](#13-pubblico-di-riferimento-plotters-sandboxers-gm-pigri)
  - [1.4 Iniziare](#14-iniziare)
  - [1.5 Aggiorna la tua vault dalla v3](#15-aggiorna-la-tua-vault-dalla-v3)
- [2. Installazione](#2-installazione)
  - [2.1 Impostare la tua prima Campagna](#21-impostare-la-tua-prima-campagna)
  - [2.2 Interfaccia Utente](#22-interfaccia-utente)
- [3. Panoramica degli Elementi](#3-panoramica-degli-elementi)
  - [3.1 Creazione e Modifica degli Elementi](#31-creazione-e-modifica-degli-elementi)
  - [3.2 Relazioni](#32-relazioni)
  - [3.3 Elementi](#33-elementi)
    - [3.3.1 Campagna](#331-campagna)
    - [3.3.2 Avventure](#332-avventure)
    - [3.3.3 Capitoli](#333-capitoli)
    - [3.3.4 Eventi](#334-eventi)
    - [3.3.5 Luoghi](#335-luoghi)
    - [3.3.6 Indizi](#336-indizi)
    - [3.3.7 Personaggi non Giocanti](#337-personaggi-non-giocanti)
    - [3.3.8 Fazioni](#338-fazioni)
    - [3.3.9 Oggetti](#339-oggetti)
    - [3.3.10 Mostri](#3310-mostri)
    - [3.3.11 Sottotrame](#3311-sottotrame)
    - [3.3.12 Personaggi Giocanti](#3312-personaggi-giocanti)
    - [3.3.13 Sessioni](#3313-sessioni)
    - [3.3.14 Scene](#3314-scene)
  - [3.4 Attributi Personalizzati](#34-attributi-personalizzati)
  - [3.5 Compiti](#35-compiti)
  - [3.6 Modelli di Elementi](#36-modelli-di-elementi)
  - [3.7 Risorse Globali](#37-risorse-globali)
- [4. Creare un Mondo](#4-creare-un-mondo)
  - [4.1 Che Tipo di Narratore Sei?](#41-che-tipo-di-narratore-sei)
  - [4.2 Per Ogni Narratore Che Sei](#42-per-ogni-narratore-che-sei)
    - [4.2.1 Creazione di Personaggi non Giocanti Completi](#421-creazione-di-personaggi-non-giocanti-completi)
    - [4.2.2 Sviluppo di Avventure e Capitoli](#422-sviluppo-di-avventure-e-capitoli)
  - [4.3 Per Plotters](#43-per-plotters)
    - [4.3.1 Utilizzo del Cerchio della Storia](#431-utilizzo-del-cerchio-della-storia)
  - [4.4 Per Sandboxers](#44-per-sandboxers)
    - [4.4.1 Creazione di Mondi Aperti](#441-creazione-di-mondi-aperti)
    - [4.4.2 Sviluppo di Eventi, Luoghi e Indizi](#442-sviluppo-di-eventi-luoghi-e-indizi)
- [6. Integrazione con ChatGPT](#6-integrazione-con-chatgpt)
  - [6.1 Preoccupazioni sulla Privacy](#61-preoccupazioni-sulla-privacy)
  - [6.2 Implicazioni Economiche](#62-implicazioni-economiche)
  - [6.3 Generazione di Personaggi non Giocanti](#63-generazione-di-personaggi-non-giocanti)
  - [6.4 Come Attivare ChatGPT](#64-come-attivare-chatgpt)
- [5. Eseguire una Campagna](#5-eseguire-una-campagna)
  - [5.1 Prepararsi per una Sessione](#51-prepararsi-per-una-sessione)
  - [5.2 Prendere Appunti durante le Sessioni](#52-prendere-appunti-durante-le-sessioni)
  - [5.3 Gestire le Scene](#53-gestire-le-scene)
- [7. Contribuire](#7-contribuire)
  - [7.1 Contributi di Codice](#71-contributi-di-codice)
  - [7.2 Segnalazione di Bug](#72-segnalazione-di-bug)
  - [7.3 Documentazione](#73-documentazione)
  - [7.4 Altri Modi per Aiutare](#74-altri-modi-per-aiutare)
  - [7.5 Comunità](#75-comunità)
- [8. Domande Frequenti](#8-domande-frequenti)

## 1. Introduzione

Benvenuto in RPG Manager, il plugin Obsidian progettato per essere il compagno definitivo per Narratori e Game Master (GM) nella preparazione e nell'esecuzione delle loro campagne. Se sei stanco di avere le note della tua campagna sparse su piattaforme e quaderni multipli, RPG Manager è nato dalla necessità di avere un repository centrale per tutte quelle brillanti idee, note, trame e decisioni dei personaggi giocanti che compongono il tessuto del tuo gioco.

**Perché RPG Manager?** La bellezza di RPG Manager risiede nella sua semplicità e flessibilità. Ti consente di creare facilmente relazioni tra vari elementi della tua campagna, formando una rete di inform

azioni che aiuta sia nella pianificazione che nell'esecuzione del gioco. Inoltre, è uno strumento agnostico rispetto al sistema, il che significa che può essere utilizzato con qualsiasi sistema di Gioco di Ruolo da Tavolo (TTRPG), fornendo una piattaforma versatile per gestire campagne senza essere vincolati a un set di regole specifico. Tuttavia, ciò significa che potrebbe non coprire ogni singolo dettaglio di ogni sistema là fuori, quindi affronta RPG Manager con una mente aperta e uno spirito d'avventura!

**I vantaggi di RPG Manager** includono informazioni centralizzate, relazioni tra gli elementi, design agnostico rispetto al sistema ed efficienza generale nella preparazione delle campagne. Fornendo una posizione centrale per tutte le tue idee, note e informazioni, e consentendoti di creare una rete di relazioni tra vari elementi della campagna, RPG Manager ti aiuta a creare narrazioni avvincenti tenendo traccia di tutti i dettagli essenziali.

Quindi, intraprendi il tuo viaggio narrativo con RPG Manager come tuo compagno di fiducia. Abbraccia le possibilità che offre e lascia che ti aiuti a creare avventure indimenticabili.

### 1.1. Panoramica del Plugin

RPG Manager è un plugin per Obsidian, progettato per posizionarsi comodamente sopra di esso, come un cappello da stregone ben indossato. Associa i metadati alle note di Obsidian e fornisce un'interfaccia utente amichevole per navigare attraverso le informazioni. Non si tratta solo di metadati qualunque; è il tipo di metadati che aiuta a gestire le relazioni tra le note, un aspetto cruciale per qualsiasi Narratore/GM che cerca di tessere una narrazione coerente.

L'**interfaccia utente** di RPG Manager è un'interfaccia utente HTML che organizza i metadati e li visualizza all'interno della nota di Obsidian. Ciò significa che non devi passare avanti e indietro tra diverse applicazioni o finestre; tutto ciò di cui hai bisogno è lì nella tua nota di Obsidian.

I **metadati** sono memorizzati all'interno di un blocco di codice in Obsidian, anziché nel front matter. Questa decisione è stata presa perché il front matter non gestisce la quantità di informazioni necessarie in modo pulito e toglie molto spazio nella parte superiore della nota in Obsidian. Tuttavia, non devi preoccuparti dei dettagli tecnici di formattazione o sintassi, poiché tutti i metadati vengono letti e scritti tramite l'interfaccia utente. Ciò significa meno tempo a lottare con il codice e più tempo a creare le tue epiche storie.

### 1.2. Caratteristiche Principali

RPG Manager vanta una serie di funzionalità progettate per rendere il tuo viaggio narrativo liscio come l'incantesimo di un bardo. Ecco una rapida panoramica di cosa aspettarti:

1. **Informazioni Centralizzate**: Raccogli tutte le tue idee, note e informazioni sulla campagna in un unico luogo, assicurandoti che nulla si perda nel caos della creazione.
2. **Interfaccia Utente Amichevole**: Un'interfaccia utente HTML incorporata nelle tue note di Obsidian per aiutarti a navigare e gestire i metadati senza dover jonglare tra diverse applicazioni o finestre.
3. **Gestione dei Metadati**: Memorizza e gestisci le relazioni tra le note con i metadati, cruciali per tessere una narrazione coerente. I metadati sono memorizzati all'interno di un blocco di codice in Obsidian, riducendo al minimo il disordine e massimizzando l'efficienza.
4. **Relazioni tra Note/Elementi**: Gestisci facilmente le relazioni tra vari elementi della campagna, creando una rete di informazioni che aiuta sia nella pianificazione che nell'esecuzione del gioco.
5. **Design Agnostico Rispetto al Sistema**: Progettato per funzionare con qualsiasi sistema TTRPG, fornendo una piattaforma versatile per gestire campagne senza essere vincolati a un set di regole specifico.
6. **Elementi**: Tutto in RPG Manager è un "Elemento", che sia una campagna, un'avventura, un capitolo, un evento, un luogo, un indizio, un personaggio non giocante, una fazione, un oggetto, un mostro, una sottotrama, un personaggio giocante, una sessione o una scena. Ciò aiuta a organizzare e strutturare la tua campagna in modo più coerente e logico.

Ricorda, questo è solo un assaggio di ciò che RPG Manager ha da offrire. Man mano che approfondirai questa documentazione, scoprirai come ogni funzione può essere adattata al tuo stile narrativo unico.

### 1.3. Pubblico di Riferimento (Plotters, Sandboxers, GM Pigri)

RPG Manager è progettato per essere uno strumento versatile che può adattarsi a diversi stili narrativi. Che tu sia un Plotter, un Sandboxed o un GM Pigro, questo plugin ha qualcosa per te.

1. **Plotters**: Per coloro che amano pianificare meticulosamente le loro storie, RPG Manager offre un approccio strutturato per organizzare e gestire ogni elemento della tua campagna, dalla narrazione generale fino a singole scene e indizi.
2. **Sandboxers**: Se preferisci creare mondi aperti e lasciare che i tuoi giocatori si muovano liberamente, RPG Manager aiuta nell'organizzazione di eventi, luoghi e indizi, facilitando la creazione di uno sfondo coerente con cui i tuoi personaggi giocanti possono interagire.
3. **GM Pigri**: Anche se non ti prepari molto e preferisci annotare alcune note e appunti prima di ogni sessione, RPG Manager può aiutare a centralizzare le tue idee e note, garantendo che tu possa trovare rapidamente ciò di cui hai bisogno durante il gioco.

Suggerimenti per tutti i Game Master

- I diversi Game Master utilizzeranno il plugin in modi diversi, utilizzando gli attributi di ciascun tipo di elemento o semplicemente ignorandoli. Prenditi del tempo per capire come funzionano ciascun elemento e funzionalità e decidi se si adatta al tuo stile.
- Nonostante RPG Manager offra un approccio strutturato, è progettato per essere flessibile ed adattabile. Non esitare a usarlo nel modo che funziona meglio per te, anche se significa non utilizzare determinate funzionalità.
- Ricorda, l'obiettivo di RPG Manager è rendere la vita del Narratore/GM più facile e organizzata, non imporre una struttura rigida al tuo processo creativo.

### 1.4. Iniziare

Intraprendere una nuova avventura con RPG Manager è eccitante quanto tirare un dado naturale 20! Per cominciare, tutto ciò di cui hai bisogno è una mente aperta e la volontà di esplorare le funzionalità del plugin per vedere come si allineano con il tuo stile narrativo.

- **Passo 1: Creare una Campagna**: La Campagna è il contenitore principale per tutti gli altri elementi in RPG Manager. Ogni Vault di Obsidian può contenere diverse campagne, ma ciascun elemento (avventure, capitoli, eventi, ecc.) è disponibile per una sola campagna. Quindi, inizia creando una nuova campagna.
- **Approccio con Mente Aperta**: Mentre inizi a esplorare il plugin, mantieni una mente aperta. Prova diverse funzionalità, osserva come gli elementi interagiscono tra loro e valuta se RPG Manager si adatta al tuo stile di Game Master. È essenziale comprendere che, pur offrendo un approccio strutturato e organizzato, RPG Manager è abbastanza flessibile da adattarsi a stili diversi.

Errori Comuni

- **Mentalità "Taglia Unica"**: RPG Manager è progettato per essere flessibile ed adattabile. Non assumere di dover utilizzare ogni funzionalità o elemento. Usa ciò che funziona per te e per la tua campagna.
- **Sopraffatti dalle Scelte**: Ci sono molti elementi e funzionalità disponibili in RPG Manager. Non sentirti obbligato a capire o utilizzare tutto immediatamente. Prenditi il ​​tuo tempo, esplora a tuo ritmo e incorpora gradualmente le funzionalità che soddisfano le tue esigenze.

**Risorse**

Al momento non ci sono tutorial o guide disponibili, ma stiamo lavorando alla creazione di video tutorial per aiutarti a sfruttare al massimo RPG Manager. Stai sintonizzato!

### 1.5. Aggiornare il tuo vault dalla versione v3

Se stai già utilizzando RPG Manager e lo aggiorni alla versione 4, il plugin non funzionerà. Hai due opzioni: utilizzare BRAT per tornare alla versione 3.4.5 o aggiornare il tuo vault.

L'aggiornamento del tuo vault è sempre una questione complicata, poiché il modo in cui hai strutturato i tuoi dati potrebbe essere diverso da quello di altri narratori. Per questo motivo, prima di aggiornare il tuo vault, **crea una copia di backup**!

**Importante**: se il processo di aggiornamento si blocca, controlla la Console degli ispettori per gli errori e cerca aiuto su [Discord](https://discord.com/channels/686053708261228577/1022806716343144518) o su [Github](https://github.com/carlonicora/obsidian-rpg-manager/issues).

## 2. Installazione

Installare RPG Manager è semplice come sconfiggere un goblin di livello 1! Segui i passaggi di seguito per iniziare:

- **Già Installato**: Se stai leggendo questa documentazione da dentro Obsidian, congratulazioni! Hai già installato il plugin RPG Manager e sei pronto per intraprendere il tuo viaggio narrativo.
- **Passaggi di Installazione**: Se non hai ancora installato il plugin, segui questi semplici passaggi:
  - Apri le impostazioni di Obsidian.
  - Vai a "Community Plugins".
  - Disattiva "Modalità Restretta" se necessario.
  - Cerca il plugin "RPG Manager".
  - Una volta trovato, clicca su "Installa" e poi su "Attiva".

E voilà! Ora sei pronto per immergerti nel mondo di RPG Manager. Non è richiesta alcuna configurazione iniziale, quindi puoi iniziare a creare campagne immediatamente!

### 2.1. Configurazione della tua prima Campagna

Creare la tua prima campagna con RPG Manager è un gioco da ragazzi! Ecco due modi per farlo:

- **Command Palette**:
  - Apri la command palette premendo **Ctrl + P** (Windows) o **Cmd + P** (Mac).
  - Cerca RPG Manager: crea nuova Campagna.
  - Seleziona il comando dalla lista.
- **Pannello Laterale**:
  - Clicca sull'icona del d20 nella barra laterale sinistra.
  - Nel pannello destro, clicca su "Crea Nuovo... Campagna".

Una volta creata la campagna, la nota contenente la campagna si aprirà automaticamente. Ecco fatto! Hai creato con successo la tua prima campagna. Ora inizia l'avventura!

### 2.2. Interfaccia Utente

L'Interfaccia Utente (UI) di RPG Manager è progettata per essere intuitiva e facile da usare. Viene mostrata direttamente nella nota di Obsidian e aiuta gli utenti ad aggiungere/modificare qualsiasi dettaglio e vedere tutte le informazioni rilevanti, attributi e relazioni degli elementi.

**Nota Principale**: Nella nota principale troverai tutti gli attributi modificabili di un elemento. Il tipo di un elemento è mostrato sotto il suo nome.

**Pannello delle Opzioni**: Sul lato destro, il pannello delle opzioni fornisce funzionalità aggiuntive. Il pannello delle opzioni può essere aperto cliccando sull'icona del d20 sulla sinistra di Obsidian, o cliccando sul link "Opzioni" nell'UI. Le funzionalità includono:

- Aggiunta di Nuovi Attributi: Puoi aggiungere nuovi attributi a un elemento.
- Creazione di Relazioni: Stabilire relazioni con altri elementi.
- Altre Funzionalità: A seconda del tipo di elemento, potrebbero esserci altre funzionalità come la gestione della galleria o la creazione guidata.

**Indicazioni Visive**: L'UI utilizza i colori del tema installato in Obsidian. Attualmente, l'UI non è personalizzabile, ma si adatterà ai colori del tema che hai scelto.

## 3. Panoramica degli Elementi

In RPG Manager, tutto è considerato come un "Elemento". Un elemento è un blocco fondamentale che rappresenta varie componenti della tua campagna RPG, come campagne, avventure, personaggi, luoghi, eventi, ecc. Ci sono diversi tipi di elementi, ognuno con uno scopo specifico e un proprio insieme di attributi e funzionalità.

Tutti gli elementi condividono alcune proprietà comuni:

- **Descrizione**: Un campo di testo in cui puoi descrivere l'elemento in dettaglio.
- **Galleria**: Una sezione in cui puoi aggiungere una collezione di immagini relative all'elemento.
- **Relazioni**: Collegamenti che collegano un elemento ad altri elementi nella tua campagna.

Alcuni elementi hanno una **struttura gerarchica**. Ciò significa che possono contenere elementi figlio, e questi figli possono essere posizionati in un ordine specifico. Ad esempio, una 'Campagna' può contenere molte 'Avventure' e 'Sessioni', e queste possono essere organizzate in una sequenza particolare. Allo stesso modo, un 'Avventura' può contenere molteplici 'Capitoli', e una 'Sessione' può contenere molteplici 'Scene'.

Comprendere il concetto di elementi è fondamentale per utilizzare efficacemente RPG Manager. Man mano che diventi più familiare con i diversi tipi di elementi e come si relazionano tra loro, sarai in grado di creare, modificare e gestire le tue campagne con facilità ed efficienza.

### 3.1. Creazione e Modifica degli Elementi

Creare e modificare gli elementi in RPG Manager è un gioco da ragazzi. Che tu stia aggiungendo un nuovo personaggio, oggetto o evento, il processo è diretto e intuitivo.

Creazione di Nuovi Elementi:

Per creare un nuovo elemento, puoi utilizzare sia la palette comandi che il pannello laterale.

- **Palette Comandi**:
  - Apri la palette comandi premendo **Ctrl + P** (Windows) o **Cmd + P** (Mac).
  - Cerca RPG Manager: crea nuovo ..., sostituendo i puntini di sospensione con il tipo di elemento che desideri creare (ad esempio, Avventura, Evento, Luogo, ecc.).
  - Seleziona il comando dalla lista.
- **Pannello Laterale**:
  - Fai clic sull'icona d20 nella barra laterale sinistra.
  - Nel pannello destro, fai clic su Crea Nuovo... seguito dal tipo di elemento che desideri creare.

Ricorda, ogni tipo di elemento, tranne una campagna, dovrebbe appartenere a una campagna.

Per modificare le informazioni di un elemento esistente, naviga semplicemente nell'elemento nella nota di Obsidian e segui l'Interfaccia Utente (UI) per apportare le modifiche necessarie. L'UI è progettata per essere intuitiva e facile da usare, semplificando la modifica degli attributi e delle relazioni di ciascun elemento.

Ora che sai come creare e modificare gli elementi, sei sulla buona strada per diventare un esperto di RPG Manager!

### 3.2 Relazioni

In RPG Manager, ogni elemento può contenere collegamenti ad altri elementi. Questi collegamenti diventano **relazioni** tra gli elementi, formando la base di come le informazioni sono connesse tra loro, il che è cruciale nella costruzione di una campagna. Le relazioni possono contenere una descrizione per spiegare meglio la connessione tra gli elementi.

Le relazioni possono essere di diversi tipi:

- **Bidirezionale**: Si verifica quando la relazione tra A e B è visibile e rilevante sia per A che per B.
- **Unidirezionale**: Una relazione di questo tipo è visibile e importante solo nell'elemento che la definisce. Se A è unidirezionalmente collegato a B, B non vedrà la stessa relazione. Questo è spesso necessario per specificare le relazioni tra personaggi non giocanti.
- **Genitore**: Definisce una relazione in cui uno degli elementi è il genitore di un altro. Ad esempio, il Luogo A può contenere il Luogo B; in questo caso, la relazione ha un tipo genitore.
- **Figlio**: L'opposto di una relazione genitore.

Stabilendo relazioni tra gli elementi, il narratore può creare una complessa rete di informazioni interconnesse che può essere facilmente navigata e compresa, facilitando lo sviluppo e la gestione della campagna.

### 3.3 Elementi

#### 3.3.1. Campagna

La campagna è la pietra angolare di RPG Manager, l'elemento principale che un narratore può creare, e tutti gli altri elementi formeranno il repository centrale delle informazioni per essa.

**Attributi**

- **Descrizione**: Un campo di testo in cui puoi descrivere il tema generale, l'ambientazione e la trama della tua campagna. Questo è l'unico attributo obbligatorio.
- **Cerchio Narrativo**: Uno spazio per sviluppare la narrazione della tua campagna utilizzando il metodo del cerchio narrativo. Questo è opzionale e particolarmente utile per chi pianifica in anticipo.
- **Avventure Figlio**: Una lista di avventure che fanno parte della campagna. Queste vengono create automaticamente quando crei una o più avventure.
- **Sessioni Figlio**: Una lista di sessioni che fanno parte della campagna. Queste vengono create automaticamente quando crei una o più sessioni.

**Note**:

- Le campagne sono sempre autonome e non possono essere collegate o associate ad altre campagne.
- La campagna non mostra tutte le relazioni con gli altri elementi, poiché sono figli e non relazioni.

Nelle sezioni successive, approfondiremo gli altri elementi e come si relazionano e supportano la campagna.

#### 3.3.2. Avventure

Un'avventura è un componente significativo di una campagna, che comprende una serie di eventi o sfide con un inizio e una conclusione distinti. Ad esempio, nella ben nota campagna di Call of Cthulhu, "Maschere di Nyarlathotep", tutti gli eventi che si svolgono a New York potrebbero essere classificati come un'unica avventura. Ogni avventura comprende più capitoli, che aiutano a strutturare la narrazione in modo più organizzato.

Un'avventura funge da blocco fondamentale all'interno di una campagna, operando come un'unità narrativa coerente con un inizio e una fine specifici. Normalmente comprende una serie di eventi, luoghi o sfide che possono essere raggruppati in una singola narrazione. Ad esempio, nella famosa campagna "Maschere di Nyarlathotep" per Call of Cthulhu, tutto ciò che accade a New York potrebbe essere considerato una singola avventura. Un'avventura può essere ulteriormente organizzata in vari capitoli per semplificare il processo di narrazione.

**Attributi**

- **Descrizione**: Un campo di testo in cui puoi descrivere il tema generale, l'ambientazione e la trama della tua avventura. Questo è l'unico attributo obbligatorio.
- **Cerchio Narrativo**: Uno spazio per sviluppare la narrazione della tua avventura utilizzando il metodo del cerchio narrativo. Questo è opzionale e particolarmente utile per chi pianifica in anticipo.
- **Indizi Principali**: Una lista di indizi significativi e i percorsi narrativi a cui potrebbero potenzialmente portare.
- **Capitoli Figlio**: Una lista di capitoli che fanno parte dell'avventura. Questi vengono generati automaticamente quando crei uno o più capitoli all'interno dell'avventura.
- **Kishōtenketsu**: Uno strumento di trama per strutturare e sviluppare la tua narrazione utilizzando uno stile classico cinese, coreano e giapponese.
- **Conflitto**: Uno strumento per descrivere conflitti che aiutano a guidare la narrazione. Aiuta i narratori a stabilire conflitti utili per identificare trame non strutturate per far avanzare la storia.

**Note**:

- Ogni avventura può appartenere solo a una campagna.
- Le avventure possono consistere in più capitoli, che possono essere organizzati in un ordine specifico per allinearsi alla progressione della storia.

#### 3.3.3. Capitoli

Un capitolo è un segmento più focalizzato e gestibile di un'avventura, un blocco fondamentale di un'avventura. Si concentra tipicamente su un evento o luogo specifico che i personaggi giocanti potrebbero incontrare, e su tutte le relazioni e interazioni che possono avere in quel contesto. Serve come segmento della narrazione che porta a una o più destinazioni, che potrebbero essere avventure o capitoli successivi. Suddividendo un'avventura in capitoli, diventa più facile gestire il flusso narrativo, sviluppare relazioni intricate e creare esperienze coinvolgenti per i giocatori.

**Attributi**

- **Descrizione**: Un campo di testo in cui puoi descrivere il tema generale, l'ambientazione e la trama del tuo capitolo. Questo è l'unico attributo obbligatorio.
- **Cerchio Narrativo**: Uno spazio per sviluppare la narrazione del tuo capitolo utilizzando il metodo del cerchio narrativo. Questo è opzionale e particolarmente utile per chi pianifica in anticipo.
- **Indizi Principali**: Una lista di indizi principali e dove portano.
- **K

ishōtenketsu**: Uno strumento di trama per strutturare e sviluppare la tua narrazione utilizzando uno stile classico cinese, coreano e giapponese.
- **Conflitto**: Uno strumento per descrivere conflitti che aiutano a guidare la narrazione. Aiuta i narratori a stabilire conflitti utili per identificare trame non strutturate per far avanzare la storia.

**Note**

- Un capitolo può appartenere solo a un'avventura.
- I capitoli sono il livello più granulare di organizzazione all'interno di un'avventura e non possono essere suddivisi in sottocapitoli.

#### 3.3.4. Eventi

Un evento è un avvenimento significativo nella narrazione, qualcosa a cui i personaggi giocanti possono essere coinvolti. Contiene una descrizione e sfrutta le relazioni per garantire che forniscano informazioni ai personaggi giocanti. Gli eventi sono elementi narrativi cruciali che aiutano a spingere la storia in avanti e creare esperienze coinvolgenti per i personaggi giocanti.

**Attributi**

- **Descrizione**: Un campo di testo in cui puoi descrivere i dettagli dell'evento, come cosa succede, chi è coinvolto e ogni altra informazione rilevante. Questo è un attributo obbligatorio.
- **Data**: La data di gioco in cui si verifica l'evento. Questo aiuta a mantenere la timeline della narrazione.

**Note**

- Un evento di solito non "porta" da nessuna parte, ma può contenere relazioni a indizi e luoghi che lo fanno.
- Sebbene non ci sia una gerarchia o una struttura rigida negli eventi, giocano un ruolo cruciale nella narrazione e dovrebbero essere attentamente elaborati dai narratori per assicurarsi che siano coinvolgenti e significativi.

Gli eventi, sebbene non siano unici in termini di metadati, sono elementi narrativi logicamente distinti. I narratori dovrebbero considerarli come eventi appropriati e scrivere le loro descrizioni di conseguenza per creare momenti coinvolgenti e significativi nella narrazione.

#### 3.3.5. Luoghi

I luoghi rappresentano i luoghi fisici all'interno del mondo di gioco in cui si verificano eventi e i personaggi interagiscono. Servono da sfondo per la narrazione e svolgono un ruolo cruciale nel delineare la scena e immergere i giocatori nel mondo di gioco.

**Attributi**

- **Descrizione**: Un campo di testo in cui puoi descrivere l'ambientazione, le caratteristiche rilevanti e ogni altra informazione pertinente sul luogo. Questo è un attributo obbligatorio.
- **Indirizzo**: Un campo di testo in cui puoi fornire l'indirizzo fisico o qualsiasi altro identificatore per il luogo. Questo è un campo opzionale e può essere personalizzato per soddisfare le esigenze del master di gioco. Ad esempio, potrebbe essere un indirizzo del mondo reale, coordinate su una mappa o una descrizione di un luogo fittizio o fantasy.

**Note**

- I luoghi possono essere correlati a qualsiasi altro elemento, inclusi eventi, PNG e indizi.
- Un luogo può essere definito come figlio di un altro luogo attraverso relazioni, ma non c'è una gerarchia o una struttura rigida che deve essere mantenuta.

#### 3.3.6. Indizi

Gli indizi sono pezzi di informazione che fanno avanzare la trama. Un indizio dovrebbe descrivere quale è l'informazione e come può essere trovata. Questa informazione è tipicamente parte della descrizione dell'indizio. Le relazioni di un indizio di solito sarebbero un evento, un luogo o un personaggio non giocante in cui può essere trovato l'indizio e dove porta. Tuttavia, in RPG Manager, qualsiasi elemento può essere correlato a qualsiasi altro elemento, quindi un indizio può anche essere correlato ad avventure, campagne, sessioni o qualsiasi altro elemento secondo necessità.
 
**Attributi**
========================Riprendi da qui===============
- **Descrizione**: Questo è un campo di testo in cui il narratore/GM scrive i dettagli dell'indizio, quali informazioni contiene e come possono essere trovate. Questo è l'unico attributo obbligatorio per un indizio.

**Note**:

- Un indizio può avere quante relazioni sono necessarie, indicando dove può essere trovato e dove porta. Tutto dipende dalla descrizione che il GM scrive.
- Un indizio può condurre a diverse posizioni, eventi o personaggi non giocanti, o qualsiasi combinazione di essi, a seconda della narrativa del GM.

#### 3.3.7. Personaggi non giocanti

I personaggi non giocanti (PNG) sono il cuore pulsante di ogni campagna. Sono gli individui che popolano il mondo, fornendo contesto, sfide e supporto ai personaggi giocatori. La loro presenza contribuisce in modo significativo all'atmosfera e alla narrazione della campagna.

I PNG sono sfaccettati, con una serie di attributi che ne definiscono il ruolo, la personalità e il percorso lungo tutta la campagna. Mentre solo la descrizione è obbligatoria, l'RPG Manager offre un elenco completo di attributi che possono essere personalizzati per creare un personaggio ben sviluppato:

**Attributi**

- **Descrizione**: Una panoramica dettagliata del PNG, che include aspetto fisico, tratti di personalità e altre caratteristiche rilevanti.
- Tipo: Definisce l'importanza del PNG nella narrazione come Principale, di Supporto o Extra.
- **Occupazione**: Una breve panoramica della professione o del ruolo del PNG nella società.
- **Arco del Personaggio**: Descrive la traiettoria dello sviluppo del PNG durante la campagna, che sia un arco Positivo, Disincanto, Caduta, Corruzione o Piatto.
- **Credenze**: I valori fondamentali e i principi che guidano le azioni e le decisioni del PNG.
- **Fantasma**: Un evento significativo del passato del PNG che ha plasmato le sue credenze e il suo punto di vista. Può essere un punto di svolta positivo o negativo che li ha portati a percepire il mondo in un certo modo.
- **Bugia**: Un fraintendimento che il PNG ha su se stesso o sul mondo circostante.
- **Necessità**: Il desiderio o il requisito sottostante che guida il PNG, anche se non ne è consapevole.
- **Punti di Forza**: I tratti positivi che potenziano il PNG e contribuiscono al suo successo.
- **Debolezze**: I tratti negativi che ostacolano il PNG e creano sfide per loro.
- **Comportamento**: Il modo tipico in cui il PNG agisce o risponde alle situazioni.
- **Desiderio**: Gli obiettivi che il PNG persegue attivamente, anche se non sono in linea con i loro veri bisogni. Questo attributo influenza il loro comportamento e le interazioni con gli altri.
- **Interesse**: Una misura dell'investimento del PNG nella sua occupazione, desideri e comportamenti, su una scala da 1 a 10. Indica il livello di sforzo che il PNG è disposto a compiere per raggiungere i suoi obiettivi.
- **Opposizione**: Le forze o gli ostacoli che si frappongono tra il PNG e il raggiungimento dei suoi desideri.

Mentre l'RPG Manager fornisce un approccio strutturato alla creazione dei PNG, offre anche la flessibilità per permettere ai narratori e ai GM di personalizzare gli attributi secondo le loro esigenze. Non tutti gli attributi sono necessari per ogni PNG, e il narratore può selezionare solo quelli rilevanti per il suo personaggio e la sua narrazione.

Inoltre, l'RPG Manager presenta un Assistente che aiuta i narratori nella creazione dei PNG guidandoli attraverso il processo in ordine di importanza. Questo strumento semplifica il processo di creazione e garantisce che s'identifichino gli attributi chiave.

In definitiva, i PNG svolgono un ruolo cruciale nel plasmare la narrazione e le interazioni all'interno di una campagna. Le loro caratteristiche, desideri e sfide possono spingere avanti la trama, creare conflitti e arricchire il processo di costruzione del mondo. Pertanto, è essenziale per i narratori e i GM creare attentamente i loro PNG, considerando l'impatto che avranno sulla narrazione complessiva e sulle esperienze dei personaggi giocatori.

#### 3.3.8. Fazioni

Le fazioni rappresentano gruppi organizzati di personaggi non giocanti che condividono obiettivi, filosofie o interessi comuni. Giocano un ruolo cruciale nel plasmare il mondo della campagna e spesso fungono da alleati, nemici o fonti di intrighi per i personaggi giocatori.

**Attributi**

- **Descrizione**: Un campo di testo dettagliato che descrive la storia della fazione, gli obiettivi, i membri notevoli e qualsiasi altra informazione rilevante.
- **Filosofia**: Questo delinea le credenze e i valori che guidano le azioni e le decisioni della fazione.
- **Struttura della Fazione**: Un campo di testo che descrive l'organizzazione interna della fazione, compresi i suoi leader, le divisioni e eventuali ruoli o titoli speciali.

Nell'RPG Manager, l'affiliazione di un personaggio non giocante a una fazione è definita attraverso le relazioni. Un personaggio non giocante può appartenere a più fazioni, e una fazione può avere relazioni con altre fazioni o elementi, consentendo la creazione di una rete complessa di alleanze e rivalità.

**Note**

- Un personaggio non giocante può appartenere a più fazioni, consentendo relazioni intricate e potenziali conflitti di interessi.
- Le fazioni possono avere relazioni con altre fazioni o elementi, consentendo la creazione di una rete di alleanze, rivalità e altre interazioni che possono aggiungere profondità e complessità alla campagna.
- L'attributo Filosofia delinea i principi guida e i valori della fazione, che possono influenzare le sue azioni, decisioni e relazioni con altri elementi nella campagna.

Le fazioni sono un elemento vitale nell'RPG Manager poiché influenzano le azioni dei personaggi non giocanti e possono avere un impatto significativo sulla narrazione e sulla dinamica della campagna. Definendo attentamente gli attributi e le relazioni di una fazione, i narratori possono creare un ricco tessuto di interazioni che aggiunge profondità e complessità alla loro campagna.

#### 3.3.9. Oggetti

Gli oggetti sono elementi di importanza all'interno della campagna. Mentre il loro ruolo e la loro importanza possono variare ampiamente a seconda della narrazione del GM, sono strumenti essenziali per arricchire la trama e fornire profondità al mondo della campagna.

**Attributi**

- **Descrizione**: Questo è l'unico attributo di un oggetto. È un campo di testo in cui il GM può descrivere l'oggetto, il suo aspetto, la sua importanza e qualsiasi altra informazione rilevante.

**Note**

- Gli oggetti possono avere relazioni con qualsiasi altro elemento nella campagna, come luoghi, eventi, personaggi non giocanti, ecc. Questa flessibilità consente al GM di intrecciare gli oggetti nella narrazione in modo che si adatti meglio alla trama.
- Il ruolo e l'importanza degli oggetti possono variare notevolmente da una campagna all'altra. Mentre alcuni oggetti potrebbero essere fondamentali per la trama, altri potrebbero servire a uno scopo più decorativo o atmosferico.

In conclusione, gli oggetti, apparentemente semplici, sono un elemento versatile che può essere utilizzato in modi diversi per migliorare la narrazione e l'esperienza immersiva del gioco di ruolo.

#### 3.3.10. Mostri

I mostri sono creature che i personaggi giocatori possono incontrare durante le loro avventure. Possono essere creature mitiche, prodotti della magia o esseri provenienti da un'altra dimensione. Indipendentemente dalla loro origine, i mostri aggiungono un elemento di pericolo e imprevedibilità alla campagna.

**Attributi**

- **Descrizione**: Questo è l'unico attributo di un mostro. È un campo di testo in cui il GM può descrivere l'aspetto del mostro, le sue abilità, comportamenti e qualsiasi altra informazione rilevante.

**Note**

- Similmente agli oggetti, i mostri possono avere relazioni con qualsiasi altro elemento nella campagna, come luoghi, eventi, personaggi non giocanti, ecc. Questa interconnessione consente al GM di integrare i mostri nella narrazione in modo uniforme e in modo che arricchisca l'intera trama.
- Il ruolo e l'importanza dei mostri possono variare notevolmente da una campagna all'altra. Alcuni mostri potrebbero essere centrali per la trama, fungendo da antagonisti chiave o sfide che i personaggi giocatori devono superare. Altri potrebbero essere più periferici, agendo come ostacoli o elementi atmosferici che aggiungono sapore al mondo della campagna.

In sintesi, i mostri, pur potenzialmente spaventosi, sono un elemento cruciale nel plasmare la narrazione e le sfide che i personaggi giocatori affrontano durante le loro avventure.

#### 3.3.11. Sottotrame

Le sottotrame sono narrazioni aggiuntive che integrano la trama principale della campagna. Mentre la trama principale guida la narrazione complessiva, le sottotrame aggiungono profondità, complessità e ricchezza al mondo e ai suoi personaggi. Possono variare in portata e scala e possono essere generiche, influenzando il mondo in generale, o specifiche, legate a un particolare personaggio non giocante (PNG) o personaggio giocatore (PG).

**Attributi**

- **Descrizione**: Un campo di testo per descrivere il tema, l'ambientazione e la narrativa della sottotrama. Questo è l'unico attributo obbligatorio.
- **Cerchio della Storia**: Uno spazio per sviluppare la narrazione della sottotrama utilizzando il metodo del cerchio della storia. Ciò aiuta a strutturare la narrazione e garantire che abbia un flusso logico.

**Note**:

- Le sottotrame sono flessibili e possono essere collegate a più PNG o PG, a seconda delle esigenze del narratore.
- Possono anche essere interconnesse con altre sottotrame attraverso relazioni, creando una rete di narrazioni che arricchiscono la campagna.

Le sottotrame sono uno strumento essenziale per il narratore, fornendo un modo per creare una narrazione sfaccettata che coinvolge i giocatori su più livelli. Che si tratti del viaggio personale di un PNG, di una missione secondaria che i PG intraprendono o di un evento più ampio che influisce sul mondo, le sottotrame aiutano a creare un'esperienza narrativa dinamica e immersiva.

#### 3.3.12. Personaggi giocatori

I personaggi giocatori sono gli avatar dei giocatori nel mondo di gioco, fungendo da riferimento cruciale per il narratore. Sebbene siano generalmente creati e sviluppati dai giocatori stessi, l'RPG Manager fornisce uno spazio per il narratore per registrare gli aspetti chiave di ciascun personaggio giocatore che sono essenziali per la narrazione.

**Attributi**

- **Descrizione**: Un campo di testo in cui è possibile descrivere l'aspetto del personaggio, la personalità, il background o qualsiasi altra informazione rilevante.
- **Credenze**: Le convinzioni fondamentali che guidano le azioni e le decisioni del personaggio.
- **Bugia**: Un fraintendimento che il personaggio ha su se stesso, sugli altri o sul mondo circostante.
- **Necessità**: Ciò di cui il personaggio ha veramente bisogno, che potrebbe essere sconosciuto a loro.
- **Desiderio**: Ciò che il personaggio pensa di volere, che potrebbe non essere necessariamente in linea con i loro veri bisogni.
- **Punti di Forza**: I tratti positivi del personaggio che li aiuteranno nel loro viaggio.
- **Debolezze**: I tratti negativi del personaggio che potrebbero ostacolarli o creare conflitti.

Ogni attributo, a parte la descrizione, è facoltativo e può essere compilato in base alle esigenze del narratore e del giocatore. È importante notare che l'RPG Manager è progettato come uno strumento per il narratore e, sebbene fornisca uno spazio per registrare questi aspetti dei personaggi giocatori, non sostituisce i fogli dei personaggi o altri strumenti utilizzati direttamente dai giocatori stessi.

**Note**

- Gli attributi elencati sopra sono solo una guida, e il narratore e i giocatori possono scegliere di includere altre informazioni rilevanti per la loro campagna.
- Le relazioni tra i personaggi giocatori e gli altri elementi della campagna, come PNG, luoghi ed eventi, possono essere registrate e gestite attraverso l'RPG Manager. Questo facilita una comprensione completa delle interconnessioni nella narrazione e aiuta nella pianificazione e nell'esecuzione della campagna.

In sintesi, la sezione dei personaggi giocatori nell'RPG Manager funge da utile riferimento per il narratore, consentendo loro di avere una panoramica rapida degli aspetti chiave di ciascun personaggio giocatore e comprendere il loro ruolo nella narrazione più ampia.

#### 3.3.13. Sessioni

Ci sei passato, vero? La sessione sta per iniziare, e hai qualche appunto scarabocchiato su un tovagliolo, o forse hai pianificato meticolosamente ogni singolo dettaglio fino al formaggio preferito del PNG. In ogni caso, sai che una volta che il gioco inizia, tutti i tuoi piani potrebbero andare a rotoli perché, ammettiamolo, i giocatori sono l'incarnazione del caos. Ecco dove entra in gioco la funzione `Sessioni` di RPG Manager. Pensala come il tuo tovagliolo digitale, solo molto più figo e meno probabile che venga usato per pulire una bibita rovesciata.

Allora, perché RPG Manager ha le sessioni? Semplice. Le sessioni sono dove la gomma incontra la strada. È lì che tu, il GM, tracci la sessione e monitori ciò che i personaggi giocatori fanno durante essa. Che tu sia un "Plotter" che pianifica meticolosamente la trama, un "Sandboxed" che crea un mondo aperto con Eventi, Luoghi e Indizi, o un GM pigro che prepara solo poche note e punti prima di ogni sessione, dovrai tenere traccia di cosa sta succedendo.

**Attributi**:

- **Descrizione**: Un breve riassunto di ciò che è accaduto. I personaggi giocatori hanno bruciato il villaggio (di nuovo), o hanno effettivamente salvato la giornata?
- **Data della Sessione**: Quando è successa questa follia? Tenere traccia delle date è cruciale per gestire la linea temporale della tua campagna.
- **Cerchio della Storia**: Per i "Plotter" là fuori, questo è il tuo strumento narrativo per creare una sessione con una struttura coesa e trame avvincenti.
- **Elenco delle Scene**: Popolato automaticamente quando vengono create scene per la sessione. Aiuta a organizzare gli incontri o gli eventi vari all'interno della sessione.
- **Kishōtenketsu**: Uno strumento di trama per strutturare e sviluppare la tua narrazione usando uno stile classico cinese, coreano e giapponese.
- **Conflitto**: Uno strumento per descrivere conflitti che aiutano a guidare la narrazione. Aiuta i narratori a predisporre conflitti utili per identificare trame non strutturate per far progredire la storia.

Bene, affrontiamo l'elefante nella stanza. Perché usare la funzione Sessioni? Beh, non è solo uno strumento per prendere appunti. È un modo per pianificare strategicamente e registrare il caos. Con esso, puoi prendere appunti durante la sessione, tracciare le azioni dei personaggi giocatori e sapere come far progredire la campagna. E non dimentichiamoci la parte migliore; facilita la creazione di relazioni tra le Sessioni e qualsiasi altro elemento nel gioco. Quindi, una sessione può essere collegata a specifici PNG, luoghi, eventi e altri elementi, aiutandoti a gestire l'intricata rete di relazioni e narrazioni che compongono la campagna. È come avere un assistente digitale super organizzato che non ti giudica per far combattere i personaggi giocatori con un drago di livello superiore al loro.

In poche parole, la funzione Sessioni in RPG Manager è il tuo miglior amico per la pianificazione e il tracciamento delle sessioni. È adattabile, è organizzata e, cosa più importante, è al tuo fianco quando i giocatori decidono di deviare dai binari... che, diciamocelo, succede ad ogni sessione.

#### 3.3.14. Scene

Nel mondo dei giochi di ruolo da tavolo, una scena è un'unità fondamentale di gioco. Rappresenta un momento specifico nel gioco in cui i personaggi giocatori devono compiere un'azione attiva. Questo può variare dall'affrontare in combattimento un drago temibile a prendere una decisione cruciale che potrebbe alterare il corso della loro avventura. Lo scopo principale di una scena è facilitare la partecipazione attiva e la presa di decisioni da parte dei personaggi giocatori, guidando così la narrazione in avanti.

**Attributi**

- **Descrizione**: Questo è un breve riassunto di ciò che il GM prevede che i personaggi giocatori faranno durante la scena. È cruciale notare che questo è solo una linea guida, poiché le azioni dei personaggi giocatori potrebbero deviare da ciò che ci si aspetta. Ad esempio, il GM potrebbe prevedere che i personaggi giocatori affronteranno in combattimento un gruppo di banditi, ma i giocatori potrebbero scegliere un approccio diverso, come la negoziazione o la furtività.
- **Fase del Cerchio della Storia**: Se la sessione ha un

 cerchio della storia, questo attributo indicherà in quale fase del cerchio della storia dovrebbe verificarsi la scena (tu, bisogno, vai, cerca, trova, prendi, ritorna, cambia).
- **Tipo**: Questo è il tipo di azione prevista durante la scena. Può essere uno dei seguenti: Azione, Combattimento, Decisione, Incontro, Esposizione, Investigazione, Preparazione, Riepilogo, Combattimento Sociale. È importante selezionare il tipo più appropriato per la scena in quanto stabilisce il tono e le aspettative per i personaggi giocatori.
- **Data**: Questa è la data di gioco in cui si prevede che si verificherà la scena. Ciò aiuta a mantenere la coerenza della linea temporale del mondo di gioco.
- **È Eccitante**: Questo attributo indica se la scena include elementi esterni, come personaggi non giocanti, disastri naturali, trappole, ecc., che scatenano un momento emozionante.

Le scene sono uno strumento essenziale per il GM, poiché aiutano a strutturare la sessione e forniscono una roadmap per la narrazione. Tuttavia, è importante ricordare che le scene non sono scolpite nella pietra e possono evolversi organicamente in base alle decisioni e alle azioni dei personaggi giocatori. La chiave è facilitare un coinvolgimento attivo e la partecipazione dei giocatori, creando così un'esperienza di gioco dinamica e memorabile.

### 3.4. Attributi Personalizzati

Gli Attributi Personalizzati in RPG Manager sono campi definiti dall'utente che è possibile creare per aggiungere dettagli specifici a vari elementi del tuo gioco non coperti dagli attributi predefiniti. Ad esempio, se stai gestendo una campagna con un sistema magico che coinvolge "Punti Mana," che non è un attributo predefinito in RPG Manager, puoi creare un attributo personalizzato per esso. Gli Attributi Personalizzati forniscono un modo per personalizzare ed estendere RPG Manager per adattarlo meglio alle esigenze specifiche del tuo gioco, aiutandoti a creare un mondo più immersivo e dettagliato per i tuoi giocatori in base alle tue esigenze specifiche.

Gli Attributi Personalizzati possono essere associati a vari elementi. Ciò significa che puoi creare un attributo come "Affiliazione Politica" per i personaggi non giocanti, "Meteo" per le scene o "Morale" per i personaggi giocanti, rendendo il mondo del tuo gioco più dettagliato e su misura per la tua narrazione.

Il tipo di dati che un attributo personalizzato può contenere include Testo, Numero, Opzione (un elenco a discesa di opzioni predefinite), Casella di controllo, Testo lungo e Data. Questa vasta gamma di tipi di dati consente di creare attributi che possono contenere diverse informazioni, rendendo la gestione del tuo gioco più flessibile e dettagliata.

Puoi accedere a questa funzione attraverso il menu delle opzioni cliccando sul link "Attributi Personalizzati". Questo aprirà un modulo modale in cui è possibile definire i propri attributi. Ogni attributo personalizzato deve avere un nome, un tipo (ad esempio, Testo, Numero, Opzione, Casella di controllo, Testo lungo, Data) e, se il tipo è 'Opzione', un elenco di opzioni che appariranno in un menu a discesa. Inoltre, è necessario specificare con quali tipi di elemento l'attributo personalizzato dovrebbe essere associato.

La creazione di Attributi Personalizzati consente di aggiungere dettagli specifici agli elementi del tuo gioco che non sono coperti dagli attributi predefiniti forniti da RPG Manager. Questo ti dà la flessibilità di personalizzare il tuo gioco in base alle tue esigenze e preferenze, rendendo la tua narrazione più dettagliata e coinvolgente.

### 3.5. Compiti

I Compiti sono essenzialmente una lista di cose da fare per ogni elemento nel tuo RPG Manager. Che si tratti di un personaggio non giocante, di una scena, di una sessione o di qualsiasi altro elemento, puoi assegnargli una lista di compiti. Questi compiti rappresentano cose che devono essere fatte o realizzate nel contesto di quell'elemento. Ad esempio, un compito per un personaggio non giocante potrebbe essere "I personaggi giocatori dovrebbero scoprire il loro segreto." Se pensi che questo compito potrebbe essere scoperto in una scena o in una sessione, puoi assegnarlo a quegli elementi specifici. Questo aiuta a mantenere la coerenza lungo tutta la tua campagna e assicura che punti importanti della trama o sviluppi dei personaggi non vengano trascurati.

**Creazione di un Compito**
La creazione di un compito è semplice. Quando ti trovi nel contesto di un elemento specifico, puoi aggiungere un compito ad esso. Ciò significa che non puoi creare un compito in modo indipendente; deve essere associato a un elemento fin dall'inizio. Ogni compito può essere assegnato a uno o più elementi, rendendolo uno strumento versatile per tenere traccia degli obiettivi importanti o degli sviluppi della trama attraverso diverse parti della tua campagna.

**Monitoraggio del Progresso**
RPG Manager ti consente di monitorare facilmente il progresso di ogni compito. Puoi visualizzare tutti i compiti aperti per una particolare campagna, e in ogni elemento, puoi vedere tutti i compiti che sono già stati completati. Ciò ti aiuta a rimanere organizzato e assicura che non perdere traccia di obiettivi importanti man mano che la tua campagna progredisce.

**Modifica ed Eliminazione dei Compiti**
I compiti possono essere modificati o eliminati dopo essere stati creati e assegnati. Questo offre flessibilità nel caso tu debba apportare modifiche o aggiustamenti mentre la tua campagna si sviluppa.

**Limitazioni**
Non c'è limite al numero di compiti che possono essere creati o assegnati a un elemento. Ciò significa che puoi creare quanti compiti desideri per sviluppare appieno la tua campagna e assicurarti che tutti gli obiettivi importanti siano presi in considerazione.

In generale, i compiti sono uno strumento potente in RPG Manager che ti aiuta a rimanere organizzato e assicurarti che punti importanti della trama, sviluppi dei personaggi e obiettivi non vengano trascurati durante tutta la tua campagna.

### 3.6. Modelli di Elementi

In RPG Manager, un modello di elemento è una nota di Obsidian che contiene un blocco di codice speciale, `RpgManager4`, che viene utilizzato dall'applicazione per renderne l'interfaccia utente (UI). Ciò consente ai narratori/GM di personalizzare le proprie note aggiungendo qualsiasi informazione, testo o altri blocchi di codice di cui hanno bisogno, pur avendo ancora l'UI di RPG Manager integrata nella nota.

La creazione di un modello è un processo in due fasi:

1. **Definire la Posizione del Modello:** Nelle impostazioni di RPG Manager, specificare la cartella in cui sono archiviati i tuoi modelli. È qui che RPG Manager cercherà i tuoi modelli.

2. **Creare il Modello:** Un modello è una nota di Obsidian che contiene il blocco di codice \`\`\`RpgManager4\`\`\` dove vuoi che appaia l'UI di RPG Manager. Puoi aggiungere qualsiasi altro contenuto desideri alla nota, ma può contenere solo

 un blocco di codice \`\`\`RpgManager4\`\`\`.

### 3.7. Risorse Globali

Nella versione 4 puoi creare elementi che non fanno parte di una singola campagna. Queste risorse (eventi, luoghi, indizi, personaggi non giocanti, fazioni, oggetti, mostri, sottotrame e personaggi giocanti) possono essere utilizzate in qualsiasi delle tue campagne. Aggiungi una relazione e sei a posto, scrivendo una volta, riutilizzando molte volte!

## 4. Creating a World

Creating a world is more than just outlining a plot; it’s about constructing a living, breathing environment in which your story can unfold. The RPG Manager facilitates this by allowing you to create and interrelate various elements that are crucial for worldbuilding.

**Interconnectedness**: By creating relationships between different elements - for example, linking an NPC to a faction or a location to an event - you're essentially constructing the fabric of your world. This interconnectedness helps to create a dynamic, coherent setting in which each element influences others. For instance, an NPC's actions might be influenced by their affiliation to a faction, which in turn might be in conflict with another faction over control of a specific location.

**Consistency**: As your world grows, it can be challenging to keep track of all the details. The RPG Manager helps maintain consistency by providing a structured way to organize and relate various elements. For example, by linking a subplot to a specific NPC or player character, you can easily track how that subplot progresses as the character interacts with other elements in the world.

**Depth**: Creating relationships between elements also adds depth to your world. For example, a location is not just a physical place; it's also a setting for events, a home for NPCs, and perhaps a base for a faction. By establishing these relationships, you give the location a history and a purpose that can enrich your narrative.

**Dynamics**: Relationships between elements also create dynamics that can drive your narrative. For example, the relationship between an NPC and a faction might change over time, influencing the NPC's actions and decisions. These dynamics can create unexpected twists and turns in your story, keeping your players engaged.

### 4.1. What Type of Storyteller Are You?

Understanding your style as a storyteller is crucial for effectively using the RPG Manager. Generally, storytellers can be categorized into three main types:

1. **Plotters**: These are storytellers who like to plan their stories in detail. They create intricate plots with well-defined story arcs, character development, and a clear beginning, middle, and end. They often use tools like the story circle to craft compelling narratives.

   _Example_: If you enjoy creating detailed outlines for each session, developing extensive backstories for your NPCs, and knowing exactly how each subplot will unfold, you are probably a plotter.

   _How RPG Manager Helps_: The RPG Manager is designed to help plotters organize their thoughts and ideas, create detailed relationships between elements, and develop compelling story arcs.

2. **Sandboxers**: These are storytellers who prefer to create open worlds where the players can explore and create their own stories. They focus on creating a detailed setting with various events, locations, and clues that the players can interact with.

   _Example_: If you prefer to create a detailed world with various locations, events, and NPCs, but leave it up to the players to decide how they want to interact with these elements, you are probably a sandboxer.

   _How RPG Manager Helps_: The RPG Manager helps sandboxers by providing a structured way to organize and interrelate various elements of their world, making it easier to manage the open-world setting.

3. **Lazy GMs**: These are storytellers who prefer to do minimal preparation before each session. They often have a rough idea of how the session will unfold but prefer to improvise and adapt to the players' actions during the game.

   _Example_: If you prefer to do minimal preparation before each session, often jotting down just a few bullet points or key ideas, you are probably a lazy GM.

   _How RPG Manager Helps_: The RPG Manager helps lazy GMs by providing a way to quickly and easily create and organize the essential elements needed for each session, making it easier to improvise during the game.

No matter what type of storyteller you are, the RPG Manager is designed to help you create and manage your world with ease.

### 4.2. For Every Storyteller You Are

Whether you're a Plotter, a Sandboxed, or a Lazy GM, RPG Manager has something for everyone. This section will help you understand how to use the tool, no matter what your storytelling style is.

#### 4.2.1. Creating Rounded Non-Player Characters

Non-Player Characters (NPCs) are the lifeblood of your world. They are the ones your players interact with, the ones who give out quests, the ones who stand in their way, and the ones who help them on their journey. Creating rounded NPCs is essential to build a three-dimensional world that feels alive and immersive.

A rounded NPC is not just a collection of stats and attributes; they have their own desires, fears, and motivations. They have a past that influences their present actions and a future they aspire to. These NPCs are not just passive elements waiting for the player characters (PCs) to interact with them; they have their own goals and can take actions independently of the PCs.

RPG Manager helps you create rounded NPCs by guiding you through the process of defining their personality, goals, and relationships with other elements of the campaign. This ensures that your NPCs are not just cardboard cutouts but feel like real, living beings that contribute to the richness of your world.

Do not be daunted by the many attributes available in RPG Manager; you can use as many or as few as you wish. The tool is designed to be flexible and adapt to your style of storytelling.

By creating rounded NPCs, you not only enhance the realism and depth of your world, but you also create opportunities for more engaging and dynamic storytelling. These NPCs can drive the plot forward, create conflicts and resolutions, and provide a deeper emotional connection for your players.

#### 4.2.2. Developing Adventures and Chapters

Adventures and Chapters are the building blocks of your campaign. An adventure is a single, self-contained storyline that can be part of a larger campaign, while a chapter is a smaller section of an adventure, or a standalone mini-adventure in its own right.

Developing well-structured adventures and chapters is crucial for maintaining a logical and engaging narrative.

- **Adventures**: An adventure is a series of events and challenges that the player characters (PCs) must navigate. It usually has a clear beginning, middle, and end, with a defined goal or objective that the PCs are trying to achieve. Each adventure is composed of multiple chapters, events, and encounters that the PCs will experience as they progress towards their goal.

- **Chapters**: A chapter is a smaller, more focused section of an adventure. It could be a single encounter, a series of related events, or a specific location that the PCs must navigate. Chapters help to break down the adventure into manageable chunks, making it easier for the storyteller to plan and execute.

The key to developing engaging adventures and chapters is to create a logical flow of events that guide the PCs from one challenge to the next, while also allowing room for unexpected twists and turns. It is important to strike a balance between guiding the PCs along a predetermined path and allowing them the freedom to make their own decisions and explore the world at their own pace.

RPG Manager helps you develop well-structured adventures and chapters by providing a framework to organize your ideas and create a logical flow of events. You can define the relationships between different elements of your campaign, such as how an event in one chapter might trigger a reaction in another, or how a decision made by the PCs in one adventure might have consequences in the next.

### 4.3. For Plotters

If you are a Plotter, you enjoy creating detailed plans and well-structured narratives for your gaming sessions. You find satisfaction in developing intricate storylines, with carefully thought-out plots, subplots, and character arcs. You appreciate the value of a well-crafted narrative and believe that a good story is the foundation of an engaging gaming experience.

RPG Manager is designed with you in mind. It provides the tools and structure necessary to organize your ideas, develop your narrative, and plan your sessions in detail. From creating well-rounded non-player characters to developing intricate subplots, RPG Manager provides a comprehensive platform to manage all aspects of your campaign.

As a Plotter, you will find that RPG Manager streamlines your planning process, making it easier to keep track of all the moving parts of your campaign and ensuring that you are well-prepared for each gaming session.

#### 4.3.1. Using the Story Circle

For Plotters who love crafting well-structured narratives, the Story Circle is a particularly useful tool. It's a framework adapted from Dan Harmon's approach to storytelling, designed to create a satisfying, complete story. The Story Circle consists of eight stages: You, Need, Go, Search, Find, Take, Return, and Change.
With RPG Manager, you can implement the Story Circle at various levels of granularity:

- **Campaigns**: At the campaign level, the Story Circle can help you outline the overarching narrative of your campaign, providing a high-level view of major milestones, turning points, and character arcs.

- **Adventures**: For each adventure within the campaign, you can apply the Story Circle to create a well-rounded, self-contained narrative arc. This ensures that each adventure contributes meaningfully to the campaign while standing as an engaging story in its own right.

- **Chapters**: If you break your adventures into chapters, the Story Circle can help you maintain a sense of pacing and dramatic tension throughout each adventure. It's a way of ensuring that every chapter moves the story forward and contributes to the characters' development.

- **Sessions**: Even on a session-by-session basis, the Story Circle can provide valuable structure. As a Plotter, you can use it to sketch out the expected flow of a single gaming session, planning moments of tension, discovery, conflict, and resolution that will keep your players engaged.

So, whether you're crafting the grand tale of a world-saving quest or planning out a single session's escapade, the Story Circle offers a valuable framework for developing compelling narratives. RPG Manager's functionality allows you to incorporate this directly into your planning, making it an indispensable tool for the Plotter GM.

### 4.4. For Sandboxers

Sandboxers thrive on flexibility and improvisation. They create an open world, filled with events, locations, and clues, and then set their players loose to explore and interact with that world as they see fit. The narrative emerges organically from the players' choices and actions.

With RPG Manager, Sandboxers can create a detailed and immersive world for their players. The players' choices and actions will determine the course of the narrative, making for a dynamic and engaging gaming experience.

So, if you're a Sandboxer who loves creating detailed, open worlds for your players to explore, RPG Manager offers the tools and flexibility you need to craft your narrative.

#### 4.4.1. Creating Open Worlds

Creating an open world involves much more than just sketching out a map with a few cities and points of interest. It's about creating a dynamic and interactive environment that your players can explore and affect through their actions. With RPG Manager, the process of creating such a world is simplified, but still offers the depth and complexity that your world deserves.

- **Integrating Elements**: Use the different elements in RPG Manager, like locations, events, clues, non-player characters, factions, and objects, to create a world full of life and intrigue. Each of these elements will help you to create a world that is rich in detail and full of possibilities.

- **Relationships**: Define the relationships between the different elements in your world. This could be the relationship between two non-player characters, between a faction and a location, or between a clue and an event. By defining these relationships, you create a network of interconnected elements that make your world feel cohesive and real.

- **Reactivity**: Your world should react to the actions of the player characters. RPG Manager helps you to keep track of the decisions that your players make and the consequences of those decisions. This will help you to create a world that feels dynamic and responsive.

Remember, creating an open world is not just about creating a large space for your players to explore, but about creating a world that feels alive and interconnected. With RPG Manager, you have all the tools you need to create such a world.

#### 4.4.2. Developing Events, Locations, and Clues

RPG Manager is your trusted companion in this creative endeavor. It enables you to populate your world with various elements, all interconnected and ripe for exploration:

- **Events**: Define significant happenings that populate your world. These can be historical events that shaped the world, ongoing conflicts that create tension, or potential future events that the players can influence.

- **Locations**: Craft detailed locations that your players can explore. RPG Manager allows you to define not only the physical characteristics of a location but also its inhabitants, its history, and its significance to the world.

- **Clues**: Develop a series of clues that can guide your players through the world. These clues can take many forms – an ancient artifact, a cryptic prophecy, a rumor overheard in a tavern – and can be linked to various events, locations, and non-player characters.

By developing these elements, you can create a rich tapestry for your players to interact with.

## 5. Running a Campaign

Once you have created your world, developed your adventures, and populated your game with well-rounded non-player characters, the next step is to actually run the campaign. This is where all of your hard work and preparation come into play. Running a campaign involves orchestrating the sessions, managing the player characters, and navigating the storylines as they unfold.

RPG Manager is not just a tool for preparation, but also an invaluable companion for the actual gameplay. It will help you keep track of everything that happens during a session, from the actions of the player characters to the progress of the storyline. It's also an excellent tool for improvisation, providing you with quick access to all the necessary information and making it easier to adapt to unexpected twists and turns.

As the storyteller, you are the guide for your players as they navigate through the world you have created. It's your responsibility to ensure that the campaign runs smoothly and that everyone has a good time. This section will provide you with tips and guidelines on how to effectively run a campaign using RPG Manager.

### 5.1. Prepping for a Session

Prepping for a session is an essential task for any storyteller, regardless of their style. How you approach this task will vary depending on whether you are a plotter, a sandboxer, or a lazy GM. RPG Manager is flexible enough to cater to all these styles, helping you to prepare in the way that suits you best.

- **For Plotters**: If you are a plotter, you probably like to have a well-structured plan for your sessions. RPG Manager can help you outline your session using the story circle, making sure that you have a coherent narrative with a clear beginning, middle, and end. You can plan out the scenes, define the key moments, and prepare the necessary non-player characters, locations, and events.

- **For Sandboxers**: As a sandboxer, you prefer to create an open world and let your players roam freely. Your prep work will mostly involve creating the world, its inhabitants, and the various plot hooks that the players can choose to pursue. RPG Manager helps you keep track of all these elements, making it easy to access the necessary information during the game and to adapt to the decisions of your players.

- **For Lazy GMs**: If you are a lazy GM, you probably prefer to do minimal prep and improvise as much as possible during the game. RPG Manager can still be a valuable tool for you, as it allows you to quickly jot down notes, create bullet points for the key moments of the session, and have quick access to the essential information about your world.

No matter your style, prepping for a session is crucial to ensure that the game runs smoothly and that your players have a memorable experience. RPG Manager is designed to assist you in this task, making your prep work easier and more efficient.

### 5.2. Taking Notes during Sessions

Taking notes during a session is crucial to keep track of what happens, especially because the decisions made and the events that unfold can have lasting effects on the campaign. RPG Manager facilitates this process by allowing you to easily document the progress of the game, even while in the heat of the moment.

- **Keeping Track**: During the game, many things will happen that you need to remember for future sessions. This can include character decisions, unexpected plot twists, or new non-player character introductions. With RPG Manager, you can easily note down all these important details, ensuring that you don't forget anything crucial.

- **Flexibility**: Whether you prefer to take detailed notes or just jot down the key points, RPG Manager is flexible enough to accommodate your style. You can write as much or as little as you want, and you can organize your notes in a way that makes sense to you.

- **Accessibility**: RPG Manager makes it easy to access your notes during the game. With just a few clicks, you can pull up the information you need, whether it's a non-player character's backstory, a location's description, or the details of a past event.

Taking notes during a session helps you maintain continuity in your campaign and ensures that you don't forget any important details. RPG Manager is designed to make this process as easy and efficient as possible, allowing you to focus on running the game and creating a memorable experience for your players.

### 5.3. Managing Scenes

Managing scenes is a fundamental aspect of running a session as it involves orchestrating the events that your players will engage with. RPG Manager assists you in organizing and managing these scenes, ensuring that your sessions run smoothly and are engaging for your players.

**Scene Organization**

With RPG Manager, you can organize your scenes in the order you expect them to occur. However, the tool is flexible enough to allow quick adjustments in case your players take an unexpected route. This way, you can ensure that you're always prepared, no matter what your players decide to do.

**Scene Attributes**

Each scene in RPG Manager can have several attributes, such as the description, the story circle stage, the type of scene (e.g., Action, Combat, Decision, etc.), the in-game date, and whether or not the scene is exciting. This allows you to have a clear picture of what each scene entails and how it fits into the overall narrative of your session.

**Dynamic Scenes**

Sometimes, your players will do something unexpected, and you'll need to create a new scene on the fly. RPG Manager allows you to quickly add new scenes during the session, ensuring that you can adapt to your players' decisions and keep the game flowing smoothly.

**Easy Access**

During the session, you'll need to access information quickly. RPG Manager makes it easy to navigate between scenes, access the necessary details, and make any required adjustments. This ensures that you can focus on narrating the story and engaging with your players, rather than scrambling to find the information you need.

**Optional Scene Creation**

It's worth noting that the creation of scenes in RPG Manager is entirely optional. The tool is designed to be as flexible as possible to accommodate different styles of play. Whether you prefer to meticulously plan each scene or create them on the fly, RPG Manager supports your preferred approach to storytelling.

## 6. ChatGPT Integration

Imagine having a creative assistant that not only helps you save time in generating non-player characters but also serves as a sparring partner, providing ideas that align with your campaign's description. Sounds like a dream, right? Well, with RPG Manager's ChatGPT integration, this dream becomes a reality!

ChatGPT can serve as your creative companion, generating entire non-player characters from just a few details, or assisting you step-by-step, suggesting parts of the non-player characters as if working shoulder to shoulder with you. The better and more descriptive your campaign is, the more the generated non-player characters will fit right in.

In this section, we will cover privacy concerns, cost implications, how to generate non-player characters with ChatGPT, and how to activate the ChatGPT integration. Let's dive in!

### 6.1. Privacy Concerns

When using the ChatGPT integration for non-player characters generation, the campaign description and the non-player characters information are sent to OpenAI servers. The data protection measures implemented by OpenAI ensure that the data is handled securely. However, it is important to be aware that this information is being transmitted and processed externally.

### 6.2. Costs Implications

Utilizing the ChatGPT API has an associated cost, which is calculated based on the number of tokens sent in each message. Each message exchanged with the ChatGPT API consumes tokens, and therefore, incurs a cost. It is important to be mindful of this, as frequent use of the ChatGPT integration will result in higher costs.

### 6.3. Non-player characters generation

The ChatGPT integration can assist in generating attributes for non-player characters, with the exception of the description attribute. This is done via the wizard, which proposes generations for each attribute during the creation process.

### 6.4. How to activate ChatGPT

To activate ChatGPT in RPG Manager, you will need an OpenAI API key. Follow these steps to obtain your key:

1. **Sign Up for an OpenAI Account:** Visit the OpenAI website and sign up for an account by clicking on the 'Sign Up' button and following the prompts.
2. **Generate API Key:** Once you have created your account and logged in, navigate to the 'API' section in your OpenAI account dashboard. Here, you will find the option to generate a new API key. Follow the on-screen instructions to create your key.
3. **Enter API Key in RPG Manager:** Open RPG Manager and navigate to the settings section. Input your newly generated OpenAI API key into the designated field.

## 7. Contributing

RPG Manager is an open-source project, and we welcome contributions of all kinds - from code contributions, bug reports, to documentation and any other help you can provide.

### 7.1. Code Contributions

If you are a developer and want to contribute to the codebase, please feel free to submit a pull request on our [GitHub repository](https://github.com/carlonicora/obsidian-rpg-manager/). We appreciate contributions that improve the functionality, usability, and overall quality of RPG Manager.

### 7.2. Bug Reporting

If you encounter any bugs or issues while using RPG Manager, please [submit a bug report on our GitHub issues page](https://github.com/carlonicora/obsidian-rpg-manager/issues). Be sure to provide as much detail as possible about the issue, including the steps to reproduce it, so that our developers can address it promptly.

### 7.3. Documentation:

Good documentation is crucial for any software project. If you have a knack for writing and want to help improve the RPG Manager documentation, please consider contributing to our documentation repository. Whether it's fixing typos, clarifying existing content, or creating new content, every contribution is valuable.

### 7.4. Other Ways to Help:

If you want to contribute in other ways, here are a few suggestions:

- Spread the word about RPG Manager to your friends and social media networks.
- Provide feedback on the application's features and usability.
- Create tutorials or guides that help new users get started with RPG Manager.

### 7.5. Community

Being an open-source project, RPG Manager thrives on the support and contributions of its community. Whether you are a developer, a storyteller, or just someone who wants to help out, we appreciate your support and encourage you to get involved. [Join us on the support thread on Discord](https://discord.com/channels/686053708261228577/1022806716343144518)!

## 8. Frequently Asked Questions

- **Can I help?**

  Of course you can. RPG Manager is open source, and you can propose new features or solve pesky bugs.

- **I have a criticism...**

  We truly appreciate all feedback and criticisms as they are crucial in enhancing RPG Manager. Nevertheless, we kindly ask that your feedback is constructive and respectful. It is quite straightforward to point out something that doesn't work or isn't good, but it is infinitely more helpful to provide suggestions for improvement. Keep in mind, RPG Manager is a community project. Therefore, it's up to all of us to contribute and make it the best it can be. Together, we can build something extraordinary! If you have any suggestions or feedback, please share them on [Github Issues](https://github.com/carlonicora/obsidian-rpg-manager/issues). Remember, there are two types of criticisms: constructive ones that help create a better world, and destructive ones made by those who enjoy undermining the efforts of creators working hard to release an open-source project. We obviously prefer the former!
