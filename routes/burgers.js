// 'use strict'
var express = require('express');
var burgers = express.Router();

var dumpMethod = (req,res)=>res.send( req.method + " burgers! // METHOD NOT IMPLEMENTED" )

var burgerData = [];
burgers.route('/')
/*burger homepage*/
    .get((req,res)=>{
    res.render('/pages/home')})

    .post((req,res)=>{
    	// insert our new burger into the collection
    	// burgerData.push(req.body);
      console.log("POSTTT");
    	// redirect to the new item (in a db, you'd return the new id)
    	// var newID = burgerData.length-1;
    	// res.redirect('./'+ newID)
    });


    // single burgers
    burgers.route('/:ID')
    	.get((req,res)=>{
        var bID = req.params.burgerID;
        // if there is not a burger at position :burgerID, throw a non-specific error
        if(!(bID in burgerData)){
          console.log("hello");
        }
        res.render('pages/burger_one', {
          burgerID:bID,
          burgerURL:'/burgers/'+bID,
          burgerData: burgerData[bID]})
      })
      /*one burger update*/
      .put((req,res)=>{
        var bID = req.params.burgerID;
        console.log("PUUUUUUUT", req.body)
        // if we don't have a burger there, let's
        if(!(bID in burgerData)){
          res.sendStatus(404);
          return;
        }

        //replace the burger at :burgerID position
        burgerData[bID] = req.body;

        //redirect to the new burger
        res.redirect('./' + bID)
      })
      .delete(dumpMethod)





module.exports = burgers;
