

import { notesService } from '../services/notes-service.js'

export class NoteTodos extends React.Component {

    state = {
        label: '',
        todos: []
    }

    componentDidMount() {
        let { info: { todos, label } } = this.props.note
        if (!label) label = 'Todos'
        this.setState({ todos: todos, label: label })
    }

    getCurrTime = (doneAt) => {
        return new Date(doneAt).toLocaleString('en-US', { hour12: false })
    }

    onRemoveTodo = (todo) => {
        if (!this.state.todos) return
        const { note, loadNote } = this.props
        notesService.removeTodo(note, todo).then((newTodos) => {
            this.setState({ todos: newTodos }, () => loadNote())
        })
    }

    handleChange = (ev, todo) => {
        const { value } = ev.target
        const { todos } = this.state
        const currTodoIdx = todos.indexOf(todo)
        todos[currTodoIdx].txt = value
        this.setState({ todos: todos })
    }

    saveChanges = () => {
        const { note, loadNote } = this.props
        const { todos } = this.state
        notesService.updateTodos(note, todos).then(() => loadNote())
    }

    render() {
        const { label, todos } = this.state
        return (
            <div className="todos-container">
                { todos.length ? <h2>{label}</h2> : <h2>No todos</h2>}
                <ul className="clean-list">
                    {todos.map(todo => {
                        if (todo.doneAt) {
                            return <li key={todo.id}>
                                <i className="fas fa-check-circle"></i>
                                <textarea spellCheck="false" value={todo.txt} readOnly>
                                </textarea >
                                <span>{this.getCurrTime(todo.doneAt)}</span>
                                <button onClick={() => this.onRemoveTodo(todo)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </li>
                        } else {
                            return <li key={todo.id}>
                                <i onClick={() => done} className="fas fa-circle"></i>
                                <textarea spellCheck="false" value={todo.txt} onBlur={this.saveChanges} onChange={(ev) => this.handleChange(ev, todo)}>
                                </textarea >
                                <button onClick={() => this.onRemoveTodo(todo)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </li>
                        }
                    })}
                </ul>
            </div>
        )
    }
}