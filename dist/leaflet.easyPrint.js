L.Control.EasyPrint = L.Control.extend({
  options: {
    title: 'Print map',
    position: 'topleft'
  },
  
  onAdd: function () {
    var container = getContainter(this.options, L);
    this.link = getPrintLink(this.options, container);
    
    L.DomEvent.addListener(this.link, 'click', printPage, this.options);
    
    return container;
  }
  
});

L.easyPrint = function(options) {
  return new L.Control.EasyPrint(options);
};

function printPage () {
  
  if (this.elementsToHide) {
    var htmlElementsToHide = document.querySelectorAll(this.elementsToHide);
    
    for (var i = 0; i < htmlElementsToHide.length; i++) {
      htmlElementsToHide[i].className = htmlElementsToHide[i].className + ' _epHidden';
    }
  }
  window.print();
  
  if (this.elementsToHide){
    var htmlElementsToHide = document.querySelectorAll(this.elementsToHide);
    
    for (var i = 0; i < htmlElementsToHide.length; i++) {
      htmlElementsToHide[i].className = htmlElementsToHide[i].className.replace(' _epHidden','');
    }
  }
}

function getContainter (options, L) {
  var container;
  var element = options.controlElement ? options.controlElement : 'div';
  var elementClasses = options.controlElementClasses ? options.controlElementClasses : 'leaflet-control-easyPrint leaflet-bar leaflet-control';
  try {
    container = L.DomUtil.create(element, elementClasses);
  } catch(e) {
    container = L.DomUtil.create('div', elementClasses);
  }
  return container
}

function getPrintLink (options, container) {
  var linkClasses = options.linkClasses ? options.linkClasses : 'leaflet-control-easyPrint-button leaflet-bar-part';
  var link = L.DomUtil.create('a', linkClasses, container);
  link.id = options.linkId ? options.linkId : 'leafletEasyPrint';
  link.title = options.title;
  return link
}