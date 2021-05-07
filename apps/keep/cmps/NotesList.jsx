import { NotePreview } from '../cmps/NotePreview.jsx'

export function NotesList({ notes,loadNotes}) {

    return (
        <div className="notes-list container">
            { notes.map(note => <NotePreview note={note} key={note.id} loadNotes={loadNotes}  />)}
        </div>
    )
}