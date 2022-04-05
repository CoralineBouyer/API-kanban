const { Tag } = require("../models");

const tagController = {


    async allTags(req, res, next) {

        try {
            const tags = await Tag.findAll();
            res.json(tags);

        } catch (error) {
            next();
        }
    },

    async oneTag(req, res, next) {
        try {
            const tagId = Number(req.params.id);
            // je cherche la liste qui m'intéresse
            const tag = await Tag.findByPk(tagId);
            // J'envoie la data trouvée en json
            res.json(tag);

        } catch (error) {
            next();
        }
    },

    async createTag(req, res) {
        try {
            const tagBody = req.body;
            const newTag = await Tag.create(tagBody);
            res.json(newTag);

        } catch (error) {
            res.status(400).json({
                error: 'Bad Request'
            });
        }
    },

    async updateTag(req, res) {
        try {
            // Je trouve le tag en question        
            const tagId = Number(req.params.id);
            const tagToUpdate = await Tag.findByPk(tagId);

            // Je veux que le name renseigné dans le body devienne le nouveau name de mon tag
            tagToUpdate.name = req.body.name;
            const updatedTag = await tagToUpdate.save();

            res.json(updatedTag);

        } catch (error) {
            res.status(400).json({
                error: 'Bad Request'
            });
        }
    },

    async deleteTag(req, res) {
        // Je trouve la liste en question        
        try {
            const tagId = Number(req.params.id);
            const tagToDelete = await Tag.findByPk(tagId);

            const deletedTag = await tagToDelete.destroy();

            res.json(deletedTag);
        } catch (error) {
            res.status(400).json({
                error: 'Bad Request'
            });
        }
    },

}

module.exports = tagController;