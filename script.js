// 1. Usamos 'const' porque estas pantallas siempre serán las mismas, tal como lo explicó tu profesor
const num1Input = document.getElementById("num1");
const signInput = document.getElementById("sign");
const num2Input = document.getElementById("num2");
const resultInput = document.getElementById("result");

// 2. Usamos 'const' también para la lista de botones
const buttons = document.getElementsByClassName("btn");

// 3. Usamos 'var' para el contador (i) porque su valor va a ir cambiando (0, 1, 2, 3...)
for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function () {
    // Usamos 'const' aquí porque el valor del botón que presionamos no cambia durante este clic
    const valorDelBoton = this.textContent;

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
        // Convertimos el texto a números y usamos 'const' porque estos no cambiarán aquí
        const numero1 = parseFloat(num1Input.value);
        const numero2 = parseFloat(num2Input.value);

        // Usamos 'var' para el resultado final porque su valor va a cambiar dependiendo de la operación
        var resultadoFinal = 0;

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
