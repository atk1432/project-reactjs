import React from "react"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import styles from "../../static/website/App.module.scss"

import Navbar from "./Navbar"
import Footer from "./_Footer/Footer"
import Home from "./_Home/Home"


function App() {

	return (
		<div className={styles.App}>
			<Navbar />
				<Outlet />
			<Footer />
		</div>
	)

}

function NoPage() {

	return (
		<h3>404 error!</h3>
	)

}


export default () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<Home />} />
					<Route path="*" element={<NoPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}