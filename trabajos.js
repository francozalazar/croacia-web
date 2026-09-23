// Función fácil para mostrar alertas
function mostrarAlerta(titulo, mensaje, icono = 'warning') {
  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: icono, // 'success', 'error', 'warning', 'info'
    confirmButtonText: 'Entendido',
    confirmButtonColor: '#007bff'
  });
}

const navHeader = document.querySelector('.nav-header');
if (navHeader) {
  const updateNavHeaderState = () => {
    const currentScrollY = window.scrollY;
    navHeader.classList.toggle('show-nav', currentScrollY > 80);
  };

  navHeader.classList.remove('show-nav');
  updateNavHeaderState();
  window.addEventListener('scroll', updateNavHeaderState, { passive: true });
}

const trabajoCards = [...document.querySelectorAll('.trabajos .card')];
const comparacionOverlay = document.getElementById('comparacionOverlay');
const comparacionClose = document.getElementById('comparacionClose');
const comparacionImagen = document.getElementById('comparacionImagen');
const comparacionTitulo = document.getElementById('comparacionTitulo');
const comparacionEstado = document.getElementById('comparacionEstado');
const comparacionCounter = document.getElementById('comparacionCounter');
const comparacionPrevWork = document.getElementById('comparacionPrevWork');
const comparacionNextWork = document.getElementById('comparacionNextWork');
const comparacionPrevImage = document.getElementById('comparacionPrevImage');
const comparacionNextImage = document.getElementById('comparacionNextImage');

let trabajoActual = 0;
let imagenActual = 0;

const datosTrabajo = (card) => {
  const galeria = card?.dataset.gallery;
  const imagenes = [...document.querySelectorAll(`[data-gallery="${galeria}"]`)].map((item) => ({
    url: item.getAttribute('href'),
    estado: item.dataset.title || 'Después'
  }));

  return {
    titulo: card?.querySelector('img')?.alt || 'Trabajo realizado',
    imagenes
  };
};

const actualizarComparacion = () => {
  const trabajo = datosTrabajo(trabajoCards[trabajoActual]);
  const imagen = trabajo.imagenes[imagenActual];
  if (!imagen) return;

  comparacionImagen.src = imagen.url;
  comparacionImagen.alt = `${trabajo.titulo} - ${imagen.estado}`;
  comparacionTitulo.textContent = trabajo.titulo;
  comparacionEstado.textContent = imagen.estado;
  comparacionCounter.textContent = `${trabajoActual + 1} / ${trabajoCards.length}`;
};

const abrirComparacion = (indice) => {
  trabajoActual = indice;
  imagenActual = 0;
  actualizarComparacion();
  comparacionOverlay.classList.add('active');
  comparacionOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const cerrarComparacion = () => {
  comparacionOverlay.classList.remove('active');
  comparacionOverlay.setAttribute('aria-hidden', 'true');
  comparacionImagen.src = '';
  document.body.style.overflow = '';
};

trabajoCards.forEach((card, indice) => {
  card.addEventListener('click', (event) => {
    event.preventDefault();
    abrirComparacion(indice);
  });
});

comparacionClose?.addEventListener('click', cerrarComparacion);
comparacionOverlay?.addEventListener('click', (event) => {
  if (event.target === comparacionOverlay) cerrarComparacion();
});

comparacionPrevWork?.addEventListener('click', () => {
  trabajoActual = (trabajoActual - 1 + trabajoCards.length) % trabajoCards.length;
  actualizarComparacion();
});

comparacionNextWork?.addEventListener('click', () => {
  trabajoActual = (trabajoActual + 1) % trabajoCards.length;
  actualizarComparacion();
});

const cambiarImagen = (direccion) => {
  const imagenes = datosTrabajo(trabajoCards[trabajoActual]).imagenes;
  imagenActual = (imagenActual + direccion + imagenes.length) % imagenes.length;
  actualizarComparacion();
};

comparacionPrevImage?.addEventListener('click', () => cambiarImagen(-1));
comparacionNextImage?.addEventListener('click', () => cambiarImagen(1));

document.addEventListener('keydown', (event) => {
  if (!comparacionOverlay?.classList.contains('active')) return;
  if (event.key === 'Escape') cerrarComparacion();
  if (event.key === 'ArrowLeft') comparacionPrevWork.click();
  if (event.key === 'ArrowRight') comparacionNextWork.click();
  if (event.key === 'ArrowUp') comparacionPrevImage.click();
  if (event.key === 'ArrowDown') comparacionNextImage.click();
});

const swiper = new Swiper(".testimoniosSwiper", {
    loop: true,
    centeredSlides: true,
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 1200,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1.2,
      },
      768: {
        slidesPerView: 2.2,
      },
      1024: {
        slidesPerView: 3,
      }
    }
  });
  const btnMenu = document.getElementById("btnMenu");
