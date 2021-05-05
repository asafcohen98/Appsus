import { notesService } from '../services/notes-service.js'
import { NoteText } from '../cmps/NoteText.jsx'
import { NoteImg } from '../cmps/NoteImg.jsx'
import { NoteTodos } from '../cmps/NoteTodos.jsx'


export function NotePreview({ note }) {

    const currNoteType = note.type;

    function loadNote() {
        notesService.getNoteById(note.id).then((updatedNote) => {
            note = updatedNote
        })
    }

    const DynamicCmp = (props) => {
        switch (currNoteType) {
            case 'NoteText':
                return <NoteText {...props} />
            case 'NoteImg':
                return <NoteImg  {...props} />
            case 'NoteTodos':
                return <NoteTodos {...props} />
            default:
                return <div>NO NOTES</div>
        }
    }

    return <div className="note-preview">
        <DynamicCmp note={note} loadNote={loadNote} />
        {/* <ControlNote /> */}
    </div>

}