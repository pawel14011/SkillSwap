import React, { useEffect, useState } from 'react'
import api from '../api'
import { useNotify } from '../hooks/useNotify'
import { useNavigate } from 'react-router-dom'

const CreateOffer = () => {
	const [skills, setSkills] = useState([])
	const [formData, setFormData] = useState({
		skillId: '',
		description: '',
		desiredSkill: '',
		level: 'BEGINNER',
		availability: '',
		skillName: 'Programowanie w JavaScript',
	})
	const notify = useNotify()
	const navigate = useNavigate()
	useEffect(() => {
		/* TODO: Stwórz endpoint /api/skills do pobierania umiejętności */ const demoSkills = [
			{ id: 1, name: 'Programowanie w JavaScript' },
			{ id: 2, name: 'Gra na gitarze' },
			{ id: 3, name: 'Gotowanie' },
		]
		setSkills(demoSkills)
	}, [])
	const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
	const handleSubmit = async e => {
		e.preventDefault()
		if (!formData.skillId || !formData.description || !formData.desiredSkill)
			return notify.error('Wypełnij wszystkie wymagane pola.')
		try {
			await api.post('/offers', formData)
			notify.success('Oferta dodana pomyślnie!')
			navigate('/')
		} catch (error) {
			notify.error('Błąd podczas dodawania oferty.')
		}
	}
	return (
		<div className='max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md'>
			<h1 className='text-2xl font-bold mb-6'>Stwórz nową ofertę</h1>
			<form onSubmit={handleSubmit} className='space-y-6'>
				<div>
					<label className='block text-sm font-medium'>Umiejętność, której chcesz nauczać:</label>
					<select name='skillId' onChange={handleChange} className='w-full mt-1 p-2 border rounded-md'>
						<option value=''>Wybierz umiejętność</option>
						{skills.map(s => (
							<option key={s.id} value={s.id}>
								{s.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<label className='block text-sm font-medium'>Opis:</label>
					<textarea
						name='description'
						rows='4'
						onChange={handleChange}
						className='w-full mt-1 p-2 border rounded-md'></textarea>
				</div>
				<div>
					<label className='block text-sm font-medium'>Czego chcesz się nauczyć w zamian?</label>
					<input
						type='text'
						name='desiredSkill'
						onChange={handleChange}
						className='w-full mt-1 p-2 border rounded-md'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium'>Twój poziom:</label>
					<select name='level' onChange={handleChange} className='w-full mt-1 p-2 border rounded-md'>
						<option value='BEGINNER'>Początkujący</option>
						<option value='INTERMEDIATE'>Średniozaawansowany</option>
						<option value='ADVANCED'>Zaawansowany</option>
						<option value='EXPERT'>Ekspert</option>
					</select>
				</div>
				<div>
					<label className='block text-sm font-medium'>Dostępność (np. wieczory, weekendy):</label>
					<input
						type='text'
						name='availability'
						onChange={handleChange}
						className='w-full mt-1 p-2 border rounded-md'
					/>
				</div>
				<button
					type='submit'
					className='w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors'>
					Dodaj ofertę
				</button>
			</form>
		</div>
	)
}
export default CreateOffer
