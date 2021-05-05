import {emailsService} from '../services/email-service.js'
export class EmailCompose extends React.Component {

    state = {
        emailContent: {
            towards: '',
            subject: '',
            body: '',
            sentAt: 0
        }
    }


    handleChange = (ev) => {
        const { emailContent } = this.state;
        const value = ev.target.value;
        const field = ev.target.name;
        this.setState({ emailContent: { ...emailContent, [field]: value } });
    }

    onAddEmail = (ev) => {
        ev.preventDefault();
        let { emailContent } = this.state;
        emailContent = { ...emailContent, sentAt: Date.now() };

        emailsService.addEmail(emailContent).then(()=> {
            this.props.loadEmails()
            this.props.history.push('/email/inbox')
        });
    }


    render() {
        return (
            <div className="email-compose">
                <div className="email-compose-head">
                    <span>
                        New Message
                    </span>
                    <i onClick={() => this.props.history.push('/email/inbox')} className="fas fa-times"></i>
                </div>

                <form action="" onSubmit={this.onAddEmail}>
                    <div className="email-compose-field compose-to">
                        <span>To:</span>
                        <input required name="towards" type="text" onChange={this.handleChange} />
                    </div>

                    <div className="email-compose-field compose-subject">
                        <span>Subject:</span>
                        <input required name="subject" type="text" onChange={this.handleChange} />
                    </div>

                    <textarea className="email-compose-body" name="body" type="text"
                        style={{ width: '100%' }} onChange={this.handleChange} />

                    <button>Send</button>
                </form>
            </div>
        )
    }


}