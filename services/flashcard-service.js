const flashCardService = {
  getAllDecks(db){
    return db
    .from('decks')
    .select('*')
    .orderBy('id')
  },
  getAllCards(db){
    return db
    .from('cards')
    .select('*').orderBy('id')
  },
  getCards(db, deckNum){
    return db
    .from('cards')
    .where('cards.deckid', deckNum)
    .select('*').orderBy('id')
  },
  insertDeck(db, newDeck){
    return db
      .insert(newDeck)
      .into('decks')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  insertCard(db, newCard){

    return db
      .insert(newCard)
      .into('cards')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  updateDeck(db,id, newDeckInfo){
    return db('decks')
    .where({id})
    .update(newDeckInfo)
  },
  updateCard(db,id, newCardFields){
    return db('cards')
    .where({id})
    .update(newCardFields)
  },
  deleteDeck(db, id){
    return db('decks')
      .where({id})
      .delete()
  },
  deleteCard(db, id){
    return db('cards')
      .where({id})
      .delete()
  },
}

module.exports = flashCardService