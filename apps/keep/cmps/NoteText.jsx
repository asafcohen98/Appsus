import { notesService } from '../services/notes-service.js'
import { eventBusService } from '../../../services/event-bus-service.js'

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
        const { noteTxt } = this.state
        const { value } = ev.target
        this.setState({ noteTxt: value })
    }

    saveChanges = () => {
        const { note, loadNote } = this.props
        const { noteTxt } = this.state
        notesService.updateNoteTxt(note, noteTxt).then(() => {
            loadNote()
            const savedMsg = 'Your changes have been saved!'
            eventBusService.showUserMsg(savedMsg,'save')
        })
    }


    render() {
        const { noteTxt } = this.state
        if (!noteTxt) <div>Loading...</div>
        return (
            <div className="text-container" >
                <textarea role="textbox" spellCheck="false" value={noteTxt} onBlur={this.saveChanges} onChange={this.handleChange}>
                </textarea >
                {/* <span suppressContentEditableWarning={true} role="textbox" onBlur={this.saveChanges} onInput={this.handleChange}  contentEditable>
                {noteTxt}
                </span> */}
            </div>
        )

    }
}



