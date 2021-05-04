import { notesService } from '../keep/services/notes-service.js'
import { AddNote } from './cmps/AddNote.jsx'
import { NotesList } from './cmps/NotesList.jsx'


export class MissKeep extends React.Component {
    state = {
        notes: [],
        filterBy: ''
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        const { filterBy } = this.state
        notesService.query(filterBy).then(notes => {
            this.setState({ notes })
        })
    }

    render() {
        const { notes,loadNotes } = this.state
        return (
            <section className="keep-app container">
                <AddNote />
                <NotesList notes={notes}/>
            </section>
        )
    }
}