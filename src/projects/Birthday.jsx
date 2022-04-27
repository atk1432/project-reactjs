import { 
	useEffect, 
	useState,
	useRef,
	memo
	// useContext,
	// createContext
} from "react"
import styles from "../static/birthday/Birthday.module.scss"
// const imageLink = "../static/birthday/berty.jpeg"
// const images = require(imageLink)
 

const API_LINK = 'http://localhost:5000/people'


function Person(props) {

	const [ isEditing, setIsEditing ] = useState(false)
	const [ showMenu, setShowMenu ] = useState(false)
	const [ coorPerson, setCoorPerson ] = useState({})
	const usernameInput = useRef()

	useEffect(() => {

		if (isEditing) 
			usernameInput.current.focus()

		if (isEditing || showMenu)
			props.parentComponent.current.style.color = '#fff'
		else
			props.parentComponent.current.style.color = ''

	}, [isEditing, showMenu])

	const handleShowMenu = (e) => {
		e.stopPropagation()

		const element = e.currentTarget.getBoundingClientRect()
		const x = e.clientX - element.x 
		const y = e.clientY - element.y + 10

		setCoorPerson({ x, y })

		if (!showMenu) {
			setShowMenu(true)
		}
	}

	const handleClickWrapper = () => {
		setShowMenu(false)
	}

	const handleEdit = (e) => {
		e.stopPropagation()

		if (!isEditing)
			setIsEditing(true)
		setShowMenu(false)
	}

	
	if (!isEditing) return (
		<div 
			className={styles.Person} 
			onClick={handleShowMenu}
		>
			<img 
				className={styles.image} 
				// src={require('../static/birthday/berty.jpeg')}
				src={require(`../static/birthday/${props.image}`)} 
			/>
			<div>
				<p className={styles.name}>{props.name}</p>
				<p className={styles.years}>{props.years} years</p>
			</div>

			{function() {

				return (
					<>
					 	{!showMenu ? "" : (
						<>
							<ul 
								className={styles.menu}
								style={{ 
									left: coorPerson.x, 
									top: coorPerson.y
								}}
							>
								<li onClick={handleEdit}>Edit</li>
								<li>Delete</li>
							</ul>
							<div 
								className={styles.fullWrapper}
								onClick={handleClickWrapper}
							>	
							</div>									
						</>
						)}
					</>								
				)								

			}() }
		</div>
	) 
	else return (
		<>
			<div 
				className={styles.Person} 
				onClick={handleShowMenu}
				style={{
					zIndex: 99,
					borderRadius: '10px'
				}}
			>
				<label 
					className={`${styles.image} ${styles.labelInput}`}
					htmlFor={"image" + props.id}
				>	
					<i className="fas fa-image"></i>
				</label>
				<input
					id={"image" + props.id}
					type="file"
					hidden
				/>
				<div className={styles.input}>
					<input 
						className={`${styles.name} ${styles.inputListPeople}`}
						style={{top: "-29px"}} 
						type="text" 
						name="username" 
						ref={usernameInput}
					/>
					<input 
						className={`${styles.years} ${styles.inputListPeople}`} 
						type="text" 
						name="years" 
					/>
				</div>
			</div>
			<div 
				className={styles.fullWrapper}
				onClick={handleClickWrapper}
			>	
			</div>	
		</>
	)

}


function ListPeople(props) {

	const listPeople = useRef()

	return (
		<ul 
			className={styles.ListPeople}
			ref={listPeople}
			// onClick={handleList}
		>
			{props.data.map((e, i) => 
				<li key={i}>
					<Person
						id={i}
						name={e.name}
						image={e.image}
						years={e.years}
						parentComponent={listPeople}
					/>
				</li>
			)}
		</ul>
	)

}


function ButtonAdd() {
	return (
		<button className={styles.button}>Add</button>
	)
}

ButtonAdd = memo(ButtonAdd)
// ListPeople = memo(ListPeople) //

function UI() {

	const [ data, setData ] = useState([])

	const handleAdd = () => {

	}

	useEffect(() => {

		fetch(API_LINK)
			.then(res => res.json())
			.then(data => setData(data))

	}, [])

	return (
		<div className={styles.app}>
			<h3 className={styles.appHeader}>{data.length} birthdays today</h3>
			<ListPeople data={data} />
			<ButtonAdd />
		</div>
	)

}


function App() {

	return (
		<div className={styles.backgroundWindow}>
			<UI />
		</div>		
	)

}


export default App