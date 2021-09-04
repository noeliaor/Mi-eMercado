//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            products = resultObj.data;
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;
        }
    });
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCountHTML = document.getElementById("productCount");
            let relatedProductsHTML = document.getElementById("relatedProducts");
            let productCommentsHTML = document.getElementById("productComments");

            productNameHTML.innerHTML = `<b> ${product.name}</b>`;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = `<h4 style="color:blue"> ${product.cost}  ${product.currency}</h4>`;
            productCountHTML.innerHTML = product.soldCount;

            let contentcomments = "";
            for (let i = 0; i < comments.length; i++) {
                stars = 5;
                contentstars = "";
                for (let j = 0; j < comments[i].score; j++) {
                    stars -= 1;
                    contentstars += `<span class="fa fa-star checked"></span>`
                }
                for (let k = 0; k < stars; k++) {
                    contentstars += `<span class="fa fa-star"></span>`
                }

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
            productCommentsHTML.innerHTML = contentcomments;
            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);


            let contenttorelated = "";
            let related = product.relatedProducts;
            for (let i = 0; i < related.length; i++) {
                contenttorelated += `
            <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${products[i].imgSrc}" alt="${products[i].description}" class="img-thumbnail">
                </div>
        
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1"> ${products[i].name}  </h4>
                        <small class="text-muted"> ${products[i].soldCount} artículos</small>
                      </div>
                      <p class="mb-1"> ${products[i].description} </p>
                     <div>
                        <h4 style="color:blue"> ${products[i].cost}  ${products[i].currency}</h4>   
                    </div>
        
                </div>
            </div>
        </div>
         `
            }
            relatedProductsHTML.innerHTML = contenttorelated;

        }
    });
    document.getElementById("submitcomment").addEventListener("click", function () { //Selección de filtrado
        contentcomments = document.getElementById("productComments").innerHTML;
        var ranking = document.getElementsByName('demo');
        for (i = 0; i < ranking.length; i++) {
            if (ranking[i].checked) {
                score = ranking[i].value;
            }
        }

        stars = 5;
        contentstars = "";
        for (let j = 0; j < score; j++) {
            stars -= 1;
            contentstars += `<span class="fa fa-star checked"></span>`
        }
        for (let k = 0; k < stars; k++) {
            contentstars += `<span class="fa fa-star"></span>`
        }

        contentcomments += `
     <div class="list-group-item list-group-item-action" style="background-color:#cfe2f3">
     <div class="row">
         <div class="col">
             <div class="d-flex w-100 justify-content-between">
                 <h4 class="mb-1"> ${sessionStorage.getItem('user')} ${contentstars}</h4>
                 <small> ${new Date().toLocaleString('en-CA', { hour12: false })}</small>
               </div>
               <p class="mb-1"> ${document.getElementById("descriptioncomment").value} </p>
              <div>
             </div>
 
         </div>
     </div>
 </div>
  `
        document.getElementById("productComments").innerHTML = contentcomments;
        document.getElementById("commentform").reset();

    });
});