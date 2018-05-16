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
    if(item['favoris'] == true)
    {
        html += "<li onclick='toggleFavoris(" + '"' + item['nom'] + '"' + ");' class='btnResto'>Retirer des favoris</li>";
    }
    else
    {
        html += "<li onclick='toggleFavoris(" + '"' + item['nom'] + '"' + ");' class='btnResto'>Ajouter aux favoris</li>";
    }
    html += '</ul>';
    html += '</div>';

  });
  // Retourner la liste //
  document.getElementById('allResto').innerHTML = html;
}

function toggleFavoris(nomResto)
{
  // Charger en localStorage //
  var restos = JSON.parse(localStorage['restos']);
  // Parcourir les restos //
  restos.forEach(function(item, index, array)
  {
    // Si on tombe sur le resto en paramètre //
    if(item["nom"] == nomResto)
    {
      // On inverse l'attribut "favoris" //
      if(item["favoris"] === true)
      {
        item["favoris"] = false;
      }
      else
      {
        item["favoris"] = true;
      }
    }
  });
  // Sauvegarder en localStorage //
  localStorage['restos'] = JSON.stringify(restos);

  creerListeRestos(getRestos());
}

function creerListeFavoris(lesRestos)
{
  html = "";
  // Parcourir //
  lesRestos.forEach(function(item, index, array)
  {
    if(item['favoris'] === true)
    {
      html += '<div class="listeResto">';
      html += '<h3>' + item['nom'] + '</h3>';
      html += '<p class="description">' + item['description'] + '</p>';
      html += '<ul class="no-puces listbtnresto">';
      html += '<li data-link="critique" class="btnResto">Voir les critiques</li>';

      html += '</ul>';
      html += '</div>';
    }
  });
  // Retourner la liste //
  document.getElementById('restosFavoris').innerHTML = html;
}

function creerListeRestosSuppression(lesRestos)
{
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


function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}

function creerListeRestosVote(lesRestos)
{
    html = "<table>";
    // Parcourir //
    lesRestos.forEach(function(item, index, array)
    {
      html += '<tr id="'+ item['nom'] +'">';
      html += '<td>' + item['nom'] + '</td>';
      html += "<td><button onclick='voteResto(" + '"' + item['nom'] + '"' + ")'> +1 </button></td>";
      html += "<td><button onclick='retirerResto(" + '"' + item['nom'] + '"' + ")'> X </button></td>";
      html += '</tr>';
    });
    html += '</table>';
    html += '<section class="result"><table>';
    lesRestos.forEach(function(item, index, array)
    {
        html += '<tr id="lign'+ item['nom'] +'" class="">';
        html += '<td>' + item['nom'] + '</td><td><div id="bar'+ item['nom'] +'" class="barbase bar0"></div>';
        html += '</tr>';
    });
    html += '</table></section>';
    // Retourner la liste //
    document.getElementById('prevote').innerHTML = html;
}

function retirerResto(nomResto)
{
    var el = document.getElementById(nomResto);
    addClass(el, "hidden");
    var elbar = document.getElementById('lign'+nomResto);
    addClass(el, "hidden");
}

function voteResto(nomResto)
{
    var el = document.getElementById('bar'+nomResto);
    if(hasClass(el,"bar0")){
        removeClass(el,"bar0");
        addClass(el,"bar1");
    }else if (hasClass(el,"bar1")) {
        removeClass(el,"bar1");
        addClass(el,"bar2");
    }else if (hasClass(el,"bar2")) {
        removeClass(el,"bar2");
        addClass(el,"bar3");
    }else if (hasClass(el,"bar3")) {
        removeClass(el,"bar3");
        addClass(el,"bar4");
    }else if (hasClass(el,"bar4")) {
        removeClass(el,"bar4");
        addClass(el,"bar5");
    }else if (hasClass(el,"bar5")) {
        removeClass(el,"bar5");
        addClass(el,"bar6");
    }else if (hasClass(el,"bar6")) {
        removeClass(el,"bar6");
        addClass(el,"bar7");
    }else if (hasClass(el,"bar7")) {
        removeClass(el,"bar7");
        addClass(el,"bar8");
    }else if (hasClass(el,"bar8")) {
        removeClass(el,"bar8");
        addClass(el,"bar9");
    }else if (hasClass(el,"bar9")) {
        removeClass(el,"bar9");
        addClass(el,"bar10");
    }else if (hasClass(el,"bar10")) {
        removeClass(el,"bar10");
        addClass(el,"bar11");
    }else if (hasClass(el,"bar12")) {
        removeClass(el,"bar12");
        addClass(el,"bar13");
    }else if (hasClass(el,"bar13")) {
        removeClass(el,"bar13");
        addClass(el,"bar14");
    }else if (hasClass(el,"bar14")) {
        removeClass(el,"bar14");
        addClass(el,"bar15");
    }

}

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

//fonction pour ajouter un resto avec nom et description en format html
function ajouterResto()
{
  // Charger en localStorage //
  var restos = JSON.parse(localStorage['restos']);
  // Ajouter l'objet //
  var leResto = new Object();
  leResto["nom"] = document.ajout.Nom.value;
  leResto["description"] = document.ajout.desc.value;
  leResto["favoris"] = false;
  leResto["critiques"] = [];

  var newLength = restos.push(leResto);
  // Sauvegarder en localStorage //
  localStorage['restos'] = JSON.stringify(restos);
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
    }
  });
  // Sauvegarder en localStorage //
  localStorage['restos'] = JSON.stringify(restos);

  creerListeRestosSuppression(getRestos());
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
