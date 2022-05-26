import React, { useState }  from "react"
import { Link } from "react-router-dom"
import styles from "../../static/website/App.module.scss"


const STYLES = {
	'primary': styles.ButtonPrimary,
	'outline': styles.ButtonOutline
}

const SIZE = {
	'medium': styles.ButtonMedium
}

const BACKGROUND_COLOR = {
	'white': styles['bg-white'],
	'transparent': styles['bg-transparent']
}

function Button({
	children,
	link,
	buttonStyle,
	backgroundColor,
	buttonSize,
	colorText,
}) {

	var style = STYLES[buttonStyle]
	var size = SIZE[buttonSize]
	var bgColor = BACKGROUND_COLOR[backgroundColor]

	if (!style) style = STYLES.primary
	if (!buttonSize) size = SIZE.medium
	if (!backgroundColor) bgColor = BACKGROUND_COLOR.white 

	const className = `${styles.Button} ${style} ${size} ${bgColor}`

	return (
		<Link 
			to={link} 
			className={className} 
			style={{color: colorText ? colorText : 'black'}}
		>
			{children}
		</Link>
	)

}


export default Button