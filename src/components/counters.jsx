import React, { Component } from 'react';
import Counter from './counter';
 

class Counters extends Component {	

	render() {
		const { onReset, onDelete, onIncrement, counters } = this.props

		return (
			<div>
				<button className="btn btn-primary m-2"
						onClick={ onReset }>
					Reset				
				</button>
				{ counters.map((counter, id) => 
					<Counter key={counter.id}
							 onDelete={() => onDelete(counter.id)} 
							 onIncrement={() => onIncrement(counter.id)}
						     counter={ counters[id] }>
						<h4>Counter: #{counter.id}</h4>
					</Counter>
				) }
			</div>
		);
	}
}

export default Counters
