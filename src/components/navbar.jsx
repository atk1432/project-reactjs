import React, { Component } from 'react'


class Navbar extends Component {

	render() {
		return (
			<nav className="navbar navbar-light bg-light">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						<span className="m-2">Navbar</span>
						<span className="badge bg-secondary rounded-pill">
							{ this.props.totalNumber }
						</span>
					</a>
				</div>
			</nav>		
		)
	}

}


export default Navbar

