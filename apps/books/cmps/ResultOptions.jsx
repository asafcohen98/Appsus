



export function ResultOptions({resOptions,onAddGoogleBook}){
    return (
        <section className="result-options">
        {resOptions.map(option => {
            return <li key={option.id}>
                <p>{option.title}</p>
                <button onClick={() => onAddGoogleBook(option)}>+</button>
                </li>
        })}
        </section> 
    )
}