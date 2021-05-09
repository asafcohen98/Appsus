
const { Route } = ReactRouterDOM

import { booksService } from './services/books-service.js'
import { BookFilter } from './cmps/BookFilter.jsx';
import { BookAdd } from '../books/cmps/BookAdd.jsx';
import { BookList } from './cmps/BookList.jsx';
import { BookDetails } from './cmps/BookDetails.jsx';


export class MissBook extends React.Component {
    
    state = {
        books: null,
        filterBy: null,
        selectedBook: null,
    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        booksService.query(this.state.filterBy)
            .then(books => {
                this.setState({ books })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }

    render() {
        const { books } = this.state
        const { isExact } = this.props.match
        if (!books) return <div>Loading...</div>
        return (<section className="book-app">
            { isExact && <React.Fragment>
                <BookFilter onSetFilter={this.onSetFilter} />
                <BookAdd loadBooks={this.loadBooks} />
                <BookList books={books} />
            </React.Fragment>}
            <Route component={BookDetails} path="/book/:bookId" />
        </section>
        )
    }
}