import { EmailPreview } from './EmailPreview.jsx'

export class EmailList extends React.Component {
    state = {
        setSelectedEmail: null
    }

    render() {
        const { emails, loadEmails} = this.props;
        return (
            <React.Fragment>
                    <div className="email-list">
                        {emails.map(email => <EmailPreview email={email} key={email.id} loadEmails={loadEmails} />)}
                    </div>
            </React.Fragment>
        )
    }
}