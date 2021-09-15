import { useState } from 'react';

import deleteIcon from './assets/delete.svg';

let id = 1;

function ChecklistItem(props) {
  return (
    <div className="checklist__item">
      <h2 className="checklist__task" onClick={() => props.handleComplete(props.id)} style={{ textDecoration: props.completa ? 'line-through' : '' }}>{props.children}</h2>
      <img className="checklist__delete-icon" src={deleteIcon} alt="Deletar" onClick={() => props.handleDelete(props.id)} />
    </div>
  );
}

function App() {
  const [tarefas, setTarefas] = useState([]);

  function handleKeyDown(event) {
    if (event.key !== 'Enter' || event.target.value === '') return;

    const novasTarefas = [...tarefas, { id: id++, texto: event.target.value, completa: false }];

    setTarefas(novasTarefas);

    event.target.value = "";
  }

  function handleComplete(id) {
    const novasTarefas = [...tarefas];
    const tarefaCompletada = novasTarefas.find(tarefa => tarefa.id === id);

    tarefaCompletada.completa = !tarefaCompletada.completa;

    setTarefas(novasTarefas);
  }

  function handleDelete(id) {
    const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);

    setTarefas(novasTarefas);
  }

  function handleMostrarTodas() {
    const filters = document.querySelector('.checklist__filters');
    const checklistItem = document.querySelectorAll('.checklist__item');


    checklistItem.forEach(item => item.classList.remove('hidden'));

    filters.children[0].classList.add('color--blue');
    filters.children[1].classList.remove('color--blue');
    filters.children[2].classList.remove('color--blue');
  }

  function handleMostrarAtivas() {
    const filters = document.querySelector('.checklist__filters');
    const checklistItem = document.querySelectorAll('.checklist__item');
    const novasTarefas = [...tarefas];

    for (let i = 0; i < checklistItem.length; i++) {
      if (novasTarefas[i].completa) {
        checklistItem[i].classList.add('hidden');
      } else {
        checklistItem[i].classList.remove('hidden');
      }
    }

    filters.children[0].classList.remove('color--blue');
    filters.children[1].classList.add('color--blue');
    filters.children[2].classList.remove('color--blue');
  }

  function handleMostrarCompletado() {
    const filters = document.querySelector('.checklist__filters');
    const checklistItem = document.querySelectorAll('.checklist__item');
    const novasTarefas = [...tarefas];

    for (let i = 0; i < checklistItem.length; i++) {
      if (!novasTarefas[i].completa) {
        checklistItem[i].classList.add('hidden');
      } else {
        checklistItem[i].classList.remove('hidden');
      }
    }

    filters.children[0].classList.remove('color--blue');
    filters.children[1].classList.remove('color--blue');
    filters.children[2].classList.add('color--blue');
  }

  function handleLimparCompletados() {
    const novasTarefas = tarefas.filter(tarefa => !tarefa.completa);

    setTarefas(novasTarefas);
  }

  return (
    <div className="App">
      <div className="checklist">
        <h1 className="checklist__title">TAREFAS</h1>
        <input className="checklist__input" type="text" placeholder="Criar uma nova tarefa" onKeyDown={handleKeyDown} />
        <div className={`checklist__items ${tarefas.length === 0 ? 'hidden' : ''}`}>
          {tarefas.map(tarefa => <ChecklistItem key={tarefa.id} id={tarefa.id} completa={tarefa.completa} handleComplete={handleComplete} handleDelete={handleDelete}>{tarefa.texto}</ChecklistItem>)}
          <div className="checklist__menu">
            <span className="checklist__option">{tarefas.length} items restantes</span>
            <div className="checklist__filters">
              <span className="checklist__option color--blue" onClick={handleMostrarTodas}>Todas</span>
              <span className="checklist__option" onClick={handleMostrarAtivas}>Ativas</span>
              <span className="checklist__option" onClick={handleMostrarCompletado}>Completada</span>
            </div>
            <span className="checklist__option" onClick={handleLimparCompletados}>Limpar Completadas</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;