const { Link } = ReactRouterDOM

export class Home extends React.Component {

    render() {
        return (
            <section className="home">
                <h1>Welcome !</h1>
                <div className="imgs-container">
                <Link to="/keep">
                    <div className="gif-container">
                    <img src="assets/img/keep-gif.gif" alt="" />
                    </div>
                    </Link >
                    <Link to="/book">
                    <div className="gif-container">
                    <img src="assets/img/book-gif.gif" alt="" />
                    </div>
                    </Link>
                    <Link to="/email/inbox">
                    <div className="gif-container">
                    <img src="assets/img/email-gif.gif" alt="" />
                    </div>
                    </Link>
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