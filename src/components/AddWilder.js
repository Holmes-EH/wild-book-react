import { useState } from 'react'
import axios from 'axios'
import styles from '../css/addWilder.module.css'

const AddWilder = () => {
	const [name, setName] = useState('')
	const [city, setCity] = useState('')
	const [description, setDescription] = useState('')
	return (
		<form
			className={styles.form}
			onSubmit={(e) => {
				e.preventDefault()
				axios.post('http://localhost:5000/api/wilders', {
					name,
					city,
					description,
				})
			}}
		>
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
			<button>Add Wilder</button>
		</form>
	)
}

export default AddWilder
