import { booksService } from '../services/books-service.js'
import { eventBusService } from '../../../services/event-bus-service.js'
import { ResultOptions } from './ResultOptions.jsx'
import { UserMsg } from '../../../cmps/UserMsg.jsx'



export class BookAdd extends React.Component {
    state = {
        searchRes: null,
        resOptions: null,
        newBook: null
    }

    componentDidMount() {
        this.inputRef.current.focus()
    }

    inputRef = React.createRef()

    handleChange = (ev) => {
        const { searchRes } = this.state
        const value = ev.target.value
        this.setState({ searchRes: value }, () => {
            booksService.getGoogleBooks(searchRes).then(resOptions => {
                this.setState({ resOptions })
            })
        })
    }

    onAddGoogleBook = (googleBook) => {
        const { loadBooks } = this.props
        booksService.checkBookExist(googleBook).then(isBookExist => {
            if (isBookExist) return
            booksService.addGoogleBook(googleBook).then(() => {
                loadBooks()
                this.setState({ newBook: googleBook }, () => {
                    const addBookMsg = googleBook.title
                    eventBusService.showUserMsg(addBookMsg,'success')
                })
            })
        })
    }

    render() {
        const { resOptions, searchRes, newBook } = this.state
        return (
            <section className="add-book-container">
                <label htmlFor="search-book"></label>
                <input type="search" id="search-book" ref={this.inputRef} placeholder="Search for a book" onChange={this.handleChange} />
                {(searchRes && resOptions) && <ResultOptions resOptions={resOptions} onAddGoogleBook={this.onAddGoogleBook} />}
               <UserMsg newBook={newBook} />
            </section>
        )
    }
}

