const flashCardService = {
  getAllDecks(db){
    return db
    .from('decks')
    .select('*')
    .orderBy('id')
  },
  getDeck(db, quizid){
    return db
    .from('decks')
    .where('decks.quizid', quizid)
    .select('*').orderBy('id')
  },
  getAllCards(db){
    return db
    .from('cards')
    .select('*').orderBy('id')
  },
  getCards(db, quizid){
    return db
    .from('cards')
    .where('cards.quizid', quizid)
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
  updateDeck(db,quizid, newDeckInfo){
    return db('decks')
    .where({quizid})
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