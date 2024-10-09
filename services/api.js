import axios from 'axios';

// Base URL for the MealDB API
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

// Search meals by name
export const searchMealByName = (name) => {
  return axios.get(`${BASE_URL}search.php?s=${name}`);
};

// List meals by the first letter
export const listMealsByLetter = (letter) => {
  return axios.get(`${BASE_URL}search.php?f=${letter}`);
};

// Lookup a single meal by ID
export const lookupMealById = (id) => {
  return axios.get(`${BASE_URL}lookup.php?i=${id}`);
};

// Fetch a random meal
export const getRandomMeal = () => {
  return axios.get(`${BASE_URL}random.php`);
};

// List all meal categories
export const listMealCategories = () => {
  return axios.get(`${BASE_URL}categories.php`);
};

// Filter meals by main ingredient
export const filterByMainIngredient = (ingredient) => {
  return axios.get(`${BASE_URL}filter.php?i=${ingredient}`);
};

// List meals by category
export const listMealsByCategory = (category) => {
  return axios.get(`${BASE_URL}filter.php?c=${category}`);
};
