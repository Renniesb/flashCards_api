const express = require('express');
const app = require('../app');
const router = express.Router();


// get and 
router.route('/decks')
.get((req,res)=>{
    res.send("all flashcard decks")
})







module.exports = router;