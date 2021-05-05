import { notesService } from '../services/notes-service.js'

export class NoteText extends React.Component {

    state = {
        noteTxt: ''
    }


    componentDidMount() {
        const { info: { txt } } = this.props.note
        this.setState({ noteTxt: txt })
    }

    inputRef = React.createRef()

    handleChange = (ev) => {
        const { value } = ev.target
        this.setState({ noteTxt: value })
    }

    saveChanges = () => {
        const { note, loadNote } = this.props
        const { noteTxt } = this.state
        notesService.updateNoteTxt(note, noteTxt).then(() => loadNote())
    }


    render() {
        const { noteTxt } = this.state
        if (!noteTxt) <div>Loading...</div>
        return (
             <div className="text-container" >
            <textarea spellCheck="false" value={noteTxt} onBlur={this.saveChanges} onChange={this.handleChange}>
            </textarea >
            </div>
        )

    }
}



