$(document).ready(function ()
{
    let tablaHtml;

    $("#mostrar-tabla").on('click', function (event)
    {
        event.preventDefault();

        $.ajax({
            url: 'http://127.0.0.1:8090/filtrar',
            method: 'GET',
            data: {},
            success: function (respuestaJSON)
            {
                let respuesta = JSON.parse(respuestaJSON); //Me llega en formato String, lo parseo para que quede en JSON
                tablaHtml = formatearDatos(respuesta);
                $('#tabla').html(tablaHtml);
            }
        })
    });

    $("#filtro-1").on('click', function (event)
    {
        event.preventDefault();

        $.ajax({
            url: 'http://127.0.0.1:8090/humanos',
            method: 'GET',
            data: {},
            success: function (respuestaJSON)
            {
                let respuesta = JSON.parse(respuestaJSON); //Me llega en formato String, lo parseo para que quede en JSON
                tablaHtml = formatearDatos(respuesta);
                $('#tabla').html(tablaHtml);
            }
        })
    });

    $("#filtro-2").on('click', function (event)
    {
        event.preventDefault();

        $.ajax({
            url: 'http://127.0.0.1:8090/anio',
            method: 'GET',
            data: {},
            success: function (respuestaJSON)
            {
                let respuesta = JSON.parse(respuestaJSON); //Me llega en formato String, lo parseo para que quede en JSON
                tablaHtml = formatearDatos(respuesta);
                $('#tabla').html(tablaHtml);
            }
        })
    });

    $("#filtro-3").on('click', function (event)
    {
        event.preventDefault();

        $.ajax({
            url: 'http://127.0.0.1:8090/varita',
            method: 'GET',
            data: {},
            success: function (respuestaJSON)
            {
                let respuesta = JSON.parse(respuestaJSON); //Me llega en formato String, lo parseo para que quede en JSON
                tablaHtml = formatearDatos(respuesta);
                $('#tabla').html(tablaHtml);
            }
        })
    });

    $("#filtro-4").on('click', function (event)
    {
        event.preventDefault();

        $.ajax({
            url: 'http://127.0.0.1:8090/vivos',
            method: 'GET',
            data: {},
            success: function (respuestaJSON)
            {
                let respuesta = JSON.parse(respuestaJSON); //Me llega en formato String, lo parseo para que quede en JSON
                tablaHtml = formatearDatos(respuesta);
                $('#tabla').html(tablaHtml);
            }
        })
    });

    $(document).on('click', "#borrar", function (event)
    {
        event.preventDefault();

        id = $(this).attr('datoId');

        $.ajax({
            url: 'http://127.0.0.1:8090/borrar',
            method: 'POST',
            data: { _id: id },
            success: function (respuestaJSON)
            {
                let mensaje = "";
                
                if(respuestaJSON == '0')
                {
                    mensaje = '<div class="alert alert-danger alert-dismissible" role="alert"> No se ha podido borrar el personaje. </div>';
                    $('#mensaje').html(mensaje);
                    $('.alert-dismissible').fadeTo(5000, 500).slideUp(500, function()
                    {
                        $('.alert-dismissible').slideUp(500);
                    });
                }
                else
                {   
                    $("#mostrar-tabla").click();
                    mensaje = '<div class="alert alert-danger alert-dismissible" role="alert"> El personaje ha sido borrado correctamente. </div';
                    $('#mensaje').html(mensaje);
                    $('.alert-dismissible').fadeTo(5000, 500).slideUp(500, function()
                    {
                        $('.alert-dismissible').slideUp(500);
                    });
                }
            }
        })
    });

    $("#crear").click(function (event)
    {
        event.preventDefault();

        let nuevoPersonajeImagen = $('#imagenForm').val();
        let nuevoPersonajeNombre = $('#nombreForm').val();
        let nuevoPersonajeEspecie = $('#especieForm').val();
        let nuevoPersonajeGenero = $('#generoForm').val();
        let nuevoPersonajeCasa = $('#casaForm').val();
        let nuevoPersonajeAnio = $('#anioForm').val();
        let nuevoPersonajeAscendencia = $('#ascendenciaForm').val();
        let nuevoPersonajeOjos = $('#ojosForm').val();
        let nuevoPersonajePelo = $('#peloForm').val();
        let nuevoPersonajePatronus = $('#patronusForm').val();
        let nuevoPersonajeEstudiante = $('#estudianteForm').val();
        let nuevoPersonajeTrabajador = $('#trabajadorForm').val();
        let nuevoPersonajeVaritaMaterial = $('#varitaMaterialForm').val();
        let nuevoPersonajeVaritaNucleo = $('#varitaNucleoForm').val();
        let nuevoPersonajeVaritaLongitud = $('#varitaLongitudForm').val();
        let nuevoPersonajeActor = $('#actorForm').val();
        let nuevoPersonajeVivo = $('#vivoForm').val();

        $.ajax({
            url: 'http://127.0.0.1:8090/crear',
            method: 'POST',
            data:
            {
                image: nuevoPersonajeImagen, name: nuevoPersonajeNombre, species: nuevoPersonajeEspecie,
                gender: nuevoPersonajeGenero, house: nuevoPersonajeCasa, yearOfBirth: nuevoPersonajeAnio,
                ancestry: nuevoPersonajeAscendencia, eyeColour: nuevoPersonajeOjos, hairColour: nuevoPersonajePelo,
                patronus: nuevoPersonajePatronus, hogwartsStudent: nuevoPersonajeEstudiante, hogwartsStaff: nuevoPersonajeTrabajador,
                "wand[wood]": nuevoPersonajeVaritaMaterial, "wand[core]": nuevoPersonajeVaritaNucleo, "[wand.length]": nuevoPersonajeVaritaLongitud,
                actor: nuevoPersonajeActor, alive: nuevoPersonajeVivo
            },
            success: function (respuesta)
            {
                let mensaje = "";

                if(respuesta == '0')
                {
                    mensaje = '<div class="alert alert-danger alert-dismissible" role="alert"> No se ha podido crear el personaje. </div>';
                    $('#mensaje').html(mensaje);
                    $('.alert-dismissible').fadeTo(5000, 500).slideUp(500, function()
                    {
                        $('.alert-dismissible').slideUp(500);
                    });
                }
                else
                {
                    $("#mostrar-tabla").click();
                    mensaje = '<div class="alert alert-success alert-dismissible" role="alert"> El personaje ha sido creado correctamente. </div';
                    $('#mensaje').html(mensaje);
                    $('.alert-dismissible').fadeTo(5000, 500).slideUp(500, function()
                    {
                        $('.alert-dismissible').slideUp(500);
                    });
                }
            }
        });
    });
});

