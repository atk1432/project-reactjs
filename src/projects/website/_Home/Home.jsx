import React, { 
	useRef, 
	useEffect,
	useState,
	memo
} from "react"
import { Link } from "react-router-dom"
import styles from "../../../static/website/App.module.scss"

import Button from "../Button"


const INFO = [
	{
		label: 'Adventure',
		text: 'Explore the hidden waterfall deep inside Amazon Jungle',
		src: '/img-9.jpg'
	},
	{
		label: 'Luxury',
		text: 'Travel through the islands of Bali in a Private Cruise',
		src: '/img-2.jpg'
	},
	{
		label: 'Mystery',
		text: 'Set Sail in the Atlantic Ocean visiting Uncharted Waters',
		src: '/img-3.jpg'
	},
	{
		label: 'Adventure',
		text: 'Experience Football on Top of the Himilayan Mountains',
		src: '/img-4.jpg'
	}, 
	{
		label: 'Adventure',
		text: 'Ride through Sahara Desert on a guided camel tour',
		src: '/img-8.jpg'
	}
]


function CardItem({
	label,
	text,
	src,
	pushElement
}) {

	return (
		<Link 
			to='/services' 
			className={styles.CardItem}
			ref={ref => pushElement(ref)}
		>
			<div className={styles.ImageContainer}>
				<img src={src} className={styles.Image} alt="" />
				<span>{label}</span>
			</div>
			<div className={styles.TextContainer}>
				<p className={styles.Text}>{text}</p>
			</div>
		</Link>
	)

}


function Cards(props) {

	return (
		<div 
			className={styles.Cards}
		>
			<div className={styles.Container}>
				<div className={styles.Header}>
					<h1>Check out these EPIC Destinations!</h1>
				</div>
				<ul className={styles.List}>
					{INFO.map((e, i) => 
						<li key={i} className={styles.Item}>
							<CardItem
								label={e.label}
								text={e.text}
								src={e.src}
								pushElement={props.pushElement}
							/>
						</li>
					)}
				</ul>
			</div>
		</div>
	)

}

function HeroSection() {

	return ( 
		<div 
			className={styles.HeroSection}
		>
			<div className={styles.VideoContainer}>
				<video 
					src="/video-1.mp4" 
					className={styles.Video}
					autoPlay
					muted
				/>
			</div>
			<div 
				className={styles.Category}
			>
				<div 
					className={styles.CategoryChild}
					// ref={ref => props.pushElement(ref)}
				>
					<h1>ADVENTURE AWAITS</h1>
					<p>What are you waiting for?</p>
					<div className={styles.ButtonContainer}>
						<Button 
							link="" 
							backgroundColor='transparent'
							colorText='white'
							buttonStyle='outline'
						>
							GET STARTED
						</Button>
						<Button link="">
							WATCH TRAILER 
							<i 
								className="far fa-play-circle"
							>					
							</i>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)

}


function PageLoading(props) {

	return (
		<div 
			className={styles.PageLoading}
			style={props.hide ? {
					opacity: 0,
					visibility: 'hidden'
				} : {}
			}
		>
			<div className={styles.Animation}>
				<div className={styles.Item}></div>
	            <div className={styles.Item}></div>
	            <div className={styles.Item}></div>
	            <div className={styles.Item}></div>
	            <div className={styles.Item}></div>
	            <div className={styles.Item}></div>
	            <div className={styles.Item}></div>
	            <div className={styles.Item}></div>
			</div>
		</div>
	)

}


function Home() {

	const elements = useRef([])

	const pushElement = (ref) => {
		if (!elements.current.includes(ref) && ref)
			elements.current.push(ref)
	}
//
	useEffect(() => {
		const elementVisible = 650

		const scroll = () => {
			if (elements.current.length !== 0) {

				elements.current.forEach((e, i) => {
					if (e.getBoundingClientRect().y < elementVisible) {
						e.style.animation = styles.fadeOut + ' 1s'
						e.style.opacity = 1
						elements.current.splice(i, 1)
					}
				})

			} else {
				remove()
			}
			// remove()
		}

		const remove = () => {
			window.removeEventListener('scroll', scroll)
		}

		window.addEventListener('scroll', scroll)

		return remove

	}, [])


	useEffect(() => {

		window.onload = () => {
			console.log('Page has load!')
		}

	}, [])
//
	console.log('render')

	return (		
		<div className={styles.Page}>
			<HeroSection />
			<Cards pushElement={pushElement} />
		</div>
	)

}

Home = memo(Home)


export default () => {

	const [ hide, setHide ] = useState(false)

	useEffect(() => {

		window.onload = () => {
			setHide(true)
			document.body.style.overflow = 'visible'
		}

	}, [])

	return (
		<>
			<PageLoading hide={hide} />
			<Home />
		</>
	)

}