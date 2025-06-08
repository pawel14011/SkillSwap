const { PrismaClient, MatchStatus } = require('@prisma/client');
const prisma = new PrismaClient();

// Pobierz wszystkie dopasowania dla zalogowanego użytkownika
const getMyMatches = async (req, res, next) => {
    try {
        const matches = await prisma.match.findMany({
            where: {
                OR: [{ user1Id: req.user.id }, { user2Id: req.user.id }],
                status: { notIn: ['REJECTED', 'CANCELLED'] }
            },
            include: {
                user1: { select: { id: true, username: true, avatarUrl: true } },
                user2: { select: { id: true, username: true, avatarUrl: true } },
            }
        });
        res.json(matches);
    } catch (error) { next(error); }
};

// Zaktualizuj status dopasowania (np. akceptuj)
const updateMatchStatus = async (req, res, next) => {
    const { status } = req.body; // Oczekiwane statusy: ACCEPTED, REJECTED, COMPLETED, CANCELLED
    const validStatuses = Object.values(MatchStatus);
    if (!validStatuses.includes(status)) return res.status(400).json({ message: 'Invalid status' });

    try {
        const match = await prisma.match.findFirst({
            where: { id: req.params.id, user2Id: req.user.id, status: 'PENDING' }
        });
        if (!match) return res.status(404).json({ message: 'Match not found or you are not authorized to accept it' });

        const updatedMatch = await prisma.match.update({
            where: { id: req.params.id },
            data: { status }
        });
        // Utwórz powiadomienie dla inicjatora dopasowania
        if (status === 'ACCEPTED' || status === 'REJECTED') {
            await prisma.notification.create({
                data: { userId: match.user1Id, content: `Twoje dopasowanie zostało ${status.toLowerCase()}.` }
            });
        }
        res.json(updatedMatch);
    } catch (error) { next(error); }
};
module.exports = { getMyMatches, updateMatchStatus };