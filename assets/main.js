const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let slidePositions = [];
let currentIndex = 0;
let autoPlayInterval;

function calculateSlidePositions() {
  // Recalcula largura e margens
  const slide = slides[0];
  const slideStyle = window.getComputedStyle(slide);
  const slideWidth = slide.getBoundingClientRect().width;
  const marginRight = parseFloat(slideStyle.marginRight);
  const marginLeft = parseFloat(slideStyle.marginLeft);
  const totalSlideWidth = slideWidth + marginRight + marginLeft;

  // Atualiza posições
  slidePositions = slides.map((_, index) => totalSlideWidth * index);

  // Posiciona slides com left correto
  slides.forEach((slide, index) => {
    slide.style.left = slidePositions[index] + 'px';
  });
}

function moveToSlide(track, currentIndex, targetIndex) {
  track.style.transition = 'transform 0.4s ease-in-out';
  track.style.transform = `translate3d(-${slidePositions[targetIndex]}px, 0, 0)`;
  slides[currentIndex].classList.remove('current-slide');
  slides[targetIndex].classList.add('current-slide');
  return targetIndex;
}

function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    const previousIndex = currentIndex;
    currentIndex = (currentIndex + 1) % slides.length;
    currentIndex = moveToSlide(track, previousIndex, currentIndex);
  }, 4000);
}

function restartAutoPlay() {
  clearInterval(autoPlayInterval);
  startAutoPlay();
}

// Inicialização
calculateSlidePositions();
slides[0].classList.add('current-slide');
currentIndex = 0;

nextButton.addEventListener('click', () => {
  const previousIndex = currentIndex;
  currentIndex = (currentIndex + 1) % slides.length;
  currentIndex = moveToSlide(track, previousIndex, currentIndex);
  restartAutoPlay();
});

prevButton.addEventListener('click', () => {
  const previousIndex = currentIndex;
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  currentIndex = moveToSlide(track, previousIndex, currentIndex);
  restartAutoPlay();
});

// Recalcula posições e reajusta slide no resize
window.addEventListener('resize', () => {
  // Salva o slide atualmente visível
  const visibleIndex = currentIndex;
  calculateSlidePositions();
  // Ajusta o transform para o slide atual após recalcular
  track.style.transition = 'none'; // remove transição para reposicionar imediatamente
  track.style.transform = `translate3d(-${slidePositions[visibleIndex]}px, 0, 0)`;
});

// Inicia autoplay
startAutoPlay();
