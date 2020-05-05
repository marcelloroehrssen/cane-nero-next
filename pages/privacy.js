import Base from "../src/components/layout/Base";
import React from "react";
import Section from "../src/components/layout/Section";
import Typography from "@material-ui/core/Typography";

const PrivacySection = ({title, children}) => (
    <>
        <Typography component={'h6'} variant={'h6'} style={{fontWeight: 'bold'}}>
            {title}
        </Typography>
        {children}
    </>
);


const Privacy = () => (
    <Base title={"Privacy Policy"} image={'/images/home.jpg'} breadCrumbs={[
        {url:null, label:"Privacy"}
    ]}>
        <Section title={"Normativa sulla privacy"}>
            <PrivacySection title={"A. Introduzione"}>
                <ol>
                    <li>La privacy dei visitatori del nostro sito web è molto importante per noi, quindi ci impegniamo a
                        tutelarla. La presente informativa sulla privacy illustra come tratteremo le tue informazioni
                        personali.
                    </li>
                    <li>In accordo ai termini della presente informativa, prestando il tuo consenso all’utilizzo dei
                        cookie in occasione della tua prima visita al nostro sito web, ci permetti di utilizzare tali
                        cookie ogni volta che visiterai il nostro sito
                    </li>
                </ol>
            </PrivacySection>
            <PrivacySection title={"B. Credits"}>
                <p>Questo documento è stato creato utilizzando un modello di SEQ Legal (seqlegal.com) modificato da
                    CaneNero (<a href={"/"}>www.cane-nero.it</a>)</p>
            </PrivacySection>
            <PrivacySection title={"C. Raccolta dei dati personali"}>
                <p>Potranno essere raccolti, memorizzati e utilizzati dati personali delle seguenti tipologie:</p>
                <ol>
                    <li>informazioni riguardanti il tuo dispositivo, fra cui indirizzo IP, posizione geografica, tipo e
                        versione del browser e del sistema operativo in uso;
                    </li>
                    <li>informazioni riguardanti le tue visite e gli usi di questo sito, fra cui la pagina web di
                        provenienza (referral), la durata della visita, le pagine visitate e i percorsi di navigazione
                        all’interno del sito web;
                    </li>
                    <li>informazioni da te fornite al momento della registrazione al nostro sito web, come il tuo
                        indirizzo e-mail;
                    </li>
                    <li>informazioni da te fornite al momento della creazione di un profilo sul nostro sito web, come il
                        tuo nome, foto del profilo, sesso, data di nascita, stato civile, interessi ed hobby, educazione
                        ed occupazione;
                    </li>
                    <li>informazioni da te fornite per attivare la sottoscrizione alle nostre e-mail e/o newsletter,
                        come il tuo nome e indirizzo e-mail;
                    </li>
                    <li>informazioni da te fornite usufruendo dei servizi del nostro sito web;</li>
                    <li>informazioni generate durante l’uso del nostro sito web, come data e ora, frequenza nonché le
                        circostanze del tuo utilizzo;
                    </li>
                    <li>informazioni da te postate sul nostro sito web con l’intenzione di pubblicarle su Internet,
                        compresi il tuo nome utente, le immagini del profilo e il contenuto dei tuoi post;
                    </li>
                    <li>qualsiasi altra informazione o dato personale da te inviatoci.</li>
                </ol>
                <p>Prima di condividere con noi le informazioni personali di un’altra persona, dovrai necessariamente
                    ottenere il consenso di tale persona tanto alla divulgazione quanto al trattamento di tali dati
                    personali in accordo alla presente informativa.</p>
            </PrivacySection>
            <PrivacySection title={"D. Utilizzo dei dati personali"}>
                <p>Le informazioni personali inviateci tramite il nostro sito web saranno utilizzate per gli scopi
                    indicati nella presente informativa o nelle pagine pertinenti del sito web. Potremo utilizzare le
                    tue informazioni personali per i seguenti scopi:</p>
                <ol>
                    <li>la gestione del nostro sito web ed attività;</li>
                    <li> la personalizzazione del nostro sito web a beneficio dell’utente;</li>
                    <li>l’abilitazione all’uso da parte dell’utente dei servizi disponibili sul nostro sito web;</li>
                    <li> l’invio di comunicazioni commerciali senza finalità di marketing;</li>
                    <li> l’invio di notifiche e-mail da te appositamente richieste;</li>
                    <li> l’invio della nostra newsletter via e-mail, se da te richiesta (potrai informarci in qualsiasi
                        momento se non desideri più ricevere la newsletter);
                    </li>
                    <li>la gestione di richieste e reclami da te le tue azioni in rapporto al nostro sito web;</li>
                    <li>il mantenimento della sicurezza del nostro sito web e la prevenzione di frodi;</li>
                    <li> la verifica del rispetto dei termini e condizioni d’uso del nostro sito web (incluso il
                        monitoraggio dei messaggi privati inviati attraverso il nostro servizio di messaggistica
                        privata);
                    </li>
                    <li> ulteriori utilizzi.</li>
                </ol>
                <p>Se fornisci informazioni personali destinate alla pubblicazione sul nostro sito web, noi
                    pubblicheremo e utilizzeremo altrimenti tali informazioni in accordo alla licenza d’uso da te
                    concessaci.</p>
                <p>Tramite gli appositi controlli messi a disposizione sul sito, puoi configurare le tue impostazioni di
                    privacy per limitare la pubblicazione dei tuoi dati e informazioni sul nostro sito web.</p>
                <p>Senza il tuo consenso esplicito, non forniremo in alcun modo le tue informazioni personali a terze
                    parti per le loro attività di marketing diretto né per le attività promozionali di ulteriori
                    soggetti terzi.</p>
            </PrivacySection>
            <PrivacySection title={"D. Utilizzo dei dati personali"}>
                <p>Potremo divulgare le tue informazioni personali ad ogni nostro dipendente, funzionario, assicuratore,
                    consulente professionale, agente, fornitore o subappaltatore, se ragionevolmente necessario per gli
                    scopi indicati nella presente informativa.</p>
                <p>Potremo divulgare le tue informazioni personali ad ogni membro del nostro gruppo aziendale (ovvero le
                    nostre consociate, la nostra società capogruppo ed ogni sua consociata), se ragionevolmente
                    necessario per gli scopi indicati nella presente informativa.</p>
                <p>Potremo divulgare le tue informazioni personali:</p>
                <ol>
                    <li>nella misura in cui ci è richiesto dalla legge;</li>
                    <li>nell’ambito di procedure legali in corso o future;</li>
                    <li>al fine di far valere, esercitare o difendere i nostri diritti legali (inclusa la fornitura di
                        informazioni a terzi a scopo di prevenzione di frodi e di riduzione del rischio di credito);
                    </li>
                    <li> all’acquirente (o potenziale acquirente) di ogni nostra azienda o attività che stiamo per (o
                        considerando di) cedere;
                    </li>
                    <li>ad ogni persona da noi ragionevolmente ritenuta idonea a rivolgersi a un tribunale o altra
                        autorità competente in ambito di divulgazione delle suddette informazioni personali, qualora, a
                        nostro ragionevole parere, tale tribunale o autorità sarebbe ragionevolmente incline a
                        richiedere la divulgazione di tali informazioni personali.
                    </li>
                </ol>
                <p>Ad eccezione dei casi previsti nella presente informativa, non forniremo alcuna tua informazione o
                    dato personale a terzi.</p>
            </PrivacySection>
            <PrivacySection title={"F. Trasferimenti internazionali di dati"}>
                <ol>
                    <li>Le informazioni che raccogliamo potranno essere archiviate, elaborate e trasferite tra ognuno
                        dei Paesi in cui operiamo, al fine di consentirci l’utilizzo delle stesse in conformità con
                        questa informativa.
                    </li>
                    <li>Le informazioni che raccogliamo potranno essere trasferite verso i seguenti Paesi non aventi
                        normative sulla protezione dei dati personali equivalenti a quelle in vigore nello Spazio
                        Economico Europeo: Stati Uniti d’America, Russia, Giappone, Cina e India.
                    </li>
                    <li>Le informazioni personali che pubblichi o sottoponi alla pubblicazione sul nostro sito web
                        potranno risultare disponibili via Internet in tutto il mondo. Non possiamo impedire l’uso o
                        abuso di tali informazioni da parte di altri soggetti.
                    </li>
                    <li>Accetti espressamente i trasferimenti di dati personali descritti in questa Sezione F della
                        presente informativa.
                    </li>
                </ol>
            </PrivacySection>
            <PrivacySection title={"G. Conservazione dei dati personali"}>
                <ol>
                    <li>La presente Sezione G definisce le nostre politiche e procedure in tema di conservazione dei
                        dati, le quali sono state formulate per aiutarci a garantire il rispetto dei nostri obblighi
                        legali riguardanti la conservazione e la cancellazione di dati e informazioni personali.
                    </li>
                    <li>Le informazioni personali da noi trattate saranno conservate per un periodo non superiore a
                        quanto necessario per le finalità previste.
                    </li>
                    <li>In deroga alle altre disposizioni della presente Sezione G, conserveremo i documenti (compresi i
                        documenti elettronici) contenenti dati personali:
                    </li>
                    <ol>
                        <li>nella misura in cui ci è richiesto dalla legge;</li>
                        <li>se riteniamo che tali documenti possano essere rilevanti per ogni eventuale procedura legale
                            in corso o futura;
                        </li>
                        <li>al fine di far valere, esercitare o difendere i nostri diritti legali (inclusa la fornitura
                            di informazioni a terzi a scopo di prevenzione di frodi e di riduzione del rischio di
                            credito).
                        </li>
                    </ol>
                </ol>
            </PrivacySection>
            <PrivacySection title={"H. Sicurezza dei dati personali"}>
                <ol>
                    <li>Adotteremo ragionevoli precauzioni di natura tecnica ed organizzativa per evitare ogni evento di
                        perdita, uso improprio o alterazione delle tue informazioni personali.
                    </li>
                    <li>Conserveremo tutte le informazioni personali da te forniteci sui nostri server sicuri
                        (adeguatamente protetti da password e firewall).
                    </li>
                    <li>Ogni transazione finanziaria elettronica realizzata attraverso il nostro sito web sarà protetta
                        tramite tecnologia crittografica.
                    </li>
                    <li>Riconosci che la trasmissione di informazioni online è per sua natura insicura e che noi non
                        possiamo garantire la sicurezza dei dati inviati via Internet.
                    </li>
                    <li>Sei responsabile di mantenere riservata la password che utilizzi per l’accesso al nostro sito
                        web; noi non ti chiederemo mai quale sia la tua password (eccetto che in fase di login sul
                        nostro sito web).
                    </li>
                </ol>
            </PrivacySection>
            <PrivacySection title={"I. Modifiche"}>
                <p>Potremo occasionalmente aggiornare la presente informativa pubblicandone una nuova versione sul
                    nostro sito web. Ti consigliamo di controllare periodicamente questa pagina per accertarti di aver
                    inteso le eventuali modifiche apportate all’informativa. Potremo darti notifica di variazioni alla
                    presente informativa via e-mail o tramite il sistema di messaggistica privata presente sul nostro
                    sito web.</p>
            </PrivacySection>
            <PrivacySection title={"J. I tuoi diritti"}>
                <p>Potrai chiederci che ti venga fornito ogni tuo dato e informazione personale in nostro possesso; tale
                    operazione sarà soggetta alle seguenti condizioni:</p>
                <ol>
                    <li>la fornitura di una prova idonea della tua identità (di norma accetteremo una fotocopia del tuo
                        passaporto/patente/carta d'identità certificata da un notaio più una copia originale di una
                        bolletta con il tuo indirizzo corrente).
                    </li>
                    <li>Potremo trattenere i dati personali da te richiesti nella misura consentita dalla legge.</li>
                </ol>
                <p>Potrai richiedere in qualsiasi momento che i tuoi dati personali non siano trattati per scopi di
                    marketing.</p>
                <p>In pratica, per quanto riguarda l’utilizzo dei tuoi dati personali per scopi di marketing, di norma
                    acconsentirai in maniera esplicita e anticipata, oppure ti sarà data l’opportunità di richiedere la
                    tua l’esclusione.</p>
            </PrivacySection>
            <PrivacySection title={"K. Siti di terze parti"}>
                <p>Il nostro sito include collegamenti ipertestuali a, e dettagli di, siti web di terze parti. Noi non
                    abbiamo alcun controllo né siamo responsabili per le politiche e le pratiche in materia di privacy
                    adottate da tali soggetti terzi.</p>
            </PrivacySection>
            <PrivacySection title={"L. Aggiornamento delle informazioni"}>
                <p>Ti preghiamo di comunicarci eventuali correzioni o aggiornamenti da apportare alle tue informazioni
                    personali in nostro possesso.</p>
            </PrivacySection>
            <PrivacySection title={"M. Cookie"}>
                <p>Il nostro sito web fa uso dei cookie. Un cookie è un file contenente un identificatore (una stringa
                    di lettere e numeri) che viene inviato da un web server a un browser, e da questi memorizzato.
                    L’identificatore viene poi inviato nuovamente al server ogniqualvolta tale browser richieda
                    l’accesso a una pagina di quel server. I cookie possono essere “persistenti” o “di sessione”: un
                    cookie persistente verrà memorizzato da un browser e rimarrà valido fino alla sua data di scadenza
                    prevista, a meno che l’utente non lo cancelli prima; un cookie di sessione, invece, scadrà al
                    termine della sessione dell’utente, ovvero quando il browser viene chiuso. In genere, i cookie non
                    contengono alcuna informazione che identifichi personalmente un utente, tuttavia le informazioni
                    personali che memorizziamo su di te potranno essere collegate ad informazioni memorizzate nei, e
                    ottenute dai, cookie. Sul nostro sito web utilizziamo sia cookie di sessione che cookie
                    persistenti.</p>
                <ol>
                    <li>Qui di seguito, i nomi dei cookie che utilizziamo sul nostro sito web, nonché gli scopi del loro
                        utilizzo:
                    </li>
                    <ol>
                        <li>utilizziamo Google Analytics sul nostro sito web per riconoscere un computer quando un
                            utente visita il sito / tracciare gli utenti mentre navigano sul sito / migliorare
                            l’usabilità del sito / analizzare l’uso del sito / amministrare il sito / prevenire frodi e
                            migliorare la sicurezza del sito / personalizzare il sito a seconda dell’utente;
                        </li>
                    </ol>
                    <li>La maggior parte dei browser consente di rifiutare i cookie; ad esempio:</li>
                    <ol>
                        <li>in Internet Explorer (versione 10) è possibile bloccare i cookie utilizzando apposite
                            impostazioni di gestione che vanno a sostituire la configurazione di base, cliccando su
                            “Strumenti”, “Opzioni Internet”, “Privacy” e poi “Avanzate”;
                        </li>
                        <li>in Firefox (versione 69) è possibile bloccare tutti i cookie cliccando sul pulsante del menu
                            in alto a destra e selezionando “Opzioni”; nella sezione “Privacy e sicurezza”, “Blocco
                            contenuti”, selezionare “Personalizzato”; qui selezionare la casella “Cookie” e nel relativo
                            menu a tendina scegliere “Tutti i cookie”;
                        </li>
                        <li>in Chrome (versione 77) è possibile bloccare tutti i cookie accedendo al menu in alto a
                            destra e cliccando su “Impostazioni”; sulla sinistra, selezionare “Avanzate”, “Privacy e
                            sicurezza”, quindi cliccare su “Impostazioni sito”, “Cookie e dati dei siti”; infine,
                            disattivare l’opzione “Consenti ai siti di salvare e leggere i dati dei cookie”.
                        </li>
                    </ol>
                </ol>
                <p>Il blocco di tutti i cookie avrà un impatto negativo sull’usabilità di molti siti web. Bloccando i
                    cookie, non sarai in grado di utilizzare tutte le funzioni del nostro sito web.</p>
                <p>È possibile eliminare i cookie già memorizzati sul tuo computer; ad esempio</p>
                <ol>
                    <li>in Internet Explorer (versione 10), è necessario eliminare manualmente i file cookie (le
                        istruzioni per farlo si trovano su http://support.microsoft.com/kb/278835);
                    </li>
                    <li>in Firefox (versione 69), è possibile eliminare tutti i cookie cliccando sul pulsante del menu
                        in alto a destra e selezionando “Opzioni”; nella sezione “Privacy e sicurezza”, “Cookie e dati
                        dei siti web”, cliccare sul pulsante “Elimina dati…”; controllare che l’apposita casella sia
                        selezionata, quindi premere il pulsante “Elimina”;
                    </li>
                    <li>in Chrome (versione 77), è possibile eliminare tutti i cookie accedendo al menu in alto a destra
                        e cliccando su “Altri strumenti”, “Cancella dati di navigazione”; qui, nel menu a tendina
                        “Intervallo di tempo”, selezionare “Tutto”; controllare che la casella “Cookie e altri dati dei
                        siti” sia selezionata, infine premere il pulsante “Cancella dati”.
                    </li>
                    <li>. L’eliminazione dei cookie avrà un impatto negativo sull’usabilità di molti siti web.</li>
                </ol>
            </PrivacySection>
        </Section>
    </Base>
);

export default Privacy;