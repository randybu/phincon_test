const axios = require('axios')

module.exports = { 
    send: async function(method, url, params, header){
        if(method == 'GET'){
            var return_data = ""
            var result = await axios.get(url, header).catch(function (error) {
                if(error){
                    return_data = {type: "error", data: error.code, path: error.config.url}
                }
            })
            if(return_data != ""){
                if(return_data.type == "error"){
                    return return_data
                }else{
                    return {type: "data", data: result.data}
                }
            }else{
                return {type: "data", data: result.data}
            }         
        }else if(method == 'POST'){
            var return_data = ""
            var result = await axios.post(url, params, header).catch(function (error) {
                if(error){
                    return_data = {type: "error", data: error.code, path: error.config.url}
                }
                console.log(error)
            })
            if(return_data != ""){
                if(return_data.type == "error"){
                    return return_data
                }else{
                    return {type: "data", data: result.data}
                }
            }else{
                return {type: "data", data: result.data}
            }

        }
    }
}