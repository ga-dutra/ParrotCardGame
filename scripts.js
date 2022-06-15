const num_cartas = prompt("Com quantas cartas você quer jogar?");

function criaTabuleiro(n_cartas) {
  let i = Number(n_cartas);
  while (i > 0) {
    document.querySelector(".tabuleiro").innerHTML =
      document.querySelector(".tabuleiro").innerHTML +
      `<div class="carta">
      <img src="/arquivos/front.png" alt="Parrot">
    </div>`;
    i--;
  }
}

criaTabuleiro(num_cartas);
