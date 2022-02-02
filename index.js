const express = require('express')
const app = express()
const path = require('path')
const c_main = require('./app/controllers/controller_main')
const redis_connector = require('./app/module/redis_connector')


// Enable proxy for get secure https
app.enable("trust proxy")

//Views
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit:50000 }))
app.use(express.json({limit: '50mb'}))
app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname+'/public')))

app.use('/', c_main)

app.listen(3000, () => console.log('Example app listening on port ' + 3000))
