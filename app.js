var main = function() {
  var apiUrl = 'http://localhost:3000/api';
  getAnimals();
  function getAnimals() {
   $.ajax({
    url: apiUrl + '/animals',
    method: 'GET'
  })
   .then(function(data) {
    printTable(data);
  });
 }
 function getOneAnimal (id){
  $.ajax({
    url: apiUrl + '/animals/' + id,
    method: 'GET',
  }).then(function(data) {
    showDetails(data);
  });
}
function addAnimal(requestBody) {
  $.ajax({
    url: apiUrl + '/animals',
    method: 'POST',
    data: requestBody
  }).then(function() {
    getAnimals();
  });
}
function updateAnimal(requestBody) {
  $.ajax({
    url: apiUrl + '/animals/' + requestBody._id,
    method: 'PUT',
    data: requestBody
  }).then(function() {
    getAnimals();
  });
}
function deleteAnimal(id) {
  $.ajax({
    url:apiUrl + '/animals/' + id,
    method: 'DELETE',
  }).then(function(data){
   getAnimals();
 })
  
}
function printTable(data) {
  $('#animals').empty();
  data.forEach(function(animal,i) {
    var showDeleteButton = $('<td><button>DELETE</button></td>').click(function() {
      deleteAnimal(animal._id);
    })
    var showDetailsButton = $('<td><button>SHOW DETAILS</button></td>').click(function() {
      getOneAnimal(animal._id);
    })
    var tableRows = $('#animals').append('<tr></tr>').children();
    
    var row = tableRows[i];
    
    $(row).append('<td>' + (i+1) + 
      '</td><td class="currency">' + animal.name + 
      '</td>').append(showDetailsButton).append(showDeleteButton);
  });
}
function showDetails(animal) {
  var showInputsButton = $('<button>EDIT</button>').click(function() {
    showInputs(animal);
  });

  $('#details').empty();
  $('#details').append('<p>IMIĘ:' + animal.name + '</p>');
  $('#details').append('<p>WIEK: ' + animal.age + '</p>');
  $('#details').append('<p>WŁAŚCICIEL: ' + animal.owner + '</p>');
  $('#details').append('<p>GATUNEK: ' + animal.species + '</p>');
  $('#details').append(showInputsButton);
  
}
function showInputs(animal){
  var updateButton = $('<button>UPDATE</button>').click(function(){
    animal.name = $('#update_name').val();
    animal.age = $('#update_age').val();
    animal.species = $('#update_species').val();
    animal.owner = $('#update_owner').val();
    
    updateAnimal(animal);
  });

  var backButton = $('<button>CANCEL</button>').click(function(){
    getOneAnimal(animal._id);
  });

  $('#details').empty();
  $('#details').append('<p>IMIĘ: <input type="text" id="update_name"></p>');
  $('#details').append('<p>WIEK: <input type="number" id="update_age"></p>');
  $('#details').append('<p>WŁAŚCICIEL: <input type="text" id="update_owner"></p>');
  $('#details').append('<p>GATUNEK: <input type="text" id="update_species"></p>');
  $('#details').append(backButton);

  $('#details').append(updateButton);
  $('#update_name').val(animal.name);
  $('#update_age').val(animal.age);
  $('#update_owner').val(animal.owner);
  $('#update_species').val(animal.species);
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
$('#add_animal').click(function() {
  getInputs();
})
}
$(document).ready(main);