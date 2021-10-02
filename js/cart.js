//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function (e) {
    let cartinfo = (await getJSONData(CART_INFO_URL)).data.articles; //Realizo la petición y guardo result.data en una variable
    let divtocart=document.getElementById("tocart");
    divtocart.innerHTML=`<table>
    <tr>
      <th>Producto</th>
      <th>Precio unitario</th>
      <th>Cantidad</th>
      <th>Subtotal</th>
    </tr>
    <tr>
      <td> <img src="${cartinfo[0].src}" style="width:100px" class="img-thumbnail">  ${cartinfo[0].name}</td>
      <td>${cartinfo[0].unitCost} ${cartinfo[0].currency}</td>
      <td>${cartinfo[0].count}</td>
      <td>${parseInt(cartinfo[0].unitCost)*parseInt(cartinfo[0].count)}</td>
    </tr>
  </table>`
    });