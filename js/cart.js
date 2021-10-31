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
  content = `<table> 
    <tr>
    <th></th>
      <th>Producto</th>
      <th>Precio unitario</th>
      <th>Cantidad</th>
      <th>Total</th>
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
     <td id="tosubtotal${index}">${costsuyu[index] * parseInt(item.count)} UYU</td>
  </tr>` //Concateno información de cada producto, como fila de tabla
    index += 1; //Incremento índice para ocupar vector de subtotales

  }
  content += `
  <tr class="productslist"><td><b>Costo de envío:</b></td><td></td><td></td><td></td><td id="shipment"></td></tr>
  </table>`;
  divtocart.innerHTML = content; //Asigno contenido
  total = productssubtotal.reduce((a, b) => a + b, 0); //Calculo el total sumando los subtotales de cada producto

  document.getElementById("totalspace").innerHTML = `<b> El total a pagar es de  <span  style="color: #008CBA" >${total} UYU</span> </b>`; //Muestro el total de la compra

  for (let i = 0; i < cartinfo.length; i++) {
    document.getElementById(`productcount${i}`).addEventListener('change', function () { //Cambios en la cantidad de algún 
      productscount[i] = parseInt(document.getElementById(`productcount${i}`).value);
      if (parseInt(document.getElementById(`productcount${i}`).value) == 0) {
        document.getElementById(`product${i}`).innerHTML = ""; //Si la cantidad es nula se elimina el objeto del carrito
      } else {

        document.getElementById(`tosubtotal${i}`).innerHTML = `${costsuyu[i] * parseInt(document.getElementById(`productcount${i}`).value)} UYU`;
        productssubtotal[i] = costsuyu[i] * parseInt(document.getElementById(`productcount${i}`).value); //Vuelvo a calcular el subtotal del producto cambiado

      } total = productssubtotal.reduce((a, b) => a + b, 0); //Calculo nuevo total
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
    for (let count of productscount){
      if (isNaN(count)){
        countsOk=false;
      }
    }
    if (!(shipmentOk && paymentMethodOk && directionOk && countsOk)) {
    alert("Por favor, antes de realizar la compra complete todos los campos.");
    }else{
  
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
