import { Trash } from 'phosphor-react';
import css from './Tasks.module.css';

interface ITaskProps {
    id: string;
    task: string,
    isComplete: boolean;
    onDeleteTask: (id: string) => void;
    onIsComplete: (id: string) => void;
}
export function Task({ id, task, isComplete, onDeleteTask, onIsComplete }: ITaskProps) {
    function handleDeleteTask() {
        onDeleteTask(id);
    }
    function handleIsCompleteTaskChange() {
        onIsComplete(id);
    }
    return (
        <div className={css.task}>
            <input type="checkbox" defaultChecked={isComplete} onChange={handleIsCompleteTaskChange} />
            <p className={isComplete ? css.taskChecked : ''}>{task}</p>
            <button onClick={handleDeleteTask}><Trash /> </button>
        </div>
    )
}