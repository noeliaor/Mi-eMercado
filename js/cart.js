"use strict";
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function (e) {
  let info = (await getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json")).data.articles; //Realizo la petición y guardo result.data en una variable
  let index = 0;
  let productssubtotal = [];
  let costsuyu = [];
  let productscount = [];
  let identifymethod;
  let names = [];
  let imgs = [];
  for (let item of info) { //Recorro JSON con información de los productos
    names[index] = item.name;
    imgs[index] = item.src;
    if (item.currency == "USD") { //Si moneda es dólares
      costsuyu[index] = parseInt(item.unitCost) * 40; //Convierto costo unitario a UYU
      productssubtotal[index] = costsuyu[index] * parseInt(item.count); //Calculo subtotal
    } else { //Si moneda en pesos
      costsuyu[index] = parseInt(item.unitCost);
      productssubtotal[index] = costsuyu[index] * parseInt(item.count);

    }
    productscount[index] = item.count;
    index += 1;
  }
  showProducts(info, productssubtotal, costsuyu, productscount, imgs, names);


  document.getElementById("shipmentmethod").addEventListener('change', function () {
    shipmentCost(showProducts(info, productssubtotal, costsuyu, productscount, imgs, names));
  });


  //Manejo de selección de método de pago
  document.getElementById("payinformation").addEventListener('change', function () { //Cambios en espacio de método de selección 
    if (document.getElementById("card").checked) { //En caso de selección de método tarjeta
      document.getElementById("topayinfo").innerHTML = `<form style="margin-top: 24px;">
       <label for="num">Número de tarjeta: </label>
      <input type="number" id="cardnum" style="margin-left: 104px;"><br>
      <label for="exp">Fecha de vencimiento (MM-AAAA):  </label>
      <input type="text" id="cardexp" style="margin-left: 10px;"><br>
    </form>` //Se generan espacios para ingresar datos de número de tarjeta y vencimiento
      identifymethod = "card";
    } else if (document.getElementById("bank").checked) { //En caso de selección de método cuenta bancaria
      document.getElementById("topayinfo").innerHTML = `<form style="margin-top: 24px;">
          <label for="origin">N° de cuenta desde la que realizará la compra: </label>
          <input type="text" id="banknum" ><br>
          </form>`; //Espacio para número de cuenta 

      identifymethod = "bank";
    }
  });


  //Acciones de verificación cuando se clickea en el botón de compra
  document.getElementById("OkButton").addEventListener('click', function () {
    let shipmentOk = validator(document.getElementsByName('shipment')); //Método de envío seleccionado
    //Espacios para la dirección
    let directionOk = Boolean(document.getElementById('countrydir').value && document.getElementById('streetdir').value && document.getElementById('numdir').value && document.getElementById('cornerdir').value);
    //Verificación de las cantidades:
    let countsOk = true;
    if (productscount == "") {
      countsOk = false;//Si no hay productos devuelve false
    } else {
      for (let count of productscount) {
        if (isNaN(count)||count<0) {
          countsOk = false; //Si alguna es NaN devuelve false
        }
      }
    }
    let paymentOk = validator(document.getElementsByName('payment'));
    let paymentInfoOk = false;
    let toalert;
    const cardnumRegex = /^\d{9}$/; //Número de tarjeta con 9 dígitos
    const cardexpRegex = /^([1-9][0-2])\-([2][0][2-9][1-9])$/; //Fecha de expiración en formato MM-AAAA; año igual o posterior a 2021, nro de mes válido;
    const banknumRegex = /^\d{3}\-\d{6}\-\d{3}$/; //Número de cuenta bancaria con 12 números formato BBB-BBBBBB-BBB;


    if (countsOk == false) {
      alert("Error en la lista de productos. ¡Comprueba las cantidades!")
    }
    if (shipmentOk == false) {
      alert("¡Debes seleccionar un método de envío!");
    }
    if (directionOk == false) {
      alert("¡Dirección de envío incompleta!");
    }
    if (paymentOk == false) {
      alert("¡Debes seleccionar un método de pago!");
    } else {
      //Verificaciones en método de pago
      if (identifymethod == "card") {
        let cardnumOk = cardnumRegex.test(document.getElementById('cardnum').value);
        let cardexpOk = cardexpRegex.test(document.getElementById('cardexp').value);
        toalert = "Error en ingreso de tarjeta: ingresar los 9 números de su tarjeta, que debe vencer en este año o luego.";

        if (cardnumOk && cardexpOk) {
          paymentInfoOk = true;
        }

      } else if (identifymethod == "bank") {
        let banknumOk = banknumRegex.test(document.getElementById('banknum').value);
        paymentInfoOk = banknumOk;
        toalert = "Error en ingreso de cuenta bancaria: 12 números en formato BBB-BBBBBB-BBB"
      }

      if (paymentInfoOk == false) {
        alert(toalert);
      }

    }

    if (countsOk && shipmentOk && directionOk && paymentOk && paymentInfoOk) {
      alert("Su compra se registró con éxito. ¡Muchas gracias!")
    }


  });

});

