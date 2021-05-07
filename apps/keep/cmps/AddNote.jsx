import { notesService } from '../services/notes-service.js'
import { utilsService } from '../../../services/utils-service.js'
export class AddNote extends React.Component {

    state = {
        noteType: 'NoteText',
        txtInput: '',
        noteInfo: {
            txt: '',
            url: '',
            ytId: '',
            title: '',
            label: '',
            todos: []
        }
    }

    componentDidMount() {
        if (!this.state.noteTxt) this.inputRef.current.focus()
    }

    inputRef = React.createRef()

    getPlaceholder = (noteType) => {
        switch (noteType) {
            case 'NoteText':
                return 'What\'s on your mind...'
            case 'NoteImg':
                return 'Enter image URL...'
            case 'NoteTodos':
                return 'Enter comma separated list...'
            case 'NoteVideo':
                return 'Enter youtube URL...'
        }
    }

    checkIfValid = (noteType, txtInput) => {
        const urlRegTest = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g
        const notesRegTest = /([a-z].)+,/i
        switch (noteType) {
            case 'NoteImg':
                return urlRegTest.test(txtInput)
            case 'NoteVideo':
                return urlRegTest.test(txtInput)
            case 'NoteTodos':
                return notesRegTest.test(txtInput)
            default: return true
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
        const { loadNotes } = this.props
        if (!this.checkIfValid(noteType, txtInput)) return
        if (noteType === 'NoteImg') {
            this.setState({ noteInfo: { ...noteInfo, url: txtInput } }, () => {
                notesService.createNote(noteType, this.state.noteInfo).then(() => {
                    // this.resetState()
                    loadNotes()
                })
            })
        } else if (noteType === 'NoteTodos') {
            txtInput.charAt(txtInput.length - 1) === ',' ? txtInput = txtInput.substring(0, txtInput.length - 1) : txtInput
            let todos = txtInput.split(',')
            todos = todos.map(todo => ({ id: utilsService.makeId(), txt: todo, doneAt: null }))
            this.setState({ noteInfo: { ...noteInfo, todos: todos } }, () => {
                notesService.createNote(noteType, this.state.noteInfo).then(() => {
                    this.resetState()
                    loadNotes()
                })
            })
        } else if (noteType === 'NoteVideo') {
            const ytRegex = "^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?\.com|youtu\.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)";
            const ytUrl = txtInput.match(ytRegex)
            // take the yt id 
            this.setState({ noteInfo: { ...noteInfo, ytId: ytUrl[1] } }, () => {
                notesService.createNote(noteType, this.state.noteInfo).then(() => {
                    this.resetState()
                    loadNotes()
                })
            })
        } else {
            this.setState({ noteInfo: { ...noteInfo, txt: txtInput } }, () => {
                notesService.createNote(noteType, this.state.noteInfo).then(() => {
                    this.resetState()
                    loadNotes()
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
                    <input ref={this.inputRef} type="text" name="txtInput" placeholder={this.getPlaceholder(noteType)} value={txtInput} id="add-note" onChange={this.handleChange} />
                    <button><i className="fas fa-plus-circle"></i></button>
                </form>
                <div className="note-type-container">
                <i onClick={() => this.onSelectType('NoteText')} className={`fas fa-font ${noteType === 'NoteText' ? 'active-type' : ''} `}></i>
                <i onClick={() => this.onSelectType('NoteImg')} className={`far fa-image ${noteType === 'NoteImg' ? 'active-type' : ''}`}></i>
                <i onClick={() => this.onSelectType('NoteVideo')} className={`fab fa-youtube ${noteType === 'NoteVideo' ? 'active-type' : ''}`}></i>
                <i onClick={() => this.onSelectType('NoteTodos')} className={`fas fa-list-ul ${noteType === 'NoteTodos' ? 'active-type' : ''}`}></i>
                </div>
            </div>
        )


    }
}
