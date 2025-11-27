let editorHTML = null;
let editorCSS = null;
let editorJS = null;
let loginModal = null;
let singUpModal = null;
let nombrePerfil = document.getElementById("nombre-perfil");
let correoPerfil = document.getElementById("correo-perfil");

const abrirModal = (boton) => {
  const loginModalElement = document.getElementById("login-modal");
  const singUpModalElement = document.getElementById("singUp-modal");

  let loginModal = bootstrap.Modal.getInstance(loginModalElement);
  let singUpModal = bootstrap.Modal.getInstance(singUpModalElement);

  if (!loginModal) {
    loginModal = new bootstrap.Modal(loginModalElement);
  }
  if (!singUpModal) {
    singUpModal = new bootstrap.Modal(singUpModalElement);
  }

  // Lógica para cerrar el modal anterior antes de abrir el nuevo.
  if (boton.id === "boton-formulario-iniciarSesion") {
    singUpModal.hide();
    loginModal.show();
  } else if (boton.id === "boton-formulario-registro") {
    loginModal.hide();
    singUpModal.show();
  }
};

const guardarPantallaActual = (pantalla) => {
  sessionStorage.setItem("pantallaActual", pantalla);
};

const mostrarPantallaProyectos = () => {
  guardarPantallaActual("proyectos");
  const idPropietario = sessionStorage.getItem("idUsuarioactual");
  const modal = document.getElementById("modalAviso");
  const mensajeModal = document.getElementById("mensajeModal");
  const btnCerrar = document.getElementById("cerrarModal");

  function mostrarModal(mensaje, callback) {
    mensajeModal.textContent = mensaje;
    modal.style.display = "flex";
    btnCerrar.replaceWith(btnCerrar.cloneNode(true));
    const nuevoBtnCerrar = document.getElementById("cerrarModal");
    nuevoBtnCerrar.addEventListener("click", () => {
      modal.style.display = "none";
      if (callback) callback();
    });
  }

  if (!idPropietario) {
    mostrarModal("Inicie sesion para acceder a sus proyectos");
    mostrarLandingPage();
    return;
  }

  cargarProyectos(idPropietario);

  const loginModalEl = document.getElementById("login-modal");
  const signUpModalEl = document.getElementById("singUp-modal");

  const loginModal = bootstrap.Modal.getInstance(loginModalEl);
  const signUpModal = bootstrap.Modal.getInstance(signUpModalEl);

  if (loginModal) loginModal.hide();
  if (signUpModal) signUpModal.hide();

  document.getElementById("pantall-principal").style.display = "none";
  document.getElementById("Landing-nav").style.display = "none";
  document.getElementById("Landing-page").style.display = "none";
  document.getElementById("editor-nav").style.display = "none";
  document.getElementById("seccion-editor-codigo").style.display = "none";
  document.getElementById("pantalla-administrativa").style.display = "block";
  document.getElementById("seccion-proyectos").style.display = "block";
  document.getElementById("seccion-perfil").style.display = "none";
  document.getElementById("seccion-cuanta").style.display = "none";
  document.getElementById("seccion-planes").style.display = "none";
  document.getElementById("seccion-preferencias").style.display = "none";
};

const mostrarPerfil = () => {
  guardarPantallaActual("perfil");

  document.getElementById("pantall-principal").style.display = "none";
  document.getElementById("Landing-nav").style.display = "none";
  document.getElementById("Landing-page").style.display = "none";
  document.getElementById("editor-nav").style.display = "none";
  document.getElementById("seccion-editor-codigo").style.display = "none";
  document.getElementById("pantalla-administrativa").style.display = "block";
  document.getElementById("seccion-proyectos").style.display = "none";
  document.getElementById("seccion-perfil").style.display = "block";
  document.getElementById("seccion-cuanta").style.display = "none";
  document.getElementById("seccion-planes").style.display = "none";
  document.getElementById("seccion-preferencias").style.display = "none";
};

const mostrarCuenta = () => {
  guardarPantallaActual("cuenta");

  document.getElementById("pantall-principal").style.display = "none";
  document.getElementById("Landing-nav").style.display = "none";
  document.getElementById("Landing-page").style.display = "none";
  document.getElementById("editor-nav").style.display = "none";
  document.getElementById("seccion-editor-codigo").style.display = "none";
  document.getElementById("pantalla-administrativa").style.display = "block";
  document.getElementById("seccion-proyectos").style.display = "none";
  document.getElementById("seccion-perfil").style.display = "none";
  document.getElementById("seccion-cuanta").style.display = "block";
  document.getElementById("seccion-planes").style.display = "none";
  document.getElementById("seccion-preferencias").style.display = "none";
};

