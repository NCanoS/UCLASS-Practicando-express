const express = require('express'); 
const app = express(); 
const port = 3000; 

app.use(express.json());

app.listen(port, () => {
    console.log('Servidor funcionando en el puerto: ' + port);
})

let libros = [
    {
        id: 1,
        titulo: "La rueda del tiempo: El ojo del mundo",
        autor: 'Robert Jordan',
        publicacion: "1990",
        genero: "Novela",
        subgenero: "Alta fantasía"
    },
    {
        id: 2,
        titulo: "La rueda del tiempo: La gran caceria",
        autor: 'Robert Jordan',
        publicacion: "1990",
        genero: "Novela",
        subgenero: "Alta fantasía"
    },
    {
        id: 3,
        titulo: "No tengo boca y debo gritar",
        autor: 'Harlan Ellison',
        publicacion: "1967",
        genero: "Cuento",
        subgenero: "Ciencia Ficcion"
    }
]

app.get('/libro/all',(req,res)=>{
    res
        .status(200)
        .json({
            mensaje: 'Todos los libros obtenidos correctamente',
            libros: libros
        })
        .send();
})

app.get('/libro/:id',(req,res)=>{
    res
        .status(200)
        .json({
            mensaje: 'Libro obtenido correctamente',
            libro: libros.find(libro => libro.id == req.params.id)
        })
        .send();
})

app.post('/libro',(req,res)=>{
    const { id, titulo, autor, publicacion, genero, subgenero } = req.body; 
    
    libros.push({
        id: id,
        titulo: titulo,
        autor: autor,
        publicacion: publicacion,
        genero: genero,
        subgenero: subgenero
    })

    res
        .status(201)
        .json({
            mensaje: 'Agregado correctamente',
            libros: libros
        })
})

app.put('/libro/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autor, publicacion, genero, subgenero } = req.body;

    const auxLibros = libros.filter(libro => libro.id !== Number(id));

    auxLibros.push({
        id: Number(id),
        titulo: titulo,
        autor: autor,
        publicacion: publicacion,
        genero: genero,
        subgenero: subgenero
    })

    libros = auxLibros;

    res
        .status(200)
        .json({
            mensaje: "Libro actualizado",
            libros: libros
        })
        .send()
})

app.delete('/libro/:id', (req, res) => {
    const { id } = req.params;
    libros = libros.filter(libro => libro.id !== Number(id));
    res
        .status(200)
        .json({
            mensaje: "Libro eliminado",
            libros: libros
        })
        .send()
})