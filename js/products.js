//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


const showData = (array, SortPreference, concept) => { //Ordena los elementos de la array de forma incremental o alfabética y los almacena en una array.
  function SortArray(x, y) {
    if (x[concept] < y[concept]) { return -1; }
    if (x[concept] > y[concept]) { return 1; }
    return 0;
  }
  var inorder = array.sort(SortArray);

  if (SortPreference == "asc") {
    organized = inorder;
  } else if (SortPreference == "desc") {
    organized = inorder.reverse();
  } else {
    organized = inorder;
  }

  return organized; //Devuelve la array ordenada

};


function showProductsList(array, SortPreference, concept, MinCount, MaxCount) { /*Concatena la información de distintos productos
                                  extraida en un array, con etiquetas determinadas para lograr
                                  un estilo específico en el HTML y finalmente lo inluye en el archivo.*/
//|| ToSearch != null
  let htmlContentToAppend = ""
  if ((MinCount != undefined && MaxCount != undefined) ) { //Si hay Mínimo y Máximo definidos filtra
    for (let i = 0; i < array.length; i++) {
      let product = showData(array, SortPreference, concept)[i]; //Toma la array y va mostrando los elementos
      //&& ((product.description.includes(ToSearch)) || (product.name.includes(ToSearch)))
      if (product.cost >= MinCount && product.cost <= MaxCount ) {
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
 `}
    }

  }
  else { //sino muestra todo el contenido
    for (let i = 0; i < array.length; i++) {
      let product = showData(array, SortPreference, concept)[i]; //Toma la array y va mostrando los elementos
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
    }

  }
  document.getElementsByClassName("container p-5")[0].innerHTML = htmlContentToAppend;
}



document.addEventListener("DOMContentLoaded", async function (e) {
  let buscador=document.getElementById("buscador");
  
  let minCount;
  let maxCount;

  let OrderPreference = "asc"; //Por defecto muestro productos en orden alfabético ascendente
  let OrderBy = "name";
  var products = (await getJSONData(PRODUCTS_URL)).data; //Realizo la petición y guardo result.data en una variable
  showProductsList(products, "asc", "name", minCount, maxCount);

  document.getElementById("sortAsc").addEventListener("click", function () {
    let OrderPreference = "asc";
    let OrderBy = "cost";
    showProductsList(products, OrderPreference, OrderBy, minCount, maxCount);

  });
  document.getElementById("sortDesc").addEventListener("click", function () {
    let OrderPreference = "desc";
    let OrderBy = "cost";
    showProductsList(products, OrderPreference, OrderBy, minCount, maxCount);

  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    let OrderPreference = "desc";
    let OrderBy = "soldCount";
    showProductsList(products, OrderPreference, OrderBy, minCount, maxCount);

  });

  document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;
    showProductsList(products, OrderPreference, OrderBy, minCount, maxCount);
  });

  document.getElementById("rangeFilterCount").addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
      minCount = parseInt(minCount);
    }
    else {
      minCount = undefined;
    }
    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
      maxCount = parseInt(maxCount);
    }
    else {
      maxCount = undefined;
    }
    showProductsList(products, OrderPreference, OrderBy, minCount, maxCount);
  });

  //Desafiate 
  
 
 
//buscador.addEventListener("keydown",  (event)=> {
  //     alert("hola")
       //let ToSearch = buscador.value;
 
   // showProductsList(products, OrderPreference, OrderBy, minCount, maxCount, ToSearch);
  //});

});