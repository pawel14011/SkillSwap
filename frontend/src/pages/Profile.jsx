import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import api from '../api'
import '../../src/index.css'
const Profile = () => {
	const { user } = useAuth()
	const [profile, setProfile] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		api
			.get('/users/profile')
			.then(res => setProfile(res.data))
			.catch(err => console.error(err))
			.finally(() => setLoading(false))
	}, [])

	if (loading) return <div>Ładowanie profilu...</div>
	if (!profile) return <div>Nie znaleziono profilu.</div>

	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
			<div className='md:col-span-1 bg-white p-6 rounded-lg shadow-md'>
				<img
					src={profile.avatarUrl || `https://placehold.co/128x128/e0e7ff/4f46e5?text=${profile.username.charAt(0)}`}
					alt='Avatar'
					className='w-32 h-32  rounded-full mx-auto mb-4 border-4 border-indigo-200'
				/>
		
				<h2 className='text-2xl   font-bold text-center'>{profile.username}</h2>
				<p className='text-center text-gray-500'>
					{profile.firstName} {profile.lastName}
				</p>
				<p className='text-green-700 bg-pink-300/50'>testtstst</p>
				<p className='text-center text-gray-600 mt-2'>{profile.location}</p>
				<p className='mt-4 text-sm text-gray-700'>{profile.bio || 'Brak opisu profilu.'}</p>
			</div>
			<div className='md:col-span-2 space-y-6'>
				<div className='bg-white p-6 rounded-lg shadow-md'>
					<h3 className='text-xl font-semibold mb-4'>Twoje oferty</h3>
					{profile.offers?.length > 0 ? (
						<ul className='space-y-3'>
							{profile.offers.map(offer => (
								<li key={offer.id} className='p-3 bg-gray-50 rounded-md'>
									{offer.skill.name}
								</li>
							))}
						</ul>
					) : (
						<p>Nie masz jeszcze żadnych ofert.</p>
					)}
				</div>
				<div className='bg-white p-6 rounded-lg shadow-md'>
					<h3 className='text-xl font-semibold mb-4'>Otrzymane recenzje</h3>
					{profile.reviewsGot?.length > 0 ? (
						<ul className='space-y-4'>
							{profile.reviewsGot.map(review => (
								<li key={review.id} className='p-3 border-l-4 border-indigo-500 bg-gray-50'>
									{review.comment} - <strong>{review.reviewer.username}</strong>
								</li>
							))}
						</ul>
					) : (
						<p>Brak recenzji.</p>
					)}
				</div>
			</div>
		</div>
	)
}
export default Profile
