

const { NavLink } = ReactRouterDOM

import { eventBusService } from '../services/event-bus-service.js'
import { emailsService } from '../apps/email/services/email-service.js'

export class AppHeader extends React.Component {
    state = {
        isNavOpen: false,
        unreadEmailsCount: 0
    }

    removeEvent;
    // this.removeEvent = eventBusService.on('car-count', (carCount) => {
    //     this.setState({ carCount })
    //   })
    // }
  
    // componentWillUnmount() {
    //   this.removeEvent()
    // }
    componentDidMount() {
        this.removeEvent = eventBusService.on('unread-emails-count', (unreadEmailsCount) => {
            this.setState({unreadEmailsCount})
        });
    }

    componentWillUnmount() {
        this.removeEvent()
    }
    // componentDidUpdate() {

    // }

    toggleNav = () => {
        this.setState({ isNavOpen: !this.state.isNavOpen })
    }


    render() {
        const { isNavOpen, unreadEmailsCount } = this.state
        // const {unReadMails} = eventBusService.on('unreadEmailsCount', )

        return (
            <section className="header-content">
                <NavLink to="/" className="logo">
                    <img src="./assets/img/logo.svg" alt="" />
                        appsus
                </NavLink>

                <img onClick={() => this.toggleNav()} className="apps-grid" src="./assets/img/apps-grid.svg" alt="" />

                <nav className={`main-nav ${isNavOpen ? 'animate__fadeIn' : 'hidden'}`}>
                    <ul className={"clean-list"}>
                        <li className="home-link"><NavLink exact to="/">Home</NavLink></li>
                        <li className="about-link"><NavLink to="/about">About</NavLink></li>


                        <NavLink to="/book">
                            <li className="books-link">
                                <i className="fas fa-book-open"></i>
                                Books
                        </li>
                        </NavLink>
                        <NavLink to="/keep">
                            <li className="keep-link">
                                <i className="fas fa-sticky-note"></i>
                                Keep
                        </li>
                        </NavLink>
                        <NavLink to="/email/inbox">
                            <li className="mail-link">
                                <i className="fas fa-envelope">
                                {!!unreadEmailsCount &&
                                    <span className="emails-unread-count">{unreadEmailsCount > 99 ? '99+' : unreadEmailsCount}</span>
                                }
                                </i>
                                Mail
                        </li>
                        </NavLink>
                    </ul>
                </nav>
            </section>
        )
    }
}