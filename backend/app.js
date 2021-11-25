//Se incluye módulo Express y se crea una aplicación de express.
var express = require('express');
var app = express();
const cors = require("cors");
app.use(cors())

const bodyParser = require('body-parser'); //Paquete para procesar correctamente JSON recibido
 app.use (bodyParser.json()); 
 var fs = require('fs');

 
//Envío de archivos

//JSON's del carrito
app.get('/cart/987.json', function (req, res) {
  res.sendFile('987.json', { root: "jsons/cart/" }); //Ejecuta envío
}); 
app.get('/cart/buy.json', function (req, res) {
  res.sendFile('buy.json', { root: "jsons/cart/" }); //Ejecuta envío
}); 
//JSON's de categorías
app.get('/category/1234.json', function (req, res) {
  res.sendFile('1234.json', { root: "jsons/category/" }); //Ejecuta envío
}); 
app.get('/category/all.json', function (req, res) {
  res.sendFile('all.json', { root: "jsons/category/" }); //Ejecuta envío
});
//JSON's de productos
app.get('/product/5678.json', function (req, res) {
  res.sendFile('5678.json', { root: "jsons/product/" }); //Ejecuta envío
});
app.get('/product/5678-comments.json', function (req, res) {
  res.sendFile('5678-comments.json', { root: "jsons/product/" }); //Ejecuta envío
});
app.get('/product/all.json', function (req, res) {
  res.sendFile('all.json', { root: "jsons/product/" }); //Ejecuta envío
});
app.get('/product/publish.json', function (req, res) {
  res.sendFile('publish.json', { root: "jsons/product/" }); //Ejecuta envío
});

app.listen(3000, function () { //Crea el servidor escuchando al puerto 3000
  console.log('Servidor corriendo en el puerto 3000!')
});

//Desafiate: recepción de datos

app.post ('/buyreception',function(req, res) {  //Escucho solicitudes POST en localhost:3000/buyreception
  let cartinfo = JSON.stringify(req.body); //El JSON recibido se convierte en String
  let filepath = "cartfile.txt"; //Ruta en la que se guardará archivo con información de la compra
try{
  fs.writeFileSync(filepath,cartinfo); //Escribo archivo de texto con info. ingresada
  console.log("Se registró una nueva compra con éxito.") //En el servidor aviso que se registró una compra
}catch (e){
  console.log("Cannot write file ", e);
}


});

