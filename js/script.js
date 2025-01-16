// Import degli elementi da manipolare e dichiarazione delle variabili
const preventiveRequestForm = document.querySelector(".preventiveRequestForm");
const calculateButton = document.querySelector(".calculateButton");
let result = document.querySelector(".result");
let finalPrice = 0;
const commission = document.querySelector(".commission");

const promoCodes = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];

// BONUS: Array di oggetti per generare dinamicamente le opzioni nella select
const SelectOptions = [
    {value: "1", label: "Sviluppo Back-end"},
    {value: "2", label: "Sviluppo Front-end"},
    {value: "3", label: "Project Analysis"}
]

// Chiamata della funzione al caricamento della pagina per generare le opzioni della select
populateSelect(commission, SelectOptions);

// Intercettazione del submit
preventiveRequestForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Elementi dello stato del bottone
    const spinnerElement = calculateButton.querySelector('#spinner');
    const statusText = calculateButton.querySelector('.status');
    const originalStatusText = statusText.innerHTML;

    // Cambio dello status del bottone
    calculateButton.disabled = true;
    spinnerElement.classList.toggle('d-none');
    statusText.innerHTML = `Calcolo del preventivo...`;

    setTimeout(() => {
        estimateCalculation();

        // Reset dello status del bottone
        calculateButton.disabled = false;
        spinnerElement.classList.toggle('d-none');
        statusText.innerHTML = originalStatusText;
    }, 1500);
});

// Calcolo della commissione
function estimateCalculation() {

    // Dichiarazione delle variabili utili
    const workHoursRequired = 10;
    const backendDev = 20.50;
    const frontendDev = 15.30;
    const projectAnalysis = 33.60;

    // Calcolo del prezzo in base alla commissione scelta dall'utente
    if (commission.value === "1") {
        finalPrice = backendDev * workHoursRequired;
    } else if (commission.value === "2") {
        finalPrice = frontendDev * workHoursRequired;
    } else if (commission.value === "3") {
        finalPrice = projectAnalysis * workHoursRequired;
    }

    promoCodeCheck();

    // Conversione e restituzione del risultato del prezzo finale in forma umana
    finalPrice = finalPrice.toFixed(2).replace(".", ",");
    finalPrice = finalPrice.toString().split(",");
    // console.log(finalPrice);
    result.innerHTML = `<p><strong>Prezzo finale <br> € ${finalPrice[0]}</strong>,${finalPrice[1]}</p>`;
    // console.log(finalPrice);
}

// Controllo del codice promo inserito dall'utente, se presente
function promoCodeCheck() {
    const promoCodeInput = document.querySelector(".promoCodeInput");
    const applyDiscount = promoCodes.includes(promoCodeInput.value);

    if (applyDiscount) {
        promoCodeInput.classList.remove("is-invalid");
        promoCodeInput.classList.add("is-valid");
        finalPrice = finalPrice - ((finalPrice * 25) / 100);
    } else if (promoCodeInput.value === ""){
        promoCodeInput.classList.remove("is-valid");
        promoCodeInput.classList.remove("is-invalid");
        return;
    } else {
        promoCodeInput.classList.remove("is-valid");
        promoCodeInput.classList.add("is-invalid");
    }
}

// BONUS: funzione per generare dinamicamente le opzioni
function populateSelect(selectElement, SelectOptions) {
    // console.log(selectElement.innerHTML);
    // Rimozione di eventuali opzioni esistenti, tranne quella di default
    selectElement.innerHTML = '<option value="">Seleziona il tipo di lavoro</option>';
    // console.log(selectElement.innerHTML);

    // Aggiunta delle nuove opzioni
    SelectOptions.forEach(function(option) {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      selectElement.appendChild(optionElement);
    });
  }