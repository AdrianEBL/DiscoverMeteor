Template.postsList.onRendered(function () {
  this.find('.wrapper')._uihooks = {
    insertElement: function (node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn();
    },
      
//La acción moveElement toma dos argumentos: node y next.
      // *node* es el elemento que se está moviendo a una nueva posición en el DOM.
      // *next* es el elemento que hay justo después de la nueva posición a la que estamos moviendo node.
    moveElement: function (node, next) {    
      var $node = $(node), $next = $(next);
      var oldTop = $node.offset().top;
      // offset() recupera la posición de un elemento en relación al documento, y devuelve un objeto que contiene las propiedades top y left
        
      var height = $(node).outerHeight(true);
      // outerHeight() obtenemos la altura “exterior” de un elemento (incluyendo el padding y, opcionalmente, el margin).
      // find all the elements between next and node
      var $inBetween = $(next).nextUntil(node);
      if ($inBetween.length === 0)
        $inBetween = $(node).nextUntil(next);    
      // nextUntil(node) obtenemos todos los elementos que hay después del elemento seleccionado con el node, excepto éste último
      
      // now put node in place
      $(node).insertBefore(next);
      
      // measure new top
      var newTop = $(node).offset().top;
      
      // move node *back* to where it was before
      $(node)
        .removeClass('animate')
        .css('top', oldTop - newTop);
      
      // push every other element down (or up) to put them back
      $inBetween
        .removeClass('animate')
        .css('top', oldTop < newTop ? height : -1 * height)
        
      // removeClass(class) eliminamos la clase CSS class, si está presente en el elemento.
      // force a redraw
      $(node).offset();
      
      // reset everything to 0, animated
      $(node).addClass('animate').css('top', 0);
      $inBetween.addClass('animate').css('top', 0);
      // addClass(animate) añadimos la clase animate a un elemento.
        //Para cambiar los elementos de “teletransportados” a “animados”, simplemente añadimos o quitamos la clase animate (la animación definida en el código CSS de la aplicación).
        
    },
      // se harce desaparecer los posts eliminados
    removeElement: function(node) {
      $(node).fadeOut(function() {
        $(this).remove();
      });
    }
  }
});