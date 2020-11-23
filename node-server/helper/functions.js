module.exports = {
    buildResponse: function(response, code, status, result, connection) {
        connection.release();
        if(!result){
            response.status(code).json({"code" : code, "status" : status});
        }
        else{
            response.status(code).json(result);
        }
    }
}
