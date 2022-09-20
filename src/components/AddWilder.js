import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../css/addWilder.module.css'
import Skill from './Skill'
import PropTypes from 'prop-types'

const AddWilder = ({
	isEditing,
	setWilderToEdit,
	editId,
	editName,
	editCity,
	editDescription,
	editSkills,
}) => {
	// eslint-disable-next-line
	const [id, setId] = useState(editId)
	const [name, setName] = useState(editName)
	const [city, setCity] = useState(editCity)
	const [description, setDescription] = useState(editDescription)
	const [skills, setSkills] = useState([])

	const [wildersSkills, setWildersSkills] = useState(editSkills)
	const [addingNewSkill, setAddingNewSkill] = useState(false)
	const [newSkillGrade, setNewSkillGrade] = useState(0)
	const [newSkillId, setNewSkillId] = useState(0)

	const handleAddSkill = () => {
		const newSkillToAdd = skills.filter(
			(el) => el.id === parseInt(newSkillId)
		)[0]
		const newSkill = {
			id: newSkillToAdd.id,
			votes: parseInt(newSkillGrade),
			title: newSkillToAdd.title,
		}

		setWildersSkills([...wildersSkills, newSkill])
		setAddingNewSkill(false)
		setNewSkillGrade(0)
		setNewSkillId(0)
	}

	useEffect(() => {
		const refactorSkills = (skills) => {
			return skills.map((skill) => {
				return { id: skill.id, title: skill.name, votes: skill.grade }
			})
		}
		const getSkills = async () => {
			const { data } = await axios.get('http://localhost:5000/api/skills')
			setSkills(refactorSkills(data))
		}
		getSkills()
	}, [])

	const handleSubmit = async () => {
		if (isEditing) {
			try {
				const { data } = await axios.put(
					'http://localhost:5000/api/wilders',
					{
						id,
						name,
						city,
						description,
						grades: wildersSkills,
					}
				)
				console.log(data)
			} catch (error) {
				console.log(error)
			}
		} else {
			try {
				const { data } = await axios.post(
					'http://localhost:5000/api/wilders',
					{
						name,
						city,
						description,
						grades: wildersSkills,
					}
				)
				console.log(data)
			} catch (error) {
				console.log(error)
			}
		}
		setWilderToEdit({})
		window.location.reload()
	}

	return (
		<form
			className={`${styles.form} card`}
			onSubmit={(e) => e.preventDefault()}
		>
			<h3>Add a new wilder</h3>
			<fieldset className={styles.fieldset}>
				<label className={styles.labels} htmlFor='name'>
					Name :
				</label>
				<input
					type='text'
					title='name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</fieldset>
			<fieldset className={styles.fieldset}>
				<label className={styles.labels} htmlFor='city'>
					City :
				</label>

				<input
					type='text'
					title='city'
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
			</fieldset>
			<fieldset className={styles.fieldset}>
				<label className={styles.labels} htmlFor='description'>
					Description :{' '}
				</label>
				<textarea
					value={description}
					cols='30'
					rows='10'
					onChange={(e) => setDescription(e.target.value)}
				></textarea>
			</fieldset>
			<h4>Skills</h4>
			<ul className='skills'>
				{wildersSkills.map((skill, index) => {
					return (
						<Skill
							key={`${name}-skill-${index}`}
							title={skill.title}
							votes={parseInt(skill.votes)}
						/>
					)
				})}
			</ul>
			<button
				onClick={() => {
					setAddingNewSkill(!addingNewSkill)
				}}
			>
				Add new skill
			</button>
			{addingNewSkill && (
				<div style={{ display: 'flex', gap: '10px' }}>
					<select
						name='skill'
						value={newSkillId}
						onChange={(e) => {
							setNewSkillId(e.target.value)
						}}
					>
						<option value={0} disabled>
							{' '}
							Choose a skill{' '}
						</option>
						{skills.map((skill) => {
							return (
								<option
									key={'option-' + skill.title}
									value={skill.id}
								>
									{skill.title}
								</option>
							)
						})}
					</select>
					<label htmlFor='newGrade'>Grade : </label>
					<input
						type='number'
						name='newGrade'
						value={newSkillGrade}
						min={0}
						max={10}
						onChange={(e) => {
							setNewSkillGrade(e.target.value)
						}}
					/>

					<button
						onClick={handleAddSkill}
						disabled={newSkillGrade === 0}
					>
						Addskill
					</button>
				</div>
			)}
			<button onClick={handleSubmit}>Save Wilder</button>
		</form>
	)
}

AddWilder.propTypes = {
	isEditing: PropTypes.bool,
	editId: PropTypes.number,
	editName: PropTypes.string,
	editCity: PropTypes.string,
	editDescription: PropTypes.string,
	editSkills: PropTypes.array,
}
AddWilder.defaultProps = {
	isEditing: false,
	editId: null,
	editName: '',
	editCity: '',
	editDescription: '',
	editSkills: [],
}

export default AddWilder
