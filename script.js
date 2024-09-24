// Seleciona elemento do HTML com id main-graphic
const mainGraphic = document.querySelector("#main-graphic");

// Instancia o scrollama
const scroller = scrollama();

// Função para trocar o gráfico conforme o passo
function entrou(resposta) {
  const stepIndex = resposta.index + 1;
  mainGraphic.src = `images/grafico${stepIndex}.png`;

  // Personalizar conteúdo adicional
  console.log(`Entrou no passo ${stepIndex}`);
}

// Função para retornar ao gráfico inicial
function saiu(resposta) {
  if (resposta.index === 0 && resposta.direction === "up") {
    mainGraphic.src = "images/grafico.png";
  }

  console.log(`Saiu do passo ${resposta.index + 1}`);
}

// Configuração do scroller
scroller
  .setup({
    step: ".step",
    offset: 0.5, // Deslocamento de detecção dos passos
  })
  .onStepEnter(entrou)
  .onStepExit(saiu);