const mostrarPlanes = () => {
  guardarPantallaActual("planes");
  cargarPlanes();

  document.getElementById("pantall-principal").style.display = "none";
  document.getElementById("Landing-nav").style.display = "none";
  document.getElementById("Landing-page").style.display = "none";
  document.getElementById("editor-nav").style.display = "none";
  document.getElementById("seccion-editor-codigo").style.display = "none";
  document.getElementById("pantalla-administrativa").style.display = "block";
  document.getElementById("seccion-proyectos").style.display = "none";
  document.getElementById("seccion-perfil").style.display = "none";
  document.getElementById("seccion-cuanta").style.display = "none";
  document.getElementById("seccion-planes").style.display = "block";
  document.getElementById("seccion-preferencias").style.display = "none";
  cargarPlanes();
};

const mostrarPreferencias = () => {
  guardarPantallaActual("preferencias");

  document.getElementById("pantall-principal").style.display = "none";
  document.getElementById("Landing-nav").style.display = "none";
  document.getElementById("Landing-page").style.display = "none";
  document.getElementById("editor-nav").style.display = "none";
  document.getElementById("seccion-editor-codigo").style.display = "none";
  document.getElementById("pantalla-administrativa").style.display = "block";
  document.getElementById("seccion-proyectos").style.display = "none";
  document.getElementById("seccion-perfil").style.display = "none";
  document.getElementById("seccion-cuanta").style.display = "none";
  document.getElementById("seccion-planes").style.display = "none";
  document.getElementById("seccion-preferencias").style.display = "block";
};

const mostrarLandingPage = () => {
  guardarPantallaActual("landigPage");
  const cont = document.getElementById("contenedor-cards");
  cont.innerHTML = "";

  document.getElementById("pantall-principal").style.display = "block";
  document.getElementById("Landing-nav").style.display = "block";
  document.getElementById("Landing-page").style.display = "block";
  document.getElementById("editor-nav").style.display = "none";
  document.getElementById("seccion-editor-codigo").style.display = "none";
  document.getElementById("pantalla-administrativa").style.display = "none";
  document.getElementById("seccion-proyectos").style.display = "none";
  document.getElementById("seccion-perfil").style.display = "none";
  document.getElementById("seccion-cuanta").style.display = "none";
  document.getElementById("seccion-planes").style.display = "none";
  document.getElementById("seccion-preferencias").style.display = "none";

  if (sessionStorage.getItem("idUsuarioactual")) {
    sessionStorage.setItem("idUsuarioactual", "");
  }
  localStorage.removeItem("proyectoActualtId");

  if (typeof resetEditors === "function") resetEditors();
};

const renderizarEditorCodigo = () => {
  guardarPantallaActual("editor");

  document.getElementById("pantall-principal").style.display = "block";
  document.getElementById("Landing-nav").style.display = "none";
  document.getElementById("Landing-page").style.display = "none";
  document.getElementById("editor-nav").style.display = "block";
  document.getElementById("seccion-editor-codigo").style.display = "block";
  document.getElementById("pantalla-administrativa").style.display = "none";
  document.getElementById("seccion-proyectos").style.display = "none";
  document.getElementById("seccion-perfil").style.display = "none";
  document.getElementById("seccion-cuanta").style.display = "none";
  document.getElementById("seccion-planes").style.display = "none";
  document.getElementById("seccion-preferencias").style.display = "none";
  crearEditores();
  conectarEventosPreview();
  cargarCodigoProyectoActual().then(() => {
    // refresca después de que el contenedor ya está visible
    setTimeout(() => {
      editorHTML?.refresh();
      editorCSS?.refresh();
      editorJS?.refresh();
    }, 0);
  });
};

const crearEditores = () => {
  if (!editorHTML) {
    editorHTML = CodeMirror.fromTextArea(
      document.getElementById("editor-html"),
      {
        mode: "htmlmixed",
        lineNumbers: true,
        extraKeys: { "Ctrl-Space": "autocomplete" },
        autoCloseTags: true,
      }
    );
  }

  if (!editorCSS) {
    editorCSS = CodeMirror.fromTextArea(document.getElementById("editor-css"), {
      mode: "css",
      lineNumbers: true,
      extraKeys: { "Ctrl-Space": "autocomplete" },
    });
  }

  if (!editorJS) {
    editorJS = CodeMirror.fromTextArea(document.getElementById("editor-js"), {
      mode: "javascript",
      lineNumbers: true,
      extraKeys: { "Ctrl-Space": "autocomplete" },
    });
  }

  editorHTML.on("inputRead", function (editor) {
    editor.showHint();
  });
  editorCSS.on("inputRead", function (editor) {
    editor.showHint();
  });
  editorJS.on("inputRead", function (editor) {
    editor.showHint();
  });
};

