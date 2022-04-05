const express = require("express");

const listController = require("./controllers/listController");
const cardController = require("./controllers/cardController");
const tagController = require("./controllers/tagController");


const router = express.Router();

router.get('/', (req, res) => res.send('Hi there !'));
// LISTCONTROLLER
// All lists
router.get("/lists", listController.allLists);
router.post("/lists", listController.createList);
// One list
router.get("/lists/:id", listController.oneList);
router.get("/lists/:id/cards", listController.listOfCards);

router.patch("/lists/:id", listController.updateList)
router.delete("/lists/:id", listController.deleteList)


// CARDCONTROLLER
// All cards
router.get("/cards", cardController.allCards);
router.post("/cards", cardController.createCard);
// One card
router.get("/cards/:id", cardController.oneCard);
router.patch("/cards/:id", cardController.updateCard);
router.delete("/cards/:id", cardController.deleteCard);
// Associations
router.post("/cards/:id/tag", cardController.associateTagtoCard);
router.delete("/cards/:id/tag/:tag_id", cardController.deleteAssociationTagCard);


// TAGCONTROLLER
// All tags
router.get("/tags", tagController.allTags);
router.post("/tags", tagController.createTag);
// One tag
router.get("/tags/:id", tagController.oneTag);
router.patch("/tags/:id", tagController.updateTag);
router.delete("/tags/:id", tagController.deleteTag);


module.exports = router;
