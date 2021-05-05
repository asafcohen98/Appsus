
const { Route, Link } = ReactRouterDOM

import { emailsService } from './services/email-service.js';
import { EmailList } from './cmps/EmailList.jsx';
import { EmailCompose } from './cmps/EmailCompose.jsx';
import { EmailDetails } from './cmps/EmailDetails.jsx';


export class MissEmail extends React.Component {

    state = {
        emails: null,
        filterBy: '',
        isEmailDetailsShown: false
    }

    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        emailsService.query(this.state.filterBy)
            .then(emails => {
                this.setState({ emails })
            })
    }

    // onSetFilter = (filterBy) => {
    //     this.setState({ filterBy }, this.loadBooks)
    // }

    render() {
        const { emails } = this.state

        if (!emails) return <div>Loading...</div>

        window.emails = emails;

        return (
            <section className="email-app">
                {/* <BookFilter onSetFilter={this.onSetFilter} />
                    <BookAdd loadBooks={this.loadBooks} /> */}

                <div className="email-app-tool">

                    <Link to="/email/compose">
                        <button className="new-email-button">
                            <i className="fas fa-plus"></i>
                        </button>
                    </Link>

                    <div className="email-inbox-wrapper">
                        <button className="email-inbox-button">
                            <i className="fas fa-inbox"></i>
                        </button>
                        <span>
                            Inbox (20)
                        </span>
                    </div>

                    <Link to="/email/inbox">
                    <div className="email-inbox-wrapper">
                        <button className="email-inbox-button">
                            <i className="fas fa-inbox"></i>
                        </button>
                        <span>
                            Read
                        </span>
                    </div>
                    </Link>
                </div>

                <Route exact path="/email/compose" render={(props) => <EmailCompose {...props} loadEmails={this.loadEmails} />} />
                {/* <EmailCompose loadEmails={this.loadEmails} /> */}

                {/* <Route component={EmailDetails} path="/email/:emailId" /> */}
                <Route exact path="/email/inbox" render={(props) => <EmailList {...props} emails={emails} />} />
                {/* <EmailList emails={emails} /> */}
            </section>
        )
    }
}