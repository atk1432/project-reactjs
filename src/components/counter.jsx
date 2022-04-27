import React, { Component } from "react";


class Counter extends Component {
    state = {
        count: this.props.counter.value,
        // tags: ['tag1', 'tag2', 'tag3']
        tags: []
    }

    formatCount(count) {
        return count === 0 ? 'Zero' : count
    }

    getBadgeClasses(count) {
        let classes = 'badge m-2 '
        classes += count === 0 ? 'bg-warning text-dark' : 'bg-secondary'
        return classes
    }

    renderTags() {
        if (this.state.tags.length === 0) 
            return <p>There is no tags</p>
        return ( 
            <ul>
                {this.state.tags.map(tag => <li key={tag}>{tag}</li>)}
            </ul>
        );

    }
 

    render() {
        // console.log(this.props)
        return(
            <div>
                { this.props.children }
                <span style={{fontSize: '18px'}} className={this.getBadgeClasses(this.props.counter.value)}>
                    {this.formatCount(this.props.counter.value)}
                </span>
                <button onClick={() => this.props.onIncrement(this.props.counter.id)} 
						className="btn btn-primary m-2">
                    Increment
                </button>
				<button onClick={() => this.props.onDelete(this.props.counter.id)} 
						className="btn btn-danger m-2"
				>
					Delete
				</button>
            </div>
        )
    }
}


export default Counter