const frame = document.getElementById("resultado-codigo");
let renderTimer;

const actualizarVistaEditor = () => {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(() => {
    const htmlCode = editorHTML?.getValue() ?? "";
    const cssCode = editorCSS?.getValue() ?? "";
    const jsCode = editorJS?.getValue() ?? "";

    const safeJS = jsCode.replace(/<\/script>/gi, "<\\/script>");

    frame.srcdoc = `<!doctype html>
      <html>
      <head>
      <meta charset="utf-8">
      <style>${cssCode}</style>
      </head>
      <body>
      ${htmlCode}
      <script>${safeJS}</script>
      </body>
      </html>`;
  }, 80);
};

const conectarEventosPreview = () => {
  if (!editorHTML || !editorCSS || !editorJS) return;
  // Evita doble suscripción: usa una marca en las instancias
  if (!editorHTML._previewBound) {
    editorHTML.on("change", actualizarVistaEditor);
    editorHTML._previewBound = true;
  }
  if (!editorCSS._previewBound) {
    editorCSS.on("change", actualizarVistaEditor);
    editorCSS._previewBound = true;
  }
  if (!editorJS._previewBound) {
    editorJS.on("change", actualizarVistaEditor);
    editorJS._previewBound = true;
  }
};

window.onload = () => {
  const pantalla = sessionStorage.getItem("pantallaActual");
  if (pantalla) {
    switch (pantalla) {
      case "proyectos":
        mostrarPantallaProyectos();
        break;
      case "perfil":
        mostrarPerfil();
        break;
      case "cuenta":
        mostrarCuenta();
        break;
      case "planes":
        mostrarPlanes();
        break;
      case "preferencias":
        mostrarPreferencias();
        break;
      case "editor":
        renderizarEditorCodigo();
        break;
      default:
        mostrarLandingPage();
    }
  } else {
    mostrarLandingPage(); // Por defecto
  }
};

