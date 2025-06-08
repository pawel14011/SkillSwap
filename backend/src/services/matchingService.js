const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const findAndCreateMatchesForNewOffer = async (newOffer) => {
    // 1. Znajdź umiejętność, której szuka autor nowej oferty
    const desiredSkillName = newOffer.desiredSkill;
    const taughtSkillId = newOffer.skillId;
    
    try {
        // 2. Znajdź umiejętność w bazie danych
        const desiredSkillInDB = await prisma.skill.findFirst({
            where: { name: { equals: desiredSkillName, mode: 'insensitive' } }
        });

        if (!desiredSkillInDB) {
            console.log(`Desired skill "${desiredSkillName}" not found in DB. No match possible.`);
            return;
        }

        // 3. Znajdź wszystkie oferty, które uczą tej umiejętności
        const potentialMatchingOffers = await prisma.offer.findMany({
            where: {
                skillId: desiredSkillInDB.id,
                isActive: true,
                userId: { not: newOffer.userId } // Wyklucz oferty tego samego użytkownika
            },
            include: {
                skill: true
            }
        });

        // 4. Sprawdź, czy któraś z tych ofert szuka umiejętności z nowej oferty
        const taughtSkillInNewOffer = await prisma.skill.findUnique({ where: { id: taughtSkillId } });

        for (const potentialOffer of potentialMatchingOffers) {
            if (potentialOffer.desiredSkill.toLowerCase() === taughtSkillInNewOffer.name.toLowerCase()) {
                // ZNALEZIONO DOPASOWANIE!
                console.log(`Match found between offer ${newOffer.id} and ${potentialOffer.id}`);
                
                // Sprawdź, czy takie dopasowanie już nie istnieje
                const existingMatch = await prisma.match.findFirst({
                    where: {
                        OR: [
                            { user1Id: newOffer.userId, user2Id: potentialOffer.userId },
                            { user1Id: potentialOffer.userId, user2Id: newOffer.userId }
                        ],
                        status: { in: ['PENDING', 'ACCEPTED'] }
                    }
                });

                if (!existingMatch) {
                    await prisma.match.create({
                        data: {
                            user1Id: newOffer.userId,
                            user2Id: potentialOffer.userId,
                            offer1Id: newOffer.id,
                            offer2Id: potentialOffer.id,
                            status: 'PENDING'
                        }
                    });

                    // Utwórz powiadomienia dla obu użytkowników
                    await prisma.notification.createMany({
                       data: [
                           { userId: newOffer.userId, content: `Masz nowe dopasowanie z użytkownikiem ${potentialOffer.userId}!` },
                           { userId: potentialOffer.userId, content: `Masz nowe dopasowanie z użytkownikiem ${newOffer.userId}!` }
                       ]
                    });
                }
            }
        }

    } catch (error) {
        console.error("Error in matching service:", error);
    }
};

module.exports = { findAndCreateMatchesForNewOffer };