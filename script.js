// Select the main graphic element
const mainGraphic = document.querySelector("#main-graphic");

// Initialize scrollama
const scroller = scrollama();

// Function to update content based on the current step
function updateStep(response) {
  const stepIndex = response.index;
  const stepElement = response.element;

  // Update main graphic
  mainGraphic.src = `images/grafico${stepIndex + 1}.png`;

  // Highlight current step
  document
    .querySelectorAll(".step")
    .forEach((step) => step.classList.remove("active"));
  stepElement.classList.add("active");

  // Load Datawrapper chart if it exists in the current step
  const datawrapperEmbed = stepElement.querySelector(".datawrapper-embed");
  if (datawrapperEmbed) {
    // Replace 'YOUR_CHART_ID' with the actual Datawrapper chart ID
    datawrapperEmbed.innerHTML =
      '<iframe src="https://datawrapper.dwcdn.net/YOUR_CHART_ID/" style="width: 100%; height: 400px; border: none;" title="Datawrapper Chart"></iframe>';
  }

  console.log(`Entered step ${stepIndex + 1}`);
}

// Function to handle step exit
function exitStep(response) {
  if (response.index === 0 && response.direction === "up") {
    mainGraphic.src = "images/grafico.png";
  }

  console.log(`Exited step ${response.index + 1}`);
}

// Set up scrollama
scroller
  .setup({
    step: ".step",
    offset: 0.5,
    debug: false,
  })
  .onStepEnter(updateStep)
  .onStepExit(exitStep);

// Handle window resize
window.addEventListener("resize", scroller.resize);

// Função para inicializar o mapa
function initializeMap() {
  // Verifica se o Leaflet está disponível
  if (typeof L === "undefined") {
    console.error(
      "Leaflet não está carregado. Verifique se você incluiu a biblioteca corretamente."
    );
    return;
  }

  // Verifica se o container do mapa existe
  const mapContainer = document.getElementById("map");
  if (!mapContainer) {
    console.error(
      'Container do mapa não encontrado. Verifique se o elemento com id "map" existe no seu HTML.'
    );
    return;
  }

  // Inicializa o mapa
  const map = L.map("map").setView([-2.5, -59.0], 5.5);

  // Adiciona a camada de tiles
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    }
  ).addTo(map);

  const locations = [
    {
      name: "Porto de Moz - PA",
      coords: [-1.751055, -52.236186],
      temp: "+0,5°C",
      temp1961_1990: 31.7,
      temp1991_2020: 32.2,
    },
    {
      name: "Monte Alegre - PA",
      coords: [-2.0, -54.076389],
      temp: "+0,4°C",
      temp1961_1990: 30.9,
      temp1991_2020: 31.3,
    },
    {
      name: "Belterra - PA",
      coords: [-2.642222, -54.943889],
      temp: "+0,9°C",
      temp1961_1990: 30.3,
      temp1991_2020: 31.2,
    },
    {
      name: "Itacoatiara - AM",
      coords: [-3.136944, -58.442778],
      temp: "+1,1°C",
      temp1961_1990: 26.2,
      temp1991_2020: 27.3,
    },
    {
      name: "Manaus - AM",
      coords: [-3.103333, -60.016389],
      temp: "+0,9°C",
      temp1961_1990: 31.4,
      temp1991_2020: 32.3,
    },
    {
      name: "Barcelos - AM",
      coords: [-0.974167, -62.928611],
      temp: "+0,8°C",
      temp1961_1990: 31.7,
      temp1991_2020: 32.5,
    },
    {
      name: "Fonte Boa - AM",
      coords: [-2.515833, -66.100833],
      temp: "+1,2°C",
      temp1961_1990: 30.8,
      temp1991_2020: 32.0,
    },
  ];

  locations.forEach((location) => {
    const icon = L.divIcon({
      className: "custom-div-icon",
      html: `<div class='marker-pin'><div class='marker-text'>${location.temp}</div></div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    L.marker(location.coords, { icon: icon }).addTo(map).bindPopup(`
      <b>${location.name}</b><br>
      Aumento de temperatura: ${location.temp}<br>
      Temperatura média 1961-1990: ${location.temp1961_1990.toFixed(1)}°C<br>
      Temperatura média 1991-2020: ${location.temp1991_2020.toFixed(1)}°C
    `);
  });
}

// Função para garantir que o mapa seja inicializado apenas quando o DOM estiver pronto
function ensureMapInitialization() {
  if (document.readyState === "complete") {
    initializeMap();
  } else {
    window.addEventListener("load", initializeMap);
  }
}

// Inicializa o mapa quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function () {
  ensureMapInitialization();
});
