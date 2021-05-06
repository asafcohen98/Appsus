import { notesService } from '../services/notes-service.js'
import { NoteText } from '../cmps/NoteText.jsx'
import { NoteImg } from '../cmps/NoteImg.jsx'
import { NoteTodos } from '../cmps/NoteTodos.jsx'
import { NoteVideo } from '../cmps/NoteVideo.jsx'
import { NoteController } from './NoteController.jsx';


export class NotePreview extends React.Component {
    state = {
        note: null,
        currNoteType: null
    }

    componentDidMount() {
        const { note } = this.props
        this.setState({ note, currNoteType: note.type })
    }


    loadNote = () => {
        const { note } = this.state
        notesService.getNoteById(note.id).then((updatedNote) => {
            this.setState({ note: updatedNote })
        })
    }

    getNoteIcon = () => {
        const { currNoteType } = this.state
        switch (currNoteType) {
            case 'NoteText':
                return 'fas fa-font'
            case 'NoteImg':
                return 'fas fa-image'
            case 'NoteTodos':
                return 'fas fa-list-ul'
            case 'NoteTodos':
                return 'fab fa-youtube'
            default:
                return 'no icon'
        }
    }

    render() {
        const { note, currNoteType } = this.state
        if (!note || !currNoteType) return ''
        const { loadNotes } = this.props

        const DynamicCmp = (props) => {
            switch (currNoteType) {
                case 'NoteText':
                    return <NoteText {...props} />
                case 'NoteImg':
                    return <NoteImg  {...props} />
                case 'NoteTodos':
                    return <NoteTodos {...props} />
                case 'NoteVideo':
                    return <NoteVideo {...props} />
                default:
                    return <div>NO NOTES</div>
            }
        }

        return (<div className="note-preview" style={{ backgroundColor: note.style.backgroundColor }}>
            <DynamicCmp note={note} loadNote={this.loadNote} />
            < NoteController getNoteIcon={this.getNoteIcon} note={note} loadNote={this.loadNote} loadNotes={loadNotes} />
        </div >)

    }

}






// export function NotePreview({note, loadNotes}) {

//     const currNoteType = note.type;


//     function loadNote() {
//         notesService.getNoteById(note.id).then((updatedNote) => {
//             note = updatedNote
//         })
//     }

//     function getNoteIcon(){
//         switch (currNoteType) {
//             case 'NoteText':
//                 return 'fas fa-font'
//             case 'NoteImg':
//                 return 'fas fa-image'
//             case 'NoteTodos':
//                 return 'fas fa-list-ul'
//             default:
//                 return 'no icon'
//         }
//     }

//     const DynamicCmp = (props) => {
//         switch (currNoteType) {
//             case 'NoteText':
//                 return <NoteText {...props} />
//             case 'NoteImg':
//                 return <NoteImg  {...props} />
//             case 'NoteTodos':
//                 return <NoteTodos {...props} />
//             default:
//                 return <div>NO NOTES</div>
//         }
//     }

//     return <div className="note-preview" style={{ backgroundColor: note.style.backgroundColor }}>
//         <DynamicCmp note={note} loadNote={loadNote} />
//         <div className="note-controller">
//         <i className={getNoteIcon()}></i>
//         < NoteController note={note} loadNote={loadNote} loadNotes={loadNotes} />
//         </div>
//     </div>

// }