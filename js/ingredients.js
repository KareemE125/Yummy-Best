import API from './modules/apiHelper.js'


const homeElem = $('#home');
const homeListElem = $('#home .meal-list');

const ingredientElem = $('#ingredient');
const ingredientListElem = $('#ingredient .ingredient-list');

const MealElem = $('#meal');

let currentMeal;
let mealList = [];

MAIN();

async function MAIN()
{  
    MealElem.hide(10);
    homeElem.hide(10)
    ingredientListElem.html(loadSpinnerElem());

    
    try
    {
        await fillIngredientUI();
        
    
        $('.ingredient-card').on('click',async function()
        {

            ingredientListElem.html(loadSpinnerElem());
            const ingredientName = this.querySelector('h2').innerHTML;

            await fillHomeUI(ingredientName);
            ingredientElem.hide(200,()=> homeElem.show(200));

            $('.meal-card').on('click',async function()
            {
                const mealName = this.querySelector('h2').getAttribute('mealName');
                
                homeListElem.html(loadSpinnerElem());
        
                currentMeal = (await API.getMealsByName(mealName))[0];
                fillMealUI(mealName);
                homeElem.hide(200,()=> MealElem.show(200));
            });

        });
    }
    catch(e)
    {
        homeListElem.html('<div class="loader-div"><h2 class="fs-1 text-danger">NO INTERNET CONNECTION</h2></div>');
    }

}


function loadSpinnerElem()
{
    return '<div class="loader-div"><div class="loader"></div></div>';
}

////////////////////// CATEGORIES FUNCTIONALITIES ///////////////////////////////
function createIngredientCardElem(ingredient)
{
    return `
    <div class="col-xl-3 col-lg-4 col-md-6">
        <div class="ingredient-card">
            <i class="fa-4x fa-solid fa-bowl-food"></i>
            <h2 class="text-center fs-1 fw-light mt-2">${ingredient.name}</h2>
            <p class="text-center">${ingredient.description}</p>
        </div>
    </div>`;
}

async function fillIngredientUI()
{
    const MEAL_INGREDIENT_LIST = await API.getMealIngredientsList();
    console.log(MEAL_INGREDIENT_LIST)

    let ingredientListHTML = ``;
    MEAL_INGREDIENT_LIST.forEach((ingredient)=>{ ingredientListHTML += createIngredientCardElem(ingredient); });
    ingredientListElem.html(ingredientListHTML);
}
////////////////////// ************************* ///////////////////////////////



////////////////////// HOME FUNCTIONALITIES ///////////////////////////////

function createMealCardElem(meal)
{
    return `
    <div class="col-lg-3 col-md-6">
        <div class="meal-card position-relative overflow-hidden">
            <img class="img-fluid rounded" src="${meal.imageURL}" alt="meal image">
            <div class="overlay position-absolute rounded overflow-hidden w-100 h-100 bg-danger d-flex align-items-center bg-white bg-opacity-50">
                <h2 class="position-absolute ms-2 fw-light text-black text-wrap" mealName='${meal.name}'>${meal.name.length > 30? meal.name.substring(0,30)+"..." : meal.name}</h2>
            </div>
        </div>
    </div>`;
}


async function fillHomeUI(ingredientName)
{
    mealList = mealList.length === 0 ? await API.getMealsByIngredient(ingredientName) : mealList;

    let mealListHTML = ``;
    mealList.forEach((meal)=>{ mealListHTML += createMealCardElem(meal); });
    homeListElem.html(mealListHTML);
}

function fillMealUI()
{
    console.log(currentMeal)
    $('#image').attr('src',currentMeal.imageURL);
    $('#name').html(currentMeal.name);
    $('#instructions').html(currentMeal.instructions);
    $('#area').html(currentMeal.area);
    $('#category').html(currentMeal.category);
    let ingreds = ``;;
    currentMeal.ingredients.forEach((ingred)=>{ ingreds+= `<div class="Ingredient-card">${ingred}</div>`; });
    $('#ingredients').html(ingreds);
    $('#youtube').attr('href',currentMeal.youTubeURL)
}

////////////////////// ************************* ///////////////////////////////


////////////////////// SEARCH FUNCTIONALITIES ///////////////////////////////

$('nav ul li').eq(0).on('click',()=>{
    localStorage.setItem('searchStatus','on');
    window.location = "../index.html";
});

////////////////////// ************************* ///////////////////////////////
