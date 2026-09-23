// =========================================
// 1. NAV BAR REVEAL AL HACER SCROLL
// =========================================
const nav = document.querySelector('.hero-nav');
if (nav) {
  let lastScrollY = window.scrollY;
  let navVisible = false;

  const updateNavState = () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;

    if (delta > 12 && currentScrollY > 120) {
      navVisible = true;
    } else if (delta < -10) {
      navVisible = false;
    }

    nav.classList.toggle('nav-visible', navVisible);
    nav.classList.toggle('is-sticky', navVisible);

    lastScrollY = currentScrollY;
  };

  nav.classList.remove('nav-visible');
  nav.classList.remove('is-sticky');
  window.addEventListener('scroll', updateNavState, { passive: true });
}

// =========================================
// 2. VISOR MODAL / LIGHTBOX DE CORTINAS INSTALADAS
// =========================================
const modalInstalado = document.getElementById("modal-instalado");
const modalImg = document.getElementById("modal-img");
const modalClose = document.getElementById("modal-close");
const modalCaption = document.getElementById("modal-caption");

const abrirModalInstalado = (src, titulo) => {
  if (modalInstalado && modalImg && src) {
    modalImg.src = src;
    if (modalCaption && titulo) {
      modalCaption.textContent = `Trabajo Realizado: ${titulo}`;
    }
    modalInstalado.classList.add("active");
    document.body.style.overflow = "hidden";
  }
};

const cerrarModalInstalado = () => {
  if (modalInstalado) {
    modalInstalado.classList.remove("active");
    document.body.style.overflow = "";
  }
};

if (modalClose) modalClose.addEventListener("click", cerrarModalInstalado);
if (modalInstalado) {
  modalInstalado.addEventListener("click", (e) => {
    if (e.target === modalInstalado) cerrarModalInstalado();
  });
}

// =========================================
// 3. CARRUSEL 3D EN CÍRCULO Y TARJETAS (2 CARAS)
// =========================================
const carousel = document.getElementById("memory-carousel");
const cardsList = document.querySelectorAll(".memory-card");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let current = 0;
const total = cardsList.length;

// Distancia del centro del círculo (radio 3D)
const radius = 380; 

// Posiciona individualmente cada tarjeta en forma de anillo 3D
function initCarouselPositions() {
  if (total === 0) return;
  const angleStep = 360 / total;

  cardsList.forEach((card, index) => {
    const cardAngle = angleStep * index;
    card.style.transform = `rotateY(${cardAngle}deg) translateZ(${radius}px)`;
  });
}

function rotateCarousel() {
  if (!carousel || total === 0) return;
  const angleStep = 360 / total;
  carousel.style.transition = "transform .6s cubic-bezier(0.25, 1, 0.5, 1)";
  carousel.style.transform = `rotateY(${-current * angleStep}deg)`;
}

// Inicializar posiciones 3D del carrusel
initCarouselPositions();

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    current = (current + 1) % total;
    rotateCarousel();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    current = (current - 1 + total) % total;
    rotateCarousel();
  });
}

// Configuración de interacción de cada tarjeta (Flip + Botón Modal)
cardsList.forEach(card => {
  const front = card.querySelector(".card-front");
  const btnVerInstalado = card.querySelector(".btn-ver-instalado");

  const imgFront = card.getAttribute("data-img");
  const imgInstalled = card.getAttribute("data-installed");
  const tituloCortina = card.querySelector("h3")?.textContent || "Cortina";

  if (imgFront && front) {
    front.style.backgroundImage = `url("${imgFront}")`;
  }

  // Girar la tarjeta (flip) al hacer clic sobre ella
  card.addEventListener("click", (e) => {
    // Si el clic fue en el botón "Ver Instalado", no dar vuelta la tarjeta
    if (e.target.closest(".btn-ver-instalado")) return;
    card.classList.toggle("flipped");
  });

  // Botón para abrir Modal de trabajo instalado
  if (btnVerInstalado) {
    btnVerInstalado.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // Evita que la tarjeta gire nuevamente
      abrirModalInstalado(imgInstalled, tituloCortina);
    });
  }
});

// =========================================
// 4. CONTADORES ANIMADOS
// =========================================
const counters = document.querySelectorAll(".counter");

const startCounters = () => {
  counters.forEach(counter => {
    const target = +counter.dataset.target || 0;
    let currentVal = 0;
    const increment = target / 60;

    const update = () => {
      currentVal += increment;
      if (currentVal < target) {
        counter.textContent = Math.floor(currentVal);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    update();
  });
};

const statsSection = document.querySelector(".intro-stats");

if (statsSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

// =========================================
// 5. WHATSAPP PANEL
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  const waToggle = document.getElementById('waToggle');
  const waPanel = document.getElementById('waPanel');
  const waClose = document.getElementById('waClose');
  const waBtn = document.getElementById('waOpenChat');

  if (waToggle && waPanel && waClose && waBtn) {
    waToggle.addEventListener('click', () => {
      waPanel.classList.add('active');
      waToggle.classList.add('hide');
    });

    waClose.addEventListener('click', () => {
      waPanel.classList.remove('active');
      waToggle.classList.remove('hide');
    });

    waBtn.addEventListener('click', (e) => {
      e.preventDefault();
      waBtn.classList.add('loading');

      setTimeout(() => {
        window.open(waBtn.href, '_blank');
        waBtn.classList.remove('loading');
      }, 800);
    });
  }
});

// =========================================
// 6. REVEAL Y MAPA
// =========================================
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) {
      el.classList.add("active");
    }
  });
});

