import { 
	useEffect, 
	useState,
	useRef,
	useLayoutEffect,
	useContext,
	createContext,
	memo,
} from "react"
import styles from "../static/birthday/Birthday.module.scss"


// console.log(process.env.PUBLIC_URL)
// const imageLink = "../static/birthday/berty.jpeg"
// const images = require(imageLink)
 

// \{^_^}\ hi!


const API_LINK = 'http://localhost:5000/people'
const LINK_IMAGE = window.location.origin + '/'


// Context 
const PersonContext = createContext()
const ListPeopleContext = createContext()
const DataJSON = createContext()


function Error(props) {

	return (
		<h4 className={styles.Error}>
			{props.message}
		</h4>
	)

}


function PersonInput(props) {

	const [ valueInput, setValueInput ] = useState(props.value)

	useEffect(() => {

		return () => {
			if (props.setState)
				props.setState(valueInput)
		}

	})

	return (
		<input 
			className={props.className}
			id={props.id}
			style={props.style}
			type={props.type}
			name={props.name}
			ref={props.reference}
			value={valueInput}
			onChange={(e) => {
				setValueInput(e.target.value)	
			}}
			hidden={!!props.hidden}
		/>
	)

}


function PersonFile(props) {

	const [ link, setLink ] = useState(props.source)
	const linkRef = useRef(link)
	// const [ source, setSource ] = useState()

	useEffect(() => {

		return () => {
			props.setState(linkRef.current)
		}

	}, [])

	useEffect(() => {

		linkRef.current = link

	}, [link])

	return (
		<>
			<label 
				className={`${styles.image} ${styles.labelInput}`}
				htmlFor={props.id}
			>	
				<img 
					src={link} 
					className={styles.imageLabel}
				/> 
				<i 
					className={"fas fa-camera " + styles.icon}
				>							
				</i> 
			</label>
			<input
				id={props.id}
				type="file"
				onChange={(e) => {
					var file = e.target.files[0]
					URL.revokeObjectURL(link)

					// console.log(file && file.type.split('/')[0] === 'image')
					if (file && file.type.split('/')[0] === 'image') {
						setLink(URL.createObjectURL(file))
					}
				}}
				hidden
			/>
		</>
	)

}


function Person(props) {

	const [ isEditing, setIsEditing ] = useState(false)
	const [ showMenu, setShowMenu ] = useState(false)
	const [ coorPerson, setCoorPerson ] = useState({})
	const [ username, setUsername ] = useState(props.name)
	const [ years, setYears ] = useState(props.years)
	const [ image, setImage ] = useState(LINK_IMAGE + props.image)
	const listContext = useContext(ListPeopleContext)
	const usernameInput = useRef()
	const styleRemove = useRef()

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

	const handleDelete = () => {
		listContext.setData(
			listContext.data.filter((e, i) => 
				i !== props.id
			)
		)

		// styleRemove.current = {transform: 'translateX(100px)'}
		setShowMenu(false)
	}

	if (!isEditing) return (
		<li>
			<div 
				className={styles.Person} 
				onClick={handleShowMenu}
				styles={styleRemove.current}
			>
				<img 
					className={styles.image} 
					src={image} 
				/>
				<div>
					<p className={styles.name}>{username}</p>
					<p className={styles.years}>{years} years</p>
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
									<li onClick={handleDelete}>Delete</li>
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
					borderRadius: '10px',
					cursor: "unset"
				}}
			>
				<PersonFile
					id={"image" + props.id}	
					source={image}			
					setState={setImage}
				/>
					
				{/*<PersonFile>*/}
				<div className={styles.input}>
					<PersonInput 
						className={`${styles.name} ${styles.inputListPeople}`}
						style={{top: "-29px"}} 
						type="text" 
						name="username" 
						reference={usernameInput}
						value={username}
						setState={setUsername}
					/>
					<PersonInput
						className={`${styles.years} ${styles.inputListPeople}`} 
						type="number" 
						name="years" 
						value={years}
						setState={setYears}
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

	const dataJSON = useContext(DataJSON)
	const [ data, setData ] = useState(dataJSON)
	const listPeople = useRef()

	useEffect(() => {

		setData(dataJSON)

	}, [dataJSON])

	return (
		<ListPeopleContext.Provider value={{ data, setData }}>
			<h3 className={styles.appHeader}>{data.length} birthdays today</h3>
			<ul 
				className={styles.ListPeople}
				ref={listPeople}
				// onClick={handleList}
			>
				{data.map((e, i) => 
					<Person
						key={i}
						id={i}
						name={e.name}
						image={e.image}
						years={e.years}
						parentComponent={listPeople}
					/>
				)}
			</ul>
		</ListPeopleContext.Provider>
	)

}


function ButtonAdd() {
	return (
		<button className={styles.button}>Add</button>
	)
}

ButtonAdd = memo(ButtonAdd)
ListPeople = memo(ListPeople) //

function UI() {

	const [ data, setData ] = useState([])

	useEffect(() => {

		fetch(API_LINK)
			.then(res => res.json())
			.then(data => setData(data))

	}, [])

	// console.log(data)

	return (
		<DataJSON.Provider value={data}>
			<div className={styles.app}>
				<ListPeople />
				<ButtonAdd />
			</div>
		</DataJSON.Provider>
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