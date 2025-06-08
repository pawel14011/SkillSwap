const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createReview = async (req, res, next) => {
    const { matchId, reviewedId, rating, comment } = req.body;
    try {
        const match = await prisma.match.findUnique({ where: { id: matchId } });
        if (!match || match.status !== 'COMPLETED') return res.status(400).json({ message: 'Cannot review an incomplete match' });
        if (match.user1Id !== req.user.id && match.user2Id !== req.user.id) return res.status(403).json({ message: 'Not part of this match' });
        if (reviewedId !== match.user1Id && reviewedId !== match.user2Id) return res.status(400).json({ message: 'Reviewed user is not part of this match' });

        const newReview = await prisma.review.create({
            data: { rating: parseInt(rating), comment, matchId, reviewerId: req.user.id, reviewedId }
        });
        res.status(201).json(newReview);
    } catch (error) {
        if (error.code === 'P2002') return res.status(400).json({ message: 'You have already reviewed this match.' });
        next(error);
    }
};

const getReviewsForUser = async (req, res, next) => {
    try {
        const reviews = await prisma.review.findMany({
            where: { reviewedId: req.params.userId },
            include: { reviewer: { select: { id: true, username: true, avatarUrl: true } } }
        });
        res.json(reviews);
    } catch (error) { next(error); }
};
module.exports = { createReview, getReviewsForUser };