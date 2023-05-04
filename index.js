const express = require('express'); //imports sin configuracion
const app = express(); //inicializar express
const port = 3000; //declarar el puerto

app.use(express.json()); //para poder recibir info desde el req


//servidor
app.listen(port, () => {
    console.log('Servidor funcionando en el puerto: ' + port);
})

/*
//read
// / es la ruta
// req = request que recibimos del front
// res = response, lo que mandamos del back
app.get('/', (req,res)=>{
    res.send('Hola Mundo');
})
*/

let  platillos = [ // corchetes = arreglos
    { // llaves = json/objetos
        // key = variable:value = valor
        id: 1,
        nombre: "Enchiladas Suizas",
        descripcion: 'Deliciosas enchiladas suizas hechas en casa',
        precio: 125.50
    },
    {
        id: 2,
        nombre: "Chilaquiles",
        descripcion: 'Deliciosas chilaquiles al gusto',
        precio: 80
    },
]

app.get('/platillo/all',(req,res)=>{
    res
        .status(200)
        .json({
            mensaje: 'Todos los platillos obtenidos correctamente',
            platillos: platillos
        })
        .send();
})

app.get('/platillo/:id',(req,res)=>{
    res
        .status(200)
        .json({
            mensaje: 'Todos los platillos obtenidos correctamente',
            platillo: platillos.find(platillo => platillo.id == req.params.id)
        })
        .send();
})

app.post('/platillo',(req,res)=>{
    const { id, nombre, descripcion, precio } = req.body; //destructuracion del body
                            //extraer toda la info de un json/objeto
    platillos.push({
        id:id,
        nombre:nombre,
        descripcion:descripcion,
        precio:precio
    })

    res
        .status(201)
        .json({
            mensaje: 'Agregado correctamente',
            platillos: platillos
        })
})

app.put('/platillo/:id', (req,res) =>{
    const { id } = req.params;
    const {nombre, descripcion, precio} = req.body;

    //trae todos los elementos diferentes al id que se recibe de req
    //de esta manera no se muestra al usuario
    const auxPlatillos = platillos.filter(platillo => platillo.id !== Number(id));

    auxPlatillos.push({
        id: id,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio
    })

    platillos = auxPlatillos;
    res
        .status(200)
        .json({
            mensaje: 'Actualizado correctamente',
            platillos: platillos
        })
        .send()
})

app.delete('/platillo/:id', (req, res) => {
    const { id } = req.params;
    platillos = platillos.filter(platillo => platillo.id !== Number(id));
    res
        .status(200)
        .json({
            mensaje: 'Eliminados correctamente',
            platillos: platillos
        })
        .send()
})