export class EmailFilter extends React.Component {

    state = {
        filterBy: {
            keyword: null,
            categories: null,
        }
    }

    handleChange = (ev) => {
        const { value, name } = ev.target;
        const { filterBy } = this.state;
        const { onSetFilter } = this.props;
        this.setState({ filterBy: { ...filterBy, [name]: value } }, () => onSetFilter(this.state.filterBy));
    }

    render() {
        return (
            <div className="email-filter">
                <select className="email-filter-select" name="categories" onChange={this.handleChange}>
                        <option value="all">All</option>
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                </select>

                <div className="email-filter-search">
                    <input onChange={this.handleChange} name="keyword" type="text" ></input>
                    <i className="fas fa-search"></i>
                </div>
            </div>
        )
    }
}