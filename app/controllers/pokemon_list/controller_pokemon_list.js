const express = require('express')
const router = express.Router()
const axios_sender = require('../../module/request');

router.get("/", async function(req, res){
    var pokemon_list = await axios_sender.send('GET', 'https://pokeapi.co/api/v2/pokemon/?limit=151', {}, {});

    var pokemon_data = pokemon_list.data.results
    res.render('list/list', 
    {
        result: pokemon_data
    });
})

module.exports = router