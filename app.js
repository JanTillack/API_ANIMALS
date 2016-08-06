var main = function() {
    var apiUrl = 'http://localhost:3000/api';
    getAnimals();
    function getAnimals() {
        $.ajax({
            url: apiUrl + '/animals',
            method: 'GET',
        }).then(function(data) {
            printTable(data);
        });
    }
    function getOneAnimal(id) {
        $.ajax({
            url: apiUrl + '/animals/' + id,
            method: 'GET',
        }).then(function(data) {
            showDetails(data);
        });
    }
    function addAnimal(requestBody) {
        $.ajax({
            url: apiUrl + '/animals' ,
            method: 'POST',
            data: requestBody
        }).then(function() {
            getAnimals();
        });
    }


    function deleteAnimal(id) {
        $.ajax({
            url: apiUrl + '/animals/' +  id,
            method: 'DELETE',
        }).then(function(data) {
            getAnimals();
        });
    }

    function printTable(animals) {
        $('#animals').empty();
        animals.forEach(function(animal) {
            var showDetailsButton = $('<button>SHOW DETAILS</button>').click(function(){
                getOneAnimal(animal._id);
            });
            var deleteButton = $('<button>DELETE ANIMAL</button>').click(function(){
                deleteAnimal(animal._id);
                });

            
            $('#animals').append('<tr><td class="name">' + animal.name + 
                '</td><td class="species">' + animal.species + '</td>' +
                '</tr>').append(showDetailsButton).append(deleteButton);
        });
    }
    
    function showDetails(animal) {
        $('#details').text('IMIĘ: ' + animal.name + ' WŁAŚCICIEL: ' + animal.owner + ' WIEK: ' +
            animal.age + ' GATUNEK: ' + animal.species);
    }

    
    
    function getInputs () {
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