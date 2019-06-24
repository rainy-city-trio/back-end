const express = require("express");
const serverless = require("serverless-http");
const mysql = require("mysql");
const app = express();
const cors = require('cors');
const body_parser= require('body-parser')

app.use(cors());
app.use(body_parser.json());



const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // *** LEAVE THIS. THIS IS THE DATABASE NOT THE TABLE ***
  database: "myrecipeapp"
});



//connection.connect()


//Create new tasks
app.post("/recipe", function (request, response) {
 // const taskToBeSaved = request.body
  
  const sent = request.body;
  const dietary = sent.dietary;
  const ingredients = sent.ingredients;
  var string;

  string="SELECT * FROM dietary_reqs WHERE dietName=?;";
  
  if (dietary==="none"){
    string="SELECT * FROM dietary_reqs;";
  }
  
  
  
  // get the list of recipeIds filtered by dietary
  connection.query(string,[dietary], function (error, results, fields) {
    if (error) {
      console.log("Error saving new task", error);
      response.status(500).json({
        error: error
      });
    }
    else {
      // res now contains the recipeIds filtered by dietary
   var dietaryId=results[0].dietaryId;
  //response.json({dietaryId});
  
  
  string='SELECT * FROM recipe_dietary JOIN recipes ON recipe_dietary.recipeId = recipes.recipeId  JOIN recipe_ingredients ON recipe_ingredients.recipeId = recipes.recipeId  JOIN ingredients ON ingredients.ingredientId = recipe_ingredients.ingredientId JOIN recipe_season ON recipe_season.recipeId = recipes.recipeId JOIN seasons ON seasons.seasonId=recipe_season.seasonId WHERE recipe_dietary.dietaryId=?;'
    if (dietary==="none") {
      string='SELECT * FROM recipe_dietary JOIN recipes ON recipe_dietary.recipeId = recipes.recipeId  JOIN recipe_ingredients ON recipe_ingredients.recipeId = recipes.recipeId  JOIN ingredients ON ingredients.ingredientId = recipe_ingredients.ingredientId JOIN recipe_season ON recipe_season.recipeId = recipes.recipeId JOIN seasons ON seasons.seasonId=recipe_season.seasonId WHERE recipe_dietary.dietaryId<5;';
    }
    
    
     connection.query(string,[dietaryId], function (error, results, fields) 
     {
    if (error) {
      console.log("Error saving new task", error);
      response.status(500).json({
        error: error
      });
    }
    else {
      
     //   response.json(results);
      
      var array=[];
    var matched=0;
    
      for (let i=0; i<results.length; i++){
        matched=0;
        // set up the item for the ingredients
        results[i].ingredients=[];
        results[i].ingredientMatch=0;
         //is the object already in the array?
  
  for (let k=0; k<array.length; k++)
  {
    
    if (array[k].name===results[i].name){
      
  //     let ingName=results[i].ingredientName;
       array[k].ingredients.push({ingredient:results[i].ingredientName, qty:results[i].quantity});
  matched=1;
  
    }}  
  
   if (matched===0){
         results[i].ingredients.push({ingredient:results[i].ingredientName, qty:results[i].quantity});
         //push the object onto the array
         array.push(results[i]);
    //     matched=1;
   }
      }
      
      //array now holds the data
      
      for (let j=0; j<array.length; j++){
      var object=array[j];
      var matchcount=0;
      for (let i=0; i<object.ingredients.length;i++){
        
      for (let k=0; k<ingredients.length; k++){
      if (object.ingredients[i].ingredient===ingredients[k]){
       matchcount=matchcount+1;
      }
      }
      
      array[j].ingredientMatch=matchcount;
      }
      }
      
    response.json(array);
  }
  });
    } 
    });
});





//UPDATE tasks
app.put("/recipe/:id", function (request, response) {
  //  const customer = request.body
  const id = request.params.id
  // connection.query('UPDATE Tasks SET description = "'+taskToBeUpdated.description+'", done = '+taskToBeUpdated.completed+', userid = '+taskToBeUpdated.userid+' WHERE taskid = '+taskId, function(err, result, fields) {
  connection.query('UPDATE Tasks SET done = 1 WHERE taskId = ' + id, function (err, result, fields) {
    if (err !== null) {
      console.log("Something went wrong updating the task", err)
      response.send(500)
    } else {
      response.send("Item Updated")
    }
  })
})


// Fetch tasks
app.get("/recipe", function (request, response) {
  connection.query("SELECT * FROM Tasks", function (err, result, fields) {
    if (err !== null) {
      console.log("error fetching tasks", err)
      response.send(500)
    } else
      response.json({ tasks: result })
  })
})


//Delete tasks
app.delete("/recipe/:id", function (request, response) {
  const id = request.params.id
  connection.query("DELETE FROM Tasks WHERE taskId = ?", [id], function (err, result, fields) {
    if (err !== null) {
      console.log("Something went wrong deleting the task", err)
      response.send(500)
    } else {
      response.send("Item Deleted")
    }
  })
})


module.exports.handler = serverless(app)

// https://sw10ki9oa4.execute-api.eu-west-2.amazonaws.com/dev/recipe
// to deploy:- serverless deploy function --function reecipe
// if just the tasks file has been update you can use 'serverless deploy' on its own
 