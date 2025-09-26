import express from 'express';
import { criarTarefa, listarTarefas, atualizarTarefas, deletarTarefa } from '../controllers/tarefaController.js';

const router = express.Router();

router.post('/', criarTarefa);
router.get('/', listarTarefas);
router.put('/:id', atualizarTarefas);
router.delete('/:id', deletarTarefa);

export default router;