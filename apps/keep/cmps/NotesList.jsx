import { NotePreview } from '../cmps/NotePreview.jsx'

export function NotesList({ notes }) {
    return (
        <div className="notes-list">
            { notes.map(note => <NotePreview note={note} key={note.id} />)}
        </div>
    )

}