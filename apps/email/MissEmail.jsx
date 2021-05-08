
const { Route, Link, Switch } = ReactRouterDOM;

// services
import { eventBusService } from '../../services/event-bus-service.js';

import { emailsService } from './services/email-service.js';
// global cmps
import { ProgressBar } from './../../cmps/ProgressBar.jsx';
// 
import { EmailList } from './cmps/EmailList.jsx';
import { EmailCompose } from './cmps/EmailCompose.jsx';
import { EmailDetails } from './cmps/EmailDetails.jsx';
import { EmailFilter } from './cmps/EmailFilter.jsx';



export class MissEmail extends React.Component {

    state = {
        emails: null,
        filterBy: null,
        showCompose: false,
        readPrecent: 0,
        unreadEmailsCount: 0
    }

    componentDidMount() {
        this.loadEmails();


        if (this.props.location.search.startsWith('?compose=new')) {
            this.showCompose()
        }

    }

    getReadPrecent = () => {
        emailsService.getReadPrecent().then(readPrecentCount =>
            this.setState({ readPrecent: readPrecentCount}));
    }

    getUnreadEmails = () => {
        emailsService.getUnreadEmails().then(unreadEmailsCount => {
            eventBusService.emit('unread-emails-count', unreadEmailsCount);
            this.setState({unreadEmailsCount})
        })
    }

    loadEmails = () => {
        emailsService.query(this.state.filterBy)
            .then(emails => {
                this.setState({ emails }, ()=>{
                    this.getUnreadEmails();
                    this.getReadPrecent();
                });
            });
    }

    showCompose = () => {
        const { search } = this.props.location

        if (search.startsWith('?compose=new')) {
            const newEmailParams = new URLSearchParams(search);
            const towards = (newEmailParams.get('to')) ? newEmailParams.get('to') : '';
            const subject = (newEmailParams.get('subject')) ? newEmailParams.get('subject') : '';
            const body = (newEmailParams.get('body')) ? newEmailParams.get('body') : '';
            const emailContent = { towards, subject, body }
            this.setState({ showCompose: true, emailContent });
        } else this.setState({ showCompose: true })
    }

    hideCompose = () => {
        const currLoc = this.props.location.pathname;
        this.props.history.push(currLoc);
        this.setState({ showCompose: false });
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails)
    }

    render() {
        const { emails, showCompose, emailContent, readPrecent } = this.state
        if (!emails) return <div>Loading...</div>

        return (
            <section className="email-app">

                <div style={{ position: 'absolute', top: '5em', right: '5em', width: '500px' }}>
                    <ProgressBar completed={readPrecent} />
                </div>

                <div className="email-app-tool">
                    <Link to="?compose=new">
                        <button onClick={this.showCompose} className="new-email-button">
                            <i className="fas fa-plus"></i>
                        </button>
                    </Link>

                    <Link to="/email/inbox">
                        <div className="email-inbox-wrapper">
                            <button className="email-inbox-button">
                                <i className="fas fa-inbox"></i>
                            </button>
                            <span>
                                Inbox (20)
                        </span>
                        </div>
                    </Link>

                    <EmailFilter onSetFilter={this.onSetFilter} />

                </div>

                {showCompose &&
                    <EmailCompose emailContent={emailContent} loadEmails={this.loadEmails} hideCompose={this.hideCompose} />
                }

                <Switch>
                    {/* <Route path="/email/:page/compose" render={(props) => <EmailCompose {...props} loadEmails={this.loadEmails} />} /> */}
                    <Route path="/email/:page/:emailId" render={(props) => <EmailDetails {...props} loadEmails={this.loadEmails} />} />
                    {/* <Route component={EmailDetails} path="/email/:page/:emailId" /> */}
                    <Route path="/email/:page" render={(props) => <EmailList {...props} emails={emails} loadEmails={this.loadEmails} />} />
                </Switch>
            </section>
        )
    }
}