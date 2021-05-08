
import { eventBusService } from '../services/event-bus-service.js'
const { Link } = ReactRouterDOM


export class UserMsg extends React.Component {

    removeEvent
    clear

    state = {
        msg: null,
        animationClass: 'slide-up'
    }

    componentDidMount() {
        this.removeEvent = eventBusService.on('show-user-msg', (msg) => {
            this.setState({ msg }, () => setTimeout(() => {
                this.setState({ animationClass: 'slide-down fade-in' }, () => {
                     setTimeout(()=>{
                         this.setState({animationClass: 'slide-up fade-out'})
                     },3000)
                })
            }),1000)
        })
    }


    componentWillUnmount() {
        this.removeEvent()
    }

    getTypeMsg = () => {
        const { type } = this.state.msg
        switch (type) {
            case 'success': return 'Success !'
            case 'error': return 'Error !'
            case 'save': return 'Saved !'
            default: return ''
        }
    }

    getTypeIcon = () => {
        const { type } = this.state.msg
        switch (type) {
            case 'success': return 'fas fa-check'
            case 'error': return 'fas fa-times'
            case 'save': return 'fas fa-save'
            default: return ''
        }
    }

    render() {
        const { newBook } = this.props
        const { animationClass } = this.state
        if (!this.state.msg) return <span></span>
        const msgClass = this.state.msg.type || ''
        return (
            <section className={`user-msg ${msgClass} ${animationClass}`}>
                <i className={this.getTypeIcon()}></i>
                <div className="user-msg-txt">
                    <h1>{this.getTypeMsg()}</h1>
                    <p>{this.state.msg.txt}</p>
                </div>
                <button onClick={() => {
                    this.setState({ msg: null })
                }}>&times;</button>
            </section>
        )
    }

}

