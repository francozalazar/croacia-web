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

const mapa = document.getElementById("mapa");

window.addEventListener('keyup', () => {
  if (mapa) mapa.classList.remove('activo');
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
