// import { utilsService } from '../../../../services/utils-service.js'

const { Link } = ReactRouterDOM

export class EmailPreview extends React.Component {
    // date . toLocaleString('en-GB', {month: 'short', day: 'numeric'})

    state = {
        isSelected: false,

    }

    toggleSelect = () => {
        console.log('here')
        this.setState({isSelected: !this.state.isSelected});
    }

    render() {
        const { id, subject, date } = this.props.email;
        const { isSelected } = this.state;
        console.log('rendering')
        return (
            <Link to={`/email/${id}`}>
                <article className="email-preview">
                <i onClick={()=> this.toggleSelect()} className={`${!isSelected ? 'far fa-square' : 'fas fa-check-square'}`}></i>
                </article>
            </Link>
        )
    }
}