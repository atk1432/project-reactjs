import React from 'react';



class Square extends React.Component {

	render() {
		return (
			<button className='square' onClick={this.props.onClick}>
				{this.props.value}
			</button>
		);
	}
}

// Create history component
class History extends React.Component {
	format() {
		if (this.props.value === 0) {
			return 'Go to game start'
		}
		return 'Go to move #' + this.props.value
	}

	render() {
		return (
			<li>
				<button onClick={this.props.onClick}>{ this.format() }</button>
			</li>
		);
	}
}


class Board extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			squares: Array(9).fill(null),
			turn: 'X',
			winner: null,
			history: [Array(9).fill(null)]
		}
	}

	hasAWinner(squares) {
		const lines = [
			[0, 1, 2],
		    [3, 4, 5],
		    [6, 7, 8],
		    [0, 3, 6],
		    [1, 4, 7],
		    [2, 5, 8],
		    [0, 4, 8],
		    [2, 4, 6],
		]

		// console.log('hello')
		var winner = false
		lines.forEach((e) => {
			const [a, b, c] = e
			if (squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]) {
				winner = true	
			}
		})

		if (winner) return true

		return false
	}

	checkFullBoard(squares) {
		for (var square of squares) {
			if (!square) {
				return false
			}
		}

		return true
	}

	handleClick(i) {
		const squares = this.state.squares.slice()

		if (squares[i] !== null || this.hasAWinner(this.state.squares)) {
			return
		}

		squares[i] = this.state.turn 

		this.setState({ squares: squares })

		if (this.hasAWinner(squares)) {
			this.setState({ winner: this.state.turn })
			return
		}

		this.state.history.push(squares)

		const turn = this.state.turn === 'X' ? 'O' : 'X'
		this.setState({ turn: turn })	

	}

	handleHistory(i) {
		this.setState({ squares: this.state.history[i] })
	}

	renderSquare(i) {
		return (
			<Square 
				value={this.state.squares[i]} 
				onClick={() => this.handleClick(i)}
			/>
		);
	}

	renderHistory() {
		var result = [<History key={0} value={0} onClick={() => this.handleHistory(0)}/>]

		this.state.history.forEach((e, i) => {
			if (i === 0) return 
			result.push(
				<History 
					key={i} value={i} 
					onClick={() => this.handleHistory(i)}
				/>
			)
		})	

		return result
	}

	render() {
		var status
		if (this.hasAWinner(this.state.squares)) {
			status = 'Winner: ' + this.state.turn + '!'
		}
		else if (this.checkFullBoard(this.state.squares)) {
			status = 'Balance!'
		}
		else {
			status = 'Next player: ' + this.state.turn
		}


		return (
			<div className="game">
				<div className="game-board">
					<div className="board-row">
						{ this.renderSquare(0) }
						{ this.renderSquare(1) }
						{ this.renderSquare(2) }
					</div>
					<div className="board-row">
						{ this.renderSquare(3) }
						{ this.renderSquare(4) }
						{ this.renderSquare(5) }
					</div>
					<div className="board-row">
						{ this.renderSquare(6) }
						{ this.renderSquare(7) }
						{ this.renderSquare(8) }
					</div>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>
						{ this.renderHistory() }
					</ol>
				</div>
			</div>
		);
	}
}


export default Board
