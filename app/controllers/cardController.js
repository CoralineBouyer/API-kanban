const { Card, Tag } = require("../models");
const { allTags } = require("./tagController");

const cardController = {


    async allCards(req, res, next) {

        try {
            const cards = await Card.findAll();
            res.json(cards);

        } catch (error) {
            next();
        }
    },

    async oneCard(req, res, next) {
        try {
            const cardId = Number(req.params.id);
            // je cherche la liste qui m'intéresse
            const card = await Card.findByPk(cardId);
            // J'envoie la data trouvée en json
            res.json(card);
        } catch (error) {
            next();
        }
    },

    async createCard(req, res) {
        try {
            const cardBody = req.body;
            const newCard = await Card.create(cardBody);
            res.json(newCard);
        } catch (error) {
            res.status(400).json({
                error: 'Bad Request'
            });
        }
    },

    async updateCard(req, res) {
        try {
            // Je trouve la carte en question        
            const cardId = Number(req.params.id);
            const cardToUpdate = await Card.findByPk(cardId);

            // Je veux que le title renseigné dans le body devienne le nouveau title de ma carte
            cardToUpdate.title = req.body.title;
            const updatedCard = await cardToUpdate.save();
            res.json(updatedCard);

        } catch (error) {
            res.status(400).json({
                error: 'Bad Request'
            });
        }


    },

    async deleteCard(req, res) {
        try {
            // Je trouve la liste en question        
            const cardId = Number(req.params.id);
            const cardToDelete = await Card.findByPk(cardId);

            const deletedCard = await cardToDelete.destroy();

            res.json(deletedCard);
        } catch (error) {
            res.status(400).json({
                error: 'Bad Request'
            });
        }
    },

    async associateTagtoCard(req, res) {
        try {
            const cardId = Number(req.params.id);
            const cardToAssociate = await Card.findByPk(cardId, {
                include: {
                    association: "tags",
                }
            });

            const tagId = req.body.tag_id;
            const tagToAdd = await Tag.findByPk(tagId)
            await cardToAssociate.addTag(tagToAdd)

            res.json(cardToAssociate);

        } catch (error) {
            res.status(400).json({
                error: 'Bad Request'
            });
        }
    },

    async deleteAssociationTagCard(req, res) {
        try {
            const cardId = Number(req.params.id);
            const cardToAssociate = await Card.findByPk(cardId, {
                include: {
                    association: "tags",
                }
            });

            const tagId = req.params.tag_id;
            const tagToAdd = await Tag.findByPk(tagId)
            await cardToAssociate.removeTag(tagToAdd)

            res.json(cardToAssociate);

        } catch (error) {
            res.status(400).json({
                error: 'Bad Request'
            });
        }
    }

}

module.exports = cardController;