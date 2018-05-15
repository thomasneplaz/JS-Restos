// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let ViewHelper = new viewHelper();

document.querySelector('aside ul').addEventListener('click',function(el)
{
  // If el.target is a li, do something //
  if(el.target.nodeName == 'LI')
  {
    // Parcourir //
    restosVenantDeLocalStorage.forEach(function(item, index, array)
    {
      //console.log(item, index);
      alert(item);
    });

    ViewHelper.showTab(el.target);
  }
})
