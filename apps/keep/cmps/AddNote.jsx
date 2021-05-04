

export class AddNote extends React.Component {

    state = {
        noteType: 'NoteText',
        txtInput: '',
    }

    componentDidMount() {

    }

    getPlaceholder = (noteType) => {
        switch (noteType) {
            case 'NoteText':
                return 'What\'s on your mind...'
            case 'NoteImg':
                return 'Enter image URL...'
            case 'NoteTodos':
                return 'Enter comma separated list...'
        }
    }

    onSelectType = () => {
        console.log('set type')
    }





    render() {
        const { noteType, txtInput } = this.state
        return (
            <div className="add-note">
                <form onSubmit={() => console.log('add new note')}>
                    <label htmlFor="add-note"></label>
                    <input type="text" name="txtInput" placeholder={this.getPlaceholder(noteType)} id="add-note" />
                    <button><i className="fas fa-plus"></i></button>
                </form>
                <button  onClick={() => this.onSelectType()}><i className={`fas fa-font ${noteType === 'NoteText' ? 'active-type' : ''} `}></i></button>
                <button  onClick={() => this.onSelectType()}><i className={`far fa-image ${noteType === 'NoteImg' ? 'active-type' : ''}`}></i></button>
                <button  onClick={() => this.onSelectType()}><i className={`fas fa-list-ul ${noteType === 'NoteTodos' ? 'active-type' : ''}`}></i></button>
            </div>
        )
    }







}