const mapa = document.getElementById("mapa");

window.addEventListener("keyup", () => {
  if (mapa) {
    mapa.classList.remove("activo");
  }
});

// =========================================
// 7. MENU HAMBURGUESA
// =========================================
const btnMenuIndex = document.getElementById("btnMenuIndex");
const menuLateralIndex = document.getElementById("menuLateralIndex");
const menuOverlayIndex = document.getElementById("menuOverlayIndex");

if (btnMenuIndex && menuLateralIndex && menuOverlayIndex) {
  btnMenuIndex.addEventListener("click", () => {
    btnMenuIndex.classList.toggle("activo");
    menuLateralIndex.classList.toggle("activo");
    menuOverlayIndex.classList.toggle("activo");
  });

  menuOverlayIndex.addEventListener("click", () => {
    btnMenuIndex.classList.remove("activo");
    menuLateralIndex.classList.remove("activo");
    menuOverlayIndex.classList.remove("activo");
  });
}

// =========================================
// 8. TECLA ESC (CERRAR MODAL Y MENÚ)
// =========================================
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    cerrarModalInstalado();
  }
});

// =======================================================
// LÓGICA AISLADA DEL NUEVO CARRUSEL 3D Y MODAL
// =======================================================
(function () {
  const carousel = document.getElementById("nuevo-memory-carousel");
  const cards = document.querySelectorAll(".nuevo-card");
  const prevBtn = document.getElementById("nuevo-prev-btn");
  const nextBtn = document.getElementById("nuevo-next-btn");

  const modal = document.getElementById("nuevo-modal-instalado");
  const modalImg = document.getElementById("nuevo-modal-img");
  const modalClose = document.getElementById("nuevo-modal-close");
  const modalCaption = document.getElementById("nuevo-modal-caption");

  if (!carousel || cards.length === 0) return;

  let current = 0;
  const total = cards.length;
  const radius = window.innerWidth <= 360 ? 150 : window.innerWidth <= 660 ? 165 : 360;
  let autoRotateTimer = null;
  let userPaused = false;
  let resumeTimeout = null;

  function stopAutoRotate() {
    if (autoRotateTimer) {
      clearInterval(autoRotateTimer);
      autoRotateTimer = null;
    }
  }

  function startAutoRotate() {
    if (userPaused || total < 2) return;
    stopAutoRotate();
    autoRotateTimer = setInterval(() => {
      current = (current + 1) % total;
      updateCarousel();
    }, 2200);
  }

  function pauseForInteraction() {
    userPaused = true;
    stopAutoRotate();
    if (resumeTimeout) clearTimeout(resumeTimeout);
  }

  function resumeAfterInteraction() {
    if (resumeTimeout) clearTimeout(resumeTimeout);
    userPaused = false;
    resumeTimeout = setTimeout(() => {
      startAutoRotate();
    }, 900);
  }

  function initPositions() {
    const angleStep = 360 / total;
    cards.forEach((card, index) => {
      const angle = angleStep * index;
      card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;

      const front = card.querySelector(".nuevo-card-front");
      const imgFront = card.getAttribute("data-img");
      if (front && imgFront) {
        front.style.backgroundImage = `url("${imgFront}")`;
      }
    });
  }

  function updateCarousel() {
    const angleStep = 360 / total;
    carousel.style.transform = `rotateY(${-current * angleStep}deg)`;
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      current = (current + 1) % total;
      updateCarousel();
      resumeAfterInteraction();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      current = (current - 1 + total) % total;
      updateCarousel();
      resumeAfterInteraction();
    });
  }

  cards.forEach((card) => {
    const btnInstalado = card.querySelector(".nuevo-btn-instalado");
    const titulo = card.querySelector("h3")?.textContent || "Modelo Cortina";

    card.addEventListener("click", (e) => {
      if (e.target.closest(".nuevo-btn-instalado")) return;
      pauseForInteraction();
      card.classList.toggle("flipped");
    });

    if (btnInstalado) {
      btnInstalado.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        pauseForInteraction();

        const imgInstalada = card.getAttribute("data-installed");

        if (modal && modalImg && imgInstalada) {
          modalImg.src = imgInstalada;
          if (modalCaption) {
            modalCaption.textContent = ` ${titulo}`;
          }
          modal.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      });
    }
  });

  const cerrarModal = () => {
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  };

  if (modalClose) modalClose.addEventListener("click", cerrarModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) cerrarModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModal();
  });

  initPositions();
  updateCarousel();
  startAutoRotate();
})();