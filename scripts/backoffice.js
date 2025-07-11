// qui utilizzerò le chiamate asincrone per inserire nuovi dati e per modificarli

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

class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

// qui avremo la gestione della modifica dei dati del prodotto selezionato

if (eventId) {
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
        throw new Error("Errore nella REQUEST", response.status);
      }
    })
    .then((resData) => {
      console.log(resData);
      document.getElementById("spinner-container").classList.add("d-none");
      document.getElementById("name").value = resData.name;
      document.getElementById("description").value = resData.description;
      document.getElementById("brand").value = resData.brand;
      document.getElementById("img-url").value = resData.imageUrl;
      document.getElementById("price").value = resData.price;
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
}

// interaggiamo con l'evento di submit del form in modo da inserire i dati del prodotto e poi caricarli sullo storage persistance

const myForm = document.getElementById("myForm");
myForm.addEventListener(`submit`, (e) => {
  e.preventDefault();

  // recuperiamo gli input
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const imgUrl = document.getElementById("img-url");
  const priceInput = document.getElementById("price");

  const productSave = new Product(
    nameInput.value,
    descriptionInput.value,
    brandInput.value,
    imgUrl.value,
    priceInput.value
  );

  console.log(productSave);

  let endpointToUse;
  if (eventId) {
    // abbiamo un ID nell'url, siamo qua per MODIFICARE un concerto!
    endpointToUse = endpoint + "/" + eventId;
  } else {
    // NON abbiamo un ID nell'url., siamo qua per CREARE un concerto!
    endpointToUse = endpoint;
  }

  let methodToUse;
  if (eventId) {
    // abbiamo un ID nell'url, siamo qua per MODIFICARE un concerto!
    methodToUse = "PUT";
  } else {
    // NON abbiamo un ID nell'url., siamo qua per CREARE un concerto!
    methodToUse = "POST";
  }

  fetch(endpointToUse, {
    method: methodToUse, // il metodo POST indica che questa chiamata genererà una nuova risorsa
    body: JSON.stringify(productSave), // il body dev'essere una stringa JSON
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzY3NTc4Y2RkZjAwMTU1ZDY3YTciLCJpYXQiOjE3NTIyMjEzMDEsImV4cCI6MTc1MzQzMDkwMX0.TRVkrsTeRyYxVtu9bwmWVm5fysjeD9F_tpFphNFpW_4",
      "Content-Type": "application/json",
      // sto dicendo alle API che allego un oggetto in formato JSON
    },
  })
    .then((response) => {
      if (response.ok) {
        document.getElementById("spinner-container").classList.add("d-none");
        alert("OPERAZIONE COMPLETATA!");
        // svuotiamo il form
        myForm.reset();
      } else {
        throw new Error("Errore nella request", response.status);
      }
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
});
