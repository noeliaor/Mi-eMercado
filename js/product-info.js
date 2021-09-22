//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function showImagesGallery(array) {//Recorre una array de imágenes, concatena su contenido y las muestra

    let htmlContentToAppend = `<div id="carouselExampleInterval" class="carousel slide  carousel-fade" data-ride="carousel">
    <div class="carousel-inner">  <div class="carousel-item active">
   <img src="` + array[0] + `" style="margin-left:120px">
  </div>`;

    for (let i = 1; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
      <div class="carousel-item">
     <img src="` + imageSrc + `"  style="margin-left:120px">
    </div>
        `
      
    } 
    htmlContentToAppend += ` </div>
    <a class="carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev" style="margin-left:120px">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>`;
    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
}

function ShowStars(score) { //Recibe una puntuación y genera el contenido necesario para visualizarla como estrellas
    stars = 5;
    contentstars = "";
    for (let j = 0; j < score; j++) { //Muestro tantas estrellas como puntaje
        stars -= 1;
        contentstars += `<span class="fa fa-star checked"></span>`
    }
    for (let k = 0; k < stars; k++) { //Las estrellas restantes (de las 5) son vacías
        contentstars += `<span class="fa fa-star"></span>`
    }
    return contentstars;
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
            document.getElementById("productName").innerHTML = `<b> ${product.name}</b>`;
            document.getElementById("productDescription").innerHTML = product.description;
            document.getElementById("productCost").innerHTML = `<h1 style="color:blue"> ${product.cost}  ${product.currency}</h1>`;
            document.getElementById("productCount").innerHTML = product.soldCount;

  //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            
            getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    comments = resultObj.data;
                    let contentcomments = "";
                    for (let i = 0; i < comments.length; i++) {
                        ShowStars(comments[i].score);
                        contentcomments += `
            <div class="list-group-item list-group-item-action" style="background-color:#cfe2f3">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1"> ${comments[i].user} ${contentstars} </h4>
                        <small> ${comments[i].dateTime}</small>
                      </div>
                      <p class="mb-1"> ${comments[i].description} </p>
        
                </div>
            </div>
        </div>
         `
                    }
                    document.getElementById("productComments").innerHTML = contentcomments; //Muestra de comentarios
                }
            });

          

            getJSONData(PRODUCTS_URL).then(function (resultObj) { //Cargo list de todos los productos
                if (resultObj.status === "ok") {
                    products = resultObj.data;

                    let contenttorelated = "";
                    let related = product.relatedProducts;

                    for (let i = 0; i < related.length; i++) { //Recorro array de productos relacionados
                        //Valores indican posiciones en lista de productos
                        contenttorelated += `
            <div class="list-group-item list-group-item-action, list-related" onclick="ShowProductInfo()">
            <div class="row">
                <div class="col-3">
                    <img src="${products[related[i]].imgSrc}" alt="${products[related[i]].description}" class="img-thumbnail, related-img">
                </div>
        
                <div class="col">
                    <div >
                        <h4 class="mb-1, related-text"><b>${products[related[i]].name} </b></h4>
                        </br>
                        </br>
                        <h4 class="related-text" style="color:blue"> ${products[related[i]].cost}  ${products[related[i]].currency}</h4>   
                    </div>
        
                </div>
            </div>
        </div>
         `
                    }
                    document.getElementById("relatedProducts").innerHTML = contenttorelated;

                }
            });

        }
    });

    document.getElementById("submitcomment").addEventListener("click", function () { //Envío/concatenación de comentario
        contentcomments = document.getElementById("productComments").innerHTML; //Extraigo el contenido de la sección comentarios
        var ranking = document.getElementsByName('stars'); //Botones para ingresar estrellas
        scorevalue=0; //El puntaje inicial es cero, se aplica al caso en que no se hayan seleccionado estrellas.
        for (i = 0; i < ranking.length; i++) { //Recorro los botones, almaceno el valor del chequeado
            if (ranking[i].checked) {
                scorevalue = ranking[i].value;
            }
        }

        ShowStars(scorevalue); //Llamo a función para generar contenido de estrellas

        if (sessionStorage.getItem('user') != "" && sessionStorage.getItem('password') != "") {//Almaceno el usuario, según modo de autenticación empleado
            var user = sessionStorage.getItem('user') //En caso de que haya usuario y contraseña en el formulario
        } else {
            var user = sessionStorage.getItem('Guser')
        }
        contentcomments += `
     <div class="list-group-item list-group-item-action" style="background-color:#cfe2f3">
     <div class="row">
         <div class="col">
             <div class="d-flex w-100 justify-content-between">
                 <h4 class="mb-1"> ${user} ${contentstars}</h4>
                 <small> ${new Date().toLocaleString('en-CA', { hour12: false })}</small>
               </div>
               <p class="mb-1"> ${document.getElementById("descriptioncomment").value} </p>
              <div>
             </div>
 
         </div>
     </div>
 </div>
  `
        document.getElementById("productComments").innerHTML = contentcomments; //Reasigno el contenido, incluyendo nuevo comentario
        alert("¡Tu comentario fue enviado! Gracias por la contribución.")
        document.getElementById("commentform").reset(); //Cuando se envía un comentario nuevo vacía el formulario
    });

});