const registrarUsuarios = async () => {
  // Obtener elementos del DOM
  const nombreInput = document.getElementById("signUp-nombre");
  const emailInput = document.getElementById("signUp-email");
  const contraseñaInput = document.getElementById("signUp-contraseña");
  const nombreError = document.getElementById("signUp-nombre-error");
  const emailError = document.getElementById("signUp-email-error");
  const contraseñaError = document.getElementById("signUp-contraseña-error");

  // Limpiar errores previos
  nombreError.innerHTML = "";
  emailError.innerHTML = "";
  contraseñaError.innerHTML = "";
  nombreInput.classList.remove("input-error");
  emailInput.classList.remove("input-error");
  contraseñaInput.classList.remove("input-error");

  // Valores originales (sin cambios)
  const nombre = nombreInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const contraseña = contraseñaInput.value;

  // Validación de campos vacíos
  if (!nombre || !email || !contraseña) {
    if (!nombre) {
      nombreError.innerHTML =
        '<i class="fa-solid fa-triangle-exclamation"></i> Nombre es requerido';
      nombreInput.classList.add("input-error");
    }
    if (!email) {
      emailError.innerHTML =
        '<i class="fa-solid fa-triangle-exclamation"></i> Email es requerido';
      emailInput.classList.add("input-error");
    }
    if (!contraseña) {
      contraseñaError.innerHTML =
        '<i class="fa-solid fa-triangle-exclamation"></i> Contraseña es requerida';
      contraseñaInput.classList.add("input-error");
    }
    return;
  }

  // Validación del formato del email
  const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    emailError.innerHTML =
      '<i class="fa-solid fa-triangle-exclamation"></i> Por favor ingrese un email válido';
    emailInput.classList.add("input-error");
    emailInput.focus();
    return;
  }

  try {
    const registrarUsuario = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, contraseña }),
        redirect: "follow",
      };
      const respuestaRegistro = await fetch(
        "http://localhost:8000/codeLive/registro",
        requestOptions
      );
      const data = await respuestaRegistro.json().catch(() => ({}));

      if (!respuestaRegistro.ok || !data.ok) {
        emailError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${
          data.message || "No se pudo registrar"
        }`;
        emailInput.classList.add("input-error");
        return;
      }

      const userId = data.Usuario?._id;
      if (userId) {
        sessionStorage.setItem("idUsuarioactual", userId);
        sessionStorage.setItem("planId", data.Usuario.planId);
      }

      // Éxito
      nombrePerfil.innerHTML = `Nombre: ${data.Usuario.nombre}`;
      correoPerfil.innerHTML = `Correo: ${data.Usuario.email}`;
      mostrarPantallaProyectos();
      document.getElementById("signUp-nombre").value = "";
      document.getElementById("signUp-email").value = "";
      document.getElementById("signUp-contraseña").value = "";
    };
    registrarUsuario();
  } catch (e) {
    console.error(e);
    emailError.innerHTML =
      '<i class="fa-solid fa-triangle-exclamation"></i> Error de red o servidor';
    emailInput.classList.add("input-error");
  }
};

const iniciarSesion = async () => {
  const emailInput = document.getElementById("logIn-email");
  const contraseñaInput = document.getElementById("logIn-contraseña");
  const emailError = document.getElementById("logIn-email-error");
  const contraseñaError = document.getElementById("logIn-contraseña-error");

  // Limpiar errores previos
  emailError.innerHTML = "";
  contraseñaError.innerHTML = "";
  emailInput.classList.remove("input-error");
  contraseñaInput.classList.remove("input-error");

  // Valores originales
  const email = emailInput.value.trim().toLowerCase();
  const contraseña = contraseñaInput.value;

  if (!email || !contraseña) {
    if (!email) {
      emailError.innerHTML =
        '<i class="fa-solid fa-triangle-exclamation"></i> Email es requerido';
      emailInput.classList.add("input-error");
    }
    if (!contraseña) {
      contraseñaError.innerHTML =
        '<i class="fa-solid fa-triangle-exclamation"></i> Contraseña es requerida';
      contraseñaInput.classList.add("input-error");
    }
    return;
  }

  // Validación del formato del email
  const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    emailError.innerHTML =
      '<i class="fa-solid fa-triangle-exclamation"></i> Por favor ingrese un email válido';
    emailInput.classList.add("input-error");
    emailInput.focus();
    return;
  }

  try {
    const buscarUsuario = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contraseña }),
        redirect: "follow",
      };
      const respuestaInicioSesion = await fetch(
        "http://localhost:8000/codeLive/inicioSesion",
        requestOptions
      );
      const data = await respuestaInicioSesion.json();

      if (!respuestaInicioSesion.ok || data?.ok === false) {
        contraseñaError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${
          data?.message ||
          `Error ${respuestaInicioSesion.status}: No se pudo iniciar sesión`
        }`;
        emailInput.classList.add("input-error");
        return;
      }

      sessionStorage.setItem("idUsuarioactual", data.Usuario._id);
      sessionStorage.setItem("planId", data.Usuario.planId);

      // Éxito
      mostrarPantallaProyectos();

      nombrePerfil.innerHTML = `Nombre: ${data.Usuario.nombre}`;
      correoPerfil.innerHTML = `Correo: ${data.Usuario.email}`;

      await cargarProyectos(data.Usuario._id);
      emailInput.value = "";
      contraseñaInput.value = "";
    };
    buscarUsuario();
  } catch (e) {
    console.error(e);
    emailError.innerHTML =
      '<i class="fa-solid fa-triangle-exclamation"></i> Error de red o servidor';
    emailInput.classList.add("input-error");
  }
};

