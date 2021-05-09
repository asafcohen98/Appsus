import { Loader } from '../../../cmps/Loader.jsx'





export class NoteVideo extends React.Component {
    state = {
        loaded: false,
    }

    render() {
        // const { loaded } = this.state
        const { ytId } = this.props.note.info
        return (

                <iframe width="100%" height="300px"
                    src={`https://www.youtube.com/embed/${ytId}`}>
                </iframe>
        )
    }

}