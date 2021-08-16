//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function showCategoriesList(array) { /*Concatena la información de distintos productos
                                  extraida en un array, con etiquetas determinadas para lograr
                                  un estilo específico en el HTML y finalmente lo inluye en el archivo.*/ 
  let htmlContentToAppend = ""
  for (let i = 0; i < array.length; i++) {
    let category = array[i];
    htmlContentToAppend += `
    <div class="list-group-item list-group-item-action">

    <div class="row">
        <div class="col-3">
            <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
        </div>

        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1"> ${category.name}  </h4>
                <small class="text-muted"> ${category.soldCount} artículos</small>
              </div>
              <p class="mb-1"> ${category.description} </p>
             <div>
                <h4 style="color:blue"> ${category.cost}  ${category.currency}</h4>   
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
  showCategoriesList(products); //Llamo a la función que muestra la información de los productos.
});