function formatearDatos(respuesta)
{
    let contenido = "<table border='1' style='border-collapse:collapse;'>";
    contenido += "<tr><th>Imagen</th><th>Nombre</th><th>Especie</th><th>Género</th><th>Casa</th><th>Año de nacimiento</th></tr>";

    $.each(respuesta, function ()
    {
        let imagenPersonaje = "";

        if (this.image != null)
        {
            imagenPersonaje = this.image;
        }

        let nombrePersonaje = "";

        if (this.name != null)
        {
            nombrePersonaje = this.name;
        }

        let especiePersonaje = "";

        if (this.species != null)
        {
            especiePersonaje = this.species;
        }

        let generoPersonaje = "";

        if (this.gender != null)
        {
            generoPersonaje = this.gender;
        }

        let casaPersonaje = "";

        if (this.house != null)
        {
            casaPersonaje = this.house;
        }

        let anioNacimientoPersonaje = "";

        if (this.yearOfBirth != null)
        {
            anioNacimientoPersonaje = this.yearOfBirth;
        }

        let id = 0;

        if(this._id != null)
        {
            id = this._id;
        }

        contenido += '<tr><td><img src="' + imagenPersonaje + '" width="100" height="130"></td><td>"' + nombrePersonaje + "</td><td>"
        + especiePersonaje + "</td><td>" + generoPersonaje + "</td><td>" + casaPersonaje + "</td><td>"
        + anioNacimientoPersonaje + "</td><td><button id='borrar' datoId='" + id + "'> Borrar </button></td></tr>";
    });

    contenido += "</table>";

    return contenido;
}