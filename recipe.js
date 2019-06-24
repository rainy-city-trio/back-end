const express = require("express");
const serverless = require("serverless-http");
const mysql = require("mysql");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // *** LEAVE THIS. THIS IS THE DATABASE NOT THE TABLE ***
  database: "myrecipeapp"
});


//Create recipe list
app.post("/recipe", function (request, response) {
// sent contains the object sent from the front-end
  const sent = request.body;
  //diietary is the dietary reqs (vegan, vegetarian, glutenfree) sent from the front end.
  const dietary = sent.dietary;
  // ingredients is the array of ingredients sent by the front end.
  const ingredients = sent.ingredients;
  var string;

  // initial SQL query to rerieve the recipes with the relevant dietary reqs (string)
  string = "SELECT * FROM dietary_reqs WHERE dietName='" + dietary + "';";
  if (dietary === "none") {
    string = "SELECT * FROM dietary_reqs;";
  }

  // get the list of recipeIds filtered by dietary
  connection.query(string, function (error, results, fields) {
    if (error) {
      console.log("Error saving new task", error);
      response.status(500).json({
        error: error
      });
    }
    else {
      // results now contains the recipeIds filtered by dietary reqs

      // dietaryID is the number of the relevant dietary reqs
      var dietaryId = results[0].dietaryId;
      //Add wildcard
      dietaryId = dietaryId + '%';

      //SQL Query String to get the appropriate data from the dbs.
      string = 'SELECT * FROM recipe_dietary JOIN recipes ON recipe_dietary.recipeId = recipes.recipeId  JOIN recipe_ingredients ON recipe_ingredients.recipeId = recipes.recipeId  JOIN ingredients ON ingredients.ingredientId = recipe_ingredients.ingredientId JOIN recipe_season ON recipe_season.recipeId = recipes.recipeId JOIN seasons ON seasons.seasonId=recipe_season.seasonId WHERE recipe_dietary.dietaryId=?;'
      if (dietary === "none") {
        string = 'SELECT * FROM recipe_dietary JOIN recipes ON recipe_dietary.recipeId = recipes.recipeId  JOIN recipe_ingredients ON recipe_ingredients.recipeId = recipes.recipeId  JOIN ingredients ON ingredients.ingredientId = recipe_ingredients.ingredientId JOIN recipe_season ON recipe_season.recipeId = recipes.recipeId JOIN seasons ON seasons.seasonId=recipe_season.seasonId WHERE recipe_dietary.dietaryId<5;';
      }
      connection.query(string, [dietaryId], function (error, results, fields) {
        if (error) {
          console.log("Error saving new task", error);
          response.status(500).json({
            error: error
          });
        }
        else {
          // returned results in var called results.

          //this bit checks the name of the recipe for multiple entries and collates all of the ingredients into a single recipe entry.
          var array = [];
          var matched = 0;
          // loop the length of the ingredients in the results list
          for (let i = 0; i < results.length; i++) {
            matched = 0;
            // set up the item for the ingredients & 
            results[i].ingredients = [];
            results[i].ingredientMatch = 0;
            //is the object already in the array?

            // inner loop to put the recipe with ingredients into the new array
            for (let k = 0; k < array.length; k++) {
              if (array[k].name === results[i].name) {
                // if the recipe is already in the array, add the ingredients
                array[k].ingredients.push({ ingredient: results[i].ingredientName, qty: results[i].quantity });
                //set a flag to indicate the recipe is now in the array
                matched = 1;
              }
            }

            if (matched === 0) {
              // if the recipe wasn't in the array already, add the ingredients to the recipe
              results[i].ingredients.push({ ingredient: results[i].ingredientName, qty: results[i].quantity });
              //push the recipe into the array
              array.push(results[i]);
            }
          }

          //filter array to remove duplicate ingredients
          for (let i = 0; i < array.length; i++) {
            //noMultsArray holds the names that have been checked iteratively.
            var noMultsArray = []
            //newArray holds the results to be copied into the final results.
            var newArray = []
            for (let j = 0; j < array[i].ingredients.length; j++) {
              // see if this item is already in the array. 
              if (newArray.indexOf(array[i].ingredients[j].ingredient) === -1) {
                //if its not in the array, copy it into the new array & the verification array
                noMultsArray.push(array[i].ingredients[j])
                newArray.push(array[i].ingredients[j].ingredient)
              }
            }
            // copy the new array into the object
            array[i].ingredients = noMultsArray
          }

          //array now holds the data
          //This bit counts the matches and only searches the first X chars based on the length of the entered ingredient

          //outer array loop
          for (let j = 0; j < array.length; j++) {
            var object = array[j];
            var matchcount = 0;
            //inner loop the number of ingreients in the object array
            for (let i = 0; i < object.ingredients.length; i++) {
              // loop to compare each ingredient in the loops.
              for (let k = 0; k < ingredients.length; k++) {
                // get the length of the names of the ingredients to be compared.
                let ingLength = ingredients[k].length
                let objIngLength = object.ingredients[i].ingredient.length
                // do comparison if the length of the ingredients name is <= object ingredients name.
                if (ingLength <= objIngLength) {
                  if (object.ingredients[i].ingredient.slice(0, ingLength) === ingredients[k].slice(0, ingLength)) {
                    // if the ingredients match, increment the count
                    matchcount = matchcount + 1;
                  }
                }
              }
              //save the number of matches into the final data array.
              array[j].ingredientMatch = matchcount;
            }
          }

          // this is the final response    
          response.json(array);
        }
      });
    }
  });
});

//UPDATE tasks
app.put("/recipe/:id", function (request, response) {
  // //  const customer = request.body
  // const id = request.params.id
  // // connection.query('UPDATE Tasks SET description = "'+taskToBeUpdated.description+'", done = '+taskToBeUpdated.completed+', userid = '+taskToBeUpdated.userid+' WHERE taskid = '+taskId, function(err, result, fields) {
  // connection.query('UPDATE Tasks SET done = 1 WHERE taskId = ' + id, function (err, result, fields) {
  //   if (err !== null) {
  //     console.log("Something went wrong updating the task", err)
  //     response.send(500)
  //   } else {
  //     response.send("Item Updated")
  //   }
  // })
})

// Fetch tasks
app.get("/recipe", function (request, response) {
  // connection.query("SELECT * FROM Tasks", function (err, result, fields) {
  //   if (err !== null) {
  //     console.log("error fetching tasks", err)
  //     response.send(500)
  //   } else
  //     response.json({ tasks: result })
  // })
})

//Delete tasks
app.delete("/recipe/:id", function (request, response) {
  // const id = request.params.id
  // connection.query("DELETE FROM Tasks WHERE taskId = ?", [id], function (err, result, fields) {
  //   if (err !== null) {
  //     console.log("Something went wrong deleting the task", err)
  //     response.send(500)
  //   } else {
  //     response.send("Item Deleted")
  //   }
  // })
})

module.exports.handler = serverless(app)

//Endpoint https://6q4rpz2qb6.execute-api.eu-west-2.amazonaws.com/dev/recipe
// to deploy:- serverless deploy function --function reecipe
// if just the tasks file has been update you can use 'serverless deploy' on its own
