const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const notes = require('../models/Notes');


// ROUTE 1: get all notes: GET "/api/auth/createuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    //console.log(notes)
    var fetchedNotes = await notes.find({user: req.user.id})
    res.json(fetchedNotes)
} )

module.exports = router