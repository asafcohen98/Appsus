
export class NotesFilter extends React.Component {

    state = {
        filterBy: {
            ctg: '',
            keyword: ''
        }
    }


    handleChange = (ev) => {
        const { name,value} = ev.target
        const { filterBy } = this.state
        const { onSetFilter } = this.props
        this.setState({ filterBy: { ...filterBy, [name]: value.toLowerCase() } }, () => {
               onSetFilter(this.state.filterBy)
        })
    }

    render() {
        return (
            <div className="filter-container">
                <div className="search">
                    <label htmlFor="keyword-search"></label>
                    <input id="keyword-search" placeholder="Search notes" name="keyword" type="text" onChange={this.handleChange} />
                    <i className="fas fa-search"></i>
                </div>
                <label htmlFor="select-ctg" className="select">
                    <select name="ctg" id="select-ctg" onChange={this.handleChange}>
                        <option value="all">All</option>
                        <option value="archive">Archive</option>
                    </select>
                </label>
            </div>
        )
    }









}