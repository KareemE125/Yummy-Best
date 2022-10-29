import MealCategory from "./mealCategory.js";
import Meal from "./meal.js";



const mealCategoriesURL = "https://www.themealdb.com/api/json/v1/1/categories.php";
const mealAreasURL = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
const mealIngredientsURL = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

const searchByNameURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const searchByLetterURL = "https://www.themealdb.com/api/json/v1/1/search.php?f=";
const searchMealByCategoryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
const searchMealByAreaURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=";
const searchMealByIngredientURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";



export default class API_Helper
{

    static async #getApiJson(url)
    {
        let response = await fetch(url);
        response = await response.json();

        return response;
    }

    static async #convetJsonToMeal(response)
    {
        const list = [];
        for (let i = 0; i < response.length; i++) 
        {
            const tempMeal = response[i];
            list.push(new Meal(tempMeal));        
        }
        return list;
    }

    /////////////// GET Lists (Categories - Area - Ingredients) //////////////////
    static async getMealCategoriesList()
    {
        let response = await this.#getApiJson(mealCategoriesURL);
        response = response.categories;

        const categoriesList = [];

        if( response == null ){ return []; }
        else
        {
            for (let i = 0; i < response.length; i++) 
            {
                categoriesList.push(new MealCategory(response[i]));
                
            }
        }
        return categoriesList;
    }

    static async getMealAreaList()
    {
        let response = await this.#getApiJson(mealAreasURL);
        response = response.meals;

        const areasList = [];

        if( response == null ){ return []; }
        else
        {
            for (let i = 0; i < response.length; i++) 
            {
                areasList.push(response[i].strArea);
            }
        }
        return areasList;
    }

    static async getMealIngredientsList()
    {
        let response = await this.#getApiJson(mealIngredientsURL);
        response = response.meals;

        const ingredientsList = [];

        if( response == null ){ return []; }
        else
        {
            for (let i = 0; i < 25; i++) 
            {
                ingredientsList.push(
                    {
                        name: response[i].strIngredient,
                        description: response[i].strDescription.substring(0,100)+"...",
                    }
                );
            }
        }
        return ingredientsList;
    }

    /////////////// GET Meals ///////////////////////////////////////////////////
    static async getMealsByName(name)
    {
        name = name == undefined? "" : name;
        let response = await this.#getApiJson(searchByNameURL+name);
        response = response.meals == null? []: response.meals;

        return await this.#convetJsonToMeal(response)
    }

    static async getMealsByLetter(letter)
    {
        let response = await this.#getApiJson(searchByLetterURL+letter[0]);
        response = response.meals == null? []: response.meals;

        return await this.#convetJsonToMeal(response);
    }

    static async #extractMeals (response)
    {
        const list = [];
        for (let i = 0; i < response.length; i++) 
        {
            const tempMeal = await this.getMealsByName( response[i].strMeal );
            list.push(tempMeal[0])
        }
        return list;
    }

    static async getMealsByCategory(category)
    {
        let response = await this.#getApiJson(searchMealByCategoryURL+category);
        response = response.meals == null? []: response.meals;

        return this.#extractMeals(response)
    }

    static async getMealsByArea(area)
    {
        let response = await this.#getApiJson(searchMealByAreaURL+area);
        response = response.meals == null? []: response.meals;

        return this.#extractMeals(response)
    }

    static async getMealsByIngredient(ingredient)
    {
        let response = await this.#getApiJson(searchMealByIngredientURL+ingredient);
        response = response.meals == null? []: response.meals;

        return this.#extractMeals(response)
    }


}