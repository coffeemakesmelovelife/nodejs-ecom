var express = require('express');
var router = express.Router();

var Produits = require('../produits.json');
Produits = eval(Produits);

router.get('/:name', function(req, res, next){
  var nomCategorie = req.params.name.replace('20%', ' ');
  var produits = [];
  for(var i = 0; i<Produits.length; i++){
    console.log(Produits[i].categorie);
    if(Produits[i].categorie == req.params.name){
      console.log('!!!!');
      produits.push(Produits[i]);
    }
  }
  var productsCount = produits.length;
  var pageSize = 12;
  var pageCount = Math.ceil(productsCount / pageSize);
  var currentPage = 1;
  var productsArray = [];
  var productsList = [];
  var cloneProduits = produits.slice();

  var i,j,chunk = 12;
  for (i=0,j=produits.length; i<j; i+=chunk){
    productsArray.push(produits.slice(i,i+chunk));
    }
  //console.log(productsArray.length);
  if(typeof req.query.page !== 'undefined'){
    currentPage =+ req.query.page;
    //console.log('current page : '+currentPage);
  }
  var test = currentPage -1;
  //console.log('INDEX 2 : '+productsArray[2]);
  productsList = productsArray[currentPage -1];
  //console.log('products list : '+productsList);

  res.render('categorie', {
    title: 'Pieces Auto | Produit',
    produits: productsList,
    totalPages: pageCount,
    page: currentPage,
    categorie: req.params.name,
    path: req.route.path
  });
});


module.exports = router;
