async function carregarDados() {
  const resposta = await fetch("/carreira");

  const carreira = await resposta.json();


  const cardsContainer = document.getElementById("cards-container");

  const pesquisa = document.getElementById("pesquisa");

  function mostrarCards(lista) {
    cardsContainer.innerHTML = "";

    lista.forEach((item) => {
      cardsContainer.innerHTML += `

        <div class="col-md-4 mb-4">

          <div class="card h-100 rounded-4 overflow-hidden">

            <img src="${item.imagem}" class="card-img-top">

            <div class="card-body d-flex flex-column">

              <h3>${item.clube}</h3>

              <p>
                <strong>Período:</strong>
                ${item.periodo}
              </p>

              <p>
                <strong>Gols:</strong>
                ${item.gols}
              </p>

              <p>
                ${item.descricao.substring(0, 80)}...
              </p>

              <a href="detalhes.html?id=${item.id}"
                 class="btn btn-dark mt-auto">

                 Ver detalhes

              </a>

            </div>

          </div>

        </div>

      `;
    });
  }

  if (cardsContainer) {
    mostrarCards(carreira);
  }

  if (pesquisa) {
    pesquisa.addEventListener("input", () => {
      const texto = pesquisa.value.toLowerCase();

      const filtrados = carreira.filter((item) =>
        item.clube.toLowerCase().includes(texto),
      );

      mostrarCards(filtrados);
    });
  }


  const detalhes = document.getElementById("detalhes");

  if (detalhes) {
    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    const item = carreira.find((c) => c.id == id);

    if (!item) {
      detalhes.innerHTML = `

        <div class="alert alert-danger">

          Item não encontrado.

        </div>

      `;

      return;
    }

    detalhes.innerHTML = `

      <div class="row align-items-center">

        <div class="col-md-6 mb-4">

          <img src="${item.imagem}"
               class="img-fluid rounded-4 shadow">

        </div>

        <div class="col-md-6">

          <h1 class="mb-4">${item.clube}</h1>

          <p>
            <strong>Período:</strong>
            ${item.periodo}
          </p>

          <p>
            <strong>Jogos:</strong>
            ${item.jogos}
          </p>

          <p>
            <strong>Gols:</strong>
            ${item.gols}
          </p>

          <p>
            <strong>Assistências:</strong>
            ${item.assistencias}
          </p>

          <p>
            <strong>Títulos:</strong>
            ${item.titulos}
          </p>

          <p>
            ${item.descricao}
          </p>

        </div>

      </div>

      <hr class="my-5">

      <h2 class="mb-4">Fotos Relacionadas</h2>

      <div class="row">

        ${item.fotos
          .map(
            (foto) => `

          <div class="col-md-4 mb-4">

            <div class="card rounded-4 overflow-hidden h-100">

              <img src="${foto.imagem}"
                   class="card-img-top">

              <div class="card-body">

                <h5>${foto.titulo}</h5>

              </div>

            </div>

          </div>

        `,
          )
          .join("")}

      </div>

    `;
  }
}

carregarDados();
