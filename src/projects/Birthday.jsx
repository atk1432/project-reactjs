import { 
	useEffect, 
	useState,
	useRef,
	useLayoutEffect,
	useContext,
	useCallback,
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
const AddSignal = createContext()


const showImage = (link, result1, result2) => {
	return !link ? result1 : result2
}

function PersonInput(props) {

	const [ valueInput, setValueInput ] = useState(props.value)
	const value = useRef()
	value.current = valueInput

	useEffect(() => {

		return () => {
			props.setState(value.current)
		}

	}, [])

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
				{showImage(
					link,
					(						
						<>
							<div className={`${styles.imageWithoutSrc} ${styles.imageLabel}`}>
				
							</div> 
						</>
					),
					<img 
						src={link} 
						className={styles.imageLabel}
					/> 
				)}
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

	const info = props.info
	const [ isEditing, setIsEditing ] = useState(false)
	const [ showMenu, setShowMenu ] = useState(false)
	const [ coorPerson, setCoorPerson ] = useState({})

	const [ username, setUsername ] = useState(info.name)
	const [ years, setYears ] = useState(info.years)
	const [ image, setImage ] = useState(LINK_IMAGE + info.image)

	const [ styleRemove, setStyleRemove ] = useState({})
	const listContext = useContext(ListPeopleContext)
	const usernameInput = useRef()
	const personRef = useRef()

	useEffect(() => {

		if (isEditing) 
			usernameInput.current.focus()

		if (isEditing || showMenu)
			props.parentComponent.current.style.color = '#fff'
		else
			props.parentComponent.current.style.color = ''

	}, [isEditing, showMenu])


	useEffect(() => {
		
		setUsername(info.name)
		setYears(info.years)
		setImage(info.image)
		setStyleRemove({})


	}, [props.id])

	
	useEffect(() => {

		listContext.setData(
			listContext.data.map((e) => {
				if (e.id === props.id) {
					return {
						id: e.id,
						name: username,
						years: years,
						image: image
					}
				} else return e
			})
		)

	}, [username, years, image])


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

		personRef.current.ontransitionend = () => {
			listContext.setData(
				listContext.data.filter((e, i) =>
					e.id !== props.id
				)
			)
		}

		const listPeople = props.parentComponent.current
		const width = listPeople.getBoundingClientRect().width
		const height = listPeople.getBoundingClientRect().height

		setShowMenu(false)
		setStyleRemove({
			left: width + 'px',
			transition: 'left .5s ease'
		})
		
	}

	// console.log(styleRemove)

	if (!isEditing) return (
		<li>
			<div 
				className={styles.Person} 
				onClick={handleShowMenu}
				style={styleRemove}
				ref={personRef}
			>
				{showImage(
					image, 
					(
						<>
							<div className={`${styles.image} ${styles.imageWithoutSrc} ${styles.imageLabel}`}>
								<i 
									className={"fas fa-camera " + styles.icon}
								>							
								</i> 
							</div> 
						</>
					),
					<img 
						className={styles.image} 
						src={image} 
					/>
				)}
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
	const [ id, setId ] = useState()
	const listPeople = useRef()
	const setAddSignal = useContext(AddSignal)

	useEffect(() => {

		setData(dataJSON)

		if (dataJSON[dataJSON.length - 1])
			setId(dataJSON[dataJSON.length - 1].id + 1)

	}, [dataJSON])

	useEffect(() => {
		if (id - 1 !== dataJSON.length)
			listPeople.current.scrollTo(0, listPeople.current.scrollHeight)
	}, [id])

	useEffect(() => {

		if (props.addSignal) {
			setData([...data, {
				id: id,
				name: '',
				years: '',
				image: ''
			}])
			setId(id + 1)
			setAddSignal(false)		
		}

	}, [props.addSignal])

	console.log(data)

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
						id={e.id}
						info={{
							name: e.name,
							image: e.image,
							years: e.years
						}}
						parentComponent={listPeople}
					/>
				)}
			</ul>
		</ListPeopleContext.Provider>
	)

}


function ButtonAdd(props) {
	return (
		<button 
			className={styles.button}
			onClick={props.onClick}
		>
			Add
		</button>
	)
}

ButtonAdd = memo(ButtonAdd)
ListPeople = memo(ListPeople) //

function UI() {

	const [ data, setData ] = useState([])
	const [ addSignal, setAddSignal ] = useState(false)

	useEffect(() => {

		fetch(API_LINK)
			.then(res => res.json())
			.then(data => setData(data))

	}, [])

	const handleAdd = useCallback(() => {
		setAddSignal(true)
	}, [])

	return (
		<AddSignal.Provider value={setAddSignal}>
			<DataJSON.Provider value={data}>
				<div className={styles.app}>
					<ListPeople addSignal={addSignal} />
					<ButtonAdd onClick={handleAdd} />
				</div>
			</DataJSON.Provider>
		</AddSignal.Provider>
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