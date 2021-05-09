export function LongTxt({ txt, isShown, toggleIsShown }) {
    if (txt.length < 100) return <p className="book-details-desc">{txt}</p>;

    if (isShown) {
        return <p className="book-details-desc">
            {txt.slice(0, 100)} <span onClick={() => { toggleIsShown() }}> Read more</span>
        </p>
    } else return <p className="book-details-desc">{txt} <span onClick={() => { toggleIsShown() }}> Read less</span></p>;
}