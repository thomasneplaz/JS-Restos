// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let ViewHelper = new viewHelper();

document.querySelector('aside ul').addEventListener('click', function(el) {
    //If el.target is a li do somathing
    if(el.target.nodeName == 'LI') {
        ViewHelper.showTab(el.target);
    }
})

let ViewGestion = new viewGestion();

document.querySelector('section ul').addEventListener('click', function(el) {
    if(el.target.nodeName == 'LI'){
        ViewGestion.showTab(el.target);
    }
})



//initialise le localStorage
function initialiserRestos ()
{
  if (localStorage.getItem("restos") === null)
  {
    // Si la "BDD" localStorage n'existe pas, on l'initialise //
    var restos = [];
    // Sauvegarder en localStorage //
    localStorage['restos'] = JSON.stringify(restos);
  }

//récupère une liste de restos
function getRestos ()
{
  // Charger en localStorage //
  var restos = JSON.parse(localStorage['restos']);
  // Retourner la liste //
  return restos;
}

function creerListeRestos (lesRestos)
{
  html = '<ul>';

  // Parcourir //
  lesRestos.forEach(function(item, index, array)
  {
    html += '<li>' + item['nom'] + '</li>';
    html += '<ul><li>' + item['description'] + '</li></ul>';
  });

  html += '</ul>'

  // Retourner la liste //
  return html;
}

//fonction pour ajouter un resto avec nom et description en format html
function ajouterResto (nomResto, descriptionResto)
{
  // Charger en localStorage //
  var restos = JSON.parse(localStorage['restos']);
  // Ajouter l'objet //
  var leResto = new Object();
  leResto["nom"] = nomResto;
  leResto["description"] = descriptionResto;

  var newLength = restos.push(leResto);
  // Sauvegarder en localStorage //
  localStorage['restos'] = JSON.stringify(restos);

  //alert('Ajout OK');
}

function creerListeRestosCheckbox (lesRestos)
{
  html = '<ul>';

  // Parcourir //
  lesRestos.forEach(function(item, index, array)
  {
    html += '<li>' + item['nom'] + '</li>';
  });

  html += '</ul>'

  // Retourner la liste //
  return html;
}
