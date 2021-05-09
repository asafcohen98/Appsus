import { Loader } from '../../../cmps/Loader.jsx'





export class NoteImg extends React.Component {

    state = {
        loaded: false,
    }

    render() {
        const { loaded } = this.state
        const { url } = this.props.note.info
        return (
            <div className="img-container">
                {!loaded ? <Loader /> : ''}
                <img
                    className="note-img"
                    style={loaded ? { opacity: '100' } : { opacity: '0' }}
                    src={url}
                    onLoad={() => this.setState({ loaded: true })}
                />
            </div>
        )
    }

}
