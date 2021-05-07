import { notesService } from '../services/notes-service.js'
import { ColorPalette } from '../../../cmps/ColorPalette.jsx'

export class NoteController extends React.Component {

    state = {
        note: null,
        isColorPalette: false
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
            this.setState({ note: newNote }, () => loadNotes())
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

    onSendToEmail = () => {
        const { note } = this.state
        console.log(note)
    }


    render() {
        const { note, isColorPalette } = this.state
        const { getNoteIcon } = this.props
        if (!note) return ''
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
                    <button onClick={this.onSendToEmail} className="fas fa-paper-plane clean-btn"></button>
                    <button onClick={this.onRemoveNote} className="fas fa-trash clean-btn"></button>
                </div>
            </div>
        )
    }




}
