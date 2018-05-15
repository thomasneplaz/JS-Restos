// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
function initialiserRestos ()
{
  var restos = [];
  // Sauvegarder en localStorage //
  localStorage['restos'] = JSON.stringify(restos);

  //alert('Initialisation OK');
}

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
}

function getRestos ()
{
  // Charger en localStorage //
  var restos = JSON.parse(localStorage['restos']);
  // Retourner la liste //
  return restos;
}

function alertRestos ()
{
  // Charger en localStorage //
  var restos = JSON.parse(localStorage['restos']);
  // Parcourir //
  restos.forEach(function(item, index, array)
  {
    alert(item);
  });
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
