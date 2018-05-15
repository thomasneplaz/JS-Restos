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
function initialiserRestos()
{
    if (localStorage.getItem("restos") === null)
    {
        // Si la "BDD" localStorage n'existe pas, on l'initialise //
        var restos = [];
        // Sauvegarder en localStorage //
        localStorage['restos'] = JSON.stringify(restos);
    }
  }

//récupère une liste de restos
function getRestos ()
{
  // Charger en localStorage //
  var restos = JSON.parse(localStorage['restos']);
  // Retourner la liste //
  return restos;
}

function creerListeRestos(lesRestos)
{
    html = "";
  // Parcourir //
  lesRestos.forEach(function(item, index, array)
  {
    html += '<div class="listeResto">';
    html += '<h3>' + item['nom'] + '</h3>';
    html += '<p>' + item['description'] + '</p>';
    html += '</div>';

  });
  // Retourner la liste //
  document.getElementById('allResto').innerHTML = html;
}

function creerListeRestosSuppression(lesRestos)
{
    alert('hop');
    html = "";
  // Parcourir //
  lesRestos.forEach(function(item, index, array)
  {
    
  });
  // Retourner la liste //
  document.getElementById('suppressionSection').innerHTML = html;
}

//fonction pour ajouter un resto avec nom et description en format html
function ajouterResto()
{
    var nom = document.ajout.Nom.value;
    var desc = document.ajout.desc.value;
  // Charger en localStorage //
  var restos = JSON.parse(localStorage['restos']);
  // Ajouter l'objet //
  var leResto = new Object();
  leResto["nom"] = nom;
  leResto["description"] = desc;

  var newLength = restos.push(leResto);
  // Sauvegarder en localStorage //
  localStorage['restos'] = JSON.stringify(restos);

  //alert('Ajout OK');
}

function creerListeRestosCheckbox(lesRestos)
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
