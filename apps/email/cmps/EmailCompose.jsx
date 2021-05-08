import { emailsService } from '../services/email-service.js'

export class EmailCompose extends React.Component {

    state = {
        emailContent: {
            towards: '',
            subject: '',
            body: '',
            sentAt: 0
        }
    }
    componentDidMount() {
        const {emailContent} = this.props;
        if (emailContent) {
            this.setState({emailContent: {...emailContent}}, console.log(this.state.emailContent))
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
        const isValidMail = new RegExp('(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))')
        let { emailContent } = this.state;

        emailContent = { ...emailContent, sentAt: Date.now() };

        emailsService.addEmail(emailContent).then(() => {
            this.props.loadEmails();
            this.props.hideCompose();
        });
    }


    render() {
        const {towards, subject, body} = this.state.emailContent


        return (
            <div className="email-compose">
                <div className="email-compose-head">
                    <span>
                        New Message
                    </span>
                    <i onClick={() => this.props.hideCompose()} className="fas fa-times"></i>
                </div>

                <form action="" onSubmit={this.onAddEmail}>
                    <div className="email-compose-field compose-to">
                        <span>To:</span>
                        <input required value={towards} name="towards" type="email" onChange={this.handleChange} />
                    </div>

                    <div className="email-compose-field compose-subject">
                        <span>Subject:</span>
                        <input required value={subject} name="subject" type="text" onChange={this.handleChange} />
                    </div>

                    <textarea className="email-compose-body" value={body} name="body" type="text"
                        style={{ width: '100%' }} onChange={this.handleChange} />

                    <button>
                        <i className="fas fa-paper-plane"></i>
                        Send
                    </button>
                </form>
            </div>
        )
    }


}