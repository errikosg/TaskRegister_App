const express = require('express');
const router = express.Router();

//get mysql pool
const pool = require('../helper/pool')
const { buildResponse } = require('../helper/functions');

// get all tasks
router.get("/tasks", function(req,res){
    pool.getConnection(function(err, connection){
        if (err) {
            return buildResponse(res, 500, "Error in connection to database", null, connection);
        }
        connection.query("SELECT * FROM Task", function(err,result){
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

// get a specific task
router.get("/tasks/:tid", function(req,res){
    pool.getConnection(function(err, connection){
        if (err) {
          return buildResponse(res, 500, "Error in connection to database", null, connection);
        }

        const requestedId = req.params.tid;
        const query = "SELECT * FROM Task WHERE task_id=?";
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

// get tasks by organization
router.get("/tasks/by_org/:oid", function(req,res){
    pool.getConnection(function(err, connection){
        if (err) {
          return buildResponse(res, 500, "Error in connection to database", null, connection);
        }

        const org_id = req.params.oid;
        const query = "SELECT * FROM Task WHERE org_id=?";
        connection.query(query, [org_id], function(err,result){
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

// add a task
router.post("/tasks", function(req,res){
    pool.getConnection(function(err, connection){
        if (err) {
          return buildResponse(res, 500, "Error in connection to database", null, connection);
        }

        const {org_id,title,startDate,endDate,product,description,evaluation,comments} = (req.body);
        const query = "INSERT INTO Task(org_id,title,startDate,endDate,product,description,evaluation,comments) VALUES (?,?,?,?,?,?,?,?)";
        connection.query(query, [org_id,title,startDate,endDate,product,description,evaluation,comments], function(err,result){
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

// update a task
router.patch("/tasks/:tid", function(req,res){
    pool.getConnection(function(err, connection){
        if (err) {
          return buildResponse(res, 500, "Error in connection to database", null, connection);
        }

        const requestedId = req.params.tid;
        const {title,startDate,endDate,product,description,evaluation,comments} = (req.body);
        const query = "UPDATE Task SET title=?, startDate=?, endDate=?, product=?, description=?, evaluation=?, comments=? WHERE task_id=?";
        connection.query(query, [title,startDate,endDate,product,description,evaluation,comments,requestedId], function(err,result){
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

// delete a task
router.delete("/tasks/:tid", function(req,res){
    pool.getConnection(function(err, connection){
        if (err) {
          return buildResponse(res, 500, "Error in connection to database", null, connection);
        }

        const requestedId = req.params.tid;
        const query = "DELETE FROM Task WHERE task_id=?";
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

// export the router
module.exports = router
