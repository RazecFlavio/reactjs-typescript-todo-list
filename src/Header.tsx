import todoLogo from './assets/todo_logo.svg';
import css from './Header.module.css';

export function Header() {
    return (
        <header className={css.header}>
            <img src={todoLogo} />
        </header>
    )
}