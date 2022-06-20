let num_cartas = 0;
function numeroCartas() {
  do {
    num_cartas = Number(prompt("Com quantas cartas você quer jogar?"));
    if (num_cartas % 2 !== 0 || num_cartas < 4 || num_cartas > 15) {
      alert("O número de cartas deve ser par e estar contido entre 4 e 14!");
    }
  } while (num_cartas % 2 !== 0 || num_cartas < 4 || num_cartas > 15);
}
numeroCartas();
// Seção da montagem do tabuleiro
let tabuleiro_jogo = [];
let tabuleiro_opcoes = [
  `<div onclick="viraCarta(this)"; class="carta frente">
<img src="./arquivos/front.png" alt="Parrot">
<img src="./arquivos/bobrossparrot.gif">
</div>`,
  `<div onclick="viraCarta(this)"; class="carta frente">
<img src="./arquivos/front.png" alt="Parrot">
<img src="./arquivos/explodyparrot.gif">
</div>`,
  `<div onclick="viraCarta(this)"; class="carta frente">
<img src="./arquivos/front.png" alt="Parrot">
<img src="./arquivos/fiestaparrot.gif">
</div>`,
  `<div onclick="viraCarta(this)"; class="carta frente">
<img src="./arquivos/front.png" alt="Parrot">
<img src="./arquivos/metalparrot.gif">
</div>`,
  `<div onclick="viraCarta(this)"; class="carta frente">
<img src="./arquivos/front.png" alt="Parrot">
<img src="./arquivos/revertitparrot.gif">
</div>`,
  `<div onclick="viraCarta(this)"; class="carta frente">
<img src="./arquivos/front.png" alt="Parrot">
<img src="./arquivos/tripletsparrot.gif">
</div>`,
  `<div onclick="viraCarta(this)"; class="carta frente">
<img src="./arquivos/front.png" alt="Parrot">
<img src="./arquivos/unicornparrot.gif">
</div>`,
];
function embaralhaTabuleiro(tabuleiro) {
  // Loop em todos os elementos
  for (let i = tabuleiro.length - 1; i > 0; i--) {
    // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [tabuleiro[i], tabuleiro[j]] = [tabuleiro[j], tabuleiro[i]];
  }
  // Retornando array com aleatoriedade
  return tabuleiro;
}

function criaTabuleiro(n_cartas) {
  for (let j = 0; j < n_cartas / 2; j++) {
    tabuleiro_jogo.push(tabuleiro_opcoes[j]);
    tabuleiro_jogo.push(tabuleiro_opcoes[j]);
  }
  // Embaralha o tabuleiro antes de montá-lo na tela
  embaralhaTabuleiro(tabuleiro_jogo);
  for (let i = 0; i < n_cartas; i++) {
    document.querySelector(".tabuleiro").innerHTML += `${tabuleiro_jogo[i]}`;
  }
}

criaTabuleiro(num_cartas);

// Seção da lógica de seleção de cartas
let carta1 = "";
let carta2 = "";
let auxiliar = 0; // função de verificar se a carta clicada é a primeira ou segunda na comparação
let num_jogadas = 0;
let num_acertos = 0;

function viraCarta(elemento) {
  switch (auxiliar) {
    case 0:
      elemento.classList.toggle("verso");
      elemento.classList.toggle("frente");
      elemento.classList.toggle("virada");
      elemento.classList.toggle("inclicavel"); // impede que a carta 1 seja reclicada
      carta1 = elemento;
      auxiliar++;
      num_jogadas++;
      if (document.querySelector(".segundos").innerHTML === "00") {
        idInterval = setInterval(contaTempo, 1000);
      }
      break;
    case 1:
      elemento.classList.toggle("verso");
      elemento.classList.toggle("frente");
      elemento.classList.toggle("virada");
      carta1.classList.toggle("inclicavel"); // Retoma a 'clicabilidade'da carta 1
      carta2 = elemento;
      auxiliar--;
      num_jogadas++;
      document.querySelector(".tabuleiro").classList.add("inclicavel"); // impede que o resto do tabuleiro seja clicável enquanto as cartas são comparadas
      setTimeout(comparaCartas, 1000);
      break;
  }
}

function comparaCartas() {
  if (carta1.innerHTML === carta2.innerHTML) {
    carta1.classList.add("inclicavel");
    carta2.classList.add("inclicavel");
    document.querySelector(".tabuleiro").classList.remove("inclicavel");
    num_acertos++;
    verificaFimdoJogo();
  } else {
    // desvira primeira carta
    carta1.classList.toggle("verso");
    carta1.classList.toggle("frente");
    carta1.classList.toggle("virada");
    // desvira segunda carta
    carta2.classList.toggle("verso");
    carta2.classList.toggle("frente");
    carta2.classList.toggle("virada");
    document.querySelector(".tabuleiro").classList.remove("inclicavel");
  }
}

function verificaFimdoJogo() {
  if (num_acertos == num_cartas / 2) {
    clearInterval(idInterval);
    if (minutos == 0) {
      alert(`Você ganhou em ${num_jogadas} jogadas e em ${segundos} segundos!`);
    } else if (minutos == 1) {
      alert(
        `Você ganhou em ${num_jogadas} jogadas e em ${minutos} minuto e ${segundos} segundos!`
      );
    } else {
      alert(
        `Você ganhou em ${num_jogadas} jogadas e em ${minutos} minutos e ${segundos} segundos!`
      );
    }
    let resposta = String(prompt("Você quer jogar de novo? (sim / não)"));
    if (resposta === "sim") {
      recomecaJogo();
    }
    if (resposta === "não") {
      alert("Obrigado por jogar!");
    }
  }
}

let segundos = 0;
let minutos = 0;
function contaTempo() {
  segundos++;
  if (Number(document.querySelector(".segundos").innerHTML) < 59) {
    document.querySelector(".segundos").innerHTML = segundos;
  } else if (Number(document.querySelector(".segundos").innerHTML) == 59) {
    segundos -= 60;
    minutos++;
    document.querySelector(".segundos").innerHTML = segundos;
    document.querySelector(".minutos").innerHTML = minutos;
  }
}

function recomecaJogo() {
  numeroCartas();
  zeraVariaveis();
  criaTabuleiro(num_cartas);
}

function zeraVariaveis() {
  document.querySelector(".tabuleiro").innerHTML = "";
  tabuleiro_jogo = [];
  carta1 = "";
  carta2 = "";
  auxiliar = 0;
  num_jogadas = 0;
  num_acertos = 0;
  segundos = 0;
  minutos = 0;
  document.querySelector(".segundos").innerHTML = "00";
  document.querySelector(".minutos").innerHTML = "00";
}
