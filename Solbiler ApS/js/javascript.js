
// Oversigt over bilerne på sitet og deres egenskaber der skal indgå i søgefeltet
const biler = [
    {
        bilmaerke: "Mini Cooper S",
        billede: "billeder/car.png",
        billedtekst: "Billede af udlejningsbil",
        kategori: "Budget",
        personer: "4",
        kufferter: "0",
        tillaeg: "0"
    },
    {
        bilmaerke: "Mazda Atenza",
        billede: "billeder/car2.png",
        billedtekst: "Billede af udlejningsbil",
        kategori: "Mellemklasse",
        personer: "5",
        kufferter: "3",
        tillaeg: "60"
    },
    {
        bilmaerke: "Chevrolet Tahoe",
        billede: "billeder/car3.png",
        billedtekst: "Billede af udlejningsbil",
        kategori: "Minivan",
        personer: "7",
        kufferter: "4",
        tillaeg: "105"
    }
];

const sektion = document.getElementById('bil_sektion');
const skabelon = document.getElementById('skabelon_output');
const personer = document.getElementById('personer');
const kufferter = document.getElementById('kufferter');
const formular = document.getElementById('formular');
const afhentningsdato = document.getElementById('afhentning');
const afleveringsdato = document.getElementById('aflevering');

formular.addEventListener("submit", function (event) {
    event.preventDefault();
    if (valideDatoer(afhentningsdato.value, afleveringsdato.value)) {
        sektion.innerHTML = ""; //Nulstiller output-sektion
        for (const bil of biler) {
            if (kufferter.value <= bil.kufferter && personer.value <= bil.personer) {
                const antaldage = beregnAntalLejedage(afhentningsdato.value, afleveringsdato.value);
                const klon = skabelon.content.cloneNode(true);
                const bilMM = klon.querySelector(".bilMM");
                const billedtag = klon.querySelector("img");
                const kategori = klon.querySelector(".kategori");
                const antalpersoner = klon.querySelector(".antalpersoner");
                const antalkufferter = klon.querySelector(".antalkufferter");
                const lejeudgift = klon.querySelector(".lejeudgift");

                billedtag.src = bil.billede;
                billedtag.alt = bil.billedtekst;
                bilMM.textContent = bil.bilmaerke;
                kategori.textContent += bil.kategori;
                antalkufferter.textContent += bil.kufferter;
                antalpersoner.textContent += bil.personer;
                lejeudgift.textContent = beregnLejeudgift(antaldage, bil.tillaeg);

                sektion.appendChild(klon);
            }
        }
    } else {
        sektion.innerText = "Opgiv en afleveringsdato som ligger efter afhentingsdato.";
    }

})

// Sørger for, at man kun kan leje fremad i tiden
function valideDatoer(afhentningsdato, afleveringsdato) {
    const afhentning = new Date(afhentningsdato);
    const aflevering = new Date(afleveringsdato);
    if (afhentning > aflevering) {
        return false;
    } else {
        return true;
    }
};

// Regner antal dage
function beregnAntalLejedage(afhentningsdato, afleveringsdato) {
    const AFHENTNING = new Date(afhentningsdato);
    const AFLEVERING = new Date(afleveringsdato);
    const FORSKELITID = AFLEVERING.getTime() - AFHENTNING.getTime();
    const FORSKELIDAGE = FORSKELITID / (1000 * 3600 * 24) + 1;
    return FORSKELIDAGE;
}

// Regner prisen efter hvad antal dage over var
function beregnLejeudgift(antaldage, biltillaeg) {
    const MOMS = 0.25;
    const GRUNDBELOEB = 495;
    const PRISPRDAG = 100;
    const LEJEUDGIFT = (GRUNDBELOEB + (antaldage * PRISPRDAG) + (antaldage * biltillaeg)) * (1 + MOMS);
    return LEJEUDGIFT.toFixed(2);
}

