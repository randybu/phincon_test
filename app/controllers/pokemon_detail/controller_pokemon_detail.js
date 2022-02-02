const express = require('express')
const router = express.Router()
const axios_sender = require('../../module/request');
const redis = require('../../module/redis_connector');


router.get("/:id", async function(req, res){
    var pokemon = await axios_sender.send('GET', 'https://pokeapi.co/api/v2/pokemon/'+req.params.id, {}, {});

    res.render('detail/detail', 
    {
        pokemon: pokemon.data
    });
})

router.post("/catch", async function(req, res){
    var catched = true
    if (Math.random() >= 0.5) {
        catched = false;
    }else{
        var get = await redis.get('my_pokemon')
        if(get[0] != null){
            var pokemon_list = JSON.parse(get[0])
            pokemon_list = pokemon_list.data
        }else{
            pokemon_list = []
        }


        pokemon_list.push(
            {
                id: req.body.id,
                nickname: "",
                real_name: req.body.name,
                pk: ''+Math.floor(Math.random() * 100000),
                name_update_count: -1
            }
        )
        console.log(JSON.stringify({data:pokemon_list}))


        var set = await redis.set("my_pokemon", JSON.stringify({data:pokemon_list}), 360000)
    }


    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({catched}));    
})


module.exports = router