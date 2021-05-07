import { notesService } from './services/notes-service.js'
import { AddNote } from './cmps/AddNote.jsx'
import { NotesList } from './cmps/NotesList.jsx'
import { NotesFilter } from './cmps/NotesFilter.jsx'
import { Loader } from '../../cmps/Loader.jsx'


export class MissKeep extends React.Component {
    state = {
        notes: null,
        filterBy: null,
        isPinnedNotes: false,
        pinnedNotes: null,
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        const { filterBy } = this.state
        notesService.query(filterBy).then(notes => {
            this.setState({ notes }, () => {
                this.setPinnedNotes(this.state.notes)
            })
        })
    }

    setPinnedNotes = (notes) => {
        let isPinnedNotes = notes.some(note => note.isPinned)
        if (isPinnedNotes) {
            const pinnedNotes = notes.filter(note => note.isPinned)
            console.log('pinnedNotes:', pinnedNotes)
            const newNotes = notes.filter(note => !note.isPinned)
            console.log('newNotes:', newNotes)
            this.setState({ notes: newNotes, pinnedNotes: pinnedNotes, isPinnedNotes })
        } else {
            this.setState({ notes: notes, isPinnedNotes: false, pinnedNotes: null })
        }
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes)
    }

    render() {
        const { notes, isPinnedNotes, pinnedNotes } = this.state
        if (!notes) return <Loader />
        return (
            <section className="keep-app container">
                <div className="keep-tools-container">
                    <NotesFilter onSetFilter={this.onSetFilter} />
                    <AddNote loadNotes={this.loadNotes} />
                </div>
                {isPinnedNotes &&
                    <React.Fragment >
                        <h1>Pinned notes</h1>
                        <NotesList notes={pinnedNotes} loadNotes={this.loadNotes} />
                        {notes.length ? <h1>Other notes</h1> : null}
                    </React.Fragment>}
                <NotesList notes={notes} loadNotes={this.loadNotes} />
            </section>
        )
    }
}