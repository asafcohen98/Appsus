

const { NavLink } = ReactRouterDOM

import { eventBusService } from '../services/event-bus-service.js'

export class AppHeader extends React.Component {
    state = {
        isNavOpen: false,
    }



    toggleNav = () => {
        this.setState({ isNavOpen: !this.state.isNavOpen })
    }



    render() {
        const { isNavOpen } = this.state

        // const {unReadMails} = eventBusService.on('unreadEmailsCount', )
        return (
            <section className="header-content container">
                <NavLink to="/" className="logo">
                        <img src="./assets/img/logo.svg" alt="" />
                        appsus
                </NavLink>

                <img onClick={() => this.toggleNav()} className="apps-grid" src="./assets/img/apps-grid.svg" alt="" />

                <nav className={`main-nav ${isNavOpen ? 'animate__fadeIn' : 'hidden'}`}>
                    <ul className={"clean-list"}>
                        <li className="home-link"><NavLink exact to="/">Home</NavLink></li>
                        <li className="about-link"><NavLink to="/about">About</NavLink></li>


                        <li className="books-link">
                            <NavLink to="/book">
                                <i className="fas fa-book-open"></i>
                                Books
                            </NavLink>
                        </li>
                        <li className="keep-link">
                            <NavLink to="/keep">
                                <i className="fas fa-sticky-note"></i>
                                Keep
                            </NavLink>
                        </li>
                        <li className="mail-link">
                            <NavLink to="/email/inbox">
                                <i className="fas fa-envelope"></i>
                                Mail
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </section>
        )
    }
}