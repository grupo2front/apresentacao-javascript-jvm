import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import tarefaRoutes from './routes/tarefaRoutes.js';
import cors from 'cors';

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_KEY)
    .then(() =>{console.log('Conectado ao MongoDB')})
    .catch((err) => {console.error('Não foi possivel se conectar com o MongoDB', err)});

app.use(cors());
app.use(express.json());

app.use('/tarefas', tarefaRoutes);

app.listen(port, () =>{
    console.log(`Servidor rodando em: http://localhost:${port}/tarefas`);
});