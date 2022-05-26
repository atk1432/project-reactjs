import React from "react"
import { Link } from "react-router-dom"
import styles from "../../../static/website/App.module.scss"

import Button from "../Button"


const LINKS = {
	'About': [
		'How it works',
		'Testimonials',
		'Careers',
		'Investors',
		'Terms of Service'
	],
	'Contact Us': [
		'Contact',
		'Support',
		'Destinations',
		'Sponsorships'
	],
	'Videos': [
		'Submit Video',
		'Ambassadors',
		'Agency',
		'Influencer'
	],
	'Social Media': [
		'Instargram',
		'Facebook',
		'Youtube',
		'Twitter'
	]
}


const CONNECTS = [
	"fa-brands fa-facebook",
	"fa-brands fa-instagram",
	"fa-brands fa-youtube",
	"fa-brands fa-twitter",
	"fa-brands fa-linkedin-in"
]


function Footer() {

	return (
		<footer className={styles.Footer}>
			<div className={styles.Container}>
				<h1>Join the Adventure newsletter to receive our best vacation deals</h1>
				<p>You can unsubscribe at any time</p>
				<form action=""> 
					<input type="text" placeholder="Your Email" />
					<button>
						<Button
							link="/Subscribe"
							buttonStyle='outline'
							backgroundColor='transparent'
							colorText='white'
						>
							Subscribe
						</Button>
					</button>
				</form>
				<ul className={styles.Links}>
					{Object.keys(LINKS).map((e, i) => 
						<li className={styles.LinkItem} key={i}>
							<h3>{e}</h3>								
							{LINKS[e].map((_e, _i) => 
								<Link to={'/' + _e} key={_i} >
									{_e}
								</Link>
							)}
						</li>
					)}
				</ul>
				<ul className={styles.Connects}>
					{CONNECTS.map((e, i) => 
						<li key={i}>
							<Link to=''>
								<i className={e}></i>
							</Link>
						</li>	
					)}
				</ul>
			</div>
		</footer>
	)

}


export default Footer