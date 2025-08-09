document.addEventListener('DOMContentLoaded', () => {
  const posts = [
    {
      title: "Título da notícia 1",
      image: "https://via.placeholder.com/600x400",
      summary: "Resumo da notícia 1...",
      url: "#"
    },
    {
      title: "Ganhadores do psop",
      image: "https://via.placeholder.com/600x400",
      summary: "Para questões de teste vamos aumentar um pouco o resumo dessa notícia até que a linha quebre para podemos verificar se vai aparecer com reticências. É necessário esse teste para ajuste imediato.",
      url: "#"
    },
    {
      title: "Título da notícia 3",
      image: "https://via.placeholder.com/600x400",
      summary: "Resumo da notícia 3...",
      url: "#"
    }
  ];

  const gridContainer = document.getElementById('noticias-container');
  const LIMITE_TOTAL_PADRAO = 274;

  const wrapper = document.createElement('div');
  wrapper.className = 'carrossel-wrapper';
  wrapper.style.overflow = 'hidden';

  const track = document.createElement('div');
  track.className = 'carrossel-track';
  track.style.display = 'flex';
  track.style.transition = 'transform 0.5s ease-in-out';

  const indicadores = document.createElement('div');
  indicadores.className = 'carrossel-indicadores';

  function truncarComReticencias(texto, limite) {
    if (texto.length <= limite) return texto;
    let truncado = texto.slice(0, limite);
    truncado = truncado.trim().replace(/[.,;:!?]?\s*$/, '');
    return truncado + '...';
  }

  function limitarTextoPreferindoTitulo(titulo, resumo, limiteTotal) {
    if (titulo.length > limiteTotal) {
      return { tituloFinal: truncarComReticencias(titulo, limiteTotal), resumoFinal: '' };
    }
    const restante = Math.max(0, limiteTotal - titulo.length);
    return {
      tituloFinal: titulo,
      resumoFinal: truncarComReticencias(resumo, restante)
    };
  }

  posts.forEach((post, index) => {
    const { tituloFinal, resumoFinal } = limitarTextoPreferindoTitulo(post.title, post.summary, LIMITE_TOTAL_PADRAO);

    const cardHTML = `
      <img src="${post.image}" alt="${post.title}" style="width:90%;height:auto;object-fit:cover;padding:10px;">
      <div class="conteudo">
        <h3 title="${post.title}">${tituloFinal}</h3>
        <p class="resumo" title="${post.summary}">${resumoFinal}</p>
        <a class="botao" href="${post.url}">Saiba mais</a>
      </div>
    `;

    const cardGrid = document.createElement('div');
    cardGrid.classList.add('card-noticia');
    cardGrid.innerHTML = cardHTML;
    gridContainer.appendChild(cardGrid);

    const h3 = cardGrid.querySelector('h3');
    const resumo = cardGrid.querySelector('p.resumo');
    const lineHeightTitulo = parseFloat(getComputedStyle(h3).lineHeight);
    const alturaTitulo = h3.offsetHeight;
    if (alturaTitulo < lineHeightTitulo * 1.5) {
      resumo.classList.add('linhas-6');
      resumo.textContent = post.summary;
    }

    const cardMobile = document.createElement('div');
    cardMobile.classList.add('card-noticia');
    cardMobile.style.flex = '0 0 80%';
    cardMobile.style.marginRight = '20px';
    cardMobile.innerHTML = cardHTML;
    track.appendChild(cardMobile);

    const dot = document.createElement('div');
    dot.classList.add('indicador');
    if (index === 0) dot.classList.add('ativo');
    indicadores.appendChild(dot);
  });

  wrapper.appendChild(track);
  wrapper.appendChild(indicadores);
  gridContainer.insertAdjacentElement('afterend', wrapper);

  let indexAtual = 0;
  const totalSlides = posts.length;
  const intervalo = 5000;

  // Função para atualizar o slide com centralização
  function atualizarSlide() {
    const card = track.querySelector('.card-noticia');
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const gap = 20;

    const wrapperWidth = wrapper.offsetWidth;

    // Centraliza o card ativo: calcula deslocamento para colocar o centro do card alinhado ao centro do wrapper
    // Deslocamento base: distância até o começo do card ativo: (cardWidth + gap) * indexAtual
    // Queremos deslocar para que o centro do card fique no centro do wrapper
    const deslocamentoBase = (cardWidth + gap) * indexAtual;

    // O centro do card ativo está em deslocamentoBase + cardWidth/2
    // Para centralizar, precisamos deslocar para que esse ponto fique no meio do wrapper:
    const deslocamentoCentralizado = deslocamentoBase - (wrapperWidth / 2) + (cardWidth / 2);

    // Limitar o deslocamento para não passar dos limites (evita espaços em branco no final)
    // Máximo deslocamento é (largura total dos cards + gaps) - largura do wrapper
    const totalWidth = (cardWidth + gap) * totalSlides - gap; // gap não conta no último card
    const maxDeslocamento = totalWidth - wrapperWidth;

    let deslocamentoFinal = deslocamentoCentralizado;
    if (deslocamentoFinal < 0) deslocamentoFinal = 0;
    if (deslocamentoFinal > maxDeslocamento) deslocamentoFinal = maxDeslocamento;

    track.style.transform = `translateX(-${deslocamentoFinal}px)`;

    indicadores.querySelectorAll('.indicador').forEach((dot, i) => {
      dot.classList.toggle('ativo', i === indexAtual);
    });
  }

  function ativarCarrossel() {
    wrapper.style.display = 'block';
    gridContainer.style.display = 'none';

    atualizarSlide();

    return setInterval(() => {
      indexAtual = (indexAtual + 1) % totalSlides;
      atualizarSlide();
    }, intervalo);
  }

  function desativarCarrossel() {
    wrapper.style.display = 'none';
    gridContainer.style.display = 'grid';
  }

  let intervaloId;
  function checarModo() {
    if (window.innerWidth < 1254) {
      if (!intervaloId) intervaloId = ativarCarrossel();
    } else {
      if (intervaloId) {
        clearInterval(intervaloId);
        intervaloId = null;
      }
      desativarCarrossel();
    }
  }

  checarModo();

  window.addEventListener('resize', () => {
    checarModo();
  });

  indicadores.querySelectorAll('.indicador').forEach((dot, i) => {
    dot.addEventListener('click', () => {
      indexAtual = i;
      atualizarSlide();
    });
  });

});

 // Seção para o blog real, sem ser o da landing page

document.addEventListener('DOMContentLoaded', () => {
  const pagination = document.querySelector('.pagination');
  if (!pagination) return;

  // Realça a página atual ao carregar (já definido pelo aria-current)
  const links = pagination.querySelectorAll('a');

  links.forEach(link => {
    link.addEventListener('click', e => {
      // Previne o comportamento padrão para simular troca de página sem recarregar
      e.preventDefault();

      const page = link.textContent.trim();

      // Atualiza visualmente a paginação
      links.forEach(l => l.removeAttribute('aria-current'));
      link.setAttribute('aria-current', 'page');

      // Aqui você chamaria sua função backend para carregar os artigos da página 'page'
      // Como exemplo, só exibimos um alert:
      alert(`Carregar conteúdo da página ${page} (implemente a chamada AJAX/Fetch com backend Java)`);

      // Você pode criar função para carregar os cards via AJAX e atualizar a seção .blog-posts
    });
  });
});
