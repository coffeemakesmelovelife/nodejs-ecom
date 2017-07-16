var express = require('express');
var router = express.Router();

var produits = require('../produits.json');
produits = eval(produits);
var categories = require('../categories.json');
categories = eval(categories);

router.get('/:id', function(req, res, next){
  //Produits from json file for testing
  var produit={};
  var memeCategorie=[];
  for(var i = 0; i<produits.length; i++){
    console.log(produits[i]);
    if(produits[i].id == req.params.id){
      produit = produits[i];
    }
  }
  for(var i = 0; i<produits.length; i++){
    if(produits[i].categorie == produit.categorie && memeCategorie.length<4){
      memeCategorie.push(produits[i]);
    }
  }

  res.render('produit', {
    title: 'PiecesAuto | Produit',
    produit: produit,
    memeCategorie: memeCategorie,
    categories: categories,
    path: req.route.path
  });
});


module.exports = router;
