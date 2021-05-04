export class Home extends React.Component {

    render() {
        return (
            <section className="home container">
                <h1>Welcome !</h1>
                <div className="imgs-container">
                    <img src="./assets/img/image-not-found.png" alt=""/>
                    <img src="./assets/img/image-not-found.png" alt=""/>
                    <img src="./assets/img/image-not-found.png" alt=""/>
                </div>
                <h2>Check it out</h2>
                <div className="links-container">
                    <i className="fas fa-envelope"></i>
                    <i className="fas fa-sticky-note"></i>
                    <i className="fas fa-book-open"></i>
                </div>
            </section>
        )
    }
}