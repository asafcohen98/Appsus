
const { Route } = ReactRouterDOM

import { emailsService } from './services/email-service.js'
import { EmailList } from './cmps/EmailList.jsx';


export class MissEmail extends React.Component {

    state = {
        emails: null,
        filterBy: ''
    }

    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        emailsService.query(this.state.filterBy)
            .then(emails => {
                this.setState({ emails }, console.log(emails))
            })
    }

    // onSetFilter = (filterBy) => {
    //     this.setState({ filterBy }, this.loadBooks)
    // }

    render() {
        const { emails } = this.state

        if (!emails) return <div>Loading...</div>

        return (
            <section className="email-app container">
                {/* <BookFilter onSetFilter={this.onSetFilter} />
                    <BookAdd loadBooks={this.loadBooks} /> */}
                <EmailList emails={emails} />
                {/* <Route component={MailDetails} path="/mail/:mailId" /> */}
            </section>
        )
    }
}