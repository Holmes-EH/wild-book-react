const Skill = ({ skill }) => {
	const { title, votes } = skill
	return (
		<li>
			{title}
			<span className='votes'>{votes}</span>
		</li>
	)
}

export default Skill
