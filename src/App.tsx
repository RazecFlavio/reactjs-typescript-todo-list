import './global.css';
import css from './App.module.css';
import { Header } from './Header';
import { PlusCircle } from 'phosphor-react';
import { Empty } from './Empty';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { Task } from './Tasks';
import { v4 as uuidV4 } from 'uuid';



function App() {
  const [tasks, setTasks] = useState<{ id: string; isComplete: boolean; task: string; created_at: Date }[]>([]);
  const [newTask, setNewTask] = useState('');

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTask(event.target.value);
  }
  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Este campo é obrigatório!')
  }
  function deleteTask(id: string) {
    const newLst = tasks.filter(i => { return i.id != id });
    setTasks(newLst);
  }
  function submitTask(event: FormEvent) {
    event.preventDefault();
    const obj = {
      id: uuidV4(),
      isComplete: false,
      task: newTask,
      created_at: new Date()
    }
    setTasks([...tasks, obj]);
    setNewTask('');
  }
  function isComplete(id: string) {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isComplete: !task.isComplete }
      }
      return task;
    });
    setTasks(newTasks);
  }

  return (
    <div>
      <Header />
      <div className={css.wrapper}>
        <header>
          <form onSubmit={submitTask}>
            <input name="title" placeholder='Adicione uma nova tarefa' required
              value={newTask}
              onChange={handleNewTaskChange}
              onInvalid={handleNewTaskInvalid}
            />
            <button type='submit'>Criar <PlusCircle size={16} /></button>
          </form>
        </header>
        <main className={css.content}>
          <header>
            <div className={css.created}>
              <strong>Tarefas criadas</strong>
              <span>{tasks.length}</span> </div>
            <div className={css.total}>
              <strong>Concluídas</strong>
              {
                tasks.length <= 0 ? <span>0</span> :
                  <span>{tasks.filter(t => t.isComplete).length} de {tasks.length}</span>
              }
            </div>
          </header>
          {tasks.length <= 0 ?
            <Empty />
            :
            tasks.map(t => {
              return (
                <Task key={t.id} id={t.id} task={t.task} isComplete={t.isComplete}
                  onDeleteTask={deleteTask}
                  onIsComplete={isComplete} />
              )
            })
          }
        </main>
      </div>
    </div>
  )
}

export default App
