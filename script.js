tailwind.config = {
    theme: {
      extend: {
        colors: {
          parchment: '#F7F1E2',
          bark:      '#3B2A1F',
          coffee:    '#5A4632',
          wheat:     '#C89B3C',
          terracotta:'#B65C38',
          olive:     '#6B6438',
          line:      '#E1D5B8',
        },
        fontFamily: {
          display: ['Spectral', 'serif'],
          body: ['Karla', 'sans-serif'],
        },
      }
    }
  }

// Interações da página
document.addEventListener("DOMContentLoaded", () => {
  if (window.graoCiaInitialized) return;
  window.graoCiaInitialized = true;

  const busca = document.querySelector("#busca");
  const botaoBusca = busca?.parentElement?.querySelector("button");
  const newsletter = document.querySelector('form[aria-label="Cadastro de newsletter"]');
  const linksCategoria = document.querySelectorAll(".link-categoria");

  linksCategoria.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const novaAba = window.open(link.href, "_blank");
      if (!novaAba) window.location.href = link.href;
    });
  });

  const catalogo = {
    graos: {
      titulo: "Grãos",
      descricao: "Cafés, cereais e leguminosas selecionados para a sua despensa.",
      produtos: [
        ["Café especial", "Grãos selecionados de alta altitude, com aroma intenso e torra cuidadosa.", "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=85"],
        ["Quinoa", "Quinoa integral para receitas nutritivas, leves e cheias de sabor.", "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=900&q=85"],
        ["Lentilhas", "Leguminosa selecionada para sopas, saladas e acompanhamentos.", "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=900&q=85"]
      ]
    },
    hortalicas: {
      titulo: "Hortaliças",
      descricao: "Folhas frescas, crocantes e cultivadas por produtores locais.",
      produtos: [
        ["Alface crespa", "Folhas crocantes e frescas, colhidas diariamente de produtores locais.", "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85"],
        ["Couve orgânica", "Couve de cultivo orgânico para sucos, refogados e receitas caseiras.", "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85"],
        ["Rúcula", "Folhas aromáticas para saladas, sanduíches e pratos especiais.", "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=900&q=85"]
      ]
    },
    frutas: {
      titulo: "Frutas",
      descricao: "Frutas da estação, colhidas no ponto ideal de maturação.",
      produtos: [
        ["Banana prata", "Fruta doce e macia, ideal para o café da manhã ou lanches rápidos.", "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=85"],
        ["Manga palmer", "Manga suculenta, sem fibras e colhida no ponto ideal de maturação.", "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=85"],
        ["Morangos", "Morangos frescos e delicados para sobremesas, vitaminas e geleias.", "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=900&q=85"]
      ]
    },
    vegetais: {
      titulo: "Vegetais",
      descricao: "Raízes, tubérculos e legumes frescos para as refeições do dia a dia.",
      produtos: [
        ["Cenouras", "Cenouras firmes e doces, ótimas cruas, assadas ou em sopas.", "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=900&q=85"],
        ["Beterrabas", "Raízes vibrantes e nutritivas para saladas, sucos e acompanhamentos.", "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=85"],
        ["Abobrinhas", "Abobrinhas tenras para grelhados, massas e pratos do dia a dia.", "https://images.unsplash.com/photo-1563252722-6434563a985d?auto=format&fit=crop&w=900&q=85"]
      ]
    },
    temperos: {
      titulo: "Temperos e especiarias",
      descricao: "Ervas, especiarias puras e blends artesanais para finalizar suas receitas.",
      produtos: [
        ["Cúrcuma", "Especiaria dourada para dar cor, aroma e sabor às receitas.", "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=85"],
        ["Pimenta-do-reino", "Pimenta aromática para finalizar carnes, legumes e molhos.", "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=900&q=85"],
        ["Orégano", "Erva desidratada para pizzas, massas, saladas e preparos artesanais.", "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=900&q=85"]
      ]
    }
  };

  const listaProdutos = document.querySelector("#lista-produtos");
  if (listaProdutos) {
    const categoria = new URLSearchParams(window.location.search).get("categoria");
    const selecao = catalogo[categoria] || catalogo.graos;
    const tituloCategoria = document.querySelector("#titulo-categoria");
    const descricaoCategoria = document.querySelector("#descricao-categoria");

    if (tituloCategoria) tituloCategoria.textContent = selecao.titulo;
    if (descricaoCategoria) descricaoCategoria.textContent = selecao.descricao;
    listaProdutos.innerHTML = selecao.produtos.map(([nome, descricao, imagem]) => `
      <article class="bg-[#f7f0e5] border border-line rounded-2xl overflow-hidden shadow-sm">
        <img src="${imagem}" alt="${nome}" class="w-full aspect-[4/3] object-cover">
        <div class="p-5">
          <h2 class="font-display text-xl font-semibold text-bark mb-3">${nome}</h2>
          <p class="text-coffee text-sm leading-relaxed">${descricao}</p>
        </div>
      </article>
    `).join("");
  }

  function executarBusca() {
    const termo = busca?.value.trim();
    if (!termo) {
      alert("Digite algo para buscar.");
      busca?.focus();
      return;
    }
    alert(`Você buscou por: ${termo}`);
  }

  botaoBusca?.addEventListener("click", executarBusca);
  busca?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") executarBusca();
  });

  newsletter?.addEventListener("submit", (event) => {
    event.preventDefault();
    const nome = document.querySelector("#nome")?.value.trim();
    const email = document.querySelector("#email")?.value.trim();

    if (nome && email) {
      alert(`Obrigado, ${nome}! Seu cadastro foi realizado com sucesso.`);
      newsletter.reset();
    }
  });
});
