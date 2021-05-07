import { EmailPreview } from './EmailPreview.jsx'

export class EmailList extends React.Component {
    state = {
        setSelectedEmail: null
    }
    componentDidMount() {
        // console.log(this.props)
    }
    render() {
        const { emails, loadEmails} = this.props;
        // const { selectedEmails } = this.state;
        return (
            <React.Fragment>
                {/* <div className="email-list-tool">
                    <i className={`${selectedEmails.length ? 'fas fa-minus-square' : 'far fa-square'}`}></i>
                </div> */}
                    <div className="email-list">
                        {emails.map(email => <EmailPreview email={email} key={email.id} loadEmails={loadEmails} />)}
                    </div>
            </React.Fragment>
        )
    }
}