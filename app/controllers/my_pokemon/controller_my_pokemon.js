const express = require('express')
const router = express.Router()
const axios_sender = require('../../module/request');
const redis = require('../../module/redis_connector')

router.get("/", async function(req, res){
    var get = await redis.get('my_pokemon')
    var pokemon_list = []

    if(get[0] != null){
        pokemon_list = JSON.parse(get[0])
        pokemon_list = pokemon_list.data
    }

    res.render('my_pokemon/my_pokemon', 
    {
        result: pokemon_list
    });
})

router.get("/flushdb", async function(req, res){
    var flush = await redis.flushdb()
    res.redirect('/my_pokemon')
})

router.post("/update_nickname", async function(req, res){
    function fibonacci(num){
        var a = 1, b = 0, temp;
      
        while (num >= 0){
          temp = a;
          a = a + b;
          b = temp;
          num--;
        }
      
        return b;
    }

    var get = await redis.get('my_pokemon')
    var pokemon_list = []

    var pk = req.body.pk
    var nickname = req.body.nickname

    if(get[0] != null){
        pokemon_list = JSON.parse(get[0])
        pokemon_list = pokemon_list.data
    }

    for(let i =0;i<pokemon_list.length; i++){
        console.log(pokemon_list[i].pk, pk)

        if(pokemon_list[i].pk == pk){
            var name_update_count = pokemon_list[i].name_update_count
            if(name_update_count == -1){
                pokemon_list[i].nickname = nickname
                pokemon_list[i].name_update_count = 0
            }else{
                if(nickname.includes('-')){
                    var split = nickname.split('-')
                    if(split[1] == ''+fibonacci(name_update_count)){

                        pokemon_list[i].nickname = nickname
                        pokemon_list[i].name_update_count = name_update_count + 1

                        console.log(pokemon_list[i])

                    }else{
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).send(JSON.stringify({
                            error: 1,
                            message: "not fibonacci"
                        }));  
                        return; 
                    }
                }else{
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send(JSON.stringify({
                        error: 1,
                        message: "not includes - "
                    }));   
                    return;
                }
            }
        }
    }

    var set = await redis.set("my_pokemon", JSON.stringify({data:pokemon_list}), 360000)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({
        error: 0,
        message: "success"
    }));   
    return;
})

router.post("/release", async function(req, res){
    var get = await redis.get('my_pokemon')
    var pokemon_list = []

    var pk = req.body.pk

    if(get[0] != null){
        pokemon_list = JSON.parse(get[0])
        pokemon_list = pokemon_list.data
    }

    for(let i =0;i<pokemon_list.length; i++){
        console.log(pokemon_list[i].pk, pk)

        if(pokemon_list[i].pk == pk){
            pokemon_list.splice(i, 1)
        }
    }

    var set = await redis.set("my_pokemon", JSON.stringify({data:pokemon_list}), 360000)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({
        error: 0,
        message: "success"
    }));   
    return;
})

router.post("/random_number", async function(req, res){
    var random_number = Math.floor(Math.random() * 100)

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({
        error: 0,
        message: "success",
        data: random_number
    }));   
    return;
})

module.exports = router