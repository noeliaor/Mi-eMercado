//Se incluye módulo Express y se crea una aplicación de express.
var express = require('express');
var app = express();
const cors = require("cors")
app.use(cors())
app.use(express.static('/img'));

//JSON's del carrito
app.get('/cart/987.json', function (req, res) {
  res.sendFile('987.json', { root: "cart/" }); //Ejecuta envío
}); 
app.get('/cart/buy.json', function (req, res) {
  res.sendFile('987.json', { root: "cart/" }); //Ejecuta envío
}); 
//JSON's de categorías
app.get('/category/1234.json', function (req, res) {
  res.sendFile('1234.json', { root: "category/" }); //Ejecuta envío
}); 
app.get('/category/all.json', function (req, res) {
  res.sendFile('all.json', { root: "category/" }); //Ejecuta envío
});
//JSON's de productos
app.get('/product/5678.json', function (req, res) {
  res.sendFile('5678.json', { root: "product/" }); //Ejecuta envío
});
app.get('/product/5678-comments.json', function (req, res) {
  res.sendFile('5678-comments.json', { root: "product/" }); //Ejecuta envío
});
app.get('/product/all.json', function (req, res) {
  res.sendFile('all.json', { root: "product/" }); //Ejecuta envío
});
app.get('/product/publish.json', function (req, res) {
  res.sendFile('publish.json', { root: "product/" }); //Ejecuta envío
});

app.listen(3000, function () { //Crea el servidor escuchando al puerto 3000
  console.log('Servidor corriendo en el puerto 3000!')
});