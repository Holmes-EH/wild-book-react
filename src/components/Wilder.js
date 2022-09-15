import blank_profile from '../assets/blank_profile.png'
import Skill from './Skill'
import PropTypes from 'prop-types'

const Wilder = ({ name, city, description, skills }) => {
	return (
		<article className='card'>
			<img src={blank_profile} alt='Jane Doe Profile' />
			<h3>{name}</h3>
			<h4>{city}</h4>
			<p>{description}</p>
			<h4>Wild Skills</h4>
			<ul className='skills'>
				{skills.map((skill, index) => {
					return (
						<Skill
							key={`${name}-skill-${index}`}
							title={skill.title}
							votes={skill.votes}
						/>
					)
				})}
			</ul>
		</article>
	)
}

Wilder.propTypes = {
	name: PropTypes.string,
	city: PropTypes.string,
	description: PropTypes.string,
	skills: PropTypes.array,
}

export default Wilder
