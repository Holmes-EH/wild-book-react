import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Wilder from './components/Wilder'
import AddWilder from './components/AddWilder'

const App = () => {
	const [wilders, setWilders] = useState([])

	const refactorData = (data) => {
		return data.map((wilder) => {
			const cleanSkills = wilder.grades.map((grade) => {
				return { title: grade.skill.name, votes: grade.grade }
			})
			return {
				name: wilder.name,
				city: wilder.city,
				description: wilder.description,
				skills: cleanSkills,
			}
		})
	}

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get(
				'http://localhost:5000/api/wilders'
			)
			setWilders(refactorData(data))
		}
		fetchData()
	}, [])

	return (
		<div>
			<header>
				<div className='container'>
					<h1>Wilders Book</h1>
				</div>
			</header>
			<main className='container'>
				<AddWilder />
				<h2>Wilders</h2>
				<section className='card-row'>
					{wilders.map((wilder, index) => {
						return (
							<Wilder
								key={`wilder-${index}`}
								name={wilder.name}
								city={wilder.city}
								description={wilder.description}
								skills={wilder.skills}
							/>
						)
					})}
				</section>
			</main>
			<footer>
				<div className='container'>
					<p>&copy; 2022 Wild Code School</p>
				</div>
			</footer>
		</div>
	)
}

export default App
