var express = require('express');
var router = express.Router();

var produits = require('../produits.json');
produits = eval(produits);
var categories = require('../categories.json');
categories = eval(categories);

router.get('/', function(req, res, next) {
  var newProducts = [];
  var bestSelling = [];
  for(var i=0; i<=produits.length; i++){
    if(produits[i].tag == 'nouveau' && newProducts.length < 4){
      newProducts.push(produits[i]);
    } else if (produits[i].tag == 'meilleur vente') {
      bestSelling.push(produits[i]);
      if(newProducts.length == 4 && bestSelling.length == 4){
        break;
      }
    }
  }
  res.render('index', {
    title: 'Pieces Auto | Accueil',
    categories: categories,
    path: req.route.path,
    newProducts: newProducts,
    bestSelling: bestSelling
  });
});

router.get('/boutique', function(req, res, next){
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
  console.log(productsArray.length);
  if(typeof req.query.page !== 'undefined'){
    currentPage =+ req.query.page;
    console.log('current page : '+currentPage);
  }
  var test = currentPage -1;
  console.log('INDEX 2 : '+productsArray[2]);
  productsList = productsArray[currentPage -1];
  console.log('products list : '+productsList);

  res.render('boutique', {
    title: 'Pieces Auto | Garantie',
    produits: productsList,
    page: currentPage,
    totalPages: pageCount,
    path: req.route.path
  });
});

router.get('/paiement', function(req, res, next){
  res.render('paiement', {
    title: 'Pieces Auto | Paiement',
    path: req.route.path
  });
});

router.get('/livraison', function(req, res, next){
  res.render('livraison', {
    title: 'Pieces Auto | Livraison',
    path: req.route.path
  });
});

router.get('/contact', function(req, res, next){
  res.render('contact', {
    title: 'Pieces Auto | Contact',
    path: req.route.path
  });
});

router.get('/commande', function(req, res, next){
  res.locals.path = req.route.path;
  res.render('commande', {title: 'Pieces Auto | Passer commande'})
});

router.post('/commande', function(req, res, next){
  var commande = req.body;
  console.log(commande);
  res.render('commande', {
    title: 'Pieces Auto | Passer commande',
    path: req.route.path
  })
});

module.exports = router;
