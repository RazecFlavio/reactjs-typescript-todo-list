import css from './Empty.module.css';
import imgClipboard from './assets/ImgClipboard.svg';

export function Empty() {
    return (
        <div className={css.emptyTasks}>
            <img src={imgClipboard} />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span> Crie tarefas e organize seus itens a fazer</span>
        </div>
    )
}