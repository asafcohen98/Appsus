import { utilsService } from '../../../services/utils-service.js'
import { booksService } from '../services/books-service.js'
import { LongTxt } from '../../../cmps/LongTxt.jsx'
import { ReviewAdd } from '../cmps/ReviewAdd.jsx'
import { ReviewList } from '../cmps/ReviewList.jsx'

const { Link } = ReactRouterDOM



export class BookDetails extends React.Component {
    state = {
        book: null,
        isLongTxtShown: false,
    }


    componentDidMount() {
        this.loadBook()
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }


    loadBook = () => {
        const id = this.props.match.params.bookId
        booksService.getBookById(id).then(book => {
            if (!book) return this.props.history.push('/')
            this.setState({ book })
        })
    }

    setPageType = (pageCount) => {
        if (pageCount > 500) {
            return 'Long Reading'
        } else if (pageCount > 200) {
            return 'Decent Reading'
        } else if (pageCount < 100) {
            return 'Light Reading'
        }
        return null
    }

    setPublishedDate = (publishedDate) => {
        const currYear = new Date().getFullYear()
        if ((currYear - publishedDate) > 10) {
            return 'Veteran book'
        } else if (!(currYear - publishedDate)) {
            return 'New !'
        }
        return null
    }

    setPriceClassName = (amount) => {
        if (amount > 150) {
            return 'high-price'
        } else if (amount < 20) {
            return 'low-price'
        }
    }

    checkIfSale = (isOnSale) => {
        return isOnSale
    }


    toggleIsShown = () => {
        console.log('active')
        this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
    }



    render() {
        const { book, isLongTxtShown } = this.state
        if (!book) return <div>Loading...</div>
        const { thumbnail, pageCount, publishedDate, title, subtitle, listPrice, description, id } = book
        return (
            <section className="book-details-container container">
                <div className="book-details">
                    <div className="img-container">
                        <img src={thumbnail} alt="" />
                        {this.checkIfSale(listPrice.isOnSale) ? <span>On sale</span> : ''}
                    </div>
                    <ul className="book-categories">
                        {this.setPageType(pageCount) ? <li>{this.setPageType(pageCount)}</li> : ''}
                        {this.setPublishedDate(publishedDate) ? <li>{this.setPublishedDate(publishedDate)}</li> : ''}
                        {book.categories ? book.categories.map((category, idx) => <li key={idx}>{category}</li>) : ''}
                    </ul>
                    <h1>{title}</h1>
                    <h2>{subtitle}</h2>
                    <h2>{book.authors ? `Author: ${book.authors.join(', ')}` : ''}</h2>
                    <h2 className={this.setPriceClassName(listPrice.amount)}>
                        {utilsService.getCurrencySymbol(listPrice.currencyCode) + listPrice.amount}
                    </h2>
                    <LongTxt isShown={isLongTxtShown} txt={description} toggleIsShown={this.toggleIsShown}></LongTxt>
                    {description.length > 100 && <React.Fragment>
                    </React.Fragment>
                    }
                        <Link to={`/book/${booksService.getNextBookId(id)}`}>Next book</Link>
                        <button className="go-back-btn" onClick={() => this.props.history.push('/book')}>Go back</button>
                </div>
                <div className="book-reviews">
                <ReviewAdd book={book} loadBook={this.loadBook} />

                { book.reviews && <ReviewList book={book} loadBook={this.loadBook} />}
                </div>
            </section>

        )
    }
}