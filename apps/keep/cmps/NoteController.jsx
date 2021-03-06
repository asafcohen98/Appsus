import { notesService } from '../services/notes-service.js'
import { ColorPalette } from '../../../cmps/ColorPalette.jsx'
import { eventBusService } from '../../../services/event-bus-service.js'

const { Link } = ReactRouterDOM

export class NoteController extends React.Component {

    state = {
        note: null,
        isColorPalette: false,
        emailUrl: null,
    }

    componentDidMount() {
        const { note } = this.props
        this.setState({ note })
    }

    onPinNote = (ev) => {
        ev.stopPropagation()
        const { loadNotes } = this.props
        const { note } = this.state
        notesService.updatePin(note).then(newNote => {
            this.setState({ note: newNote }, () => loadNotes())
        })
    }

    onArchiveNote = (ev) => {
        ev.stopPropagation()
        const { loadNotes } = this.props
        const { note } = this.state
        notesService.updateArchive(note).then(newNote => {
            this.setState({ note: newNote }, () =>{
                loadNotes()
                if(!newNote.isArchived) return
                const archiveAddMsg = 'Note has been archived'
                eventBusService.showUserMsg(archiveAddMsg,'success')
            })
        })
    }

    onRemoveNote = (ev) => {
        ev.stopPropagation()
        const { loadNotes } = this.props
        const { note } = this.state
        notesService.removeNote(note).then(() => loadNotes())
    }

    toggleColorPalette = (ev) => {
        ev.stopPropagation()
        const { isColorPalette } = this.state
        this.setState({ isColorPalette: !isColorPalette })
    }

    onSetBackgroundColor = (color) => {
        const { loadNote } = this.props
        const { note } = this.state
        notesService.changeNoteColor(note, color).then((newNote) => {
            this.setState({ note: newNote, isColorPalette: false }, () => {
                loadNote()
            })
        })
    }

    getEmailUrl = () => {
        const { note, emailUrl } = this.state
        var subject = null
        var body = null
        switch (note.type) {
            case 'NoteText':
                subject = 'New text'
                body = note.info.txt
                break
            case 'NoteImg':
                subject = 'New image'
                body = note.info.url
                break
            case 'NoteTodos':
                subject = 'New todos'
                const todosTxt = note.info.todos.map(todo => todo.txt)
                body = todosTxt.join('%0A')
                break
            case 'NoteVideo':
                subject = 'New video'
                body = `https://www.youtube.com/watch?v=${note.info.ytId}`
                break
        }
        if (!body) return
        return `/email/inbox?compose=new&to=asafc2000@gmail.com&subject=${subject}&body=${body}`
    }


    render() {
        const { note, isColorPalette } = this.state
        const { getNoteIcon } = this.props
        if (!note) return ''
        const emailUrl = this.getEmailUrl()
        return (
            <div onClick={() => this.setState({ isColorPalette: false })} className="note-controller">
                <i className={getNoteIcon()}></i>
                <div className="control-panel">
                    <button onClick={this.onPinNote} className={`fas fa-thumbtack clean-btn ${note.isPinned ? 'active' : ''}`}></button>
                    <button onClick={this.onArchiveNote} className={`fas fa-check clean-btn ${note.isArchived ? 'active' : ''}`}></button>
                    <div className="color-palette-container">
                        {isColorPalette ? <ColorPalette onSetColor={this.onSetBackgroundColor} /> : ''}
                        <button onClick={this.toggleColorPalette} className={`fas fa-palette clean-btn ${isColorPalette ? 'active' : ''}`}></button>
                    </div>
                   { emailUrl && <Link to={emailUrl}><button className="fas fa-paper-plane clean-btn"></button></Link>}
                   {!emailUrl && <button className="fas fa-paper-plane clean-btn"></button>}
                <button onClick={this.onRemoveNote} className="fas fa-trash clean-btn"></button>
            </div>
            </div >
        )
    }




}
