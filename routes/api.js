const express = require('express');
const app = require('../app');
const router = express.Router();
const deckService = require('../services/flashcard-service');
const jsonBodyParser = express.json();

//place response from the server into a serialized format

const serializeDeck = deck => ({
    id: deck.id,
    deckname:deck.deckname,
    deckdescription:deck.deckdescription,
})

const serializeCard = card => ({
    id: card.id,
    term: card.term,
    definition: card.definition,
    quizid: card.quizid
  })

// get flashcards 
router.route('/decks')
.get((req,res,next)=>{
    deckService.getAllDecks(req.app.get('db'))
    .then((deck)=>{
        res.json(deck)
    })
    .catch(next)
})
.post(jsonBodyParser,(req, res, next)=>{

    const {deckname, deckdescription, quizid} = req.body;
    const newDeck = {deckname, deckdescription,quizid} 
    deckService.insertDeck(req.app.get('db'), newDeck)
    .then(deck => {
      res
        .status(201)
        .json(serializeDeck(deck))
    })
    .catch(next)
})
router.get('/decks/:deckNum/cards', (req,res,next)=>{
    deckService.getCards(req.app.get('db'),req.params.deckNum)
    .then(cards => {
      res.json(cards) 
    })
    .catch(next)
})
router.get('/cards', (req,res,next)=>{
  deckService.getAllCards(req.app.get('db'),req.params.deckNum)
  .then(cards => {
    res.json(cards) 
  })
  .catch(next)
})
router.post('/cards', jsonBodyParser, function(req,res,next){
    const {front, back, quizid} = req.body
    const newCard = {front, back, quizid}
  
    for (const [key, value] of Object.entries(jsonBodyParser))
        if (value == null)
          return res.status(400).json({
            error: { message: `Missing '${key}' in request body` }
    })
  
  
    deckService.insertCard(req.app.get('db'), newCard)
    .then(card => {
      res
        .status(201)
        .json(serializeCard(card))
    })
    .catch(next)
})
router.patch('/decks/:quizid',jsonBodyParser, (req, res, next)=>{
    const { 
      deckname,
      deckdescription,
      quizid
    } = req.body
    const deckToUpdate = {
        deckname,
        deckdescription,
        quizid
    }
  
    //make sure that the card contains all the required values
    const numberOfValues = Object.values(deckToUpdate).filter(Boolean).length
    
    
    deckService.updateDeck(
      req.app.get('db'),
      req.params.quizid,
      deckToUpdate
    )
    .then(()=>{
      res.status(204).end()
    })
    .catch(next)
})
router.patch('/cards/:id',jsonBodyParser, (req, res, next)=>{
    const { 
      front,
      back
    } = req.body
    const cardToUpdate = {
        front,
        back
    }
  

    deckService.updateCard(
      req.app.get('db'),
      req.params.id,
      cardToUpdate
    )
    .then(()=>{
      res.status(204).end()
    })
    .catch(next)
})
router.delete('/decks/:id',(req, res, next) => {
  deckService.deleteDeck(
    req.app.get('db'),
    req.params.id
  )
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          error: { message: `Deck doesn't exist` }
        })
      }
      res.status(204).json().end()
    })
    .catch(next)
})
router.delete('/cards/:id',(req, res, next) => {
  deckService.deleteCard(
    req.app.get('db'),
    req.params.id
  )
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          error: { message: `Deck doesn't exist` }
        })
      }
      res.status(204).json().end()
    })
    .catch(next)
})




module.exports = router;