const crearNuevoProyecto = async () => {
  const modal = new bootstrap.Modal(
    document.getElementById("crearProyectoModal")
  );
  const nombreInput = document.getElementById("nombreProyectoInput");
  const errorDiv = document.getElementById("nombreProyectoError");

  // Limpiar estado previo
  nombreInput.value = "";
  errorDiv.textContent = "";
  nombreInput.classList.remove("input-error");

  // Mostrar modal y esperar respuesta
  return new Promise((resolve) => {
    // Función para manejar la respuesta
    const handleResponse = async (nombre) => {
      if (!nombre) return resolve();

      // EVITAR exceder límite del plan
      if (!(await puedeCrearProyecto())) {
        return resolve();
      }
      // Verificar sesión de usuario
      const idPropietario = sessionStorage.getItem("idUsuarioactual");
      if (!idPropietario) {
        // Mostrar error en la modal
        errorDiv.innerHTML =
          '<i class="fa-solid fa-triangle-exclamation"></i> Primero inicia sesión para crear proyectos';
        nombreInput.classList.add("input-error");
        modal.show(); // Volver a mostrar la modal
        return resolve();
      }

      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idPropietario, nombre }),
          redirect: "follow",
        };

        const respuestaNuevoProyecto = await fetch(
          "http://localhost:8000/codeLive/proyectos",
          requestOptions
        );
        const data = await respuestaNuevoProyecto.json().catch(() => ({}));

        if (!respuestaNuevoProyecto.ok || !data.ok) {
          // Mostrar error del servidor en la modal
          errorDiv.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${
            data.message ||
            `Error ${respuestaNuevoProyecto.status}: No se pudo crear el proyecto`
          }`;
          nombreInput.classList.add("input-error");
          modal.show(); // Volver a mostrar la modal
          return resolve();
        }

        const proyecto = data.proyecto;
        localStorage.setItem("proyectoActualtId", proyecto._id);

        // refresca la lista de tarjetas:
        await cargarProyectos(idPropietario);

        // Abre el editor
        renderizarEditorCodigo();
      } catch (e) {
        console.error(e);
        // Mostrar error en la modal
        errorDiv.innerHTML =
          '<i class="fa-solid fa-triangle-exclamation"></i> Error de red o servidor';
        nombreInput.classList.add("input-error");
        modal.show(); // Volver a mostrar la modal
      } finally {
        resolve();
      }
    };

    // Configurar evento del botón Crear
    document.getElementById("btnConfirmarCrearProyecto").onclick = () => {
      const nombre = nombreInput.value.trim();

      if (!nombre) {
        errorDiv.innerHTML =
          '<i class="fa-solid fa-triangle-exclamation"></i> El nombre del proyecto es requerido';
        nombreInput.classList.add("input-error");
        return;
      }

      modal.hide();
      handleResponse(nombre);
    };

    // Configurar evento al cerrar modal
    modal._element.addEventListener("hidden.bs.modal", () => {
      handleResponse(null);
    });

    modal.show();
  });
};

const cargarProyectos = async (idPropietario) => {
  try {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const respuestaCargarProyectos = await fetch(
      `http://localhost:8000/codeLive/proyectos/${idPropietario}`,
      requestOptions
    );
    const data = await respuestaCargarProyectos.json().catch(() => ({}));

    if (!respuestaCargarProyectos.ok || !data.ok) {
      function mostrarModal(mensaje) {
        const modal = document.getElementById("modalAviso");
        const mensajeModal = document.getElementById("mensajeModal");
        const btnCerrar = document.getElementById("cerrarModal");

        mensajeModal.textContent = mensaje;
        modal.style.display = "flex";

        btnCerrar.onclick = () => {
          modal.style.display = "none";
        };

        window.onclick = (event) => {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        };
      }
      mostrarModal(data.message || "No se pudieron cargar los proyectos");

      return;
    }
    const cont = document.getElementById("contenedor-cards");
    cont.innerHTML = ""; // limpia

    data.proyectos.forEach((p) => {
      cont.innerHTML += `<div id="proyectoCard">
            <div onclick="abrirProyecto('${p._id}')">
                <img src="${
                  p.img || "img/img_referencia.webp"
                }" class="card-img-top" alt="preview">
            </div>
            <div id="nombreProyectoCard">
                <h5>${p.nombre}</h5>
                <button class="btn btn-danger" onclick="eliminarProyecto('${
                  p._id
                }')">Eliminar</button>
            </div>
        </div>`;
    });
  } catch (e) {
    console.error(e);
    function mostrarModal(mensaje) {
      const modal = document.getElementById("modalAviso");
      const mensajeModal = document.getElementById("mensajeModal");
      const btnCerrar = document.getElementById("cerrarModal");

      mensajeModal.textContent = mensaje;
      modal.style.display = "flex";

      btnCerrar.onclick = () => {
        modal.style.display = "none";
      };

      window.onclick = (event) => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    }
    mostrarModal("Error de red o servidor");
  }
};

const abrirProyecto = (id) => {
  localStorage.setItem("proyectoActualtId", id);
  renderizarEditorCodigo();
};

