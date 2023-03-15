const { MongoClient } = require("mongodb");
const urlConexion = "mongodb://127.0.0.1:27017";
const client = new MongoClient(urlConexion);
const { ObjectId } = require("mongodb");

const http = require("http");
const url = require("url");
const fs = require("fs");

http.createServer(function(peticion, respuesta)
{
    let urlOriginal = url.parse(peticion.url, true);
    let base = urlOriginal.pathname;

    let baseDatos = "harry";
    let coleccion = "personajes";

    respuesta.setHeader('Access-Control-Allow-Origin', '*');
    respuesta.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    if (base == '/')
    {
        respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        respuesta.write("<p> ¡Hola, bienvenido a Hogwarts! </p>");
        respuesta.end();
    }
    else if(base == '/importar')
    {
        fs.readFile("harry-potter-characters.json", async function(err, datos)
        {
            if(err)
            {
                throw err;
            }

            await client.connect();
            const dbo = client.db(baseDatos);

            crearColeccion(dbo, coleccion)
            .then(console.log)
            .catch(console.error);

            insertarColeccion(dbo, coleccion, JSON.parse(datos))
            .then(console.log)
            .catch(console.error);

            respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            respuesta.write("<p> Colección creada y rellenada </p>");
            respuesta.end();
        });
    }
    else if(base == '/filtrar')
    {
        let datosPosts = "";

        peticion.on('data', function(data)
        {
            if (datosPosts.length > 1e6) // Si lo que me envian es mayor a 1M bytes, termino la respuesta
            {
                respuesta.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
                respuesta.write("La petición supera el tamaño permitido.");
                return respuesta.end(); 
            }
            else
            {
                datosPosts += data; // Los datos llegan de aparte, y se van metiendo en 'datosPosts'
            }

        }).on('end', function() // Una vez terminada la petición:
        {
            let parametros;
            let datos;

            if (peticion.method === 'GET')
            {
                datos = urlOriginal.query;
            }
            else
            {
                datos = datosPosts;
            }

            parametros = new URLSearchParams(datos); // Esto me va a permitir tomar el campo filtro en la siguiente linea
       
            let filtro = {};
            
            if(parametros.get('name') != null)
            {
                  filtro = {nombre:parametros.get('name')};
            }

            consultar(baseDatos, coleccion, filtro, respuesta)
            .then(respuesta)
            .catch(console.error)
            .finally(() => client.close());
        });
    }
    else if(base == '/humanos')
    {
        let datosPosts = "";

        peticion.on('data', function(data)
        {
            if (datosPosts.length > 1e6) // Si lo que me envian es mayor a 1M bytes, termino la respuesta
            {
                respuesta.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
                respuesta.write("La petición supera el tamaño permitido.");
                return respuesta.end(); 
            }
            else
            {
                datosPosts += data; // Los datos llegan de aparte, y se van metiendo en 'datosPosts'
            }

        }).on('end', function() // Una vez terminada la petición:
        {
            let parametros;
            let datos;

            if (peticion.method === 'GET')
            {
                datos = urlOriginal.query;
            }
            else
            {
                datos = datosPosts;
            }

            parametros = new URLSearchParams(datos); // Esto me va a permitir tomar el campo filtro en la siguiente linea
       
            let filtro = { 'species' : 'human' };

            consultar(baseDatos, coleccion, filtro, respuesta)
            .then(respuesta)
            .catch(console.error)
            .finally(() => client.close());
        });
    }
    else if(base == '/anio')
    {
        let datosPosts = "";

        peticion.on('data', function(data)
        {
            if (datosPosts.length > 1e6) // Si lo que me envian es mayor a 1M bytes, termino la respuesta
            {
                respuesta.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
                respuesta.write("La petición supera el tamaño permitido.");
                return respuesta.end(); 
            }
            else
            {
                datosPosts += data; // Los datos llegan de aparte, y se van metiendo en 'datosPosts'
            }

        }).on('end', function() // Una vez terminada la petición:
        {
            let parametros;
            let datos;

            if (peticion.method === 'GET')
            {
                datos = urlOriginal.query;
            }
            else
            {
                datos = datosPosts;
            }

            parametros = new URLSearchParams(datos); // Esto me va a permitir tomar el campo filtro en la siguiente linea
       
            let filtro = { 'yearOfBirth' : {$lt:1979} };

            consultar(baseDatos, coleccion, filtro, respuesta)
            .then(respuesta)
            .catch(console.error)
            .finally(() => client.close());
        });
    }
    else if(base == '/varita')
    {
        let datosPosts = "";

        peticion.on('data', function(data)
        {
            if (datosPosts.length > 1e6) // Si lo que me envian es mayor a 1M bytes, termino la respuesta
            {
                respuesta.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
                respuesta.write("La petición supera el tamaño permitido.");
                return respuesta.end(); 
            }
            else
            {
                datosPosts += data; // Los datos llegan de aparte, y se van metiendo en 'datosPosts'
            }

        }).on('end', function() // Una vez terminada la petición:
        {
            let parametros;
            let datos;

            if (peticion.method === 'GET')
            {
                datos = urlOriginal.query;
            }
            else
            {
                datos = datosPosts;
            }

            parametros = new URLSearchParams(datos); // Esto me va a permitir tomar el campo filtro en la siguiente linea
       
            let filtro = { 'wand.wood' : 'holly' };

            consultar(baseDatos, coleccion, filtro, respuesta)
            .then(respuesta)
            .catch(console.error)
            .finally(() => client.close());
        });
    }
    else if(base == '/vivos')
    {
        let datosPosts = "";

        peticion.on('data', function(data)
        {
            if (datosPosts.length > 1e6) // Si lo que me envian es mayor a 1M bytes, termino la respuesta
            {
                respuesta.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
                respuesta.write("La petición supera el tamaño permitido.");
                return respuesta.end(); 
            }
            else
            {
                datosPosts += data; // Los datos llegan de aparte, y se van metiendo en 'datosPosts'
            }

        }).on('end', function() // Una vez terminada la petición:
        {
            let parametros;
            let datos;

            if (peticion.method === 'GET')
            {
                datos = urlOriginal.query;
            }
            else
            {
                datos = datosPosts;
            }

            parametros = new URLSearchParams(datos); // Esto me va a permitir tomar el campo filtro en la siguiente linea
       
            let filtro = { 'alive':true, 'hogwartsStudent':true };

            consultar(baseDatos, coleccion, filtro, respuesta)
            .then(respuesta)
            .catch(console.error)
            .finally(() => client.close());
        });
    }
    else if(base == '/borrar')
    {
        let datosPosts = "";

        peticion.on('data', function(data)
        {
            if (datosPosts.length > 1e6) // Si lo que me envian es mayor a 1M bytes, termino la respuesta
            {
                respuesta.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
                respuesta.write("La petición supera el tamaño permitido.");
                return respuesta.end(); 
            }
            else
            {
                datosPosts += data; // Los datos llegan de aparte, y se van metiendo en 'datosPosts'
            }

        }).on('end', function() // Una vez terminada la petición:
        {
            let parametros;
            let datos;

            if (peticion.method === 'POST')
            {
                datos = datosPosts;
            }
            else
            {
                datos = urlOriginal.query;
            }

            parametros = new URLSearchParams(datos);

            let id = parametros.get('_id');

            let filtro = { _id: new ObjectId(id) };

            console.log(id);
            
            borrar(baseDatos, coleccion, filtro, respuesta)
            .then(respuesta)
            .catch(console.error)
            .finally(() => client.close());
        });
    }
    else if(base == '/crear')
    {
        let datosPosts = "";

        peticion.on('data', function(data)
        {
            if (datosPosts.length > 1e6) // Si lo que me envian es mayor a 1M bytes, termino la respuesta
            {
                respuesta.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' });
                respuesta.write("La petición supera el tamaño permitido.");
                return respuesta.end(); 
            }
            else
            {
                datosPosts += data; // Los datos llegan de aparte, y se van metiendo en 'datosPosts'
            }

        }).on('end', function() // Una vez terminada la petición:
        {
            let parametros;
            let datos;

            if (peticion.method === 'POST')
            {
                datos = datosPosts;
            }
            else
            {
                datos = urlOriginal.query;
            }

            parametros = new URLSearchParams(datos);

            let imagen = parametros.get('image');
            let nombre = parametros.get('name');
            let especie = parametros.get('species');
            let genero = parametros.get('gender');
            let casa = parametros.get('house');
            let anio = parametros.get('yearOfBirth');
            let ascendencia = parametros.get('ancestry');
            let ojos = parametros.get('eyeColour');
            let pelo = parametros.get('hairColour');
            let patronus = parametros.get('patronus');
            let estudiante = parametros.get('hogwartsStudent');
            let trabajador = parametros.get('hogwartsStaff');
            let varitaMaterial = parametros.get('wand[wood]');
            let varitaNucleo = parametros.get('wand[core]');
            let varitaLongitud = parametros.get('wand[length]');
            let actor = parametros.get('actor');
            let vivo = parametros.get('alive');

            let filtro = { image: imagen, name: nombre, species: especie, gender: genero, house: casa, yearOfBirt: anio,
            ancestry: ascendencia, eyeColour: ojos, hairColour: pelo, patronus: patronus, hogwartsStudent: estudiante,
            hogwartsStaff: trabajador, "wand.wood": varitaMaterial, "wand.core": varitaNucleo, "wand.length": varitaLongitud,
            actor: actor, alive: vivo};

            crear(baseDatos, coleccion, filtro, respuesta)
            .then(respuesta)
            .catch(console.error)
            .finally(() => client.close());
        });
    }
    else
    {
        respuesta.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
        respuesta.write("<h1> No hemos podido encontrar esta página </h1>");
        respuesta.end();
    }

}).listen(8090, function(err)
{
    if(err)
    {
        console.log("Error al iniciar el servidor");
    }

    console.log("Servidor ejecutándose en: 127.0.0.1:8090");
});

