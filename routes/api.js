const express = require('express');
const router = express.Router();



router.route('/decks')
.get((req,res)=>{
    res.send("all flashcard decks")
})







module.exports = router;