const cargarCodigoProyectoActual = async () => {
  const idProyecto = localStorage.getItem("proyectoActualtId");

  if (!idProyecto) return;
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const respuesta = await fetch(
    `http://localhost:8000/codeLive/codigos/${idProyecto}`,
    requestOptions
  );
  const data = await respuesta.json().catch(() => ({}));

  if (!respuesta.ok || !data.ok) return;

  // Precarga en CodeMirror (asegúrate de que los editores están creados)
  if (editorHTML) editorHTML.setValue(data.codigo.html || "");
  if (editorCSS) editorCSS.setValue(data.codigo.css || "");
  if (editorJS) editorJS.setValue(data.codigo.js || "");
  actualizarVistaEditor();
};

const guardarCodigoProyectoActual = async () => {
  const idProyecto = localStorage.getItem("proyectoActualtId");
  if (!idProyecto) return;

  let screenshot = "";
  try {
    screenshot = await capturarProyecto();
  } catch (e) {
    console.error("Error capturando preview:", e);
    // si falla la captura, igual seguimos guardando HTML/CSS/JS
  }

  const body = {
    html: editorHTML ? editorHTML.getValue() : "",
    css: editorCSS ? editorCSS.getValue() : "",
    js: editorJS ? editorJS.getValue() : "",
    img: screenshot,
  };
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  const resp = await fetch(
    `http://localhost:8000/codeLive/codigos/${idProyecto}`,
    requestOptions
  );
  const data = await resp.json().catch(() => ({}));

  if (!resp.ok || !data.ok) {
    function mostrarModal(mensaje) {
      const modal = document.getElementById("modalAviso");
      const mensajeModal = document.getElementById("mensajeModal");
      const btnCerrar = document.getElementById("cerrarModal");

      mensajeModal.textContent = mensaje;
      modal.style.display = "flex";

      btnCerrar.onclick = () => {
        modal.style.display = "none";
      };

      window.onclick = (event) => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    }
    mostrarModal(data.message || "No se pudo guardar");

    return;
  }
  function mostrarModal(mensaje) {
    document.getElementById("mensajeModal").innerText = mensaje;
    document.getElementById("modalAviso").style.display = "flex";
  }
  document.getElementById("cerrarModal").addEventListener("click", () => {
    document.getElementById("modalAviso").style.display = "none";
  });
  mostrarModal("¡El proyecto ha sido guardado exitosamente!");
};

const eliminarProyecto = async (idProyecto) => {
  if (!confirm("¿Seguro que quieres eliminar este proyecto?")) return;

  try {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };
    const resp = await fetch(
      `http://localhost:8000/codeLive/proyectos/${idProyecto}`,
      requestOptions
    );
    const data = await resp.json();

    if (!resp.ok || data.ok === false) {
      function mostrarModal(mensaje) {
        const modal = document.getElementById("modalAviso");
        const mensajeModal = document.getElementById("mensajeModal");
        const btnCerrar = document.getElementById("cerrarModal");

        mensajeModal.textContent = mensaje;
        modal.style.display = "flex";

        btnCerrar.onclick = () => {
          modal.style.display = "none";
        };

        window.onclick = (event) => {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        };
      }
      mostrarModal(data.message || "Error eliminando proyecto");
      return;
    }

    function mostrarModal(mensaje) {
      const modal = document.getElementById("modalAviso");
      const mensajeModal = document.getElementById("mensajeModal");
      const btnCerrar = document.getElementById("cerrarModal");

      mensajeModal.textContent = mensaje;
      modal.style.display = "flex";

      btnCerrar.onclick = () => {
        modal.style.display = "none";
        mostrarPantallaProyectos(); // refresca la lista de proyectos
      };

      window.onclick = (event) => {
        if (event.target == modal) {
          modal.style.display = "none";
          mostrarPantallaProyectos();
        }
      };
    }
    mostrarModal("Proyecto eliminado");
  } catch (e) {
    console.error(e);
    function mostrarModal(mensaje) {
      const modal = document.getElementById("modalAviso");
      const mensajeModal = document.getElementById("mensajeModal");
      const btnCerrar = document.getElementById("cerrarModal");

      mensajeModal.textContent = mensaje;
      modal.style.display = "flex";

      btnCerrar.onclick = () => {
        modal.style.display = "none";
      };

      window.onclick = (event) => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    }
    mostrarModal("Error de red o servidor ");
  }
};

const resetEditors = (clearPreview = true) => {
  if (editorHTML) editorHTML.setValue("");
  if (editorCSS) editorCSS.setValue("");
  if (editorJS) editorJS.setValue("");
  if (clearPreview) {
    frame.srcdoc =
      "<!doctype html><html><head><meta charset='utf-8'></head><body></body></html>";
  }
};

