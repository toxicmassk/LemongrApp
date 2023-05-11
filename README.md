# LemongrApp – Alkaline Food App

An app that facilitates the alkaline lifestyle in everyday life. Users can create a collection of their favorite recipes, tips and lifehacks.

## Project of Wibi and me

![jumping-lemon](/public/images/jumping-lemon.png)

## Pages in sign-in process ✅

Home - introduction. For authenticated users, display log in link. For visitors, display sign up link.

Log In - Allows user to log in.

Sign in - Allows new user to sign in.

## Pages when signed in ✅

Above each page is a burger-menu with links to Account, Alkaline Food, Selfcare, search function (+ page search function)

Account - Allows user to navigate through the app, all the links

Favorites - Allows User to check their favorite links (display list of recipes favorited by user)

Alkaline Food - links to the recipes (Breakfast, Lunch, Dinner, Snacks, Sweets,
Drinks) ✅

Recipe categories - shows user all recipes of one category ✅

Single recipe - shows user one recipe ✅, user can toggle favorite button

## Route Handlers

`Julia` ✅

GET - '/' - renders home page.

`Julia` ✅

GET - '/log-in' - Render log in page -done

POST - '/log-in' - Handle log in form submission - done

GET - '/create-account' - Render sign in page - done

POST - '/create-account' - Handle sign in form submission - done

`Julia` ✅

GET - '/account' - Load authenticated user

POST - '/account/delete' - Handle profile deletion form submission

POST - '/log-out' - Handles log-out Submission - done

`Wibi` ✅

GET - '/recipes' - Load all recipe categories

GET - '/recipes/category - Load all categories of recipes

GET - '/recipes/category?category=NameOfCategory - Load all recipes of one category

GET - '/category/:id' - Load single recipe

`Julia` ✅

GET - '/favorites/- Load favorites, render favorites page (route guard middleware)

POST - '/recipe/:id/favorite' - Handle favorites form submission

POST - '/recipe/:id/unfavorite' - Unfavorite recipe with id

## Partials

`Wibi` ✅

categoryPartial

## Models

### User `Julia` ✅

username: String, required
email: String, required
passwordHashAndSalt: String, required
picture: String

### Recipes `Wibi` ✅

category: String, required
picture: String
title: String
ingredients: string
instructions: string

### Favorites `Julia` ✅

- recipe: ObjectId, ref: ‚Favorite‘, required
- user: ObjectId, ref: 'User', required
  (timestamps: true)

---

## Wishlist

### Pages

Selfcare – links to the selfcare topics (Breathing, Exercises, Bodycare, Cosmetics) ✅

Forum – exchange between users

Map tracker – users can post restaurant links, shows users links to restaurants

### Search function ✅

users can searches recipes by individual ingredients (that they have)

### Post recipes ✅

users can post own recipes that fit the alkaline criteria (filter)

---
