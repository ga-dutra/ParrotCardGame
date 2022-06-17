let num_cartas = 0;
do {
  num_cartas = Number(prompt("Com quantas cartas você quer jogar?"));
  if (num_cartas % 2 !== 0 || num_cartas < 4 || num_cartas > 15) {
    alert("O número de cartas deve ser par e estar contido entre 4 e 14!");
  }
} while (num_cartas % 2 !== 0 || num_cartas < 4 || num_cartas > 15);

let tabuleiro_opcoes = [
  `<div onclick="viraCarta(this)"; class="carta frente">
<img src="/arquivos/front.png" alt="Parrot">
<img src="/arquivos/bobrossparrot.gif">
</div>`,
  `<div onclick="viraCarta(this)"; class="carta frente">
<img src="/arquivos/front.png" alt="Parrot">
<img src="/arquivos/explodyparrot.gif">
</div>`,
  `<div onclick="viraCarta(this)"; class="carta frente">
<img src="/arquivos/front.png" alt="Parrot">
<img src="/arquivos/fiestaparrot.gif">
</div>`,
  `<div onclick="viraCarta(this)"; class="carta frente">
<img src="/arquivos/front.png" alt="Parrot">
<img src="/arquivos/metalparrot.gif">
</div>`,
  `<div onclick="viraCarta(this)"; class="carta frente">
<img src="/arquivos/front.png" alt="Parrot">
<img src="/arquivos/revertitparrot.gif">
</div>`,
  `<div onclick="viraCarta(this)"; class="carta frente">
<img src="/arquivos/front.png" alt="Parrot">
<img src="/arquivos/tripletsparrot.gif">
</div>`,
  `<div onclick="viraCarta(this)"; class="carta frente">
<img src="/arquivos/front.png" alt="Parrot">
<img src="/arquivos/unicornparrot.gif">
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
let tabuleiro_jogo = [];
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
// classes frente e face
// .virada.frente { transform: rotateY(180deg)}
// transition: all .5s;

function viraCarta(elemento) {
  elemento.classList.toggle("verso");
  elemento.classList.toggle("frente");
  elemento.classList.toggle("virada");
}
