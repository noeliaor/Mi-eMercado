const showData = (array, SortPreference, concept) => { //Ordena los elementos de la array de forma incremental y los almacena en una array.
  function SortArray(x, y) { //Función que indica cómo ordenar los elementos
    if (x[concept] < y[concept]) { return -1; } //x se ordena antes que y
    if (x[concept] > y[concept]) { return 1; } //x se ordena después
    return 0; //Mantienen posiciones
  }
  var inorder = array.sort(SortArray); //Almaceno la array ordenada

  if (SortPreference == "asc") {
    organized = inorder;
  } else if (SortPreference == "desc") {
    organized = inorder.reverse(); //En caso de orden descendente revierte el orden de la array
  } else {
    organized = inorder;
  }

  return organized; //Devuelve la array ordenada

};

const FilterData(DataName,DataDescription,Search)=> {
  let result=0;
  if (DataName.search(Search)>0||DataDescription.search(Search)>0){
    result=1;
  }
 return result;
};


function showProductsList(array, SortPreference, concept, Minimo, Maximo) {
  let htmlContentToAppend = ""
  for (let i = 0; i < array.length; i++) {
    let product = showData(array, SortPreference, concept)[i]; //Recibe la array ordenada y la almacena


    if (product.cost >= Minimo && product.cost <= Maximo && FilterData()) { //Sólo aquellos productos con precios en el rango definido 
      //se van a mostrar (concatenar al contenido)
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
  document.getElementsByClassName("container p-5")[0].innerHTML = htmlContentToAppend; //Asigna el contenido
}


document.addEventListener("DOMContentLoaded", async function (e) {
  //Definición de elementos requeridos para la presentación de productos:
  let minCount = 0; //Inicialmente abarco todos los productos
  let maxCount = Number.POSITIVE_INFINITY;
  let OrderPreference = "asc"; //Por defecto muestro productos en orden alfabético ascendente
  let OrderBy = "name";
  var products = (await getJSONData(PRODUCTS_URL)).data; //Realizo la petición y guardo result.data en una variable
  showProductsList(products, OrderPreference, OrderBy, minCount, maxCount); //Al ingresar al html se presentan los productos,
  //ordenados por defecto


  document.getElementById("sortAsc").addEventListener("click", function () { //Selección de orden ascendente
    OrderPreference = "asc";
    OrderBy = "cost";
    showProductsList(products, OrderPreference, OrderBy, minCount, maxCount);

  });
  document.getElementById("sortDesc").addEventListener("click", function () { //Selección de orden descendente
    OrderPreference = "desc";
    OrderBy = "cost";
    showProductsList(products, OrderPreference, OrderBy, minCount, maxCount);

  });

  document.getElementById("sortByCount").addEventListener("click", function () { //Orden por relevancia
    OrderPreference = "desc";
    OrderBy = "soldCount";
    showProductsList(products, OrderPreference, OrderBy, minCount, maxCount);

  });

  //----------------Filtrado por precios--------------
  document.getElementById("clearRangeFilter").addEventListener("click", function () { //Botón de limpieza
    document.getElementById("rangeFilterCountMin").value = ""; //Vacía campos en los espacios de input
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = 0; //Redefine límites para que abarquen todos los productos
    maxCount = Number.POSITIVE_INFINITY;
    showProductsList(products, OrderPreference, OrderBy, minCount, maxCount); //Aplico nuevos límites
  });

  document.getElementById("rangeFilterCount").addEventListener("click", function () { //Selección de filtrado
    //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) { //Si hay un mínimo, razonable, definido lo almacena como número
      minCount = parseInt(minCount);
    }
    else {
      minCount = 0; //Defino mínimo como el mínimo posible
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) { //Idem para el máximo
      maxCount = parseInt(maxCount);
    }
    else {
      maxCount = Number.POSITIVE_INFINITY; //Defino máximo inalcanzable
    }
    showProductsList(products, OrderPreference, OrderBy, minCount, maxCount); //Vuelve a mostrar la lista
  });
});
//Desafiate

let buscador = document.getElementById("buscador");
buscador.addEventListener("keydown", (event) => {
  let ToSearch = buscador.value;
  alert(ToSearch)
  showProductsList(products, OrderPreference, OrderBy, minCount, maxCount, ToSearch);
});

