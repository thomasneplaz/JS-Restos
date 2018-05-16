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
    html += '<p class="description">' + item['description'] + '</p>';
    html += '<ul class="no-puces listbtnresto">';
    html += '<li data-link="critique" class="btnResto">Voir les critiques</li>';
    html += '<li onclick="addFavoris();" class="btnResto">Ajouter aux favoris</li>';
    html += '</ul>';
    html += '</div>';

  });
  // Retourner la liste //
  document.getElementById('allResto').innerHTML = html;
}

function creerListeRestosSuppression(lesRestos)
{
  html = "<table>";
  html = "<h2>Supprimer un resto</h2><table>";
  // Parcourir //
  lesRestos.forEach(function(item, index, array)
  {
    html += '<tr>';
    html += '<td>' + item['nom'] + '</td>';
    html += "<td><button onclick='supprimerResto(" + '"' + item['nom'] + '"' + ")'> X </button></td>";
    html += '</tr>';
  });
  html += "</table>";
  // Retourner la liste //
  document.getElementById('suppressionSection').innerHTML = html;
}

function creerListeRestosCheckbox(lesRestos)
{
  html = "<h2>Choisir les restos</h2>";
  html += '<form method="post" name="select" id="formcheckresto" action="vote();">';
  html += '<table>';
  // Parcourir //
  lesRestos.forEach(function(item, index, array)
  {
    html += '<tr><td>';
    html += '<input type="checkbox" name="checkresto">' + item['nom'] +'</input>';
    html += '</td></tr>';
  });
  html += '<tr><td><input type="submit" name="send" value="Lancer"></input></td></tr>';
  html += "</table></form>";
  // Retourner la liste //
  document.getElementById('prevote').innerHTML = html;
}

function vote()
{
    var html = '';
    var rest = document.getElementById('formcheckresto').getElementByTagName('input');
    for (var i = 0, iMax = rest.length; i < iMax; ++i) {
        var check = rest[i];
        if (check.type == "checkbox" && check.checked) {
            // tu accèdes ici à chaque checkbox cochée avec check[i]
            html += '<input type="checkbox" name="checkresto">' + rest[i] +'</input>';
        }
    }
    return html;

function afficherListeRestosModification(lesRestos)
{
  html = "<h2>Modifier un resto</h2><table>";
  // Parcourir //
  lesRestos.forEach(function(item, index, array)
  {
    html += '<tr>';
    html += '<td>' + item['nom'] + '</td>';
    html += "<td><button onclick='afficherFormulaireRestoModification(" + '"' + item['nom'] + '"' + ")'> Modifier </button></td>";
    html += '</tr>';
  });
  html += "</table>";
  // Retourner la liste //
  document.getElementById('modificationSection').innerHTML = html;
}


//fonction pour ajouter un resto avec nom et description en format html
function ajouterResto()
{
  // Charger en localStorage //
  var restos = JSON.parse(localStorage['restos']);
  // Ajouter l'objet //
  var leResto = new Object();
  leResto["nom"] = document.ajout.Nom.value;
  leResto["description"] = document.ajout.desc.value;

  var newLength = restos.push(leResto);
  // Sauvegarder en localStorage //
  localStorage['restos'] = JSON.stringify(restos);

  //alert('Ajout OK');
}

function supprimerResto (nomResto)
{
  // Charger en localStorage //
  var restos = JSON.parse(localStorage['restos']);
  // Parcourir les restos //
  restos.forEach(function(item, index, array)
  {
    // Si on tombe sur le resto en paramètre //
    if(item["nom"] == nomResto)
    {
      // Supprimer //
      var removedItem = restos.splice(index, 1);

      //alert(item["nom"] + ' supprimé');
    }
  });

  // Sauvegarder en localStorage //
  localStorage['restos'] = JSON.stringify(restos);

  //alert('Suppression OK');
  creerListeRestosSuppression(getRestos());
}


function afficherFormulaireRestoModification(nomResto)
{
  // Charger en localStorage //
  var restos = JSON.parse(localStorage['restos']);
  // Parcourir les restos //
  restos.forEach(function(item, index, array)
  {
    // Si on tombe sur le resto en paramètre //
    if(item["nom"] == nomResto)
    {
      html =  "<h2>Modifier un resto</h2><table>";
      html += '<form class="modif" name="modif" action="index.html" method="post">';
      html += '    <table>';
      html += '        <tr>';
      html += '            <td>';
      html += '                <label for="Nom">Nom :</label>';
      html += '            </td>';
      html += '            <td>';
      html += "                <input id='nomModif' type='text' name='Nom' placeholder=" + '"' + item['nom'] + '"' + ">";
      html += '            </td>';
      html += '        </tr>';
      html += '        <tr>';
      html += '           <td>';
      html += '               <label for="desc">Description :</label>';
      html += '           </td>';
      html += '           <td>';
      html += "               <textarea id='descriptionModif' placeholder='" + item['description'] + "' name='desc' rows='8' cols='80'></textarea>";
      html += '           </td>';
      html += '       </tr>';
      html += '       <tr>';
      html += '           <td>';
      html += "               <button type='button' name='button' onclick='modifierResto(" + '"' + item['nom'] + '"' + ")'>Modifier</button>";
      html += '           </td>';
      html += '       </tr>';
      html += '    </table>';
      html += '</form>';
    }
  });

  document.getElementById('modificationSection').innerHTML = html;
}

function modifierResto (ancienNomResto)
{
  // Charger en localStorage //
  var restos = JSON.parse(localStorage['restos']);
  // Parcourir les restos //
  restos.forEach(function(item, index, array)
  {
    // Si on tombe sur le resto en paramètre //
    if(item["nom"] == ancienNomResto)
    {
      // Modifier //
      item["nom"] = document.getElementById('nomModif').value;
      item["description"] = document.getElementById('descriptionModif').value;
    }
  });
  // Sauvegarder en localStorage //
  localStorage['restos'] = JSON.stringify(restos);
}
