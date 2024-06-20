# Gestore di Giochi di Ruolo

[![en](https://img.shields.io/badge/lang-en-red.svg)](README.md)

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
- \*\*K

ishōtenketsu\*\*: Uno strumento di trama per strutturare e sviluppare la tua narrazione utilizzando uno stile classico cinese, coreano e giapponese.

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

In RPG Manager, un modello di elemento è una nota di Obsidian che contiene un blocco di codice speciale, `RpgManager5`, che viene utilizzato dall'applicazione per renderne l'interfaccia utente (UI). Ciò consente ai narratori/GM di personalizzare le proprie note aggiungendo qualsiasi informazione, testo o altri blocchi di codice di cui hanno bisogno, pur avendo ancora l'UI di RPG Manager integrata nella nota.

La creazione di un modello è un processo in due fasi:

1. **Definire la Posizione del Modello:** Nelle impostazioni di RPG Manager, specificare la cartella in cui sono archiviati i tuoi modelli. È qui che RPG Manager cercherà i tuoi modelli.

2. **Creare il Modello:** Un modello è una nota di Obsidian che contiene il blocco di codice \`\`\`RpgManager5\`\`\` dove vuoi che appaia l'UI di RPG Manager. Puoi aggiungere qualsiasi altro contenuto desideri alla nota, ma può contenere solo

un blocco di codice \`\`\`RpgManager5\`\`\`.

### 3.7. Risorse Globali

Nella versione 4 puoi creare elementi che non fanno parte di una singola campagna. Queste risorse (eventi, luoghi, indizi, personaggi non giocanti, fazioni, oggetti, mostri, sottotrame e personaggi giocanti) possono essere utilizzate in qualsiasi delle tue campagne. Aggiungi una relazione e sei a posto, scrivendo una volta, riutilizzando molte volte!

## 4. Creazione di un Mondo

Creare un mondo è più che delineare una trama; si tratta di costruire un ambiente vivo e pulsante in cui la tua storia può svolgersi. RPG Manager facilita questo processo consentendoti di creare e correlare vari elementi cruciali per la costruzione del mondo.

**Interconnessione**: Creando relazioni tra diversi elementi - ad esempio, collegando un PNG a una fazione o un luogo a un evento - stai essenzialmente costruendo la trama del tuo mondo. Questa interconnessione aiuta a creare un ambiente dinamico e coerente in cui ogni elemento influenza gli altri. Ad esempio, le azioni di un PNG potrebbero essere influenzate dalla loro affiliazione a una fazione, che a sua volta potrebbe essere in conflitto con un'altra fazione per il controllo di un luogo specifico.

**Coerenza**: Man mano che il tuo mondo cresce, può essere difficile tenere traccia di tutti i dettagli. RPG Manager aiuta a mantenere la coerenza fornendo un modo strutturato per organizzare e correlare vari elementi. Ad esempio, collegando una sottotrama a un determinato PNG o personaggio giocante, puoi tenere facilmente traccia di come quella sottotrama progredisce mentre il personaggio interagisce con altri elementi nel mondo.

**Profondità**: Creare relazioni tra gli elementi aggiunge anche profondità al tuo mondo. Ad esempio, un luogo non è solo un luogo fisico; è anche un contesto per gli eventi, una casa per i PNG e forse una base per una fazione. Stabilendo queste relazioni, dai al luogo una storia e uno scopo che possono arricchire la tua narrazione.

**Dinamiche**: Le relazioni tra gli elementi creano anche dinamiche che possono guidare la tua narrazione. Ad esempio, la relazione tra un PNG e una fazione potrebbe cambiare nel tempo, influenzando le azioni e le decisioni del PNG. Queste dinamiche possono creare svolte inaspettate nella tua storia, mantenendo i tuoi giocatori coinvolti.

### 4.1. Che tipo di Narratore sei?

Comprendere il tuo stile come narratore è cruciale per utilizzare efficacemente RPG Manager. In generale, i narratori possono essere categorizzati in tre tipi principali:

1. **Plotters**: Sono narratori che amano pianificare le loro storie in dettaglio. Creano trame intricate con archi narrativi ben definiti, sviluppo dei personaggi e un inizio, una parte centrale e una fine chiari. Spesso utilizzano strumenti come il cerchio della storia per creare narrazioni coinvolgenti.

   _Esempio_: Se ti piace creare dettagliati schemi per ogni sessione, sviluppare estese retroscena per i tuoi PNG e sapere esattamente come si svilupperà ogni sottotrama, sei probabilmente un plotter.

   _Come aiuta RPG Manager_: RPG Manager è progettato per aiutare i plotters a organizzare i loro pensieri e le loro idee, creare relazioni dettagliate tra gli elementi e sviluppare archi narrativi coinvolgenti.

2. **Sandboxers**: Sono narratori che preferiscono creare mondi aperti in cui i giocatori possono esplorare e creare le proprie storie. Si concentrano sulla creazione di un ambiente dettagliato con vari eventi, luoghi e indizi con cui i giocatori possono interagire.

   _Esempio_: Se preferisci creare un mondo dettagliato con vari luoghi, eventi e PNG, ma lasci che siano i giocatori a decidere come interagire con questi elementi, sei probabilmente un sandboxer.

   _Come aiuta RPG Manager_: RPG Manager aiuta i sandboxers fornendo un modo strutturato per organizzare e correlare vari elementi del loro mondo, facilitando la gestione dell'ambientazione open-world.

3. **Lazy GMs**: Sono narratori che preferiscono fare una preparazione minima prima di ogni sessione. Hanno spesso un'idea approssimativa di come si svilupperà la sessione, ma preferiscono improvvisare e adattarsi alle azioni dei giocatori durante il gioco.

   _Esempio_: Se preferisci fare una preparazione minima prima di ogni sessione, annotando spesso solo pochi punti chiave o idee principali, sei probabilmente un lazy GM.

   _Come aiuta RPG Manager_: RPG Manager aiuta i lazy GMs fornendo un modo per creare e organizzare rapidamente gli elementi essenziali necessari per ogni sessione, facilitando l'improvvisazione durante il gioco.

Indipendentemente dal tipo di narratore che sei, RPG Manager è progettato per aiutarti a creare e gestire il tuo mondo con facilità.

### 4.2. Per Ogni Tipo di Narratore Che Sei

Che tu sia un Plotter, un Sandboxer o un Lazy GM, RPG Manager ha qualcosa per tutti. Questa sezione ti aiuterà a capire come utilizzare lo strumento, indipendentemente dal tuo stile narrativo.

#### 4.2.1. Creazione di Personaggi Non Giocanti Ben Caratterizzati

I Personaggi Non Giocanti (PNG) sono il cuore pulsante del tuo mondo. Sono coloro con cui i tuoi giocatori interagiscono, quelli che assegnano missioni, quelli che si pongono sul loro cammino e quelli che li aiutano nel loro viaggio. Creare PNG ben caratterizzati è essenziale per costruire un mondo tridimensionale che sia vivo e coinvolgente.

Un PNG ben caratterizzato non è solo una raccolta di statistiche e attributi; hanno i propri desideri, paure e motivazioni. Hanno un passato che influenza le loro azioni presenti e un futuro a cui aspirano. Questi PNG non sono solo elementi passivi in attesa che i personaggi giocanti (PG) interagiscano con loro; hanno i loro obiettivi e possono agire indipendentemente dai PG.

RPG Manager ti aiuta a creare PNG ben caratterizzati guidandoti attraverso il processo di definizione della loro personalità, obiettivi e relazioni con altri elementi della campagna. Ciò garantisce che i tuoi PNG non siano solo sagome di cartone, ma sembrino esseri veri e propri che contribuiscono alla ricchezza del tuo mondo.

Non farti intimorire dalle numerose caratteristiche disponibili in RPG Manager; puoi usarne tante o quante ne desideri. Lo strumento è progettato per essere flessibile e adattarsi al tuo stile di narrazione.

Creando PNG ben caratterizzati, migliorai non solo il realismo e la profondità del tuo mondo, ma crei anche opportunità per una narrazione più coinvolgente e dinamica. Questi PNG possono spingere avanti la trama, creare conflitti e risoluzioni e fornire un collegamento emotivo più profondo per i tuoi giocatori.

#### 4.2.2. Sviluppo di Avventure e Capitoli

Avventure e capitoli sono i mattoni fondamentali della tua campagna. Un'avventura è una singola storia autocontenuta che può far parte di una campagna più ampia, mentre un capitolo è una sezione più piccola di un'avventura o una mini-avventura autonoma.

Sviluppare avventure e capitoli ben strutturati è cruciale per mantenere una narrazione logica e coinvolgente.

- **Avventure**: Un'avventura è una serie di eventi e sfide che i personaggi giocanti (PG) devono affrontare. Di solito ha un inizio, una parte centrale e una fine chiari, con un obiettivo definito che i PG stanno cercando di raggiungere. Ogni avventura è composta da vari capitoli, eventi e incontri che i PG esperimenteranno mentre avanzano verso il loro obiettivo.

- **Capitoli**: Un capitolo è una sezione più piccola e focalizzata di un'avventura. Potrebbe essere un singolo incontro, una serie di eventi correlati o una specifica località che i PG devono attraversare. I capitoli aiutano a suddividere l'avventura in porzioni gestibili, facilitando la pianificazione ed esecuzione da parte del narratore.

La chiave per sviluppare avventure e capitoli coinvolgenti è creare un flusso logico di eventi che guidi i PG da una sfida all'altra, consentendo al contempo spazio per svolte e svolgimenti inaspettati. È importante trovare un equilibrio tra guidare i PG lungo un percorso predefinito e concedere loro la libertà di prendere decisioni ed esplorare il mondo a loro proprio ritmo.

RPG Manager ti aiuta a sviluppare avventure e capitoli ben strutturati fornendo un quadro per organizzare le tue idee e creare un flusso logico di eventi. Puoi definire le relazioni tra diversi elementi della tua campagna, ad esempio come un evento in un capitolo potrebbe innescare una reazione in un altro, o come una decisione presa dai PG in un'avventura potrebbe avere conseguenze nella successiva.

### 4.3. Per i Plotters

Se sei un Plotter, ti piace creare piani dettagliati e narrazioni ben strutturate per le tue sessioni di gioco. Trovi soddisfazione nello sviluppare trame intricate, con trame, sottotrame e archi dei personaggi attentamente studiati. Apprezzi il valore di una narrazione ben costruita e credi che una buona storia sia alla base di un'esperienza di gioco coinvolgente.

RPG Manager è progettato con te in mente. Fornisce gli strumenti e la struttura necessari per organizzare le tue idee, sviluppare la tua narrazione e pianificare le tue sessioni in dettaglio. Dalla creazione di personaggi non giocanti ben caratterizzati allo sviluppo di trame intricate, RPG Manager offre una piattaforma completa per gestire tutti gli aspetti della tua campagna.

Come Plotter, scoprirai che RPG Manager semplifica il tuo processo di pianificazione, facilitando il monitoraggio di tutte le parti in movimento della tua campagna e assicurandoti di essere ben preparato per ogni sessione di gioco.

#### 4.3.1. Utilizzo del Cerchio della Storia

Per i Plotters che amano creare narrazioni ben strutturate, il Cerchio della Storia è uno strumento particolarmente utile. Si tratta di una struttura adattata dall'approccio di Dan Harmon alla narrazione, progettata per creare una storia soddisfacente e completa. Il Cerchio della Storia è composto da otto fasi: Tu, Hai Bisogno di, Vai, Cerca, Trova, Prendi, Ritorna, e Cambia.
Con RPG Manager, puoi implementare il Cerchio della Storia a vari livelli di granularità:

- **Campagne**: A livello di campagna, il Cerchio della Storia può aiutarti a delineare la narrazione generale della tua campagna, fornendo una visione di alto livello di pietre miliari, punti di svolta e archi dei personaggi principali.

- **Avventure**: Per ogni avventura all'interno della campagna, puoi applicare il Cerchio della Storia per creare un arco narrativo ben strutturato e autonomo. Ciò assicura che ogni avventura contribuisca in modo significativo alla campagna, stando al contempo come una storia coinvolgente a sé stante.

- **Capitoli**: Se suddividi le tue avventure in capitoli, il Cerchio della Storia può aiutarti a mantenere un senso di ritmo e tensione drammatica in ogni avventura. È un modo per garantire che ogni capitolo faccia progredire la storia e contribuisca allo sviluppo dei personaggi.

- **Sessioni**: Anche su base sessione per sessione, il Cerchio della Storia può fornire una struttura preziosa. Come Plotter, puoi usarlo per delineare il flusso previsto di una singola sessione di gioco, pianificando momenti di tensione, scoperta, conflitto e risoluzione che manterranno i tuoi giocatori coinvolti.

Quindi, che tu stia elaborando il grande racconto di una missione per salvare il mondo o pianificando l'escursione di una singola sessione, il Cerchio della Storia offre un quadro prezioso per lo sviluppo di narrazioni avvincenti. La funzionalità di RPG Manager ti consente di incorporarlo direttamente nella tua pianificazione, rendendolo uno strumento indispensabile per il GM Plotter.

### 4.4. Per i Sandboxers

I Sandboxers prosperano sulla flessibilità e sull'improvvisazione. Creano un mondo aperto, ricco di eventi, luoghi e indizi, e poi lasciano che i loro giocatori esplorino e interagiscano con quel mondo a loro piacimento. La narrativa emerge organicamente dalle scelte e dalle azioni dei giocatori.

Con RPG Manager, i Sandboxers possono creare un mondo dettagliato e coinvolgente per i loro giocatori. Le scelte e le azioni dei giocatori determineranno il corso della narrazione, creando un'esperienza di gioco dinamica e coinvolgente.

Quindi, se sei un Sandboxer che ama creare mondi aperti dettagliati per i tuoi giocatori, RPG Manager offre gli strumenti e la flessibilità di cui hai bisogno per plasmare la tua narrazione.

#### 4.4.1. Creare Mondi Aperti

Creare un mondo aperto implica molto più che delineare una mappa con alcune città e punti di interesse. Si tratta di creare un ambiente dinamico e interattivo che i tuoi giocatori possono esplorare e influenzare attraverso le loro azioni. Con RPG Manager, il processo di creazione di un tale mondo è semplificato, ma offre comunque la profondità e la complessità che il tuo mondo merita.

- **Integrare Elementi**: Utilizza gli elementi diversi in RPG Manager, come luoghi, eventi, indizi, personaggi non giocanti, fazioni e oggetti, per creare un mondo pieno di vita e intrighi. Ogni elemento ti aiuterà a creare un mondo ricco di dettagli e ricco di possibilità.

- **Relazioni**: Definisci le relazioni tra i diversi elementi del tuo mondo. Potrebbe essere la relazione tra due personaggi non giocanti, tra una fazione e un luogo o tra un indizio e un evento. Definendo queste relazioni, crei una rete di elementi interconnessi che rendono il tuo mondo coeso e reale.

- **Reattività**: Il tuo mondo dovrebbe reagire alle azioni dei personaggi giocanti. RPG Manager ti aiuta a tenere traccia delle decisioni che i tuoi giocatori prendono e delle conseguenze di tali decisioni. Ciò ti aiuterà a creare un mondo che sembra dinamico e reattivo.

Ricorda, creare un mondo aperto non riguarda solo la creazione di uno spazio ampio per i tuoi giocatori da esplorare, ma anche la creazione di un mondo che sembra vivo e interconnesso. Con RPG Manager, hai tutti gli strumenti necessari per creare un tale mondo.

#### 4.4.2. Sviluppare Eventi, Luoghi e Indizi

RPG Manager è il tuo compagno di fiducia in questa impresa creativa. Ti consente di popolare il tuo mondo con vari elementi, tutti interconnessi e pronti per l'esplorazione:

- **Eventi**: Definisci avvenimenti significativi che popolano il tuo mondo. Possono essere eventi storici che hanno plasmato il mondo, conflitti in corso che creano tensione o eventi futuri potenziali che i giocatori possono influenzare.

- **Luoghi**: Crea luoghi dettagliati che i tuoi giocatori possono esplorare. RPG Manager ti permette di definire non solo le caratteristiche fisiche di un luogo, ma anche i suoi abitanti, la sua storia e la sua importanza per il mondo.

- **Indizi**: Sviluppa una serie di indizi che possono guidare i tuoi giocatori attraverso il mondo. Questi indizi possono assumere molte forme: un antico manufatto, una profezia criptica, un pettegolezzo sentito in una taverna, e possono essere collegati a vari eventi, luoghi e personaggi non giocanti.

Sviluppando questi elementi, puoi creare un ricco arazzo con cui i tuoi giocatori possono interagire.

## 5. Gestire una Campagna

Una volta che hai creato il tuo mondo, sviluppato le tue avventure e popolato il tuo gioco con personaggi non giocanti ben definiti, il passo successivo è gestire effettivamente la campagna. Qui entrano in gioco tutti i tuoi sforzi e la preparazione. Gestire una campagna comporta orchestrare le sessioni, gestire i personaggi giocanti e navigare nelle trame mentre si svolgono.

RPG Manager non è solo uno strumento di preparazione, ma anche un prezioso compagno per il gioco effettivo. Ti aiuterà a tenere traccia di tutto ciò che accade durante una sessione, dalle azioni dei personaggi giocanti al progresso della trama. È anche un ottimo strumento per l'improvvisazione, fornendoti un rapido accesso a tutte le informazioni necessarie e facilitando l'adattamento a svolte e colpi di scena imprevisti.

Come narratore, sei la guida per i tuoi giocatori mentre navigano nel mondo che hai creato. È tua responsabilità assicurarti che la campagna si svolga senza intoppi e che tutti si divertano. Questa sezione ti fornirà consigli e linee guida su come gestire efficacemente una campagna utilizzando RPG Manager.

### 5.1. Prepararsi per una Sessione

La preparazione per una sessione è un compito essenziale per qualsiasi narratore, indipendentemente dallo stile. Come affronti questo compito varierà a seconda che tu sia un plottista, un sandboxer o un GM pigro. RPG Manager è sufficientemente flessibile da soddisfare tutti questi stili, aiutandoti a prepararti nel modo che ti si addice meglio.

- **Per i Plotters**: Se sei un plottista, probabilmente ti piace avere un piano ben strutturato per le tue sessioni. RPG Manager può aiutarti ad delineare la tua sessione utilizzando il cerchio della storia, assicurandoti di avere una narrazione coerente con un inizio, una parte centrale e una fine chiari. Puoi pianificare le scene, definire i momenti chiave e preparare i necessari personaggi non giocanti, luoghi ed eventi.

- **Per i Sandboxers**: Come sandboxer, preferisci creare un mondo aperto e lasciare che i tuoi giocatori vaghino liberamente. Il tuo lavoro di preparazione riguarderà principalmente la creazione del mondo, dei suoi abitanti e dei vari ganci di trama che i giocatori possono scegliere di perseguire. RPG Manager ti aiuta a tenere traccia di tutti questi elementi, rendendo facile l'accesso alle informazioni necessarie durante il gioco e l'adattamento alle decisioni dei tuoi giocatori.

- **Per i Lazy GMs**: Se sei un GM pigro, probabilmente preferisci fare una preparazione minima e improvvisare il più possibile durante il gioco. RPG Manager può comunque essere uno strumento prezioso per te, poiché ti consente di appuntare rapidamente note, creare elenchi puntati per i momenti chiave della sessione e avere un rapido accesso alle informazioni essenziali sul tuo mondo.

Indipendentemente dal tuo stile, prepararsi per una sessione è cruciale per garantire che il gioco si svolga senza intoppi e che i tuoi giocatori vivano un'esperienza memorabile. RPG Manager è progettato per assisterti in questo compito, facilitando la tua preparazione e rendendola più efficiente.

### 5.2. Prendere Appunti durante le Sessioni

Prendere appunti durante una sessione è fondamentale per tenere traccia di ciò che accade, specialmente perché le decisioni prese e gli eventi che si verificano possono avere effetti duraturi sulla campagna. RPG Manager facilita questo processo consentendoti di documentare facilmente il progresso del gioco, anche mentre sei nel vivo dell'azione.

- **Mantenere la Traccia**: Durante il gioco, molte cose accadranno che devi ricordare per le sessioni future. Ciò può includere decisioni dei personaggi, colpi di scena imprevisti o nuove introduzioni di personaggi non giocanti. Con RPG Manager, puoi annotare facilmente tutti questi dettagli importanti, assicurandoti di non dimenticare nulla di cruciale.

- **Flessibilità**: Che tu preferisca prendere appunti dettagliati o appuntare solo i punti chiave, RPG Manager è sufficientemente flessibile da adattarsi al tuo stile. Puoi scrivere tanto o quanto vuoi e puoi organizzare i tuoi appunti nel modo che ha senso per te.

- **Accessibilità**: RPG Manager rende facile l'accesso ai tuoi appunti durante il gioco. Con pochi clic, puoi visualizzare le informazioni di cui hai bisogno, che si tratti del retroscena di un personaggio non giocante, della descrizione di un luogo o dei dettagli di un evento passato.

Prendere appunti durante una sessione ti aiuta a mantenere la continuità nella tua campagna e assicura che non dimentichi dettagli importanti. RPG Manager è progettato per rendere questo processo il più facile ed efficiente possibile, consentendoti di concentrarti sulla gestione del gioco e sulla creazione di un'esperienza memorabile per i tuoi giocatori.

### 5.3. Gestire le Scene

Gestire le scene è un aspetto fondamentale della gestione di una sessione poiché comporta l'orchestrazione degli eventi con cui i tuoi giocatori interagiranno. RPG Manager ti aiuta nell'organizzare e gestire queste scene, garantendo che le tue sessioni si svolgano senza intoppi e siano coinvolgenti per i tuoi giocatori.

**Organizzazione delle Scene**

Con RPG Manager, puoi organizzare le tue scene nell'ordine in cui prevedi che si verificheranno. Tuttavia, lo strumento è abbastanza flessibile da consentire aggiustamenti rapidi nel caso in cui i tuoi giocatori prendano una strada inaspettata. In questo modo, puoi assicurarti di essere sempre preparato, indipendentemente dalle decisioni dei tuoi giocatori.

**Attributi delle Scene**

Ogni scena in RPG Manager può avere diversi attributi, come la descrizione, lo stadio del cerchio della storia, il tipo di

scena (ad esempio, Azione, Combattimento, Decisione, ecc.), la data di gioco e se la scena è emozionante o meno. Ciò ti consente di avere un'immagine chiara di cosa comporta ciascuna scena e come si inserisce nella narrazione complessiva della tua sessione.

**Scene Dinamiche**

A volte, i tuoi giocatori faranno qualcosa di inaspettato e dovrai creare una nuova scena al volo. RPG Manager ti consente di aggiungere rapidamente nuove scene durante la sessione, garantendo che tu possa adattarti alle decisioni dei tuoi giocatori e mantenere il gioco fluido.

**Facile Accesso**

Durante la sessione, avrai bisogno di accedere alle informazioni rapidamente. RPG Manager rende facile navigare tra le scene, accedere alle informazioni necessarie e apportare eventuali aggiustamenti richiesti. Ciò assicura che tu possa concentrarti sulla narrazione della storia e coinvolgerti con i tuoi giocatori, anziché cercare freneticamente le informazioni di cui hai bisogno.

**Creazione Opzionale di Scene**

È utile notare che la creazione di scene in RPG Manager è completamente facoltativa. Lo strumento è progettato per essere il più flessibile possibile per adattarsi a diversi stili di gioco. Che tu preferisca pianificare meticolosamente ogni scena o crearle al volo, RPG Manager supporta il tuo approccio preferito alla narrazione.

As the session comes to a close, there are essential tasks to ensure a satisfying conclusion and set the stage for future sessions.

- **Recording Outcomes**: Use RPG Manager to record the outcomes of significant events, player choices, and the resolution of major plot points. This information serves as a valuable reference for future sessions, maintaining consistency in your narrative.

- **Awarding Experience Points**: If your campaign uses an experience point system, RPG Manager provides a convenient way to calculate and award experience points based on player achievements, completed quests, and significant milestones.

- **Previewing Future Content**: Provide teasers or hints about what to expect in the next session or upcoming adventures. RPG Manager allows you to jot down ideas or outline future content, ensuring a smooth transition between sessions.

- **Gathering Feedback**: Use RPG Manager to collect feedback from your players. This can be done through notes or comments, allowing you to understand what aspects of the session worked well and where improvements can be made.

Running a campaign is a collaborative experience, and RPG Manager is your ally in orchestrating a memorable and immersive journey for both you and your players. The flexibility and features of RPG Manager empower you to adapt, engage, and create a living narrative that evolves with each session.

## 6. Integrazione con ChatGPT

Immagina di avere un assistente creativo che non solo ti aiuta a risparmiare tempo nella generazione di personaggi non giocanti, ma funge anche da compagno di gioco, fornendo idee in linea con la descrizione della tua campagna. Sembra un sogno, vero? Beh, con l'integrazione di ChatGPT in RPG Manager, questo sogno diventa realtà!

ChatGPT può fungere da compagno creativo, generando interi personaggi non giocanti da pochi dettagli o assistendoti passo dopo passo, suggerendo parti dei personaggi non giocanti come se stesse lavorando fianco a fianco con te. Più dettagliata e descrittiva è la tua campagna, più i personaggi non giocanti generati si inseriranno perfettamente.

In questa sezione, affronteremo le preoccupazioni sulla privacy, le implicazioni di costo, come generare personaggi non giocanti con ChatGPT e come attivare l'integrazione con ChatGPT. Iniziamo!

### 6.1. Preoccupazioni sulla Privacy

Quando si utilizza l'integrazione con ChatGPT per la generazione di personaggi non giocanti, la descrizione della campagna e le informazioni sui personaggi non giocanti vengono inviate ai server di OpenAI. Le misure di protezione dei dati implementate da OpenAI garantiscono che i dati siano gestiti in modo sicuro. Tuttavia, è importante essere consapevoli che queste informazioni vengono trasmesse ed elaborate esternamente.

### 6.2. Implicazioni di Costo

L'utilizzo dell'API di ChatGPT comporta un costo associato, calcolato in base al numero di token inviati in ogni messaggio. Ogni messaggio scambiato con l'API di ChatGPT consuma token e, quindi, comporta un costo. È importante tenerne conto, poiché un uso frequente dell'integrazione con ChatGPT comporterà costi più elevati.

### 6.3. Generazione di Personaggi Non Giocanti

L'integrazione con ChatGPT può aiutare a generare attributi per i personaggi non giocanti, ad eccezione dell'attributo della descrizione. Ciò avviene attraverso la procedura guidata, che propone generazioni per ciascun attributo durante il processo di creazione.

### 6.4. Come Attivare ChatGPT

Per attivare ChatGPT in RPG Manager, avrai bisogno di una chiave API di OpenAI. Segui questi passaggi per ottenere la tua chiave:

1. **Registrati per un Account OpenAI:** Visita il sito web di OpenAI e registrati per un account cliccando su 'Registrati' e seguendo le indicazioni.
2. **Genera una Chiave API:** Una volta creato l'account e effettuato l'accesso, vai alla sezione 'API' nel pannello del tuo account OpenAI. Qui troverai l'opzione per generare una nuova chiave API. Segui le istruzioni visualizzate per crearla.
3. **Inserisci la Chiave API in RPG Manager:** Apri RPG Manager e vai alla sezione delle impostazioni. Inserisci la tua nuova chiave API di OpenAI nel campo designato.

## 7. Contributi

RPG Manager è un progetto open-source, e accogliamo contributi di ogni tipo: dalle modifiche al codice, segnalazioni di bug, alla documentazione e qualsiasi altro aiuto tu possa offrire.

### 7.1. Contributi al Codice

Se sei un programmatore e desideri contribuire al codice, sentiti libero di inviare una pull request sul nostro [repository GitHub](https://github.com/carlonicora/obsidian-rpg-manager/). Apprezziamo i contributi che migliorano la funzionalità, l'usabilità e la qualità complessiva di RPG Manager.

### 7.2. Segnalazione di Bug

Se incontri bug o problemi durante l'uso di RPG Manager, per favore [invia una segnalazione di bug sulla nostra pagina delle issues su GitHub](https://github.com/carlonicora/obsidian-rpg-manager/issues). Assicurati di fornire il maggior numero possibile di dettagli sul problema, compresi i passaggi per riprodurlo, in modo che i nostri sviluppatori possano risolverlo prontamente.

### 7.3. Documentazione:

Una buona documentazione è cruciale per qualsiasi progetto software. Se hai un talento per la scrittura e vuoi contribuire a migliorare la documentazione di RPG Manager, considera la possibilità di contribuire al nostro repository di documentazione. Che si tratti di correggere errori di battitura, chiarire contenuti esistenti o creare nuovi contenuti, ogni contributo è prezioso.

### 7.4. Altri Modi per Contribuire:

Se desideri contribuire in altri modi, ecco alcune suggerimenti:

- Parla di RPG Manager ai tuoi amici e sui social media.
- Fornisci feedback sulle funzionalità e sull'usabilità dell'applicazione.
- Crea tutorial o guide che aiutino i nuovi utenti a iniziare con RPG Manager.

### 7.5. Comunità

Essendo un progetto open-source, RPG Manager prospera sul supporto e sui contributi della sua comunità. Che tu sia uno sviluppatore, un narratore o semplicemente qualcuno che vuole dare una mano, apprezziamo il tuo supporto e ti incoraggiamo a partecipare. [Unisciti a noi sul canale di supporto su Discord](https://discord.com/channels/686053708261228577/1022806716343144518)!

## 8. Domande Frequenti

- **Posso aiutare?**

  Certamente che puoi. RPG Manager è open source, e puoi proporre nuove funzionalità o risolvere fastidiosi bug.

- **Ho una critica...**

  Apprezziamo davvero tutti i feedback e le critiche, poiché sono cruciali per migliorare RPG Manager. Tuttavia, ti chiediamo gentilmente che il tuo feedback sia costruttivo e rispettoso. È piuttosto semplice indicare qualcosa che non funziona o che non è buono, ma è infinitamente più utile fornire suggerimenti per il miglioramento. Ricorda, RPG Manager è un progetto della comunità. Pertanto, spetta a tutti noi contribuire e renderlo il migliore possibile. Insieme, possiamo costruire qualcosa di straordinario! Se hai suggerimenti o feedback, per favore condividili su [Github Issues](https://github.com/carlonicora/obsidian-rpg-manager/issues). Ricorda, ci sono due tipi di critiche: quelle costruttive che aiutano a creare un mondo migliore, e quelle distruttive fatte da coloro che godono nel minare gli sforzi dei creatori che lavorano duramente per rilasciare un progetto open source. Ovviamente preferiamo il primo tipo!
