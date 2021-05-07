

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
        return (
            <section className="header-content container">
                <div className="logo">
                    Appsus
            </div>
                <img onClick={() => this.toggleNav()} className="apps-grid" src="./assets/img/apps-grid.svg" alt="" />
                <nav className={`main-nav ${isNavOpen ? 'show' : 'hidden'}`}>
                    <ul className={"clean-list"}>
                        <li className="home-link"><NavLink exact to="/">Home</NavLink></li>
                        <li className="about-link"><NavLink to="/about">About</NavLink></li>

                        <li className="books-link"><NavLink to="/book">Books</NavLink></li>
                        <li className="keep-link"><NavLink to="/keep">Keep</NavLink></li>
                        <li className="mail-link"><NavLink to="/email/inbox">Mail</NavLink></li>
                    </ul>
                </nav>
            </section>
        )
    }
}