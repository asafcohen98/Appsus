// import { utilsService } from '../../../../services/utils-service.js'
import { emailsService } from '../services/email-service.js'

const { Link } = ReactRouterDOM

export class EmailPreview extends React.Component {
    // date . toLocaleString('en-GB', {month: 'short', day: 'numeric'})

    state = {
        isChecked: false,
        isRead: null,
    }

    toggleCheck = (ev) => {
        const {isChecked} = this.state
        ev.preventDefault();
        //TODO: async update isChecked (without storage saving)
        this.props.email.isChecked = !this.props.email.isChecked
        this.setState({ isChecked });
    }

    toggleRead = (ev) => {
        const {isRead} = this.state
        ev.preventDefault();
        //TODO: async update isRead (with storage saving)
        this.props.email.isRead = !this.props.email.isRead
        this.setState({ isRead });

    }


    render() {
        const { id, isRead, subject, sentAt, towards, isChecked } = this.props.email;
        return (
            <Link to={`/email/${id}`}>
                <article className={` email-preview ${isRead ? 'read' : ''} ${isChecked ? 'selected' : ''} `}>
                    <i onClick={this.toggleCheck}
                        className={`${!isChecked ? 'far fa-square' : 'fas fa-check-square'}`}></i>
                    <p>{towards.split('@')[0]}</p>
                    <p>{subject}</p>

                    <i onClick={this.toggleRead}
                        className={`fas ${isRead ? 'fa-envelope-open' : 'fa-envelope'}`}></i>

                    <p>{new Date(sentAt).toLocaleString('en-GB', { month: 'short', day: 'numeric' })}</p>
                </article>
            </Link>
        )
    }
}