const capturarProyecto = async () => {
  const iframe = document.getElementById("resultado-codigo");
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

  if (!iframeDoc) {
    throw new Error("No se pudo acceder al documento del iframe");
  }

  const clon = document.getElementById("captura-clon");
  clon.innerHTML = iframeDoc.documentElement.innerHTML;

  const ANCHO_VIRTUAL = 1500;
  const ALTO_VIRTUAL = 1000;

  clon.style.width = `${ANCHO_VIRTUAL}px`;
  clon.style.height = `${ALTO_VIRTUAL}px`;

  clon.style.transform = "scale(1.6)";
  clon.style.transformOrigin = "top left";
  clon.style.overflow = "hidden";

  // Captura del clon (con escala nativa del navegador)
  const canvas = await html2canvas(clon, {
    backgroundColor: "#ffffff",
    width: ANCHO_VIRTUAL,
    height: ALTO_VIRTUAL,
    scale: 1.2, // mejora nitidez
  });

  // REDUCCIÓN final a 300x300
  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = 300;
  finalCanvas.height = 300;

  const ctx = finalCanvas.getContext("2d");
  ctx.drawImage(canvas, 0, 0, 300, 300);

  return finalCanvas.toDataURL("image/png");
};

/**
 * Verifica si el usuario puede crear un nuevo proyecto según su plan.
 * Retorna true si puede, false si llegó al límite.
 */
const puedeCrearProyecto = async () => {
  const planId = sessionStorage.getItem("planId");
  const idUsuario = sessionStorage.getItem("idUsuarioactual");

  if (!planId || !idUsuario) {
    function mostrarModal(mensaje, callback) {
      const modal = document.getElementById("modalAviso");
      const mensajeModal = document.getElementById("mensajeModal");
      const btnCerrar = document.getElementById("cerrarModal");

      mensajeModal.textContent = mensaje;
      modal.style.display = "flex";

      const cerrar = () => {
        modal.style.display = "none";
        if (callback) callback();
      };

      btnCerrar.onclick = cerrar;

      window.onclick = (event) => {
        if (event.target == modal) {
          cerrar();
        }
      };
    }
    mostrarModal("Error: Debes iniciar sesión para crear proyectos.");
    return false;
  }

  try {
    // 1. Obtener plan
    const respPlan = await fetch(
      `http://localhost:8000/codeLive/planes/${planId}`
    );
    const dataPlan = await respPlan.json();

    if (!dataPlan.ok) {
      function mostrarModal(mensaje) {
        const modal = document.getElementById("modalAviso");
        const mensajeModal = document.getElementById("mensajeModal");
        const btnCerrar = document.getElementById("cerrarModal");
        mensajeModal.textContent = mensaje;
        modal.style.display = "flex";

        btnCerrar.onclick = () => {
          modal.style.display = "none";
        };

        window.onclick = (event) => {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        };
      }
      mostrarModal("Error obteniendo la información del plan del usuario.");
      return false;
    }

    const maxProyectos = dataPlan.plan.maxProyectos;

    // 2. Obtener cantidad de proyectos actuales
    const respProyectos = await fetch(
      `http://localhost:8000/codeLive/proyectos/${idUsuario}`
    );
    const dataProyectos = await respProyectos.json();

    const totalProyectos = dataProyectos.proyectos.length;

    // 3. Validar límite
    if (totalProyectos >= maxProyectos) {
      function mostrarModal(mensaje) {
        const modal = document.getElementById("modalAviso");
        const mensajeModal = document.getElementById("mensajeModal");
        const btnCerrar = document.getElementById("cerrarModal");

        mensajeModal.textContent = mensaje;
        modal.style.display = "flex";
        btnCerrar.onclick = () => {
          modal.style.display = "none";
        };
        window.onclick = (event) => {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        };
      }
      mostrarModal(
        `Tu plan actual solo permite ${maxProyectos} proyecto(s).\n` +
          `Has alcanzado el límite. Mejora tu plan para crear más.`
      );

      mostrarPlanes();
      return false;
    }

    return true; // puede crear proyecto
  } catch (error) {
    console.error("Error verificando límite de plan:", error);
    function mostrarModal(mensaje) {
      const modal = document.getElementById("modalAviso");
      const mensajeModal = document.getElementById("mensajeModal");
      const btnCerrar = document.getElementById("cerrarModal");

      mensajeModal.textContent = mensaje;
      modal.style.display = "flex";

      btnCerrar.onclick = () => {
        modal.style.display = "none";
      };

      window.onclick = (event) => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    }
    mostrarModal("Error verificando los límites del plan.");
    return false;
  }
};

