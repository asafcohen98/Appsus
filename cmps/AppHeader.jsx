

const { NavLink } = ReactRouterDOM

import { eventBusService } from '../services/event-bus-service.js'

export class AppHeader extends React.Component {
    state = {
        isNavOpen: false,
        unreadEmailsCount: 0
    }

    removeEvent;
    componentDidMount() {
        this.removeEvent = eventBusService.on('unread-emails-count', (unreadEmailsCount) => {
            this.setState({unreadEmailsCount})
        });
    }

    componentWillUnmount() {
        this.removeEvent()
    }


    toggleNav = () => {
        this.setState({ isNavOpen: !this.state.isNavOpen })
    }

    render() {
        
        const { isNavOpen, unreadEmailsCount } = this.state
        return (
            <section className="header-content">
                <NavLink to="/" className="logo">
                    <img src="./assets/img/logo.svg" alt="" />
                        appsus
                </NavLink>

                <img onClick={() => this.toggleNav()} className={`apps-grid ${isNavOpen ? 'active' : ''}`} src="./assets/img/apps-grid.svg" alt="" />

                <nav className={`main-nav ${isNavOpen ? 'slide-left' : 'slide-right'}`}>
                    <ul className={"clean-list"}>
                        <li className="home-link"><NavLink onClick={() => this.setState({ isNavOpen: false })} exact to="/">Home</NavLink></li>
                        <li className="about-link"><NavLink onClick={() => this.setState({ isNavOpen: false })} to="/about">About us</NavLink></li>
                        <li className="books-link">
                            <NavLink onClick={() => this.setState({ isNavOpen: false })} to="/book">
                                <i className="fas fa-book-open"></i>
                                Books
                            </NavLink>
                        </li>
                        <li className="keep-link">
                            <NavLink onClick={() => this.setState({ isNavOpen: false })} to="/keep">
                                <i className="fas fa-sticky-note"></i>
                                Keep
                            </NavLink>
                        </li>
                            <li className="mail-link">
                            <NavLink onClick={() => this.setState({ isNavOpen: false })} to="/email/inbox">
                                <i className="fas fa-envelope">
                                    {!!unreadEmailsCount &&
                                        <span className="emails-unread-count">{unreadEmailsCount > 99 ? '99+' : unreadEmailsCount}</span>}
                                </i>
                                Mail
                                </NavLink>
                            </li>
                    </ul>
                </nav>
            </section>
        )
    }
}