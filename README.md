# Alkaline Food App (name is comin´up)

An app that facilitates the alkaline lifestyle in everyday life. Users can create a collection of their favorite recipes, tips and lifehacks.

## Pages in sign-in process

Home - introduction. For authenticated users, display log in link. For visitors, display sign up link.

Log In - Allows user to log in.

Sign in - Allows new user to sign in.

## Pages when signed in

Above each page is a menu with links to Account, Alkaline Food, Selfcare, search function (+ page search function)

Account - Allows user to watch/delete one of their favorite links

Favorites - Allows User to check their favorite links

Alkaline Food - links to the recipes (Breakfast, Lunch, Dinner, Snacks/Sweets,
Drinks)

Breakfast recipes - shows user variation of recipes

Lunch recipes - shows user variation of recipes

Dinner recipes - shows user variation of recipes

Snacks/Sweets recipes - shows user variation of recipes

Drinks recipes - shows user variation of recipes

## Route Handlers

`Julia`
GET - '/' - renders home page.

`Julia`
GET - '/log-in' - Render log in page
POST - '/log-in' - Handle log in form submission
GET - '/create-account' - Render sign in page
POST - '/create-account' - Handle sign in form submission

`Julia`
GET - '/account' - Load authenticated user
POST - '/account/delete' - Handle profile deletion form submission
POST - '/loug-out' - Handles log-out Submission

`Wibi`
GET - '/recipes' - Load all recipe categories
GET - '/recipes/breakfast‘ - Load all breakfast recipes
GET - '/recipes/breakfast/:id‘ - Load a single breakfast recipe
GET - '/recipes/lunch‘ - Load all breakfast recipes
GET - '/recipes/lunch/:id‘ - Load a single breakfast recipe
GET - '/recipes/dinner‘ - Load all breakfast recipes
GET - '/recipes/dinner/:id‘ - Load a single breakfast recipe
GET - '/recipes/snacks‘ - Load all breakfast recipes
GET - '/recipes/snacks/:id‘ - Load a single breakfast recipe
GET - '/recipes/drinks‘ - Load all breakfast recipes
GET - '/recipes/drinks/:id‘ - Load a single breakfast recipe

`Julia`
GET - '/favorites/- Load favorites, render favorites page

## Models

### User : CHECK!

username: String, required
email: String, required
passwordHashAndSalt: String, required
picture: String

### Recipes `Wibi`

category: String, required
picture: String
title: String
ingredients: string (wenn array, könnten menschen nach zutaten suchen?)
instructions: string

### Favorites `Julia`

recipe: ObjectId, ref: ‚Favorite‘, required
user: ObjectId, ref: 'User', required
(timestamps: true)

## Wishlist

### Pages

Selfcare – links to the selfcare topics (Breathing, Exercises, Bodycare, Cosmetics)

Forum – exchange between users

Map tracker – users can post restaurant links, shows users links to restaurants

### Search function

users can searches recipes by individual ingredients (that they have)

### Post recipes

users can post own recipes that fit the alkaline criteria (filter)

---

## To Do Julia:

- private hbs changed into account hbs ( alles veraendern )
- sign-in = Log-in
- sign-up = create-account
