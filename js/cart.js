//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function (e) {
  let cartinfo = (await getJSONData(CART_INFO_URL)).data.articles; //Realizo la petición y guardo result.data en una variable
  let divtocart = document.getElementById("tocart");
  divtocart.innerHTML = `<table>
    <tr>
      <th>Producto</th>
      <th>Precio unitario</th>
      <th>Cantidad</th>
      <th>Total</th>
    </tr>
    <tr>
      <td> <img src="${cartinfo[0].src}" style="width:100px" class="img-thumbnail">  ${cartinfo[0].name}</td>
      <td>${cartinfo[0].unitCost} ${cartinfo[0].currency}</td>
      <td><input id="productcount" size="2" value="2"></input></td>
      <td id="tosubtotal">${parseInt(cartinfo[0].unitCost) * parseInt(cartinfo[0].count)} ${cartinfo[0].currency}</td>
    </tr>
  </table>`
  let subtotal=parseInt(cartinfo[0].unitCost) * parseInt(cartinfo[0].count);


  let costs=[0.15,0.07,0.05];
  var types = document.getElementsByName('shipment');
  document.addEventListener('change',function(){
    for (i = 0; i < types.length; i++) {
      if (types[i].checked) {
        document.getElementById("shipment").innerHTML = `${parseInt(subtotal*costs[types[i].value])} UYU`;
      }
    }
  document.getElementById("totalspace").innerHTML=`El total a pagar es de <b> ${sutotal} UYU </b>`;
  });
  document.getElementById("productcount").addEventListener('keyup',function(){
  document.getElementById("tosubtotal").innerHTML=`${parseInt(cartinfo[0].unitCost) * parseInt(document.getElementById("productcount").value)} ${cartinfo[0].currency}`;
  subtotal=parseInt(cartinfo[0].unitCost) * parseInt(document.getElementById("productcount").value);
  document.getElementById("shipment").innerHTML = `${parseInt(subtotal*costs[types[i].value])} UYU`;
  });
  
});