const express = require('express');
const router = express.Router();

//get mysql pool
const pool = require('../helper/pool')
const { buildResponse } = require('../helper/functions');

// get all organizations
router.get("/orgs", function(req,res){
    pool.getConnection(function(err, connection){
        if (err) {
          return buildResponse(res, 500, "Error in connection to database", null, connection);
        }
        connection.query("SELECT * FROM Organization", function(err,result){
            if(err){
                return buildResponse(res, 500, "Internal Server Error", null, connection);
            }
            else if(result.length === 0 || result === null) {
                return buildResponse(res, 404, "Not Found", [], connection);
            }
            else{
                return buildResponse(res, 200, "OK", result, connection);
            }
        });
        // connection.on('error', function(err) {
        //       return buildResponse(res, 500, "Error in connection to database", null, connection);
        // });
    });
});

// get a specific organization
router.get("/orgs/:oid", function(req,res){
    pool.getConnection(function(err, connection){
        if (err) {
          return buildResponse(res, 500, "Error in connection to database", null, connection);
        }

        const requestedId = req.params.oid;
        const query = "SELECT * FROM Organization WHERE org_id=?";
        connection.query(query, [requestedId], function(err,result){
            if(err){
                return buildResponse(res, 500, "Internal Server Error", null, connection);
            }
            else if(result.length === 0 || result === null) {
                return buildResponse(res, 404, "Not Found", null, connection);
            }
            else{
                return buildResponse(res, 200, "OK", result, connection);
            }
        });
        // connection.on('error', function(err) {
        //       return buildResponse(res, 500, "Error in connection to database", null, connection);
        // });
    });
});

// add an organization
router.post("/orgs", function(req,res){
    pool.getConnection(function(err, connection){
        if (err) {
          return buildResponse(res, 500, "Error in connection to database", null, connection);
        }

        const {name,startDate,endDate} = (req.body);
        const query = "INSERT INTO Organization(name,startDate,endDate) VALUES (?,?,?)";
        connection.query(query, [name,startDate,endDate], function(err,result){
            if(err) {
                return buildResponse(res, 500, "Internal Server Error", null, connection);
            }
            else{
                return buildResponse(res, 200, "OK", null, connection);
            }
        });
        // connection.on('error', function(err) {
        //       return buildResponse(res, 500, "Error in connection to database", null, connection);
        // });
    });
});

// delete an organization
router.delete("/orgs/:oid", function(req,res){
    pool.getConnection(function(err, connection){
        if (err) {
          return buildResponse(res, 500, "Error in connection to database", null, connection);
        }

        const requestedId = req.params.oid;
        const query = "DELETE FROM Organization WHERE org_id=?";
        connection.query(query, [requestedId], function(err,result){
            if(err){
                return buildResponse(res, 500, "Internal Server Error", null, connection);
            }
            else if(result.affectedRows === 0 || result === null) {
                return buildResponse(res, 404, "Not Found", null, connection);
            }
            else{
                return buildResponse(res, 200, "OK", null, connection);
            }
        });
        // connection.on('error', function(err) {
        //       return buildResponse(res, 500, "Error in connection to database", null, connection);
        // });
    });
});

// update an organization
router.patch("/orgs/:oid", function(req,res){
    pool.getConnection(function(err, connection){
        if (err) {
          return buildResponse(res, 500, "Error in connection to database", null, connection);
        }

        const requestedId = req.params.oid;
        const {name,startDate,endDate} = (req.body);        // we get the whole object in the body
        const query = "UPDATE Organization SET name=?, startDate=?, endDate=? WHERE org_id=?";
        connection.query(query, [name,startDate,endDate,requestedId], function(err,result){
            if(err){
                return buildResponse(res, 500, "Internal Server Error", null, connection);
            }
            else if(result.affectedRows === 0 || result === null) {
                return buildResponse(res, 404, "Not Found", null, connection);
            }
            else{
                return buildResponse(res, 200, "OK", null, connection);
            }
        });
        // connection.on('error', function(err) {
        //       return buildResponse(res, 500, "Error in connection to database", null, connection);
        // });
    });
});

// export the router
module.exports = router