async function crearColeccion(dbo, coleccion)
{
    console.log("Conexión exitosa: creación");

    let crearColeccion = await dbo.createCollection(coleccion);
    console.log("Colleción creada exitosamente =>", crearColeccion.collectionName.collection);
}

async function insertarColeccion(dbo, coleccion, datos)
{
    console.log("Conexión exitosa: inserción");

    let limpiarColeccion = await dbo.collection(coleccion).deleteMany();
    console.log("Colección limpiada previamente =>", limpiarColeccion);
    let insertarColeccion = await dbo.collection(coleccion).insertMany(datos);
    console.log("Documentos insertados exitosamente =>", insertarColeccion);
}

async function consultar(baseDatos, coleccion, filtro, respuesta)
{
    await client.connect();
    console.log("Conexión correcta: consulta");
    const dbo = client.db(baseDatos);
 
    // Consultar documentos
    const findResult = await dbo.collection(coleccion).find(filtro).toArray();
    //console.log('Documentos encontrados =>', findResult);

    respuesta.end(JSON.stringify(findResult));

    return JSON.stringify(findResult);
}

async function borrar(baseDatos,coleccion,filtro,respuesta)
{
    await client.connect();
    console.log("Conexión correcta: borrar");
    const dbo = client.db(baseDatos);
 
    // Borrar documentos
    const deleteResult = await dbo.collection(coleccion).deleteOne(filtro);
    console.log('Documentos borrados =>', deleteResult.deletedCount);
    respuesta.end(JSON.stringify(deleteResult.deletedCount));
}

async function crear(baseDatos,coleccion,filtro,respuesta)
{
    await client.connect();
    console.log("Conexión correcta: crear");
    const dbo = client.db(baseDatos);
 
    // Crear personaje
    const addResult = await dbo.collection(coleccion).insertOne(filtro);
    console.log('Documentos creados =>', addResult.insertedCount);
    respuesta.end(JSON.stringify(addResult.insertedCount));
}