import React, { useState, useEffect } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'

const Home = () => {
	const [offers, setOffers] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchOffers = async () => {
			try {
				const { data } = await api.get('/offers')
				setOffers(data)
				console.log(data, 'danee')
			} catch (err) {
				setError('Nie udało się załadować ofert.')
				console.error(err)
			} finally {
				setLoading(false)
			}
		}
		fetchOffers()
	}, [])

	if (loading) return <div className='text-center mt-8'>Ładowanie...</div>
	if (error) return <div className='text-center mt-8 text-red-500'>{error}</div>

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6'>Ostatnie oferty</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{offers.map(offer => (
					<div key={offer.id} className='bg-white rounded-lg shadow p-6'>
						<div className='flex items-center mb-4'>
							<img
								src={offer.user.avatarUrl || 'https://placehold.co/40x40'}
								alt={offer.user.username}
								className='w-10 h-10 rounded-full mr-4'
							/>
							<div>
								<h3 className='font-bold'>{offer.user.username}</h3>
								<p className='text-sm text-gray-500'>{offer.user.location || 'Brak lokalizacji'}</p>
							</div>
						</div>
						<h2 className='text-xl font-semibold mb-2'>Uczy: {offer.skill.name}</h2>
						<p className='text-gray-700 mb-4'>{offer.description}</p>
						<div className='bg-gray-100 p-3 rounded-md'>
							<h4 className='font-semibold'>Szuka:</h4>
							<p>{offer.desiredSkill}</p>
						</div>
						<div className='mt-4 text-right'>
							<Link to={`/offers/${offer.id}`} className='text-indigo-600 hover:text-indigo-800 font-semibold'>
								Zobacz więcej
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Home
