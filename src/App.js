import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Wilder from './components/Wilder'
import AddWilder from './components/AddWilder'

const App = () => {
	const [wilders, setWilders] = useState([])
	const [addNewWilder, setAddNewWilder] = useState(false)
	const [wilderToEdit, setWilderToEdit] = useState({})

	const refactorData = (data) => {
		return data.map((wilder) => {
			const refactoredSkills = wilder.grades.map((grade) => {
				return {
					id: grade.skill.id,
					title: grade.skill.name,
					votes: grade.grade,
				}
			})
			return {
				id: wilder.id,
				name: wilder.name,
				city: wilder.city,
				description: wilder.description,
				skills: refactoredSkills,
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
				<button
					onClick={() => {
						setWilderToEdit({})
						setAddNewWilder(!addNewWilder)
					}}
				>
					{addNewWilder ? 'Hide form' : 'Add new Wilder'}
				</button>
				{addNewWilder && (
					<AddWilder
						isEditing={Object.hasOwn(wilderToEdit, 'id')}
						setWilderToEdit={setWilderToEdit}
						editId={wilderToEdit.id}
						editName={wilderToEdit.name}
						editCity={wilderToEdit.city}
						editDescription={wilderToEdit.description}
						editSkills={wilderToEdit.skills}
					/>
				)}
				<h2>Wilders</h2>
				<section className='card-row'>
					{wilders.map((wilder, index) => {
						return (
							<Wilder
								key={`wilder-${index}`}
								id={wilder.id}
								name={wilder.name}
								city={wilder.city}
								description={wilder.description}
								skills={wilder.skills}
								setAddNewWilder={setAddNewWilder}
								setWilderToEdit={setWilderToEdit}
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