const cambiarPlanUsuario = async (nuevoPlanId) => {
  const userId = sessionStorage.getItem("idUsuarioactual");
  if (!userId) {
    function mostrarModal(mensaje, callback) {
      const modal = document.getElementById("modalAviso");
      const mensajeModal = document.getElementById("mensajeModal");
      const btnCerrar = document.getElementById("cerrarModal");

      mensajeModal.textContent = mensaje;
      modal.style.display = "flex";

      const cerrar = () => {
        modal.style.display = "none";
        if (callback) callback();
      };

      btnCerrar.onclick = cerrar;

      window.onclick = (event) => {
        if (event.target == modal) {
          cerrar();
        }
      };
    }
    mostrarModal("Error:Inicia sesión primero.");
    return;
  }

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nuevoPlanId }),
  };

  const resp = await fetch(
    `http://localhost:8000/codeLive/cambiarPlan/${userId}`,
    requestOptions
  );
  const data = await resp.json();

  if (!data.ok) {
    function mostrarModal(mensaje) {
      const modal = document.getElementById("modalAviso");
      const mensajeModal = document.getElementById("mensajeModal");
      const btnCerrar = document.getElementById("cerrarModal");

      mensajeModal.textContent = mensaje;
      modal.style.display = "flex";

      btnCerrar.onclick = () => {
        modal.style.display = "none";
      };

      window.onclick = (event) => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    }
    mostrarModal(data.message || "No se pudo actualizar el plan");

    return;
  }

  function mostrarModal(mensaje) {
    const modal = document.getElementById("modalAviso");
    const mensajeModal = document.getElementById("mensajeModal");
    const btnCerrar = document.getElementById("cerrarModal");

    mensajeModal.textContent = mensaje;
    modal.style.display = "flex";

    btnCerrar.onclick = () => {
      modal.style.display = "none";
    };
    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
  mostrarModal("Plan actualizado con éxito");

  // Actualizar plan en sessionStorage
  sessionStorage.setItem("planId", nuevoPlanId);
  mostrarPlanes();
};

const cargarPlanes = async () => {
  const resp = await fetch("http://localhost:8000/codeLive/planes");
  const data = await resp.json();

  if (!data.ok) return;

  const cont = document.getElementById("contenedor-planes");
  cont.innerHTML = "";

  const userPlan = sessionStorage.getItem("planId");

  // Definir beneficios del front (pueden venir luego de la BD si querés)
  const beneficios = {
    Free: [
      "3 Proyectos limitados.",
      "Editor con Previsualización en Vivo.",
      "Autocompletado básico.",
      "Solo uso de librerías externas por CDN.",
      "Acceso a la Documentación (FAQs).",
    ],
    Basic: [
      "10 Proyectos permitidos.",
      "Autocompletado inteligente.",
      "Soporte para SASS, TS, Pug, etc.",
      "Subida ilimitada de archivos/assets.",
      "Compartir proyectos con 1 colaborador.",
    ],
    Premium: [
      "Proyectos ilimitados.",
      "Colaboración en tiempo real con 3 colaboradores.",
      "Soporte multiarchivo y estructura de carpetas.",
      "Conexión con GitHub/GitLab.",
      "Consola de debugging avanzada.",
    ],
  };

  data.planes.forEach((p) => {
    const items = beneficios[p.nombre] || [
      `Proyectos permitidos: ${p.maxProyectos}`,
    ];

    const claseColor =
      p.nombre === "Free"
        ? "plan-free"
        : p.nombre === "Basic"
        ? "plan-basic"
        : "plan-premium";

    cont.innerHTML += `
          <div class="plan ${claseColor}">
              <div class="plan-price">
                  <span class="price-title">${p.nombre}</span>
                  <span style="font-size: 40px;">$${p.precio}</span>
              </div>

              <div class="plan-body">
                  <ul>
                      ${items.map((i) => `<li>${i}</li>`).join("")}
                  </ul>
              </div>

              <div class="plan-btn">
                  ${
                    userPlan === p._id
                      ? `<button class="btn btn-secondary btn-lg" disabled>Plan Actual</button>`
                      : `<button class="btn btn-primary btn-lg" onclick="cambiarPlanUsuario('${p._id}')">Elegir Plan</button>`
                  }
              </div>
          </div>
      `;
  });
};
