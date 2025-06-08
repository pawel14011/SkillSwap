const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const matchingService = require('../services/matchingService')

// controllers/offerController.js

// controllers/offerController.js
const createOffer = async (req, res) => {
	const {
		skillName, // nazwa umiejętności (np. „Programowanie w JavaScript”)
		description,
		desiredSkill,
		level,
		availability,
	} = req.body

	if (!skillName?.trim()) {
		return res.status(400).json({ message: 'skillName is required' })
	}

	try {
		const offer = await prisma.offer.create({
			data: {
				// 1) podpinamy istniejącego usera
				user: {
					connect: { id: req.user.id },
				},

				// 2) podpinamy skill lub zakładamy nowy, jeśli go brak
				skill: {
					connectOrCreate: {
						where: { name: skillName.trim() },
						create: { name: skillName.trim() },
					},
				},

				// 3) reszta pól oferty
				description,
				desiredSkill,
				level,
				availability,
			},

			// 4) co zwrócić klientowi
			include: {
				skill: true,
				user: {
					select: { username: true, avatarUrl: true, location: true },
				},
			},
		})

		// dopasowania ofert (jeśli masz taką logikę)
		await matchingService.findAndCreateMatchesForNewOffer(offer)

		return res.status(201).json(offer)
	} catch (err) {
		console.error('Offer create error:', err)
		return res.status(500).json({ message: 'Error creating offer', error: err.message })
	}
}

module.exports = { createOffer }



const getAllOffers = async (req, res) => {
	try {
		const offers = await prisma.offer.findMany({
			where: { isActive: true },
			include: {
				skill: true,
				user: { select: { id: true, username: true, avatarUrl: true, location: true } },
			},
			orderBy: {
				createdAt: 'desc',
			},
		})
		res.json(offers)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching offers', error: error.message })
	}
}

// Pobierz jedną ofertę po ID
const getOfferById = async (req, res, next) => {
	try {
		const offer = await prisma.offer.findUnique({
			where: { id: req.params.id },
			include: { skill: true, user: { select: { id: true, username: true, avatarUrl: true } } },
		})
		if (offer) res.json(offer)
		else res.status(404).json({ message: 'Offer not found' })
	} catch (error) {
		next(error)
	}
}

// Aktualizuj ofertę
const updateOffer = async (req, res, next) => {
	const { description, desiredSkill, level, availability, isActive } = req.body
	try {
		const offer = await prisma.offer.findUnique({ where: { id: req.params.id } })
		if (!offer || offer.userId !== req.user.id)
			return res.status(404).json({ message: 'Offer not found or not authorized' })

		const updatedOffer = await prisma.offer.update({
			where: { id: req.params.id },
			data: { description, desiredSkill, level, availability, isActive },
		})
		res.json(updatedOffer)
	} catch (error) {
		next(error)
	}
}

// Usuń ofertę
const deleteOffer = async (req, res, next) => {
	try {
		const offer = await prisma.offer.findUnique({ where: { id: req.params.id } })
		if (!offer || offer.userId !== req.user.id)
			return res.status(404).json({ message: 'Offer not found or not authorized' })

		await prisma.offer.delete({ where: { id: req.params.id } })
		res.json({ message: 'Offer removed' })
	} catch (error) {
		next(error)
	}
}
module.exports = { createOffer, getAllOffers, getOfferById, updateOffer, deleteOffer }
