// import { utilsService } from '../../../services/utils-service.js'

import { emailsService } from '../services/email-service.js'

// const { Link } = ReactRouterDOM

export class EmailDetails extends React.Component {

    state = {
        email: null
    }

    componentDidMount() {
        this.loadEmail();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.emailId !== this.props.match.params.emailId) {
            this.loadEmail();
        }
    }

    loadEmail = () => {
        const id = this.props.match.params.emailId;
        emailsService.getEmailById(id).then(email => {
            if (!email) return this.props.history.push('/email/inbox')
            this.setState({ email }, () => {
                //TODO: update from service isRead to true (reading email)
                this.state.email.isRead = !this.state.email.isRead
            })
        })
    }

    render() {
        if (!this.state.email) return <div>Loading...</div>
        const { id, towards, subject, body, sentAt } = this.state.email
        return (
            <section className="email-details">

                <h1>{subject}</h1>
                <div className="email-details-info">
                    <p>
                    From: 
                        <span className="email-details-sender">{towards.split('@')[0]} </span>
                        <span>{`<${towards}>`}</span>
                    </p>
                    <small className="email-details-date">{new Date(sentAt).toLocaleString('en-GB', { hour12: false })}</small>
                </div>
                <p className="email-details-body">{body}</p>
            </section>
        )
    }
}