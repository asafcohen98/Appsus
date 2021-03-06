import { booksService } from '../services/books-service.js'
import { RatingStars } from './RatingStars.jsx'
export class ReviewList extends React.Component {
    
    state = {
        reviews: [],
    }

    componentDidMount() {
        const { reviews } = this.props.book
        if (reviews) this.setState({ reviews })
    }

    onRemoveReview = (book, idx) => {
        booksService.removeReview(book, idx).then(() => {
            this.props.loadBook()
        })
    }

    render() {
        const { reviews } = this.state
        const { book } = this.props
        if (!reviews) return <div>Loading...</div>
        return (
            <section className="review-list">
                <h1>Reviews</h1>
                {reviews.map((review, idx) => {
                    return (
                        <div className="review" key={review.id}>
                            <button onClick={() => {
                                this.onRemoveReview(book, idx)
                            }}>&times;</button>
                            <h1>{review.fullName}</h1>
                            <RatingStars rate={review.rate} isPreview={true} />
                            <div className="review-desc">
                                <p>
                                {review.text}
                                </p>
                            </div>
                            <h3>{review.date}</h3>
                        </div>
                    )
                })}
            </section>
        )
    }
}

