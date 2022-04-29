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
 

// \{^_^}\ hi!


const API_LINK = 'http://localhost:5000/people'


// function PersonInput() {

// 	return 

// }

function PersonInput(props) {

	const [ valueInput, setValueInput ] = useState(props.value)

	return (
		<input 
			className={props.className}
			style={props.style}
			type={props.type}
			name={props.name}
			ref={props.reference}
			value={valueInput}
			onChange={(e) => setValueInput(e.target.value)}
		/>
	)

}



function Person(props) {

	const [ isEditing, setIsEditing ] = useState(false)
	const [ showMenu, setShowMenu ] = useState(false)
	const [ coorPerson, setCoorPerson ] = useState({})
	const usernameInput = useRef()
	// const username = useRef()
	// const years = useRef()

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

		const x = e.clientX
		const y = e.clientY + 10

		setCoorPerson({ x, y })

		if (!showMenu) {
			setShowMenu(true)
		}
	}

	const handleClickWrapper = () => {
		if (showMenu)
			setShowMenu(false)
		if (isEditing)
			setIsEditing(false)
	}

	const handleEdit = (e) => {
		e.stopPropagation()

		if (!isEditing)
			setIsEditing(true)
		setShowMenu(false)
	}

	
	if (!isEditing) return (
		<li>
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
		</li>
	) 
	else return (
		<li>
			<div 
				className={styles.Person} 
				onClick={handleEdit}
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
					<PersonInput 
						className={`${styles.name} ${styles.inputListPeople}`}
						style={{top: "-29px"}} 
						type="text" 
						name="username" 
						reference={usernameInput}
						value={props.name}
					/>
					<PersonInput
						className={`${styles.years} ${styles.inputListPeople}`} 
						type="number" 
						name="years" 
						value={props.years}
					/>
				</div>
			</div>
			<div 
				className={styles.fullWrapper}
				onClick={handleClickWrapper}
			>	
			</div>	
		</li>
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
				<Person
					key={i}
					name={e.name}
					image={e.image}
					years={e.years}
					parentComponent={listPeople}
				/>
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