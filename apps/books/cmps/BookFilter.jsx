

export class BookFilter extends React.Component {
    
    state = {
        filterBy: {
            bookName: '',
            maxPriceRange: 200,
        }
    }

    handleChange = (ev) =>{
        const field = ev.target.name
        const value = ev.target.type === 'range' ? +ev.target.value : ev.target.value
        this.setState({ filterBy: { ...this.state.filterBy, [field]: value }})
    }

    onFilter = (ev) => {
        ev.preventDefault()
        const {filterBy} = this.state
        this.props.onSetFilter(filterBy)
    }

    render() {
        const { bookName, maxPriceRange } = this.state.filterBy
        return (
            <form className="book-filter container" onSubmit={this.onFilter}>
                <label htmlFor="byName">Book name</label>
                <input type="text" id="byName" placeholder="Enter book name" name="bookName" value={bookName} onChange={this.handleChange} />
                <label htmlFor="byPriceRange">Price range</label>
                <input type="range" id="byPriceRange" name="maxPriceRange" min={10} max={200} value={maxPriceRange} onChange={this.handleChange}/>
                <span>{`10 - ${maxPriceRange}`}</span>
                <button>Apply</button>
            </form>
        )
    }
}