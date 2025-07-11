// qui creerò le cardo dinamicamente tramite le chiamate asincrone una volta che i dati vengono aggiunti dal form

// prima prendo il riferimento della data nel footer in modo che venga aggiornata dinamicamente
const yearInFooter = function () {
  const span = document.getElementById("year");
  span.innerText = new Date().getFullYear(); // 2025
};

// passiamo alla creazione delle card e quindi alla gestione della request

const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

const getProduct = function () {
  fetch(endpoint, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzY3NTc4Y2RkZjAwMTU1ZDY3YTciLCJpYXQiOjE3NTIyMjEzMDEsImV4cCI6MTc1MzQzMDkwMX0.TRVkrsTeRyYxVtu9bwmWVm5fysjeD9F_tpFphNFpW_4",
    },
  })
    .then((response) => {
      if (response.ok) {
        // qui vado a prendere i miei dati ed estrapolo il file JSON
        return response.json();
      } else {
        throw new Error(`ERRORE: la RESPONSE non ha restituito il true`);
      }
    })
    .then((resData) => {
      console.log("RESPONSE:", resData);
      document.getElementById("spinner-container").classList.add("d-none");
      //   recupero la riga per collegare le cards dove avranno i prodotti inseriti con la loro descrizione
      const row = document.getElementById("rowProduct");
      if (resData.lenght === 0) {
        row.innerHTML = `<div class="col">
            <p class="text-center">Al momento non ci sono prodotti disponibili</p>
          </div>
        `;
      } else {
        resData.forEach((product) => {
          row.innerHTML += `
            <div class = "col col-12 col-md-6 col-lg-3 g-4 border border-1 border-light rounded-5 bg-dark >
                    <div class="card p-2 d-flex flex-column">
                        <div class="border border-1 border-success rounded-5 shadow-lg mt-4">
                        <img src="${product.imageUrl}" class="card-img-top img-fluid w-100 rounded-5 " alt="immagine del prodotto">
                        </div>
                            <div class="card-body d-flex flex-column align-items-center">
                                <h5 class="card-title mt-4 text-light">${product.name}</h5>
                                    <p class="card-text mt-3">${product.description}</p>
                                    <p class="card-text">${product.brand}</p>
                                    <p class="card-text">${product.price} €</p>
                                        <a href="./details.html?eventId=${product._id}" class="btn mb-2 w-75" id="buttonDetails">Visualizza dettagli</a>
                                        
                            </div>
                  </div>
              </div>`;
        });
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

yearInFooter();
getProduct();
