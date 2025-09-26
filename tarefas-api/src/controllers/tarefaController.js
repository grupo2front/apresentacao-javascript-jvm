import Tarefa from "../models/Tarefa.js";

export const criarTarefa = async (req, res) =>{
    try{
        const novaTarefa = new Tarefa(req.body);
        await novaTarefa.save();
        res.status(201).json(novaTarefa);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

export const listarTarefas = async (req, res) =>{
    try{
        const tarefas = await Tarefa.find();
        res.status(200).json(tarefas);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

export const atualizarTarefas = async (req, res) =>{
    try{
        const tarefa = await Tarefa.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(tarefa);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

export const deletarTarefa = async (req, res) =>{
    try{
        await Tarefa.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Tarefa delatada com sucesso!'});
    }catch(err){
        req.status(500).json({message: err.message});
    }
};