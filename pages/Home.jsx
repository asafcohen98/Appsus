const { Link } = ReactRouterDOM

export class Home extends React.Component {

    render() {
        return (
            <section className="home container">
                <h1>Welcome !</h1>
                <div className="imgs-container">
                    <img src="./assets/img/image-not-found.png" alt="" />
                    <img src="./assets/img/image-not-found.png" alt="" />
                    <img src="./assets/img/image-not-found.png" alt="" />
                </div>
                <h2>Check our apps</h2>
                <ul className="links-container clean-list">
                    <li className="books-link">
                        <Link onClick={() => this.setState({ isNavOpen: false })} to="/book">
                            <i className="fas fa-book-open"></i>
                                Books
                            </Link>
                    </li>
                    <li className="keep-link">
                        <Link onClick={() => this.setState({ isNavOpen: false })} to="/keep">
                            <i className="fas fa-sticky-note"></i>
                                Keep
                            </Link>
                    </li>
                    <li className="mail-link">
                        <Link onClick={() => this.setState({ isNavOpen: false })} to="/email/inbox">
                            <span></span>
                            <i className="fas fa-envelope"></i>
                                Mail
                            </Link>
                    </li>
                </ul>
            </section>
        )
    }
}