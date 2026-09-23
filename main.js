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

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. REVEAL AL HACER SCROLL
    // =========================================
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length > 0) {
        window.addEventListener("scroll", () => {
            const windowHeight = window.innerHeight;
            reveals.forEach(el => {
                const top = el.getBoundingClientRect().top;
                if (top < windowHeight - 100) {
                    el.classList.add("active");
                }
            });
        });
    }

    // =========================================
    // 2. MANEJO DEL MAPA
    // =========================================
    const mapa = document.getElementById("mapa");
    window.addEventListener('keyup', () => {
        if (mapa) {
            mapa.classList.remove('activo');
        }
    });

    // =========================================
    // 3. MENÚ LATERAL
    // =========================================
    const btnMenu = document.getElementById("btnMenuIndex") || document.getElementById("btnMenu");
    const menuLateral = document.getElementById("menuLateralIndex") || document.getElementById("menuLateral");
    const menuOverlay = document.getElementById("menuOverlayIndex") || document.getElementById("menuOverlay");

    function cerrarMenu() {
        if (btnMenu) btnMenu.classList.remove("activo");
        if (menuLateral) menuLateral.classList.remove("activo");
        if (menuOverlay) menuOverlay.classList.remove("activo");
    }

    if (btnMenu && menuLateral && menuOverlay) {
        btnMenu.addEventListener("click", () => {
            btnMenu.classList.toggle("activo");
            menuLateral.classList.toggle("activo");
            menuOverlay.classList.toggle("activo");
        });

        menuOverlay.addEventListener("click", cerrarMenu);
    }

    // =========================================
    // 4. WIDGET DE WHATSAPP
    // =========================================
    const waToggle = document.getElementById('waToggle');
    const waPanel  = document.getElementById('waPanel');
    const waClose  = document.getElementById('waClose');
    const waBtn    = document.getElementById('waOpenChat');

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

    // =========================================
    // 5. FORMULARIO DE CONTACTO
    // =========================================
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const btn = document.getElementById("submitBtn");
            if (btn) btn.classList.add("loading");

            const nombre = document.querySelector('[name="nombre"]')?.value || '';
            const email = document.querySelector('[name="email"]')?.value || '';
            const telefono = document.querySelector('[name="telefono"]')?.value || '';
            const consulta = document.querySelector('[name="consulta"]')?.value || '';
            const mensaje = document.querySelector('[name="mensaje"]')?.value || '';

            const texto = 
