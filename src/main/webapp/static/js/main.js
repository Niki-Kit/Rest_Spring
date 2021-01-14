$(document).ready(function() {
    getAllPersons();
});
function getAllPersons() {
    $.ajax({
        url: 'http://localhost:8079/admin/list',
        method: "GET",
        dataType: "json",
        success: function (data) {
            let tableBody = $('#tablePerson tbody');
            tableBody.empty();
            $(data).each(function (index, element) {
                tableBody.append(
                    '<tr><td>'+element.id+'</td>' +
                    '<td>'+element.name+'</td>' +
                    '<td>'+element.age+'</td>' +
                    '<td>'+element.email+'</td>' +
                    '<td>'+element.pole+'</td>' +
                    '<td><button data-toggle="modal" onclick = "dataInModalEdit('+element.id+')" id="editModalBut" data-target=\'#editModal\' class="btn btn-primary ">Edit</button>' +
                    '<td><button data-toggle="modal" onclick = "dataInModalDelete('+element.id+')" class="btn bg-danger"  data-target=\'#myModal\'>Delete</button></td></tr>');

            })
        },
        error: function (error) {
            alert(error);
        }
    })
}
$('#butNew').click(function () {

    let sI=document.formN.pole.selectedIndex;
    let role = document.formN.pole.options[sI].text;
    let persons = {};
    persons.name = $('#nameN').val();
    persons.age = $('#ageN').val();
    persons.password = $('#passwordN').val();
    persons.email = $('#emailN').val();
    persons.pole = role;

    let json = JSON.stringify(persons)
    $.ajax({
        url: 'http://localhost:8079/admin/save',
        method: 'POST',
        data: json,
        cache: false,
        contentType: 'application/json; charset=utf-8',
        success: function () {
            alert('Saved successfully');
            getAllPersons();
            reset();

        },
        error: function (error) {
            alert(error);

        }
    });
});

function reset(){
    $('#nameN').val('');
    $('#ageN').val('');
    $('#passwordN').val('');
    $('#emailN').val('');
    $('#nameRole').val('');
}

function dataInModalEdit(id){
    $.ajax({
        url: 'http://localhost:8079/admin/'+id,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#id').val(data.id);
            $('#name').val(data.name);
            $('#age').val(data.age);
            $('#password').val(data.password);
            $('#email').val(data.email);
            $('#role').val(data.pole);
        },
        error: function (error) {
            alert(error);
        }
    })
}

function dataInModalDelete(id){
    $.ajax({
        url: 'http://localhost:8079/admin/'+id,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#idDel').val(data.id);
            $('#nameDel').val(data.name);
            $('#ageDel').val(data.age);
            $('#passwordDel').val(data.password);
            $('#emailDel').val(data.email);
            $('#roleDel').val(data.pole);
        },
        error: function (error) {
            alert(error);
        }
    })
}

$('#butSave').click(function () {

    let sI=document.formE.pole.selectedIndex;
    let role = document.formE.pole.options[sI].text;
    let persons = {};
    let id  = $('#id').val();
    persons.name = $('#name').val();
    persons.age = $('#age').val();
    persons.password = $('#password').val();
    persons.email = $('#email').val();
    persons.pole = role;
    let json = JSON.stringify(persons)
    $.ajax({
        url: 'http://localhost:8079/admin/'+id,
        method: 'PUT',
        data: json,
        cache: false,
        contentType: 'application/json; charset=utf-8',
        success: function () {
            alert('Saved successfully');
            getAllPersons();
            $('#editModal').modal('hide');
        },
        error: function (error) {
            alert(error);

        }
    });
});


$('#butDelete').click(function () {
    let id  = $('#idDel').val();
    $.ajax({
        url: 'http://localhost:8079/admin/'+id,
        method: 'DELETE',
        cache: false,
        contentType: 'application/json; charset=utf-8',
        success: function () {
            alert('Delete successfully');
            getAllPersons();
            $('#myModal').modal('hide');
        },
        error: function (error) {
            alert(error);

        }
    });
});

