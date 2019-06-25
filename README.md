# back-end
Recipe project backend
OVERVIEW
This code takes an object parameter (dietary requirements & list of ingredients), searches through the database of recipes and returns recipes based on the users entered data.

DETAILS
This Node JS is code is deployed as an AWS Lambda function with an endpoint https://6q4rpz2qb6.execute-api.eu-west-2.amazonaws.com/dev/recipe
It takes an object as a parameter, here is an example:-
{
	"dietary":"vegan",
	"ingredients":["sesame seeds","onions","chicken"]
}

The code will connect to the RDS DB of recipes and return an object of results that matches the users requirements, example:-
[
    {
        "recipeDietId": 9,
        "recipeId": 3,
        "dietaryId": 2,
        "name": "Black bean and watercress burger",
        "url": "https://theflexitarian.co.uk/recipe-items/black-bean-watercress-burger-vegan-by-love-watercress/",
        "method": "Take a large frying pan and place it over a medium heat. Add in a splash of oil. When the oil is hot, toss in the onion, red pepper and garlic along with a pinch of salt and the chopped red chillies if using. Stir-fry for roughly three minutes then tip into a bowl and allow to cool. Drain the black beans in a colander and rinse with cold water until it runs clear. Line a tray with a tea towel and tip the beans into the tray, patting the top dry with another tea towel to remove as much water as possible. Place half of the beans into a large bowl and mash well with a fork. Cut the softened sweet potato in half before scooping out the flesh and adding to the bowl along with the remaining black beans. Add in the onion and pepper mix, sweetcorn, breadcrumbs, paprika and watercress and use your hands to combine everything thoroughly. Season the mix to taste with salt and pepper. Form four large patties and leave to chill in the fridge for at least half an hour before cooking. Pre-heat the oven to 180°C / 160°C fan / 350°F / gas mark 4. Wipe out the frying pan you used for the onion and pepper mix and return to a medium heat. Add a splash of oil into the pan. Once the oil is hot use a spatula or slice to carefully place each burger patty into the pan. Fry for 2-3 minutes on each side before placing into the oven for 10 minutes or until piping hot throughout. Remove the patties from the oven and leave to rest for a minute while you prepare the buns. Slice the buns in half and toast (either under the grill or in the toaster). Slice the avocado. Place a burger on the bottom of each bun, then top with avocado slices and a good dollop of tomato relish or other sauce. Serve and enjoy! You could also top the burgers with a variety of other fillings including sliced tomatoes, fresh watercress or sliced red onions.     ",
        "picture": "https://zestpictures.s3.eu-west-2.amazonaws.com/Black-Bean-Watercress-burger-vegan-from-the-Watercress-Company-v8.jpg",
        "preparationTime": "40 minutes",
        "recipeIngId": 34,
        "ingredientId": 32,
        "quantity": "800g",
        "ingredientName": "black beans",
        "recipeSeasonId": 3,
        "seasonId": 1,
        "seasonName": "Spring",
        "ingredients": [
            {
                "ingredient": "black beans",
                "qty": "800g"
            },
            {
                "ingredient": "sweet potato",
                "qty": "1"
            },
            {
                "ingredient": "red pepper",
                "qty": "1"
            },
            {
                "ingredient": "red chillies",
                "qty": "2"
            },
            {
                "ingredient": "sweetcorn",
                "qty": "50g"
            },
            {
                "ingredient": "breadcrumbs",
                "qty": "90g"
            },
            {
                "ingredient": "watercress",
                "qty": "30g"
            },
            {
                "ingredient": "smoked paprika",
                "qty": "1 tsp"
            },
            {
                "ingredient": "vegetable oil",
                "qty": "some"
            },
            {
                "ingredient": "salt & pepper",
                "qty": "some"
            },
            {
                "ingredient": "vegan burger buns",
                "qty": "4"
            },
            {
                "ingredient": "ripe avocadoes",
                "qty": "2"
            },
            {
                "ingredient": "onion",
                "qty": "1"
            },
            {
                "ingredient": "garlic cloves",
                "qty": "2"
            },
            {
                "ingredient": "relish or sauce of your choice",
                "qty": "some"
            }
        ],
        "ingredientMatch": 0
    },
    {
        "recipeDietId": 10,
        "recipeId": 16,
        "dietaryId": 2,
        "name": "Sesame ginger noodles with vegetables",
        "url": "https://www.shelikesfood.com/30-minute-sesame-ginger-noodles-with-vegetables/",
        "method": "Fill a large pot with water and bring to a boil. Add rice noodles and boil until cooked through, 6-8 minutes. While water is coming to a boil, heat a large skillet over medium heat and add sesame oil and veggies. Cook veggies until starting to soften, about 5 minutes. While veggies are cooking, make the sauce by adding all ingredients to a small bowl and whisking until combined. Drain the rice noodles and add them to the pan along with the sauce and chickpeas. Stir to make sure everything is mixed together and then cook over medium heat until sauce has thickened, about 5 minutes. Garnish with coriander leaves and toasted sesame seeds just before serving, if desired.",
        "picture": "https://zestpictures.s3.eu-west-2.amazonaws.com/30-Minute-Sesame-Ginger-Noodles-with-Vegetables-85071-600x900.jpg",
        "preparationTime": "30 minutes",
        "recipeIngId": 183,
        "ingredientId": 136,
        "quantity": "1 package",
        "ingredientName": "rice noodles",
        "recipeSeasonId": 16,
        "seasonId": 2,
        "seasonName": "Summer",
        "ingredients": [
            {
                "ingredient": "rice noodles",
                "qty": "1 package"
            },
            {
                "ingredient": "sesame oil",
                "qty": "65ml"
            },
            {
                "ingredient": "peas",
                "qty": "1 handful"
            },
            {
                "ingredient": "purple cabbage",
                "qty": "190g"
            },
            {
                "ingredient": "coriander",
                "qty": "some"
            },
            {
                "ingredient": "maple syrup",
                "qty": "60ml"
            },
            {
                "ingredient": "cornflour",
                "qty": "1.5 tsp"
            },
            {
                "ingredient": "red pepper",
                "qty": "1"
            },
            {
                "ingredient": "carrots",
                "qty": "2"
            },
            {
                "ingredient": "chickpeas",
                "qty": "1 tin"
            },
            {
                "ingredient": "soy sauce",
                "qty": "80ml"
            },
            {
                "ingredient": "garlic cloves",
                "qty": "1"
            },
            {
                "ingredient": "freshly grated ginger",
                "qty": "1.5 tsp"
            },
            {
                "ingredient": "sesame seeds",
                "qty": "1 tsp"
            }
        ],
        "ingredientMatch": 1
    },
    {
        "recipeDietId": 11,
        "recipeId": 17,
        "dietaryId": 2,
        "name": "Pumpkin bread",
        "url": "https://theflexitarian.co.uk/recipe-items/pumpkin-bread-vegan/",
        "method": "Peel and cut pumpkin into small dice. Heat some water in a pan. When boiling, add pumpkin and cook until soft (around 10 mins). Drain and set aside. Pre-heat the oven to 180C/Fan 160C/350F/Gas 4. Line a loaf tin with parchment paper. Prepare chia eggs by mixing together 2 Tbsp milled chia seeds in 6 Tbsp water. Set aside. In a large bowl, mix together flour, sugar, cinnamon, nutmeg, allspice, ginger, salt, baking powder, bicarbonate of soda and chopped pecans. Mash pumpkin to a smooth paste. Mix in coconut oil, vanilla extract, chia eggs and orange zest until all is well blended. Add pumpkin mixture to flour mixture. Stir with a wooden spoon until all the ingredients are well combined. Pour mixture into the loaf tin. Cook in the oven for around 40-45mins or until an inserted cake skewer comes out completely clean. Cool completely before making the orange icing. To make the icing, mix together the icing sugar and orange juice. Pour orange icing over the pumpkin bread. Top the icing with some grated orange zest. ",
        "picture": "https://zestpictures.s3.eu-west-2.amazonaws.com/Pumpkin-Bread-vegan-%C2%A9-The-Flexitarian-Annabelle-Randles-v8.jpg",
        "preparationTime": "1 hour 10 minutes",
        "recipeIngId": 197,
        "ingredientId": 142,
        "quantity": "290g",
        "ingredientName": "pumpkin flesh",
        "recipeSeasonId": 17,
        "seasonId": 3,
        "seasonName": "Autumn",
        "ingredients": [
            {
                "ingredient": "pumpkin flesh",
                "qty": "290g"
            },
            {
                "ingredient": "chia seeds",
                "qty": "2 tbsp"
            },
            {
                "ingredient": "allspice",
                "qty": "½ tsp"
            },
            {
                "ingredient": "salt",
                "qty": "½ tsp"
            },
            {
                "ingredient": "baking powder",
                "qty": "1 tsp"
            },
            {
                "ingredient": "bicarbonate of soda",
                "qty": "1 tsp"
            },
            {
                "ingredient": "pecans",
                "qty": "100g"
            },
            {
                "ingredient": "coconut oil",
                "qty": "90ml"
            },
            {
                "ingredient": "vanilla extract",
                "qty": "1 tsp"
            },
            {
                "ingredient": "orange zest",
                "qty": "2"
            },
            {
                "ingredient": "icing sugar",
                "qty": "100g"
            },
            {
                "ingredient": "orange juice",
                "qty": "2 tbsp"
            },
            {
                "ingredient": "plain flour",
                "qty": "225g"
            },
            {
                "ingredient": "caster sugar",
                "qty": "175g"
            },
            {
                "ingredient": "cinnamon",
                "qty": "2 tsp"
            },
            {
                "ingredient": "nutmeg",
                "qty": "½ tsp"
            },
            {
                "ingredient": "freshly grated ginger",
                "qty": "1 tsp"
            }
        ],
        "ingredientMatch": 0
    },
    {
        "recipeDietId": 8,
        "recipeId": 2,
        "dietaryId": 2,
        "name": "Curried root vegetable casserole",
        "url": "https://theflexitarian.co.uk/recipe-items/curried-root-vegetable-casserole-vegan/",
        "method": "Peel parsnips, carrot and potatoes. Cut carrots and parsnips in 1 cm [0.4 inch] slices and potatoes in 2cm dice [0.8 inch]. Heat the olive oil in a large saucepan. Fry finely sliced onion until soft. Add crushed garlic, grated ginger, mild curry paste and ground cumin. Fry gently for a couple of minutes. Add vegetables to saucepan along with chopped tomatoes, red lentils and vegetable stock. Bring to the boil, then cook half-covered for 15 mins under medium heat. Add grated creamed coconut and drained chickpeas. Cook uncovered for a further 10 mins until vegetables are tender. Season to taste with lime juice, salt and pepper. Serve with wholegrain rice, chopped coriander leaves and spring onions.",
        "picture": "https://zestpictures.s3.eu-west-2.amazonaws.com/Curried-Root-Vegetable-Casserole-vegan-gluten-free-%C2%A9-The-Flexitarian-Annabelle-Randles-v8-.jpg",
        "preparationTime": "45 minutes",
        "recipeIngId": 16,
        "ingredientId": 16,
        "quantity": "300g",
        "ingredientName": "parsnips",
        "recipeSeasonId": 2,
        "seasonId": 4,
        "seasonName": "Winter",
        "ingredients": [
            {
                "ingredient": "parsnips",
                "qty": "300g"
            },
            {
                "ingredient": "carrots",
                "qty": "300g"
            },
            {
                "ingredient": "potatoes",
                "qty": "300g"
            },
            {
                "ingredient": "onion",
                "qty": "1"
            },
            {
                "ingredient": "freshly grated ginger",
                "qty": "1 tbsp"
            },
            {
                "ingredient": "mild curry paste",
                "qty": "2 tbsp"
            },
            {
                "ingredient": "ground cumin",
                "qty": "1 tsp"
            },
            {
                "ingredient": "chopped tomatoes",
                "qty": "400g"
            },
            {
                "ingredient": "red lentils",
                "qty": "100g"
            },
            {
                "ingredient": "vegetable stock",
                "qty": "750ml"
            },
            {
                "ingredient": "creamed coconut",
                "qty": "100g"
            },
            {
                "ingredient": "chickpeas",
                "qty": "400g"
            },
            {
                "ingredient": "lime juice",
                "qty": "some"
            },
            {
                "ingredient": "wholegrain rice",
                "qty": "some"
            },
            {
                "ingredient": "fresh coriander",
                "qty": "some"
            },
            {
                "ingredient": "spring onions",
                "qty": "2–3"
            },
            {
                "ingredient": "olive oil",
                "qty": "2 tbsp"
            },
            {
                "ingredient": "garlic cloves",
                "qty": "3"
            }
        ],
        "ingredientMatch": 0
    }
]

Usage
1) The "ingredientmatch" property returns how many of the users ingredients match the returned ingredients.
2) The reason why recipes with "ingredientMatch": 0 are returned is because they match the "dietary" property.
3) Parameters for the "dietary" property are:- "none", "vegan", "vegetarian" & "gluten-free".

CONTACT:-
Simon Cobb - email:- simoncobb1966@gmail.com 
Code originally written June 2019.


