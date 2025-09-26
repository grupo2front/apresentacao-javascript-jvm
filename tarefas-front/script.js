document.addEventListener('DOMContentLoaded', () =>{
    const formTarefa = document.getElementById('form-tarefa');
    const inputTitulo = document.getElementById('input-titulo');
    const inputDescricao = document.getElementById('input-descricao');
    const listaTarefas = document.getElementById('lista-tarefas');

    const API_URL = 'http://localhost:3000/tarefas';

    async function fetchTarefas() {
        try{
            const response = await fetch(API_URL);
            const tarefas = await response.json();
            listaTarefas.innerHTML = '';
            tarefas.forEach(renderizarTarefa);
        }catch(err){
            console.error('Erro ao buscar Tarefas:', err);
        }
    }

    function renderizarTarefa(tarefa){
        const li = document.createElement('li');
        li.id = tarefa._id;
        if (tarefa.concluida){
            li.classList.add('concluida');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.concluida;
        checkbox.addEventListener('change', async () =>{
            try{
                await fetch(`${API_URL}/${tarefa._id}`,{
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({concluida: checkbox.checked}),
                });
                li.classList.toggle('concluida', checkbox.checked);
            }catch(err){
                console.error('Erro ao atualizar tarefa:', err);
            }
        });

        const divText = document.createElement('div');
        const spanTitulo = document.createElement('span');
        spanTitulo.textContent = tarefa.titulo;
        spanTitulo.className = 'titulo-tarefa';
        divText.appendChild(spanTitulo);

        if(tarefa.descricao){
            const pDescricao = document.createElement('p');
            pDescricao.textContent = tarefa.descricao;
            pDescricao.className = 'descricao-tarefa';
            divText.appendChild(pDescricao);
        }

        const btnDeletar = document.createElement('button');
        btnDeletar.textContent = 'Excluir';
        btnDeletar.addEventListener('click', async () =>{
            try{
                await fetch(`${API_URL}/${tarefa._id}`, {method: 'DELETE'});
                li.remove();
            }catch(err){
                console.error('Erro ao deletar tarefa:', err);
            }
        });

        li.appendChild(checkbox);
        li.appendChild(divText);
        li.appendChild(btnDeletar);
        listaTarefas.appendChild(li);
    }

    async function handleFormSubmmit(event) {
        event.preventDefault();

        const titulo = inputTitulo.value;
        const descricao = inputDescricao.value;
        if(!titulo) return;

        try{
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({titulo, descricao}),
            });

            const novaTarefa = await response.json();

            renderizarTarefa(novaTarefa);
            inputTitulo.value = '';
            inputDescricao.value = '';
        }catch(err){
            console.error('Erro ao criar tarefa:', err);
        }
    }

    formTarefa.addEventListener('submit', handleFormSubmmit);

    fetchTarefas();
});