//Función que realiza la muestra de productos en base a una array de datos y vectores con subtotales, cantidades y costos.
//A su vez realiza el cálculo y muestra del total de productos, y la inclusión de addEventListener para cada uno,
//lo que permite identificar cambios en cantidades, eliminarlos si la cantidad es nula y presentar mensaje para carrito vacío.
//Incluye el desafiate.
function showProducts(cartinfo, productssubtotal, costsuyu, productscount, imgs, names) {
  let total = 0;
  let divtocart = document.getElementById("tocart");
  let content;
  content = `<table> 
      <tr>
      <th></th>
        <th>Producto</th>
        <th>Precio unitario</th>
        <th>Cantidad</th>
        <th>Total</th>
        <th></th>
      </tr>`

  for (let i = 0; i < productscount.length; i++) {
    content += `<tr class="productslist" id="product${i}"> <td> <img src="${imgs[i]}" style="width:100px;float: left" class="img-thumbnail"></td> <td>${names[i]}</td>
   <td>${costsuyu[i]} UYU</td>
    <td><input type="number" id="productcount${i}" style="width: 60px" value=${productscount[i]} min="0"></input></td>
   <td id="tosubtotal${i}">${costsuyu[i] * parseInt(productscount[i])} UYU</td><td id="trash${i}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash2-fill" viewBox="0 0 16 16">
   <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
 </svg></td>
</tr>` //Concateno información de cada producto, como fila de tabla
  }
  total = productssubtotal.reduce((a, b) => a + b, 0); //Calculo el total sumando los subtotales de cada producto
  content += `
<tr class="productslist"><td></td><td></td><td></td><td><b>Subtotal:</b></td><td id="subtotal">${total}  UYU</td><td></td></tr>
<tr class="productslist"><td></td><td></td><td></td><td><b>Costo de envío:</b></td><td id="shipment"></td><td></td></tr>
</table>`;
  divtocart.innerHTML = content; //Asigno contenido
  document.getElementById("totalspace").innerHTML = `<b> El total a pagar es de  <span  style="color: #008CBA" >${total} UYU</span> </b>`; //Muestro el total de la compra

  for (let i = 0; i < productscount.length; i++) {
    document.getElementById(`productcount${i}`).addEventListener('change', function () { //Cambios en la cantidad de algún 
      productscount[i] = parseInt(document.getElementById(`productcount${i}`).value);
      productssubtotal[i] = costsuyu[i] * parseInt(document.getElementById(`productcount${i}`).value); //Vuelvo a calcular el subtotal del producto cambiado

      if (parseInt(document.getElementById(`productcount${i}`).value) == 0) {
        document.getElementById(`product${i}`).innerHTML = ""; //Si la cantidad es nula se elimina el objeto del carrito
        productssubtotal.splice(i, 1); //Elimino el elemento en el ícono indicado y redefino lista 
        productscount.splice(i, 1);
        costsuyu.splice(i, 1);
        imgs.splice(i, 1);
        names.splice(i, 1);

      } else {

        document.getElementById(`tosubtotal${i}`).innerHTML = `${costsuyu[i] * parseInt(document.getElementById(`productcount${i}`).value)} UYU`;

      }
      total = productssubtotal.reduce((a, b) => a + b, 0); //Calculo nuevo total

      document.getElementById("subtotal").innerHTML = `${total} UYU`;
      document.getElementById("totalspace").innerHTML = `<b> El total a pagar es de  <span  style="color: #008CBA" >${total} UYU</span> </b>`; //Muestro el total de la compra
      shipmentCost(total);
      if (productscount.every(checkcount)) {
        divtocart.innerHTML = `<br><h3 style="text-align: center; color:red"> ¡Ups! Tu carrito está vacío &#128546</h3><br>
        <h4 style="text-align: center; color:red">Elije tu producto <a href="products.html">aquí</a></h4>`;
      }


    });

    //Desafiate
    //Se incluyeron íconos de papelera con Id "trash*índice de producto*"", aquí se agregan addEventListener que en caso
    //de cliqueo en una papelera, eliminar el subtotal, la cantidad y el costo del producto identificado de la lista 
    document.getElementById(`trash${i}`).addEventListener('click', function () {
      productssubtotal.splice(i, 1); //Elimino el elemento en el ícono indicado y redefino lista 
      productscount.splice(i, 1);
      costsuyu.splice(i, 1);
      imgs.splice(i, 1);
      names.splice(i, 1);
      total = showProducts(cartinfo, productssubtotal, costsuyu, productscount, imgs, names); //Ejecuto una nueva muestra
      shipmentCost(total);
      if (productscount.every(checkcount)) {
        divtocart.innerHTML = `<br><h3 style="text-align: center; color:red"> ¡Ups! Tu carrito está vacío &#128546</h3><br>
        <h4 style="text-align: center; color:red">Elije tu producto <a href="products.html">aquí</a></h4>`;
      } //Si no quedan items muestro mensaje


    });

  }
  return total;
}

//Función que realiza el cálculo del costo de envío a partir de la selección de un método y el total de la compra.
function shipmentCost(total) {
  let costs = [0.15, 0.07, 0.05];  //Porcentajes para cálculo del envío (Premium, Express, Santdard)
  let types = document.getElementsByName('shipment');
  for (let type of types) {
    if (type.checked) {
      document.getElementById("shipment").innerHTML = `${parseInt(total * costs[type.value])} UYU`;
      document.getElementById("totalspace").innerHTML = `<b> El total a pagar es de  <span  style="color: #008CBA" >${total + parseInt(total * costs[type.value])} UYU</span> </b>`; //Muestro el total de la compra 
    }
  }
};
//Función que recibe un conjunto de radio button y devuelve true si alguno de ellos está chequeado.
const validator = (Buttons) => {
  let result = false;
  for (let option of Buttons) {
    if (option.checked) {
      result = true;
    }
  }
  return result;
};


function checkcount(element) {
  return element == 0;
};

