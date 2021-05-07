

export class EmailFilter extends React.Component {

    state = {
        filterBy: {
            keyword: null,
            categories: null,
        }
    }

    handleChange = (ev) => {
        const { value } = ev.target;
        const { filterBy } = this.state;
        const { onSetFilter } = this.props;

        this.setState({ filterBy: { ...filterBy, keyword: value } }, () => onSetFilter(this.state.filterBy));
    }

    onSetCategory = (ctg) => {
        const { filterBy } = this.state;
        const { onSetFilter } = this.props;

        this.setState({ filterBy: { ...filterBy, categories: ctg } }, () => onSetFilter(this.state.filterBy));
    }

    render() {
        return (
            <div className="email-filter">
                <button onClick={() => this.onSetCategory('unread')}>unread</button>
                <button onClick={() => this.onSetCategory('read')}>read</button>
                <button onClick={() => this.onSetCategory('all')}>all</button>
                <input onChange={this.handleChange} type="text" ></input>
            </div>
        )
    }
}