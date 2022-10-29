import API from './modules/apiHelper.js'


const homeElem = $('#home');
const homeListElem = $('#home .meal-list');

const categoryElem = $('#category');
const categoryListElem = $('#category .category-list');

const MealElem = $('#meal');

let currentMeal;
let mealList = [];

MAIN();

async function MAIN()
{  
    MealElem.hide(10);
    homeElem.hide(10)
    categoryListElem.html(loadSpinnerElem());

    
    try
    {
        await fillCategoryUI();
        
    
        $('.category-card').on('click',async function()
        {

            categoryListElem.html(loadSpinnerElem());
            const categoryName = this.querySelector('h2').innerHTML;

            await fillHomeUI(categoryName);
            categoryElem.hide(200,()=> homeElem.show(200));

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
function createCategoryCardElem(category)
{
    return `
    <div class="col-xxl-3 col-xl-4 col-md-6">
        <div class="category-card position-relative overflow-hidden py-5 d-flex justify-content-center">
            <img class="img-fluid rounded" src="${category.imageURL}" alt="meal image">
            <div class="overlay d-flex flex-column align-items-center position-absolute rounded overflow-hidden w-100 h-100 bg-white bg-opacity-75">
                <h2 class="ms-2 fw-light text-black text-wrap text-center">${category.name}</h2>
                <p class="text-center fw-normal text-black d-flex align-items-center">${category.description}</p>
            </div>
        </div>
    </div>`;
}

async function fillCategoryUI()
{
    const MEAL_CATEGORY_LIST = await API.getMealCategoriesList();

    let categoryListHTML = ``;
    MEAL_CATEGORY_LIST.forEach((category)=>{ categoryListHTML += createCategoryCardElem(category); });
    categoryListElem.html(categoryListHTML);
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


async function fillHomeUI(areaName)
{
    mealList = mealList.length === 0 ? await API.getMealsByCategory(areaName) : mealList;

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

////////////////////// SEARCH FUNCTIONALITIES ///////////////////////////////

$('nav ul li').eq(0).on('click',()=>{
    localStorage.setItem('searchStatus','on');
    window.location = "../Yummy-Best/index.html";
});

////////////////////// ************************* ///////////////////////////////
