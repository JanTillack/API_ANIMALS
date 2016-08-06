var main = function() {
    var apiUrl = 'http://localhost:3000/api';

    getAnimals();

    function getAnimals() {
        $.ajax({
          url: apiUrl + '/animals',
          method: 'GET',
      }).then(function(data) {
        printTable(data);
        console.log(data);
    });

  }
 
  function addAnimal(requestBody){
    $('#animals').empty();
    $.ajax({
          url: apiUrl + '/animals',
          method: 'POST',
          data:requestBody
      }).then(function(data) {
        getAnimals();
    });
  }

  function printTable(animals) {

    for(var i = 0; i<animals.length; i++){
        $('#animals').append('<tr><td>' + (i+1) + '</td><td>' + 
            animals[i].name + '</td><td>' + animals[i].species +
            '</td><td>' + animals[i].age + '</td><td>' + animals[i].owner + '</td></tr>')
    }
}

function getInputs() {
    var animal = {
        name: $('#name').val(),
        age: $('#age').val(),
        species: $('#species').val(),
        owner: $('#owner').val()
    }
    addAnimal(animal);
}

$('#add_animal').click(function(){
    getInputs();
})
}

$(document).ready(main);


