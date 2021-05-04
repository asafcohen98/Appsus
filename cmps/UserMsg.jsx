
import { eventBusService } from '../services/event-bus-service.js'
const { Link } = ReactRouterDOM


export class UserMsg extends React.Component {

    removeEvent
    clear

    state = {
        msg: null
    }

    componentDidMount() {
        this.removeEvent = eventBusService.on('show-user-msg', (msg) => {
            this.setState({ msg }, ()=>{
                setTimeout(() => {
                    this.setState({ msg : null})
                }, 3000)
            })

        })
    }


    componentWillUnmount() {
        this.removeEvent()
    }

    render() {
        const { newBook } = this.props
        if (!this.state.msg) return <span></span>
        const msgClass = this.state.msg.type || ''
        return (
            <section className={'user-msg ' + msgClass}>
                <i className="fas fa-check"></i>
                <div className="user-msg-txt">
                    <p>{this.state.msg.txt} <span>was successfully added</span></p>
                    <Link to={`/book/${newBook.id}`}>Check it out</Link>
                </div>
                <button onClick={() => {
                    this.setState({ msg: null })
                }}>x</button>
            </section>
        )
    }

}

