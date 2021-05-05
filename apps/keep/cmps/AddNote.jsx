import { notesService } from '../services/notes-service.js'
export class AddNote extends React.Component {

    state = {
        noteType: 'NoteText',
        txtInput: '',
        noteInfo: {
            txt: '',
            url: '',
            title: '',
            label: '',
            todos: []
        }
    }

    componentDidMount() {

    }

    getPlaceholder = (noteType) => {
        switch (noteType) {
            case 'NoteText':
                return 'What\'s on your mind...'
            case 'NoteImg':
                return 'Enter image URL...'
            case 'NoteTodos':
                return 'Enter comma separated list...'
        }
    }

    checkIfValid = (noteType, txtInput) => {
        const urlRegTest = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g
        const notesRegTest = /([a-z].)+,/i
        switch (noteType) {
            case 'NoteImg':
                return urlRegTest.test(txtInput)
            case 'NoteTodos':
                return notesRegTest.test(txtInput)
        }
    }

    handleChange = (ev) => {
        const value = ev.target.value
        this.setState({ txtInput: value })
    }

    onSelectType = (type) => {
        this.setState({ noteType: type })
    }

    onAddNote = (ev) => {
        ev.preventDefault()
        let { noteType, txtInput, noteInfo } = this.state
        if (!this.checkIfValid(noteType, txtInput)) return
        if (noteType === 'NoteImg') {
            this.setState({ noteInfo: { ...noteInfo, url: txtInput } }, () => {
                notesService.createNote(noteType, this.state.noteInfo).then(() => {
                    console.log('Note img add')
                    this.resetState()
                })
            })
        } else if (noteType === 'NoteTodos') {
            txtInput.charAt(txtInput.length - 1) === ',' ? txtInput = txtInput.substring(0, txtInput.length - 1) : txtInput
            let todos = txtInput.split(',')
            todos = todos.map(todo => ({ txt: todo, doneAt: null }))
            this.setState({ noteInfo: { ...noteInfo, todos: todos } }, () => {
                notesService.createNote(noteType, this.state.noteInfo).then(() => {
                    console.log('Note todos add')
                    this.resetState()
                })
            })
        } else {
            this.setState({ noteInfo: { ...noteInfo, txt: txtInput } }, () => {
                notesService.createNote(noteType, this.state.noteInfo).then(() => {
                    console.log('Note txt add')
                    this.resetState()
                })
            })
        }
    }

    resetState = () => {
        this.setState({
            noteType: 'NoteText',
            txtInput: '',
            noteInfo: {
                txt: '',
                url: '',
                title: '',
                label: '',
                todos: []
            }
        })
    }

    render() {
        const { noteType, txtInput } = this.state
        return (
            <div className="add-note">
                <form onSubmit={this.onAddNote}>
                    <label htmlFor="add-note"></label>
                    <input type="text" name="txtInput" placeholder={this.getPlaceholder(noteType)} value={txtInput} id="add-note" onChange={this.handleChange} />
                    <button><i className="fas fa-plus"></i></button>
                </form>
                <i onClick={() => this.onSelectType('NoteText')} className={`fas fa-font ${noteType === 'NoteText' ? 'active-type' : ''} `}></i>
                <i onClick={() => this.onSelectType('NoteImg')} className={`far fa-image ${noteType === 'NoteImg' ? 'active-type' : ''}`}></i>
                <i onClick={() => this.onSelectType('NoteTodos')} className={`fas fa-list-ul ${noteType === 'NoteTodos' ? 'active-type' : ''}`}></i>
            </div>
        )


    }
}
