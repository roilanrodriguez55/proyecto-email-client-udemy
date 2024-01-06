// Variables
const botonEnviar = document.querySelector("#enviar");
const botonReset = document.querySelector("#resetBtn");
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const formulario = document.querySelector("#enviar-mail");
let campos = [email, asunto, mensaje];

const er =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
eventListeners();
function eventListeners() {
  //AL arrancar la web
  document.addEventListener("DOMContentLoaded", iniciarApp());
  //Validar campos del formulario
  //Validar formulario
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  //Enviar email
  formulario.addEventListener("submit", enviarEmail);
  //Resetear formulario
  botonReset.addEventListener("click", resetearFormulario);
  campos.forEach((campo) => {
    campo.addEventListener("input", validarFormulario);
  });
}

// Funciones
function iniciarApp() {
  //Permite desabilitar un elemento
  botonEnviar.disabled = true;
  botonEnviar.classList.add("cursor-not-allowed", "opacity-50");

  email.classList.remove("border-red-500");
  email.classList.remove("border-green-500");
  asunto.classList.remove("border-red-500");
  asunto.classList.remove("border-green-500");
  mensaje.classList.remove("border-red-500");
  mensaje.classList.remove("border-green-500");

  const error = document.querySelector(".error");
  if (error) {
    error.remove();
  }
}

//Validar email
function validarFormulario(e) {
  //Con e.target.value accedo a la informacion del input (email)
  if (e.target.value.length > 0) {

    //Eliminar el error
    const error = document.querySelector(".error");
    if (error) {
      error.remove();
    }
    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");
    mostrarError("Todos los campos son obligatorios");
  }

  if (e.target.type === "email") {
    //Expresion regular para validar un correo electronico
    if (er.test(e.target.value)) {
      //Eliminar el error
      const error = document.querySelector(".error");
      if (error) {
        error.remove();
      }

      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      e.target.classList.remove("border", "border-green-500");
      e.target.classList.add("border", "border-red-500");
      mostrarError("El email no es válido");
    }
  }

  if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "") {
    botonEnviar.disabled = false;
    botonEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );

  const errores = document.querySelectorAll(".error");

  if (errores.length === 0) {
    formulario.appendChild(mensajeError);
  }
}

function enviarEmail(e) {
  e.preventDefault();
  //Mostrar spinner
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  //Despues de 3 segundos ocultar el spinner
  setTimeout(() => {
    spinner.style.display = "none";

    //Mensaje que dice que se envió correctamente
    const parrafo = document.createElement("p");
    parrafo.textContent = "El mensaje se envió correctamente";
    parrafo.classList.add(
      "text-center",
      "my-10",
      "p-2",
      "bg-green-500",
      "text-white",
      "font-bold",
      "uppercase"
    );

    //Insertar el parrafo en el html
    formulario.insertBefore(parrafo, spinner);
    //Quitar el mensaje de que se envió el email despues de 2 segundos
    setTimeout(() => {
      //Eliminar el parrafo
      parrafo.remove();
      resetearFormulario();
      //Otra forma de resetear el formulario
      //   const resetear = document.querySelector("#resetBtn");
      //   resetear.type = "reset";
      //   resetear.click();
    }, 2000);
  }, 3000);
}

function resetearFormulario() {
  //Resetear el formulario
  formulario.reset();
  iniciarApp();
  email.classList.remove("border-red-500");
  email.classList.remove("border-green-500");
  asunto.classList.remove("border-green-500");
  asunto.classList.remove("border-green-500");
  mensaje.classList.remove("border-green-500");
  mensaje.classList.remove("border-green-500");
}
