Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

Template.error.onRendered(function() { //onRendered se lanza una vez que nuestra plantilla ha sido renderizada en el navegador.
  var error = this.data; //this.data da acceso a los datos del objeto que está siendo renderizado
    
  Meteor.setTimeout(function () { // especifica una función que se ejecute después de que se expire el tiempo de espera de 3000 milisegundos.
    Errors.remove(error._id);
  }, 3000);
});