import { booksService } from '../services/books-service.js'
import { RatingStars } from './RatingStars.jsx'

export class ReviewAdd extends React.Component {

    state = {
        review: {
            fullName: 'Books reader',
            rate: 0,
            date: new Date().toLocaleString(),
            text: null
        }
    }

    componentDidMount() {
        this.inputRef.current.focus()
    }

    inputRef = React.createRef()

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'radio' ? +target.value : target.value
        this.setState(prevState => ({
            review: {
                ...prevState.review,
                [field]: value
            }
        }))
    }

    onAddReview = (ev) => {
        ev.preventDefault()
        const { review } = this.state
        const { book } = this.props
        booksService.addReview(book.id, review).then(() => {
            this.props.loadBook()

        })
    }

    render() {
        const { fullName, rate} = this.state.review
        return (
            <section className="add-review-container">
                <h1>Add review</h1>
                <form className="book-review-form" onSubmit={this.onAddReview}>
                    <label htmlFor="fullName">
                        <input type="text" id="fullName" name="fullName" value={fullName} ref={this.inputRef} onChange={this.handleChange} />
                    </label>
                    <RatingStars rate={rate} handleChange={this.handleChange} isPreview={false} />
                    <label htmlFor="text"></label>
                    <textarea placeholder="Enter review here" name="text" id="text" cols="30" rows="10" onChange={this.handleChange} />
                    <button>Send review</button>
                </form>
            </section>
        )
    }
}