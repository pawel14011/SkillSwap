const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Pobierz profil zalogowanego użytkownika
const getUserProfile = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true, email: true, username: true, firstName: true,
                lastName: true, location: true, bio: true, avatarUrl: true,
                createdAt: true, offers: { include: { skill: true } },
                reviewsGot: { include: { reviewer: { select: { id: true, username: true } } } }
            }
        });
        if (user) res.json(user);
        else res.status(404).json({ message: 'User not found' });
    } catch (error) { next(error); }
};

// Aktualizuj profil zalogowanego użytkownika
const updateUserProfile = async (req, res, next) => {
    const { firstName, lastName, location, bio, avatarUrl } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: { firstName, lastName, location, bio, avatarUrl },
        });
        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) { next(error); }
};

// Pobierz publiczny profil użytkownika po ID
const getUserById = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id },
            select: {
                id: true, username: true, location: true, bio: true, avatarUrl: true,
                createdAt: true, offers: { where: { isActive: true }, include: { skill: true } },
                reviewsGot: { include: { reviewer: { select: { id: true, username: true } } } }
            }
        });
        if (user) res.json(user);
        else res.status(404).json({ message: 'User not found' });
    } catch (error) { next(error); }
};
module.exports = { getUserProfile, updateUserProfile, getUserById };