const menuLateral = document.getElementById("menuLateral");
const menuOverlay = document.getElementById("menuOverlay");

btnMenu.addEventListener("click", () => {
    btnMenu.classList.toggle("activo");
    menuLateral.classList.toggle("activo");
    menuOverlay.classList.toggle("activo");
});

menuOverlay.addEventListener("click", cerrarMenu);

function cerrarMenu() {
    btnMenu.classList.remove("activo");
    menuLateral.classList.remove("activo");
    menuOverlay.classList.remove("activo");
}

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if(top < windowHeight - 100){
            el.classList.add("active");
        }
    });
});

window.addEventListener('keyup', () => {
    mapa.classList.remove('activo');
});


const opinionesSwiper = new Swiper(".opinionesSwiper", {
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});


document.addEventListener('DOMContentLoaded', () => {

  const waToggle = document.getElementById('waToggle');
  const waPanel  = document.getElementById('waPanel');
  const waClose  = document.getElementById('waClose');
  const waBtn    = document.getElementById('waOpenChat');

  if (!waToggle || !waPanel || !waClose || !waBtn) {
    console.error('Error WhatsApp: falta un elemento');
    return;
  }

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

});
// Helper para mostrar notificaciones rápidas (Toast arriba a la derecha)
function mostrarNotificacion(mensaje, tipo = 'error') {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: tipo, // 'success', 'error', 'warning', 'info'
    title: mensaje,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  });
}

/* =========================
VALIDACIONES CON SWEETALERT
========================= */

function validarPaso1() {
  const items = [...cortinasContainer.children];

  for (let i = 0; i < items.length; i++) {
    const inputs = items[i].querySelectorAll("input[type='number']");
    const ancho = inputs[0]?.value;
    const alto = inputs[1]?.value;

    if (!ancho || !alto) {
      mostrarAlerta(
        "Faltan medidas",
        `Por favor completá el ancho y el alto en ${tipoActual()} ${i + 1}.`
      );
      return false;
    }

    if (parseFloat(ancho) <= 0 || parseFloat(alto) <= 0) {
      mostrarAlerta(
        "Medidas inválidas",
        `Las medidas de ${tipoActual()} ${i + 1} deben ser mayores a 0.`
      );
      return false;
    }
  }

  return true;
}
const formContacto = document.getElementById('form-contacto'); // Cambiá por el ID de tu form

if (formContacto) {
  formContacto.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();

    // Validar Nombre
    if (nombre === '') {
      mostrarNotificacion('Por favor, ingresá tu nombre', 'error');
      return;
    }

    // Validar Teléfono o Email
    if (telefono === '' && email === '') {
      mostrarAlertaModal(
        'Faltan datos de contacto',
        'Ingresá al menos un número de teléfono o correo electrónico para coordinar.',
        'warning'
      );
      return;
    }

    // Validar formato de Email básico si ingresó uno
    if (email !== '' && !email.includes('@')) {
      mostrarNotificacion('El correo electrónico no parece válido', 'error');
      return;
    }

    // Si todo está correcto:
    Swal.fire({
      icon: 'success',
      title: '¡Todo listo!',
      text: 'Tu consulta fue generada con éxito.',
      timer: 2000,
      showConfirmButton: false
    });

    // Acá ejecutas tu función de envío o redirección a WhatsApp
    // enviarAWhatsApp();
  });
}