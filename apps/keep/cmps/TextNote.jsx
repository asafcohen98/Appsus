
export class TextNote extends React.Component {

    componentDidMount() {
        console.log('text note mount !!!');
    }


    render() {
        const { note } = this.props
        const { isPinned, style, type, info:{txt}} = note
        console.log(style.backgroundColor)

        return(
            <h1  contentEditable="true">{txt}</h1>
        )
        
    }
}



