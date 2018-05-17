function viewHelper() {
    this.animateTab = function() {
        debugger;
    }
    this.showTab = function(tab) {
        let tabName = tab.dataset.link;
        let sections = document.querySelectorAll('[data-view]');
        for (var i = 0; i < sections.length; i++){
            sections[i].classList.add('hidden');
        }
        document.querySelector('[data-view="' + tabName + '"]').classList.remove('hidden');
    }
}

function viewGestion() {
    this.animateTab = function() {
        debugger;
    }
    this.showTab = function(tab) {
        let tabName = tab.dataset.link;
        let sections = document.querySelectorAll('[data-form]');
        for (var i = 0; i < sections.length; i++){
            sections[i].classList.add('hidden');
        }
        document.querySelector('[data-form="' + tabName + '"]').classList.remove('hidden');
    }
}
