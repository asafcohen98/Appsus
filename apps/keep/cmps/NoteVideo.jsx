import { Loader } from '../../../cmps/Loader.jsx'





export class NoteVideo extends React.Component {
    state = {
        loaded: false,
    }

    render() {
        // const { loaded } = this.state
        const { url } = this.props.note.info
        console.log(url)
        return (
            <div className="video-container">
                {/* {!loaded ? <Loader /> : ''} */}
                <iframe width="420" height="315"
                    src={url}>
                </iframe>
            </div>
        )
    }

}