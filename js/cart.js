"use strict";
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function (e) {
  let cartinfo = (await getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json")).data.articles; //Realizo la petición y guardo result.data en una variable
  let total = 0;
  let divtocart = document.getElementById("tocart");
  let content;
  let index = 0;
  let productssubtotal = [];
  let costsuyu = [];
  let productscount = [];
  let paymentInfoOk;
  content = `<table> 
    <tr>
    <th></th>
      <th>Producto</th>
      <th>Precio unitario</th>
      <th>Cantidad</th>
      <th>Total</th>
      <th></th>
    </tr>`

  for (let item of cartinfo) { //Recorro JSON con información de los productos
    if (item.currency == "USD") { //Si moneda es dólares
      costsuyu[index] = parseInt(item.unitCost) * 40; //Convierto costo unitario a UYU
      productssubtotal[index] = costsuyu[index] * parseInt(item.count); //Calculo subtotal

    } else { //Si moneda en pesos
      costsuyu[index] = parseInt(item.unitCost);
      productssubtotal[index] = costsuyu[index] * parseInt(item.count);

    }
    productscount[index] = item.count;
    content += `<tr class="productslist" id="product${index}"> <td> <img src="${item.src}" style="width:100px;float: left" class="img-thumbnail"></td> <td>${item.name}</td>
     <td>${costsuyu[index]} UYU</td>
      <td><input type="number" id="productcount${index}" style="width: 60px" value=${item.count} min="0"></input></td>
     <td id="tosubtotal${index}">${costsuyu[index] * parseInt(item.count)} UYU</td><td onclick="deleteData(${index})" id="trash${index}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash2-fill" viewBox="0 0 16 16">
     <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
   </svg></td>
  </tr>` //Concateno información de cada producto, como fila de tabla
    index += 1; //Incremento índice para ocupar vector de subtotales

  }

  total = productssubtotal.reduce((a, b) => a + b, 0); //Calculo el total sumando los subtotales de cada producto
  content += `
  <tr class="productslist"><td></td><td></td><td></td><td><b>Subtotal:</b></td><td id="subtotal">${total}  UYU</td><td></td></tr>
  <tr class="productslist"><td></td><td></td><td></td><td><b>Costo de envío:</b></td><td id="shipment"></td><td></td></tr>
  </table>`;
  divtocart.innerHTML = content; //Asigno contenido
  document.getElementById("totalspace").innerHTML = `<b> El total a pagar es de  <span  style="color: #008CBA" >${total} UYU</span> </b>`; //Muestro el total de la compra

  for (let i = 0; i < cartinfo.length; i++) {
    document.getElementById(`productcount${i}`).addEventListener('change', function () { //Cambios en la cantidad de algún 
      productscount[i] = parseInt(document.getElementById(`productcount${i}`).value);
      productssubtotal[i] = costsuyu[i] * parseInt(document.getElementById(`productcount${i}`).value); //Vuelvo a calcular el subtotal del producto cambiado

      if (parseInt(document.getElementById(`productcount${i}`).value) == 0) {
        document.getElementById(`product${i}`).innerHTML = ""; //Si la cantidad es nula se elimina el objeto del carrito
      } else {

        document.getElementById(`tosubtotal${i}`).innerHTML = `${costsuyu[i] * parseInt(document.getElementById(`productcount${i}`).value)} UYU`;
    
      } total = productssubtotal.reduce((a, b) => a + b, 0); //Calculo nuevo total
      document.getElementById("subtotal").innerHTML=`${total} UYU`;
      document.getElementById("totalspace").innerHTML = `<b> El total a pagar es de  <span  style="color: #008CBA" >${total} UYU</span> </b>`; //Muestro el total de la compra
      function checkcount(element) {
        return element == 0;
      }

      if (productscount.every(checkcount)) {
        divtocart.innerHTML = `<br><h3 style="text-align: center; color:red"> ¡Ups! Tu carrito está vacío &#128546</h3><br>
        <h4 style="text-align: center; color:red">Elije tu producto <a href="products.html">aquí</a></h4>`;
      }

    });

  }
  document.getElementById("payinformation").addEventListener('change', function () {
    if (document.getElementById("card").checked) {
      document.getElementById("topayinfo").innerHTML = `<form style="margin-top: 24px;">
       <label for="num">Número de tarjeta: </label>
      <input type="text" id="cardnum" style="margin-left: 104px;"><br>
      <label for="exp">Fecha de vencimiento (MM/AA):  </label>
      <input type="text" id="cardexp" style="margin-left: 10px;"><br>
    </form>`
      document.getElementById("savechangesinpayment").addEventListener('click', function () {
        if (document.getElementById('cardnum').value && document.getElementById('cardexp').value) {
          paymentInfoOk = true;
        } else {
          paymentInfoOk = false;
        }
      });
      ;
    } else if (document.getElementById("bank").checked) {
      document.getElementById("topayinfo").innerHTML = `<form style="margin-top: 24px;">
          <label for="origin">N° de cuenta desde la que realizará la compra: </label>
          <input type="text" id="banknum" ><br>
          </form>`;
    }
    document.getElementById("savechangesinpayment").addEventListener('click', function () {
      if (document.getElementById('banknum').value) {
        paymentInfoOk = true;
      } else {
        paymentInfoOk = false;
      }
    });
  });


  //Código para cálculos de envío
  let costs = [0.15, 0.07, 0.05];  //Porcentajes para cálculo del envío
  let types = document.getElementsByName('shipment');
  document.addEventListener('change', function () {
    // document.getElementById("totalspace").innerHTML = `<b> El total a pagar es de   <span  style="color: #008CBA" >${total} UYU <span></b>`;
    for (let type of types) {
      if (type.checked) {
        document.getElementById("shipment").innerHTML = `${parseInt(total * costs[type.value])} UYU`;
        document.getElementById("totalspace").innerHTML = `<b> El total a pagar es de  <span  style="color: #008CBA" >${total + parseInt(total * costs[type.value])} UYU</span> </b>`; //Muestro el total de la compra 

      }
    }
  });

  //Botón de compra
  document.getElementById("OkButton").addEventListener('click', function () {
    let shipmentOk = validator(document.getElementsByName('shipment')); //Método de envío seleccionado
    let paymentMethodOk = validator(document.getElementsByName('payment')); //Método de pago seleccionado
    let directionOk = Boolean(document.getElementById('countrydir').value && document.getElementById('streetdir').value && document.getElementById('numdir').value && document.getElementById('cornerdir').value);
    let countsOk = true;
    for (let count of productscount) {
      if (isNaN(count)) {
        countsOk = false;
      }
    }

    if (!(shipmentOk && paymentMethodOk && directionOk && countsOk && paymentInfoOk)) { //Indico solución en función de item faltante
       if (countsOk == false) {
        alert("Error en la lista de productos. ¡Comprueba las cantidades!")
      } else if (shipmentOk == false) {
        alert("¡Debes seleccionar un método de envío!");
      }else if (directionOk == false) {
        alert("¡Dirección de envío incompleta!");
      } 
       else if (paymentMethodOk == false) {
      alert("¡Debes seleccionar un método de pago!");
    }
    else {
      alert("¡Información de pago incompleta!")
    }


  } else {
    alert("¡Gracias por su compra!")
  }
  });

});

const validator = (Buttons) => {
  let result = false;
  for (let option of Buttons) {
    if (option.checked) {
      result = true;
    }
  }
  return result;
};

function deleteData(index) { //Función que se ejecuta cuando se cliquea en el ícono de basura
            productssubtotal.splice(index, 1); //Elimino el elemento en el ícono indicado y redefino lista 
          productscount.splice(index, 1);
         costsuyu.splice(index,1);
            document.getElementById(`product${index}`).innerHTML = ""; //Si la cantidad es nula se elimina el objeto del carrito
         
            total = productssubtotal.reduce((a, b) => a + b, 0); //Calculo nuevo total
          document.getElementById("subtotal").innerHTML=`${total} UYU`;
          document.getElementById("totalspace").innerHTML = `<b> El total a pagar es de  <span  style="color: #008CBA" >${total} UYU</span> </b>`; //Muestro el total de la compra
     
    }

    
