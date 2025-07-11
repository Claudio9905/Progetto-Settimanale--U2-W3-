console.log(location.search);
const parameters = new URLSearchParams(location.search); // creo un oggetto con TUTTI i parametri in questo URL
const eventId = parameters.get("eventId");

const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

const yearInFooter = function () {
  // per prima cosa, popolo il footer con l'anno corrente
  const span = document.getElementById("year");
  span.innerText = new Date().getFullYear(); // 2025
};

yearInFooter();

// creo la funzione che permette la request che mi prende i dati effettivi del prodotto selezionato

fetch(endpoint + "/" + eventId, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzY3NTc4Y2RkZjAwMTU1ZDY3YTciLCJpYXQiOjE3NTIyMjEzMDEsImV4cCI6MTc1MzQzMDkwMX0.TRVkrsTeRyYxVtu9bwmWVm5fysjeD9F_tpFphNFpW_4",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("ERRORE nella request:", response.status);
    }
  })
  .then((resData) => {
    console.log(resData);
    document.getElementById("spinner-container").classList.add("d-none");

    document.getElementById("name").innerText = resData.name;
    document.getElementById("description").innerText = resData.description;
    document.getElementById("brand").innerText = resData.brand;
    document.getElementById("price").innerText = resData.price + ` €`;
    document
      .getElementById("img-product")
      .setAttribute(`src`, `${resData.imageUrl}`);
  })
  .catch((err) => {
    console.log("ERRORE:", err);
  });

// creo le funzione per eliminare il prodotto e per modificarlo

const deleteProduct = function () {
  // con questa funzione chiedo all'API di eliminare questa risorsa
  fetch(endpoint + "/" + eventId, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzY3NTc4Y2RkZjAwMTU1ZDY3YTciLCJpYXQiOjE3NTIyMjEzMDEsImV4cCI6MTc1MzQzMDkwMX0.TRVkrsTeRyYxVtu9bwmWVm5fysjeD9F_tpFphNFpW_4",
    },
  })
    .then((response) => {
      if (response.ok) {
        // l'operazione di DELETE è andata a buon fine!
        alert("ELIMINAZIONE AVVENUTA CON SUCCESSO");
        // visto che la risorsa non esiste più, riportiamo l'utente in home
        location.assign("./index.html");
      } else {
        throw new Error("Errore in fase di eliminazione");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

const editProduct = function () {
  location.assign("./backoffice.html?eventId=" + eventId);
};
