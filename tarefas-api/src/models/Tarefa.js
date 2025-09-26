import mongoose from "mongoose";

const tarefaSchema = new mongoose.Schema({
    titulo:{
        type: String,
        required: true,
    },
    descricao:{
        type: String,
        required: false,
    },
    concluida:{
        type: Boolean,
        default: false,
    },
    dataCriacao:{
        type: Date,
        default: Date.now,
    },
});

const Tarefa = mongoose.model('Tarefa', tarefaSchema);

export default Tarefa;