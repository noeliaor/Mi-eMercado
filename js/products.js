//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function showProductsList(array) { /*Concatena la información de distintos productos
                                  extraida en un array, con etiquetas determinadas para lograr
                                  un estilo específico en el HTML y finalmente lo inluye en el archivo.*/ 
  let htmlContentToAppend = ""
  for (let i = 0; i < array.length; i++) {
    let product = array[i];
    htmlContentToAppend += `
    <div class="list-group-item list-group-item-action">

    <div class="row">
        <div class="col-3">
            <img src="${product.imgSrc}" alt="${product.description}" class="img-thumbnail">
        </div>

        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1"> ${product.name}  </h4>
                <small class="text-muted"> ${product.soldCount} artículos</small>
              </div>
              <p class="mb-1"> ${product.description} </p>
             <div>
                <h4 style="color:blue"> ${product.cost}  ${product.currency}</h4>   
            </div>

        </div>
    </div>
</div>
 `
    document.getElementsByClassName("container p-5")[0].innerHTML = htmlContentToAppend;
  }
}
document.addEventListener("DOMContentLoaded", async function (e) {
  var products = (await getJSONData(PRODUCTS_URL)).data; //Realizo la petición y guardo result.data en una variable
  showProductsList(products); //Llamo a la función que muestra la información de los productos.
});