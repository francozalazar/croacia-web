document.addEventListener("DOMContentLoaded", () => {

  const numeroWhatsApp = "5491156594671";

  /* =========================
  HELPER DE SWEETALERT2
  ========================= */
  /* =========================
HELPER DE SWEETALERT2 (TOAST)
========================= */
function mostrarAlerta(mensaje, titulo = "", icono = "warning") {
  if (typeof Swal !== "undefined") {
    Swal.fire({
      toast: true,
      position: "top", // Aparece arriba, sobre el área superior del modal
      icon: icono,
      title: mensaje,
      showConfirmButton: false, // Quita el botón de aceptar
      timer: 3000, // Se cierra sola en 3 segundos
      timerProgressBar: true, // Muestra una barrita de progreso
      background: "#333", // Fondo oscuro elegante
      color: "#fff", // Texto blanco
      iconColor: "#ff4d4d", // Icono rojo de advertencia
      customClass: {
        container: "toast-cotizador"
      }
    });
  } else {
    alert(mensaje);
  }
}

  /* =========================
  SELECTORES
  ========================= */

  const botonesCotizador = document.querySelectorAll(".btn-cotizador");
  const modal = document.getElementById("cotizadorModal");
  const overlay = document.getElementById("cotizadorOverlay");
  const closeBtn = document.getElementById("cotizadorClose");

  const paso1 = document.getElementById("paso1");
  const paso2 = document.getElementById("paso2");
  const paso3 = document.getElementById("paso3");

  const btnPaso2 = document.getElementById("irPaso2");
  const btnPaso3 = document.getElementById("irPaso3");

  const btnVolver1 = document.getElementById("volverPaso1");
  const btnVolver2 = document.getElementById("volverPaso2");

  const cotizarBtn = document.getElementById("cotizarBtn");

  const cortinasContainer = document.getElementById("cortinasContainer");
  const radiosModelo = document.querySelectorAll("input[name='modelo']");

  const grupoChapa = document.getElementById("grupoChapa");
  const grupoLama = document.getElementById("grupoLama");
  const grupoOpcionales = document.getElementById("grupoOpcionales");

  const steps = document.querySelectorAll(".step");
  const selectorCortina = document.getElementById("selectorCortina");

  const MAX = 4;

  /* =========================
  CONFIGURACIONES
  ========================= */

  let configuraciones = [];
  let cortinaActual = 0;

  /* =========================
  INDICADOR PASOS
  ========================= */

  function activarStep(numero) {
    steps.forEach(s => s.classList.remove("active"));
    const actual = document.querySelector(`.step[data-step="${numero}"]`);
    if (actual) actual.classList.add("active");
  }

  /* =========================
  ABRIR / CERRAR MODAL
  ========================= */

  botonesCotizador.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("active");
      overlay.classList.add("active");
    });
  });

  function cerrar() {
    modal.classList.remove("active");
    overlay.classList.remove("active");
    resetearCotizador();
  }

  closeBtn?.addEventListener("click", cerrar);
  overlay?.addEventListener("click", cerrar);

  /* =========================
  RESET
  ========================= */

  function resetearCotizador() {

    paso1.style.display = "block";
    paso2.style.display = "none";
    paso3.style.display = "none";

    activarStep(1);

    const modeloCortina = document.querySelector("input[name='modelo'][value='cortina']");
    if (modeloCortina) modeloCortina.checked = true;

    const items = [...cortinasContainer.children];
    items.slice(1).forEach(el => el.remove());

    cortinasContainer.querySelectorAll("input[type='number']").forEach(input => {
      input.value = "";
    });

    cortinasContainer.querySelectorAll(".add-cortina input").forEach(input => {
      input.checked = false;
    });

    document.querySelectorAll("input[name='chapa']").forEach(r => r.checked = false);
    document.querySelectorAll("input[name='lama']").forEach(r => r.checked = false);
    document.querySelectorAll("input[name='mecanismo']").forEach(r => r.checked = false);
    document.querySelectorAll("input[name='control']").forEach(r => r.checked = false);
    document.querySelectorAll("input[name='escape']").forEach(r => r.checked = false);

    const kit = document.querySelector("input[name='kit']");
    if (kit) kit.checked = false;

    document.getElementById("nombre").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("email").value = "";
    document.getElementById("zona").value = "";
    document.getElementById("aclaracion").value = "";

    configuraciones = [];
    cortinaActual = 0;

    actualizarTitulos();
    actualizarPaso2();

  }

  /* =========================
  MODELO & REGLAS DINÁMICAS
  ========================= */

  function tipoActual() {
    return document.querySelector("input[name='modelo']:checked").value === "porton"
      ? "Portón"
      : "Cortina";
  }

  function actualizarPaso2() {
    const tipo = tipoActual();
    
    // Contenedores / opciones con visibilidad condicional
    const lblManual = document.querySelector("input[name='mecanismo'][value='Manual']")?.closest("label");
    const mecAuto = document.querySelector("input[name='mecanismo'][value='Automatizado']");
    const colEscape = document.querySelector("input[name='escape']")?.closest(".grupo, div");

    if (tipo === "Cortina") {
      grupoChapa.style.display = "block";
      grupoLama.style.display = "none";
      grupoOpcionales.style.display = "none";

      // Habilitar opción Manual en cortinas
      if (lblManual) lblManual.style.display = "inline-flex";
      if (colEscape) colEscape.style.display = "block";

    } else { // Portón
      grupoChapa.style.display = "none";
      grupoLama.style.display = "block";
      grupoOpcionales.style.display = "block";

      // 1. En Portón el mecanismo siempre es automatizado
      if (mecAuto) mecAuto.checked = true;
      if (lblManual) lblManual.style.display = "none";

      // 2. En Portón no va puerta de escape
      if (colEscape) colEscape.style.display = "none";
      const escapeNo = document.querySelector("input[name='escape'][value='No']");
      if (escapeNo) escapeNo.checked = true;
    }

    evaluarMecanismo();
  }

  // 3. En Cortinas: Si mecanismo es Manual, descartar Control Remoto Adicional
  function evaluarMecanismo() {
    const mec = document.querySelector("input[name='mecanismo']:checked")?.value;
    const radiosControl = document.querySelectorAll("input[name='control']");
    const controlNo = document.querySelector("input[name='control'][value='No']");

    if (mec === "Manual") {
      if (controlNo) controlNo.checked = true;
      radiosControl.forEach(r => {
        r.disabled = true;
      });
    } else {
      radiosControl.forEach(r => {
        r.disabled = false;
      });
    }
  }

  // Escuchar cambio de mecanismo dinámicamente
  document.querySelectorAll("input[name='mecanismo']").forEach(r => {
    r.addEventListener("change", evaluarMecanismo);
  });

  function actualizarTitulos() {
    const tipo = tipoActual();
    [...cortinasContainer.children].forEach((item, i) => {
      item.querySelector(".cortina-title").textContent = `${tipo} ${i + 1}`;
      item.querySelector(".texto-agregar").textContent = `Agregar ${tipo.toLowerCase()}`;
    });
  }

  radiosModelo.forEach(r =>
    r.addEventListener("change", () => {
      actualizarTitulos();
      actualizarPaso2();
    })
  );

  /* =========================
  AGREGAR / QUITAR
  ========================= */

  cortinasContainer.addEventListener("change", (e) => {

    if (!e.target.matches(".add-cortina input")) return;

    const item = e.target.closest(".cortina-item");
    const inputs = item.querySelectorAll("input[type='number']");
    const index = [...cortinasContainer.children].indexOf(item);

    if (!inputs[0].value || !inputs[1].value) {
      mostrarAlerta("Completá ancho y alto antes de agregar.");
      e.target.checked = false;
      return;
    }

    if (e.target.checked) {

      if (cortinasContainer.children.length >= MAX) {
        e.target.checked = false;
        return;
      }

      const nueva = document.createElement("div");
      nueva.className = "cortina-item";

      nueva.innerHTML = `
        <p class="cortina-title"></p>
        <div class="medidas">
          <input type="number" placeholder="Ancho">
          <input type="number" placeholder="Alto">
        </div>
        <label class="add-cortina">
          <input type="checkbox">
          <span class="texto-agregar"></span>
        </label>
      `;

      cortinasContainer.appendChild(nueva);
      actualizarTitulos();

    } else {
      const items = [...cortinasContainer.children];
      items.slice(index + 1).forEach(el => el.remove());
      actualizarTitulos();
    }

  });

  /* =========================
  VALIDACIONES
  ========================= */

  function validarPaso1() {
    const items = [...cortinasContainer.children];
    for (let item of items) {
      const inputs = item.querySelectorAll("input[type='number']");
      if (!inputs[0].value || !inputs[1].value) return false;
    }
    return true;
  }

  /* =========================
  SELECTOR Y NAVEGACIÓN
  ========================= */

  function crearSelector() {
    selectorCortina.innerHTML = "";

    configuraciones.forEach((c, i) => {
      const btn = document.createElement("button");
      btn.textContent = `${tipoActual()} ${i + 1}`;

      btn.addEventListener("click", () => {
        guardarConfig();
        cortinaActual = i;

        document.querySelectorAll("#selectorCortina button")
          .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");
        cargarConfiguracion();
        actualizarTextoBotonPaso();
      });

      if (i === 0) btn.classList.add("active");
      selectorCortina.appendChild(btn);
    });
  }

  function actualizarTextoBotonPaso() {
    const total = configuraciones.length;
    const tipo = tipoActual().toUpperCase();

    if (total > 1 && cortinaActual < total - 1) {
      btnPaso3.textContent = `SIGUIENTE ${tipo} ❯❯❯`;
    } else {
      btnPaso3.textContent = "PASO 3 ❯❯❯";
    }
  }

  /* =========================
  GUARDAR CONFIG
  ========================= */

  function guardarConfig() {
    const config = configuraciones[cortinaActual];
    if (!config) return;

    const chapa = document.querySelector("input[name='chapa']:checked");
    config.chapa = chapa ? chapa.value : null;

    const lama = document.querySelector("input[name='lama']:checked");
    config.lama = lama ? lama.value : null;

    const mec = document.querySelector("input[name='mecanismo']:checked");
    config.mecanismo = mec ? mec.value : null;

    const control = document.querySelector("input[name='control']:checked");
    config.control = control ? control.value : null;

    const escape = document.querySelector("input[name='escape']:checked");
    config.escape = escape ? escape.value : null;

    const kit = document.querySelector("input[name='kit']");
    config.kit = kit ? kit.checked : false;

    actualizarContador();
  }

  function actualizarContador() {
    let completas = 0;

    configuraciones.forEach(config => {
      const tipo = tipoActual();
      const chapaLamaOk = tipo === "Cortina" ? !!config.chapa : !!config.lama;
      const escapeOk = tipo === "Portón" ? true : !!config.escape;

      if (chapaLamaOk && config.mecanismo && config.control && escapeOk) {
        completas++;
      }
    });

    const contador = document.getElementById("contadorConfig");
    if (contador) {
      contador.textContent = `${completas}/${configuraciones.length} configuradas`;
    }
  }

  /* =========================
  CARGAR CONFIG
  ========================= */

  function cargarConfiguracion() {
    const config = configuraciones[cortinaActual];

    document.querySelectorAll("input[name='chapa']").forEach(r => {
      r.checked = r.value === config.chapa;
    });

    document.querySelectorAll("input[name='lama']").forEach(r => {
      r.checked = r.value === config.lama;
    });

    document.querySelectorAll("input[name='mecanismo']").forEach(r => {
      r.checked = r.value === config.mecanismo;
    });

    document.querySelectorAll("input[name='control']").forEach(r => {
      r.checked = r.value === config.control;
    });

    document.querySelectorAll("input[name='escape']").forEach(r => {
      r.checked = r.value === config.escape;
    });

    const kit = document.querySelector("input[name='kit']");
    if (kit) kit.checked = config.kit || false;

    actualizarPaso2();
  }

  /* =========================
  PASO 2
  ========================= */

  btnPaso2.addEventListener("click", () => {
    if (!validarPaso1()) {
      mostrarAlerta("Completá todas las medidas antes de continuar.");
      return;
    }

    const items = [...cortinasContainer.children];

    configuraciones = items.map(() => ({
      chapa: null,
      lama: null,
      mecanismo: tipoActual() === "Portón" ? "Automatizado" : null,
      control: null,
      escape: tipoActual() === "Portón" ? "No" : null,
      kit: false
    }));

    cortinaActual = 0;
    crearSelector();
    cargarConfiguracion();
    actualizarContador();
    actualizarTextoBotonPaso();

    paso1.style.display = "none";
    paso2.style.display = "block";

    activarStep(2);
  });

  /* =========================
  VOLVER Y NAVEGAR PASO 3
  ========================= */

  btnVolver1.addEventListener("click", () => {
    paso2.style.display = "none";
    paso1.style.display = "block";
    activarStep(1);
  });

  btnPaso3.addEventListener("click", () => {
    guardarConfig();

    const total = configuraciones.length;
    const tipo = tipoActual();

    // Validar item actual antes de pasar al siguiente
    const currentConfig = configuraciones[cortinaActual];

    if (tipo === "Cortina" && !currentConfig.chapa) {
      irACortinaConError(cortinaActual);
      mostrarAlerta(`Falta seleccionar el tipo de chapa en ${tipo} ${cortinaActual + 1}`);
      return;
    }

    if (tipo === "Portón" && !currentConfig.lama) {
      irACortinaConError(cortinaActual);
      mostrarAlerta(`Falta seleccionar el tipo de lama en ${tipo} ${cortinaActual + 1}`);
      return;
    }

    if (!currentConfig.mecanismo) {
      irACortinaConError(cortinaActual);
      mostrarAlerta(`Falta seleccionar el mecanismo en ${tipo} ${cortinaActual + 1}`);
      return;
    }

    if (!currentConfig.control) {
      irACortinaConError(cortinaActual);
      mostrarAlerta(`Falta indicar control remoto en ${tipo} ${cortinaActual + 1}`);
      return;
    }

    if (tipo === "Cortina" && !currentConfig.escape) {
      irACortinaConError(cortinaActual);
      mostrarAlerta(`Falta indicar puerta de escape en ${tipo} ${cortinaActual + 1}`);
      return;
    }

    // Navegar al siguiente ítem si hay varias cortinas por configurar
    if (total > 1 && cortinaActual < total - 1) {
      cortinaActual++;

      const botones = document.querySelectorAll("#selectorCortina button");
      botones.forEach(b => b.classList.remove("active"));
      if (botones[cortinaActual]) botones[cortinaActual].classList.add("active");

      cargarConfiguracion();
      actualizarTextoBotonPaso();
      return;
    }

    // SI TODO ESTA OK Y LLEGAMOS AL FINAL
    paso2.style.display = "none";
    paso3.style.display = "block";
    activarStep(3);
  });

  function irACortinaConError(index) {
    cortinaActual = index;
    const botones = document.querySelectorAll("#selectorCortina button");

    botones.forEach(b => b.classList.remove("active"));

    if (botones[index]) {
      botones[index].classList.add("active", "error");
      setTimeout(() => {
        botones[index].classList.remove("error");
      }, 700);
    }

    selectorCortina.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    cargarConfiguracion();
    actualizarTextoBotonPaso();
  }

  btnVolver2.addEventListener("click", () => {
    paso3.style.display = "none";
    paso2.style.display = "block";
    activarStep(2);
  });

  /* =========================
  WHATSAPP
  ========================= */

  cotizarBtn.addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();
    const zona = document.getElementById("zona").value.trim();
    const aclaracion = document.getElementById("aclaracion").value.trim();

    /* VALIDACIONES */
    if (nombre.length < 3) {
      mostrarAlerta("Ingresá un nombre válido.");
      return;
    }

    if (telefono.length < 8) {
      mostrarAlerta("Ingresá un teléfono válido.");
      return;
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        mostrarAlerta("Ingresá un email válido.");
        return;
      }
    }

    if (!zona) {
      mostrarAlerta("Seleccioná tu zona.");
      return;
    }

    let mensaje = ` *NUEVA SOLICITUD DE COTIZACIÓN*\n\n`;

    [...cortinasContainer.children].forEach((item, i) => {
      const inputs = item.querySelectorAll("input[type='number']");
      const config = configuraciones[i];

      mensaje += `━━━━━━━━━━━━━━━━\n`;
      mensaje += ` *${tipoActual()} ${i + 1}*\n`;
      mensaje += `Medidas: ${inputs[0].value} x ${inputs[1].value} m\n`;

      if (config?.chapa) mensaje += `Chapa: ${config.chapa}\n`;
      if (config?.lama) mensaje += `Lama: ${config.lama}\n`;
      if (config?.mecanismo) mensaje += `Mecanismo: ${config.mecanismo}\n`;
      if (config?.control) mensaje += `Control Remoto Adicional: ${config.control}\n`;
      if (tipoActual() === "Cortina" && config?.escape) mensaje += `Puerta de Escape: ${config.escape}\n`;
      if (config?.kit) mensaje += `Kit Automatización: Sí\n`;

      mensaje += `\n`;
    });

    mensaje += `━━━━━━━━━━━━━━━━\n`;
    mensaje += ` *DATOS DEL CLIENTE*\n\n`;

    mensaje += `Nombre: ${nombre}\n`;
    mensaje += `Teléfono: ${telefono}\n`;

    if (email) {
      mensaje += `Email: ${email}\n`;
    }

    mensaje += `Zona: ${zona}\n`;

    if (aclaracion) {
      mensaje += `\n Aclaración:\n${aclaracion}\n`;
    }

    window.open(
      `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`,
      "_blank"
    );

    cerrar();
  });

  /* =========================
  INIT
  ========================= */

  actualizarTitulos();
  actualizarPaso2();
  activarStep(1);

});