import express from 'express';

const port = 3000;

const app = express();

app.get('/', (req, res)=>{
    res.send('hola mundo, estoy vivo otra vez si ahora sí');
})

app.listen(port, ()=>{
    console.log(`servidor funcionando en el puerto ${port}`)
})