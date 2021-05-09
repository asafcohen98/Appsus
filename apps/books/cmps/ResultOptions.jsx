



export function ResultOptions({resOptions,onAddGoogleBook}){
    return (
        <section className="result-options">
            <ul className="clean-list">
        {resOptions.map(option => {
            return <li key={option.id}>
                <p>{option.title}</p>
                <button onClick={() => onAddGoogleBook(option)} className="fas fa-plus-circle"></button>
                </li>
        })}
        </ul>
        </section> 
    )
}