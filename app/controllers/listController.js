const { List } = require("../models");

const listController = {


    async allLists(req, res, next) {
        try {
            const lists = await List.findAll({
                include: [{
                    association: 'cards',
                    include: ['tags']
                }]
            })
            // console.log("Je suis ici", lists)
            res.json(lists);
        } catch (error) {
            next()
        }
    },

    async oneList(req, res, next) {
        try {
            const listId = Number(req.params.id);
            // je cherche la liste qui m'intéresse
            const list = await List.findByPk(listId);
            // J'envoie la data trouvée en json
            res.json(list);
        } catch (error) {
            next();
        }
    },

    async listOfCards(req, res) {
        try {
            const listId = Number(req.params.id);
            const ListToDisplay = await List.findByPk(listId, {
                include: "cards"
            });


            res.json(ListToDisplay.cards);

        } catch (error) {
            res.status(400).json({
                error: 'Bad Request'
            });
        }
    },

    async createList(req, res) {
        try {
            const listBody = req.body;
            const newList = await List.create(listBody);

            res.json(newList);
        } catch (error) {
            res.status(400).json({
                error: "Request incorrect"
            });
        }
    },

    async updateList(req, res) {
        try {
            // Je trouve la liste en question        
            const listId = Number(req.params.id);
            const listToUpdate = await List.findByPk(listId);

            // Je veux que le name renseigné dans le body devienne le nouveau name de ma liste
            listToUpdate.name = req.body.name;
            const updatedList = await listToUpdate.save();

            res.json(updatedList);
        } catch (error) {
            res.status(400).json({
                error: 'Bad Request'
            });
        }
    },

    async deleteList(req, res) {
        try {
            // Je trouve la liste en question        
            const listId = Number(req.params.id);
            const listToDelete = await List.findByPk(listId);

            const deletedList = await listToDelete.destroy();

            res.json(deletedList);
        } catch (error) {
            res.status(400).json({
                error: 'Bad Request'
            });
        }
    },

}

module.exports = listController;