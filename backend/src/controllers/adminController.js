const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({ select: { id: true, email: true, username: true, role: true, createdAt: true } });
        res.json(users);
    } catch (error) { next(error); }
};
const deleteUser = async (req, res, next) => {
    try {
        await prisma.user.delete({ where: { id: req.params.id } });
        res.json({ message: 'User deleted' });
    } catch (error) { next(error); }
};
const getAllOffersAdmin = async (req, res, next) => {
    try {
        const offers = await prisma.offer.findMany({ include: { user: true, skill: true } });
        res.json(offers);
    } catch (error) { next(error); }
};
const deleteOfferAdmin = async (req, res, next) => {
    try {
        await prisma.offer.delete({ where: { id: req.params.id } });
        res.json({ message: 'Offer deleted' });
    } catch (error) { next(error); }
};
module.exports = { getAllUsers, deleteUser, getAllOffersAdmin, deleteOfferAdmin };