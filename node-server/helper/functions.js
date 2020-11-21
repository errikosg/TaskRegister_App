module.exports = {
    buildResponse: function(response, code, status, result, connection) {
        connection.release();
        if(!result){
            response.json({"code" : code, "status" : status});
        }
        else{
            response.json(result);
        }
    }
}