`Hola, te contacto desde la web de Croacia.

Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}
Consulta: ${consulta}

Mensaje:
${mensaje}`;

            const numero = "5491156594671";
            const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

            setTimeout(() => {
                window.location.href = url;
            }, 500);
        });
    }

    // =========================================
    // 6. VISOR MODAL / LIGHTBOX DE CORTINAS INSTALADAS
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
            document.body.style.overflow = "hidden"; // Deshabilita scroll de fondo
        }
    };

    const cerrarModalInstalado = () => {
        if (modalInstalado) {
            modalInstalado.classList.remove("active");
            document.body.style.overflow = ""; // Restablece el scroll
        }
    };

    if (modalClose) modalClose.addEventListener("click", cerrarModalInstalado);
    if (modalInstalado) {
        modalInstalado.addEventListener("click", (e) => {
            if (e.target === modalInstalado) cerrarModalInstalado();
        });
    }

    // =========================================
    // 7. GALERÍA MODAL DE TRABAJOS (Lamas)
    // =========================================
    const galeriasTrabajos = {
        lama77: {
            titulo: "Trabajos Realizados | LAMA 77",
            archivos: [
                { tipo: "img", url: "./assets/trab77-1.jpg" },
                { tipo: "img", url: "./assets/trab77-2.jpg" },
                { tipo: "img", url: "./assets/trab77-3.jpg" }
            ]
        },
        lama95: {
            titulo: "Trabajos Realizados | LAMA 95",
            archivos: [
                { tipo: "img", url: "./assets/lama95-1.jpeg" },
                { tipo: "img", url: "./assets/95-blanco.png" }
            ]
        },
        lama125: {
            titulo: "Trabajos Realizados | LAMA 125",
            archivos: [
                { tipo: "img", url: "./assets/125-madera.png" },
                { tipo: "img", url: "./assets/125-blanco-1.jpeg" },
                { tipo: "img", url: "./assets/125-negro.png" }
            ]
        }
    };

    const galeriaOverlay = document.getElementById("galeriaOverlay");
    const galeriaModal = document.getElementById("galeriaModal");
    const galeriaClose = document.getElementById("galeriaClose");
    const galeriaTitulo = document.getElementById("galeriaTitulo");
    const galeriaGrid = document.getElementById("galeriaGrid");
    const btnsGaleria = document.querySelectorAll(".btn-galeria");

    const cerrarGaleria = () => {
        if (galeriaOverlay) galeriaOverlay.classList.remove("active");
        if (galeriaModal) galeriaModal.classList.remove("active");
        document.body.style.overflow = "";
    };

    if (galeriaClose) galeriaClose.addEventListener("click", cerrarGaleria);
    if (galeriaOverlay) galeriaOverlay.addEventListener("click", cerrarGaleria);

    if (btnsGaleria.length > 0) {
        btnsGaleria.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                
                const idGaleria = btn.getAttribute("data-galeria");
                const datos = galeriasTrabajos[idGaleria];

                if (datos && galeriaOverlay && galeriaModal) {
                    if (galeriaTitulo) galeriaTitulo.textContent = datos.titulo;
                    
                    if (galeriaGrid) {
                        galeriaGrid.innerHTML = "";
                        datos.archivos.forEach(item => {
                            const container = document.createElement("div");
                            container.className = "galeria-item";

                            if (item.tipo === "img") {
                                const img = document.createElement("img");
                                img.src = item.url;
                                img.alt = "Trabajo Realizado";
                                img.loading = "lazy";
                                
                                img.addEventListener("click", () => abrirModalInstalado(item.url, "Lama"));
                                container.appendChild(img);
                            } else if (item.tipo === "video") {
                                container.innerHTML = `<video src="${item.url}" autoplay muted loop playsinline></video>`;
                            }
                            galeriaGrid.appendChild(container);
                        });
                    }

                    galeriaOverlay.classList.add("active");
                    galeriaModal.classList.add("active");
                    document.body.style.overflow = "hidden";
                }
            });
        });
    }

    const videoReelOverlay = document.getElementById("videoReelOverlay");
    const videoReelPlayer = document.getElementById("videoReelPlayer");
    const videoReelClose = document.getElementById("videoReelClose");
    const btnsReel = document.querySelectorAll(".btn-reel");
    const videosReel = document.querySelectorAll(".producto-video[data-video]");

    const abrirVideoReel = (videoSrc) => {
        if (!videoSrc || !videoReelOverlay || !videoReelPlayer) return;

        videoReelPlayer.src = videoSrc;
        videoReelOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
        videoReelPlayer.play().catch(() => {});
    };

    const cerrarVideoReel = () => {
        if (!videoReelOverlay || !videoReelPlayer) return;

        videoReelPlayer.pause();
        videoReelPlayer.removeAttribute("src");
        videoReelPlayer.load();
        videoReelOverlay.classList.remove("active");
        document.body.style.overflow = "";
    };

    if (videoReelClose) videoReelClose.addEventListener("click", cerrarVideoReel);
    if (videoReelOverlay) {
        videoReelOverlay.addEventListener("click", (e) => {
            if (e.target === videoReelOverlay) cerrarVideoReel();
        });
    }

    btnsReel.forEach(btn => {
        btn.addEventListener("click", () => {
            abrirVideoReel(btn.getAttribute("data-video"));
        });
    });

    videosReel.forEach(video => {
        const abrirDesdeVideo = () => abrirVideoReel(video.getAttribute("data-video"));
        video.addEventListener("click", abrirDesdeVideo);
        video.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                abrirDesdeVideo();
            }
        });
    });

    // =========================================
    // 8. TARJETAS 3D Y BOTÓN VER INSTALADO
    // =========================================
    const cards = document.querySelectorAll(".memory-card");

    cards.forEach(card => {
        const front = card.querySelector(".card-front");
        const btnVerInstalado = card.querySelector(".btn-ver-instalado");

        const imgFront = card.getAttribute("data-img");
        const imgInstalled = card.getAttribute("data-installed");
        const tituloCortina = card.querySelector("h3")?.textContent || "Cortina";

        // Cargar imagen de fondo frontal dinámicamente
        if (imgFront && front) {
            front.style.backgroundImage = `url("${imgFront}")`;
        }

        // Giro normal al hacer click en la card (Frente / Dorso)
        card.addEventListener("click", (e) => {
            if (e.target.closest(".btn-ver-instalado")) return;
            card.classList.toggle("flipped");
        });

        // Click en "Ver Instalado 📷": detiene la propagación (para que no vuelva a dar vuelta la card) y abre el modal
        if (btnVerInstalado) {
            btnVerInstalado.addEventListener("click", (e) => {
                e.stopPropagation(); 
                if (imgInstalled) {
                    abrirModalInstalado(imgInstalled, tituloCortina);
                }
            });
        }
    });

    // =========================================
    // 9. CONTROLES DE TECLADO (ESC)
    // =========================================
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            cerrarModalInstalado();
            cerrarGaleria();
            cerrarVideoReel();
            cerrarMenu();
        }
    });

});
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del Lightbox
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const galeriaGrid = document.getElementById('galeriaGrid');

    // Detectar clic en cualquier imagen dentro de la galería
    if (galeriaGrid) {
        galeriaGrid.addEventListener('click', (e) => {
            // Verificar si lo que se tocó/cliqueó fue una imagen
            if (e.target.tagName === 'IMG') {
                const rutaImagen = e.target.getAttribute('src');
                lightboxImg.setAttribute('src', rutaImagen);
                lightboxOverlay.classList.add('active');
            }
        });
    }

    // Función para cerrar el Lightbox
    const cerrarLightbox = () => {
        lightboxOverlay.classList.remove('active');
        lightboxImg.setAttribute('src', ''); // Limpia la ruta
    };

    // Cerrar al hacer clic en el botón '✕'
    if (lightboxClose) {
        lightboxClose.addEventListener('click', cerrarLightbox);
    }

    // Cerrar al hacer clic en el fondo oscuro fuera de la imagen
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) {
                cerrarLightbox();
            }
        });
    }

    // Cerrar con la tecla 'Escape'
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
            cerrarLightbox();
        }
    });
});
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