// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let viewHelper = new ViewHelper();

document.querySelector('aside ul').addEventListener('click', function(el) {
    //If el.target is a li do somathing
    if(ek.target.nodeName == 'LI') {
        ViewHelper.showTab(el.target);
    }
})
