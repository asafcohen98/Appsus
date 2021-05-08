
import { notesService } from '../services/notes-service.js'
import { eventBusService } from '../../../services/event-bus-service.js'

export class NoteTodos extends React.Component {

    state = {
        label: '',
        todos: []
    }

    componentDidMount() {
        const { note } = this.props
        let { info: { todos, label } } = this.props.note
        if (!label) {
            label = `Created at: ${this.getCurrTime(new Date())}`
            notesService.updateNoteLabel(note, label).then(newLabel => {
                this.setState({ todos, label: newLabel })
            })
        } else {
            this.setState({ todos, label, })
        }
    }

    getCurrTime = (doneAt) => {
        const date = new Date(doneAt).toLocaleString('en-US', { hour12: false })
        return date.split(',')
    }

    onRemoveTodo = (todo) => {
        if (!this.state.todos) return
        const { note, loadNote } = this.props
        notesService.removeTodo(note, todo).then(newTodos => {
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
        notesService.updateTodos(note, todos).then(() =>{
            loadNote()
            const savedMsg = 'Your changes have been saved!'
            eventBusService.showUserMsg(savedMsg,'save')
        })       
    }

    toggleDoneTodo = (todo) => {
        if (!todo.txt) return
        const { note, loadNote } = this.props
        const { todos } = this.state
        notesService.updateDoneTodo(note, todo).then(newTodos => {
            this.setState({ todos: newTodos }, () => loadNote())
        })
    }

    onAddTodo = () => {
        const { note, loadNote } = this.props
        const { todos } = this.state
        notesService.addTodo(note).then(todos => {
            this.setState({ todos: todos }, () => loadNote())
        })
    }

    render() {
        const { label, todos } = this.state
        return (
            <div className="todos-container">
                <div className="todos-title">
                    <button className="fas fa-plus-circle clean-btn " onClick={() => this.onAddTodo()}></button>
                    {todos.length ? <h2>{label}</h2> : <h2>No todos</h2>}
                </div>
                <ul className="clean-list">
                    {todos.map(todo => {
                        if (todo.doneAt) {
                            return <li key={todo.id}>
                                <button onClick={() => this.toggleDoneTodo(todo)} className="fas fa-check-circle clean-btn"></button>
                                <textarea className="text-muted" spellCheck="false" value={todo.txt} readOnly>
                                </textarea >
                                <div className="todo-done-at">
                                    <span>{this.getCurrTime(todo.doneAt)[0]}</span>
                                    <span>{this.getCurrTime(todo.doneAt)[1]}</span>
                                </div>
                                <button onClick={() => this.onRemoveTodo(todo)} className="fas fa-trash clean-btn"></button>
                            </li>
                        } else {
                            return <li key={todo.id}>
                                <button onClick={() => this.toggleDoneTodo(todo)} className="fas fa-circle clean-btn"></button>
                                <textarea spellCheck="false" value={todo.txt} onBlur={this.saveChanges} onChange={(ev) => this.handleChange(ev, todo)}>
                                </textarea >
                                <button onClick={() => this.onRemoveTodo(todo)} className="fas fa-trash clean-btn"></button>
                            </li>
                        }
                    })}
                </ul>
            </div>
        )
    }
}