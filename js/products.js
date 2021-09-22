const showData = (array, SortPreference, concept) => { //Ordena los elementos de la array de forma incremental y los almacena en una array.
  function SortArray(x, y) { //Función que indica cómo ordenar los elementos
    if (x[concept] < y[concept]) { return -1; } //x se ordena antes que y
    if (x[concept] > y[concept]) { return 1; } //x se ordena después
    return 0; //Mantienen posiciones
  }
  var inorder = array.sort(SortArray); //Almaceno la array ordenada

  if (SortPreference == "asc") {
    organized = inorder;
  } else {
    organized = inorder.reverse(); //En caso de orden descendente revierte el orden de la array
  }

  return organized; //Devuelve la array ordenada

};

//Desafiate
const FilterData = (DataName, DataDescription, Search) => { //Esta función busca palabras en dos elementos de información indicados
  let result = 1; //Inicialmente considero que hay alguna coincidencia
  let SearchSplit = Search.split(" ") //divido la cadena en palabras para reconocer palabras sueltas
  for (let item of SearchSplit) { 
    if (result != 0) { //Si aún no ha descoincidido con la búsqueda
      if (DataName.toLowerCase().includes(item.toLowerCase()) || DataDescription.toLowerCase().includes(item.toLowerCase())) { //OBS: Las cadenas se convierten a minúscula para que la búsqueda no sea case sensitive;
        result = 1; //Si alguno de los dos elementos (en este caso descripción y nombre de producto) contiene la búsqueda, retorna 1 (verdadero)

      } else {
        result = 0; //Si ninguno lo contiene retorna 0 (falso)
      }
    }
  };
  return result; //Devuelve 1 si todas las palabras se encuentran en descripción y/o nombre, 0 si alguna no se encuentra.
 
};
//---------------------------------------------------//

function showProductsList(array, SortPreference, concept, Minimo, Maximo, Search) {
  let htmlContentToAppend = ""
  for (let i = 0; i < array.length; i++) {
    let product = showData(array, SortPreference, concept)[i]; //Recibe la array ordenada y la almacena


    if (product.cost >= Minimo && product.cost <= Maximo && FilterData(product.name, product.description, Search) == 1) { //Sólo aquellos productos con precios en el rango definido,
      //Y que contienen en desc. o nombre la palabra buscada. 
      //se van a mostrar (concatenar al contenido)
      
      //Se agrega id para identificar el contenedor de cada producto, y evento de clic.

      htmlContentToAppend += `
    <div id=${product.name} class="list-group-item list-group-item-action" onclick="ShowProductInfo()"> 
    <div class="row">
        <div class="col-3">
            <img src="${product.imgSrc}" alt="${product.description}" class="img-thumbnail">
        </div>

        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h3 class="mb-1">${product.name}  </h3>
                <small class="text-muted"> ${product.soldCount} artículos</small>
              </div>
              <p class="mb-1"> ${product.description} </p>
             <div>
                <h3 style="color:blue"> ${product.cost}  ${product.currency}</h3>   
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
  let minCost = 0; //Inicialmente abarco todos los productos
  let maxCost = Number.POSITIVE_INFINITY;
  let OrderPreference = "asc"; //Por defecto muestro productos en orden alfabético ascendente
  let OrderBy = "cost";
  let buscador = document.getElementById("buscador");
  let ToSearch = buscador.value;
  var products = (await getJSONData(PRODUCTS_URL)).data; //Realizo la petición y guardo result.data en una variable
  showProductsList(products, OrderPreference, OrderBy, minCost, maxCost, ToSearch); //Al ingresar al html se presentan los productos,
  //ordenados por defecto


  document.getElementById("sortAsc").addEventListener("click", function () { //Selección de orden ascendente
    OrderPreference = "asc";
    OrderBy = "cost";
    showProductsList(products, OrderPreference, OrderBy, minCost, maxCost, ToSearch);

  });
  document.getElementById("sortDesc").addEventListener("click", function () { //Selección de orden descendente
    OrderPreference = "desc";
    OrderBy = "cost";
    showProductsList(products, OrderPreference, OrderBy, minCost, maxCost, ToSearch);

  });

  document.getElementById("sortByCount").addEventListener("click", function () { //Orden por relevancia
    OrderPreference = "desc";
    OrderBy = "soldCount";
    showProductsList(products, OrderPreference, OrderBy, minCost, maxCost, ToSearch);

  });

  //----------------Filtrado por precios--------------
  document.getElementById("clearRangeFilter").addEventListener("click", function () { //Botón de limpieza
    document.getElementById("rangeFilterCostMin").value = ""; //Vacía campos en los espacios de input
    document.getElementById("rangeFilterCostMax").value = "";

    minCost = 0; //Redefine límites para que abarquen todos los productos
    maxCost = Number.POSITIVE_INFINITY;
    showProductsList(products, OrderPreference, OrderBy, minCost, maxCost, ToSearch); //Aplico nuevos límites
  });

  document.getElementById("rangeFilterCost").addEventListener("click", function () { //Selección de filtrado
    //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
    minCost = document.getElementById("rangeFilterCostMin").value;
    maxCost = document.getElementById("rangeFilterCostMax").value;

    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) { //Si hay un mínimo, razonable, definido lo almacena como número
      minCost = parseInt(minCost);
    }
    else {
      minCost = 0; //Defino mínimo como el mínimo posible
    }

    if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) { //Idem para el máximo
      maxCost = parseInt(maxCost);
    }
    else {
      maxCost = Number.POSITIVE_INFINITY; //Defino máximo inalcanzable
    }
    showProductsList(products, OrderPreference, OrderBy, minCost, maxCost, ToSearch); //Vuelve a mostrar la lista
  });

  //Desafiate
  buscador.addEventListener("input", (event) => { //Solución para que se detecte cualquier cambio (ejemplo clickeo en cruz de formulario: evento)
    showProductsList(products, OrderPreference, OrderBy, minCost, maxCost, buscador.value); //Realiza la muestra de productos con la cadena a buscar
    ToSearch=buscador.value; //Actualizo variable para que se considere en todo momento el texto del buscador
  });

});



