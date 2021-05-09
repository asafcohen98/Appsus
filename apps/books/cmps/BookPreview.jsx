import { utilsService } from '../../../services/utils-service.js'

const { Link } = ReactRouterDOM
export function BookPreview({ book}) {
    const { thumbnail, title, listPrice, id } = book
    return (
        <Link to={`/book/${id}`}>
            <article className="book-preview">
                { thumbnail ? <img src={thumbnail} alt="" /> : <img src='./assets/img/default-cover.png' alt="" />  }
                <h1>{title}</h1>
                <h2>{utilsService.getCurrencySymbol(listPrice.currencyCode) + listPrice.amount}</h2>
            </article>
        </Link>
    )
}