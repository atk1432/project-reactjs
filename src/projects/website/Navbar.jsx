import React, { 
	useState, 
	useEffect,
	useContext,
	useRef,
	createContext
} from "react";
import { Link } from "react-router-dom"
import styles from "../../static/website/App.module.scss"

import Button from "./Button"



const MobileContext = createContext()

const routers = {
	'/': 'Home',
	'/services': 'Services',
	'/products': 'Products'
}

function NavbarMenu(props) {

	const style = props.style ? props.style : {}
	const mobile = props.mobile

	return (
		<ul 
			className={styles.Menu} 
			style={style} 
			ref={ref => {
				if (ref)
					props.dom.current = ref
			}}
		>
			
			{Object.keys(routers).map((e, i) => 
				<li className={styles.Item} key={i}>
					<Link
						to={e}
						className={styles.Link}
						onClick={() => props.setClick(false)}
					>
						{routers[e]}
					</Link>
				</li>	
			)}

			<li>
				{!mobile ? 
					<Button
						link='/signup'
					>
						Sign Up
					</Button> :
					<Link
						to="/signup"
						className={styles.Link}
						onClick={() => props.setClick(false)}
					>
						Sign Up
					</Link>
				}
			</li>

		</ul>
	)

}


function Navbar() {

	const [ click, setClick ] = useState(false)
	const [ mobile, setMobile ] = useState(() => {
				if (window.innerWidth <= 768) return true
				return false
			})

	const MenuRef = useRef()

	useEffect(() => {

		window.onresize = () => {
			if (window.innerWidth <= 768) {
				setMobile(true)
			} else {
				setMobile(false)
			}
		}

		MenuRef.current.ontransitionend = function() {
			this.style.transition = '0s'
		}

	}, [])

	const handleClick = (e) => {
		e.stopPropagation()
		setClick(!click)
	}

	// const setTransition = () => {
	// }

	return (
		<>
			<nav className={styles.Navbar}>
				<div className={styles.Container}>
					<Link to="/" className={styles.Logo}>
						<span>TRVL</span> 
						<i className="fa-brands fa-typo3"></i>
					</Link>
					{!mobile ?
						<></> :
						<div className={styles.MenuIcon} onClick={handleClick}>
							<i className={!click ? 
								"fa-solid fa-bars" : "fa-solid fa-xmark"
							}></i>
						</div>
					} 
					<NavbarMenu 
						style={
							function() {
								if (!click && mobile)
									return {
										transition: 'height .3s'
									}

								return click && mobile ? {
									height: '264px',
									// transition: setTransition()
									} : null
							}() 
						} 
						mobile={mobile}
						dom={MenuRef}
						setClick={setClick}
					/>
				</div>
			</nav>
			{click && mobile ?
				<div 
					style={{
						position: 'fixed',
						width: '100%',
						height: '100%',
						zIndex: '25'
					}}
					onClick={() => setClick(false)}
				>				
				</div> :
				<></>
			}
		</>
	)

}


export default Navbar