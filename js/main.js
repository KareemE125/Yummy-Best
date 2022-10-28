import API from './modules/apiHelper.js'

const MEAL_CATEGORY_LIST = await API.getMealCategoriesList()
const MEAL_AREA_LIST = await API.getMealAreaList()
const MEAL_INGREDIENTS_LIST = await API.getMealIngredientsList()

const homeElem = $('#home');
const homeListElem = $('#home .meal-list');
const MealElem = $('#meal');

let currentMeal;

(async function MAIN()
{  
    homeElem.show(10)
    homeListElem.html(loadSpinnerElem());

    await fillHomeUI();
    
    $('.meal-card').on('click',async function(e)
    {
        const mealName = e.target.querySelector('h2').innerHTML;
        homeListElem.html(loadSpinnerElem());

        currentMeal = (await API.getMealsByName(mealName))[0];
        fillMealUI(mealName);
        homeElem.hide(200,()=> MealElem.show(200));
    });
})()


function loadSpinnerElem()
{
    return '<div class="loader-div"><div class="loader"></div></div>';
}

////////////////////// HOME FUNCTIONALITIES ///////////////////////////////
function createMealCardElem(meal)
{
    return `
    <div class="col-lg-3 col-md-6">
        <div class="meal-card position-relative overflow-hidden">
            <img class="img-fluid rounded" src="${meal.imageURL}" alt="meal image">
            <div class="overlay position-absolute rounded overflow-hidden w-100 h-100 bg-danger d-flex align-items-center bg-white bg-opacity-50">
                <h2 class="position-absolute ms-2 fw-light text-black text-wrap">${meal.name}</h2>
            </div>
        </div>
    </div>`;
}

async function fillHomeUI()
{
    const mealList = await API.getMealsByName();

    let mealListHTML = ``;
    mealList.forEach((meal)=>{ mealListHTML += createMealCardElem(meal); });
    homeListElem.html(mealListHTML);
}

function fillMealUI()
{
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




