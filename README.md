Obiettivi generali:

Avere una pagina back-office, in cui si potranno inserire i prodotti specificando i parametri obbligatori e facoltativi,  modificare o cancellare il prodotto.Una homepage, dove l’utente possa vedere i prodotti disponibiliUna pagina di dettaglio in cui visualizzare tutti i dettagli del prodotto.

Tasks:
In Backoffice: usa una POST su /product con un payload per creare una nuova risorsa.
In Backoffice: aggiungi un bottone per la funzionalità di modifica di un prodotto già creato in precedenza (usa una PUT su /product/[PRODUCT_ID]).
In Backoffice: aggiungi un bottone per la cancellazione di uno specifico prodotto già esistente (usa DELETE su /product/[PRODUCT_ID])
In Backoffice: aggiungi una validazione di base per la creazione/modifica del prodotto nel form (non permettere l'invio dei dati con campi vuoti)
In Backoffice: aggiungi un bottone “Reset” per resettare il form.
In Homepage: premendo un bottone “modifica” su un prodotto si dovrà poterlo modificare.
Pagina Dettaglio: A questa pagina ci si arriverà cliccando sulla card in homepage.

EXTRA:
In Backoffice: I bottoni “reset” e “delete” dovranno chiedere conferma prima di procedere con l’operazione.
In Homepage: aggiungi un indicatore di caricamento affianco al titolo principale della pagina durante il caricamento delle risorse.Crea un sistema di gestione degli errori. Mostra all’utente un messaggio di errore specifico per le varie tipologie di problema, quando qualcosa va storto, attraverso l’utilizzo di componenti di Bootstrap appropriati.
