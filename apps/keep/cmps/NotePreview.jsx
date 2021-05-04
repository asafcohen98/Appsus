import { TextNote } from '../cmps/TextNote.jsx'

export function NotePreview({ note }) {

    const currNoteType = note.type;

    const DynamicCmp = (props) => {
        switch (currNoteType) {
            case 'NoteText':
                return <TextNote {...props} />
            // case 'NoteImg':
            //     return <ImgNote />
            // case 'NoteTodos':
            //     return <TodosNote />
            default:
                return <div>NO NOTES</div>
        }
    }

    return <div style={{backgroundColor: note.style.backgroundColor}}>
        <DynamicCmp note={note} />
    </div>
}