// import { utilsService } from '../../../../services/utils-service.js'
import {emailsService} from '../services/email-service.js'

const { Link } = ReactRouterDOM

export class EmailPreview extends React.Component {
    // date . toLocaleString('en-GB', {month: 'short', day: 'numeric'})

    state = {
        isChecked: false,
        isRead: null,
    }

    toggleCheck = (isChecked) => {
        //TODO: async update isChecked (without storage saving)
        this.props.email.isChecked = !this.props.email.isChecked
        this.setState({ isChecked });
    }
    
    toggleRead = (isRead) => {
        //TODO: async update isRead (with storage saving)
        this.props.email.isRead = !this.props.email.isRead
        this.setState({ isRead });
    }
    
    
    render() {
        const { isRead, subject, sentAt, towards, isChecked } = this.props.email;
        
        return (
                <article className={` email-preview ${isRead ? 'read' : ''} ${isChecked ? 'selected' : ''} `}>
                    <i onClick={() => this.toggleCheck(isChecked)} className={`${!isChecked ? 'far fa-square' : 'fas fa-check-square'}`}></i>
                    <p>{towards.split('@')[0]}</p>
                    <p>{subject}</p>
                    <i onClick={()=> this.toggleRead(isRead)} className={`fas ${isRead ? 'fa-envelope-open' : 'fa-envelope'}`}></i>
                    <p>{new Date(sentAt).toLocaleString('en-GB', { month: 'short', day: 'numeric' })}</p>
                </article>
        )
    }
}