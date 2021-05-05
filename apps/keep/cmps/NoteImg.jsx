





export class NoteImg extends React.Component {
   
    state = {
        loaded: false,
    }

    render() {
        const { style } = this.props.note
        const {url} = this.props.note.info
        return (
            <div className="img-container">
                <img
                    style={this.state.loaded ? {} : { display: 'none' }}
                    src={url}
                    onLoad={() => this.setState({ loaded: true })}
                />
                </div>
        )
    }

}