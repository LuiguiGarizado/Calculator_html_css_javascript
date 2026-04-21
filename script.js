// 1. Seleccionamos las 4 pantallas
let num1Input = document.getElementById("num1");
let signInput = document.getElementById("sign");
let num2Input = document.getElementById("num2");
let resultInput = document.getElementById("result");

// 2. Seleccionamos todos los botones
let buttons = document.getElementsByClassName("btn");

// 3. Usamos un ciclo 'for' tradicional para darle función a cada botón
for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function () {
    let valorDelBoton = this.textContent;

    // BOTÓN BORRAR TODO (C)
    if (this.id === "c") {
      num1Input.value = "";
      signInput.value = "";
      num2Input.value = "";
      resultInput.value = "";
    }

    // BOTÓN RETROCESO (Borrar un número)
    else if (this.id === "delete") {
      // Si hay resultado, borramos todo
      if (resultInput.value !== "") {
        num1Input.value = "";
        signInput.value = "";
        num2Input.value = "";
        resultInput.value = "";
      }
      // Si estamos escribiendo el numero 2
      else if (num2Input.value !== "") {
        num2Input.value = num2Input.value.slice(0, -1);
      }
      // Si ya hay signo pero no numero 2, borramos el signo
      else if (signInput.value !== "") {
        signInput.value = "";
      }
      // Si estamos en el numero 1
      else {
        num1Input.value = num1Input.value.slice(0, -1);
      }
    }

    // BOTÓN IGUAL (=) : Aquí hacemos la matemática paso a paso
    else if (this.id === "equal") {
      // Solo calculamos si tenemos número 1, el signo y número 2
      if (
        num1Input.value !== "" &&
        signInput.value !== "" &&
        num2Input.value !== ""
      ) {
        // Convertimos el texto a números reales con parseFloat
        let numero1 = parseFloat(num1Input.value);
        let numero2 = parseFloat(num2Input.value);
        let resultadoFinal = 0;

        // Lógica matemática básica (lo que el profe quiere ver)
        if (signInput.value === "+") {
          resultadoFinal = numero1 + numero2;
        } else if (signInput.value === "-") {
          resultadoFinal = numero1 - numero2;
        } else if (signInput.value === "*") {
          resultadoFinal = numero1 * numero2;
        } else if (signInput.value === "/") {
          // Evitamos dividir por cero
          if (numero2 === 0) {
            resultadoFinal = "Error";
          } else {
            resultadoFinal = numero1 / numero2;
          }
        }

        // Mostramos el resultado
        resultInput.value = resultadoFinal;
      }
    }

    // BOTONES DE OPERADORES (+, -, *, /)
    else if (
      valorDelBoton === "+" ||
      valorDelBoton === "-" ||
      valorDelBoton === "*" ||
      valorDelBoton === "/"
    ) {
      // Solo ponemos signo si ya hay un primer número y no hay resultado todavía
      if (num1Input.value !== "" && resultInput.value === "") {
        signInput.value = valorDelBoton;
      }
    }

    // BOTONES DE NÚMEROS Y PUNTO
    else {
      // Si ya hay un resultado en pantalla y tocamos un número, limpiamos todo para empezar de cero
      if (resultInput.value !== "") {
        num1Input.value = valorDelBoton;
        signInput.value = "";
        num2Input.value = "";
        resultInput.value = "";
      }
      // Si no hay signo todavía, estamos escribiendo el primer número
      else if (signInput.value === "") {
        num1Input.value = num1Input.value + valorDelBoton;
      }
      // Si ya hay signo, estamos escribiendo el segundo número
      else {
        num2Input.value = num2Input.value + valorDelBoton;
      }
    }
  };
}
