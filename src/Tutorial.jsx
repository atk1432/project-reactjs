import styles from './App.module.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function NewsPage() {

	return (
		<h1>News Page</h1>
	)

}

function ContactPage() {

	return (
		<h1>Contact Page</h1>
	)

}

function HomePage() {

	return (
		<h1>Home Page</h1>
	)

}


function App() {

	return (
		<BrowserRouter>
			<div className="app">
				<nav>
					<ul>
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/news">News</a>
						</li>
						<li>
							<a href="">Contact</a>
						</li>
					</ul>
				</nav>
				
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/news" element={<NewsPage />} />
				</Routes>

			</div>
		</BrowserRouter>
	)

}


export default App
