const express = require('express')
const router = express.Router()
const c_p_list = require('./pokemon_list/controller_pokemon_list')
const c_detail = require('./pokemon_detail/controller_pokemon_detail')
const c_my_pokemon = require('./my_pokemon/controller_my_pokemon')



router.use("/list", c_p_list)
router.use("/detail", c_detail)
router.use("/my_pokemon", c_my_pokemon)



router.use(function(req, res){
    res.redirect('/list')
    return
});

module.exports = router