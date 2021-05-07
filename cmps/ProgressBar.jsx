







export class ProgressBar extends React.Component {

    state = {
        fillerStyles: {
            width: `0%`,
        },
        bgColor: ['#e65555', '#e3a562', '#bdd943', '#76C893'],
        completed: 0
    }

    componentDidMount() {
        const { completed } = this.props;
        this.setState({ completed, fillerStyles: { ...this.state.fillerStyles, width: `${completed}%` } });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.completed !== this.props.completed) {
            const { completed } = this.props;
            this.setState({ completed, fillerStyles: { ...this.state.fillerStyles, width: `${completed}%` } });
        }
    }

    getCurrBgColor = () => {
        const { completed, bgColor } = this.state;
        if (completed <= 30) return bgColor[0]
        else if (completed <= 50) return bgColor[1]
        else if (completed <= 75) return bgColor[2]
        else return bgColor[3]
    }

    render() {
        const { completed, fillerStyles } = this.state;
        const bgColor = this.getCurrBgColor();
        const finished = (completed === 100) ? { borderTopRightRadius: '5em', borderBottomRightRadius: '5em' } : ''

        return (
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ ...fillerStyles, backgroundColor: bgColor, ...finished }}>
                    <span>
                        {completed}%
                    </span>
                </div>
            </div>
        )
    }

}