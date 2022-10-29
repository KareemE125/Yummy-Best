import API from './modules/apiHelper.js'



const homeElem = $('#home');
const homeListElem = $('#home .meal-list');

const areaElem = $('#area');
const areaListElem = $('#area .area-list');

const MealElem = $('#meal');

let currentMeal;
let mealList = [];

MAIN();

async function MAIN()
{  
    MealElem.hide(10);
    homeElem.hide(10)
    areaListElem.html(loadSpinnerElem());

    
    try
    {
        await fillAreaUI();
        
    
        $('.area-card').on('click',async function()
        {

            areaListElem.html(loadSpinnerElem());
            const areaName = this.querySelector('h2').innerHTML;

            await fillHomeUI(areaName);
            areaElem.hide(200,()=> homeElem.show(200));

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

////////////////////// AREA FUNCTIONALITIES ///////////////////////////////
function createAreaCardElem(name)
{
    return `
    <div class="col-lg-3 col-md-6">
        <div class="area-card">
            <i class="fa-5x fa-solid fa-city"></i>
            <h2 class="text-center mt-3">${name}</h2>
        </div>
    </div>`;
}

async function fillAreaUI()
{
    const MEAL_AREA_LIST = await API.getMealAreaList();
    let areaListHTML = ``;
    MEAL_AREA_LIST.forEach((areaName)=>{ areaListHTML += createAreaCardElem(areaName); });
    areaListElem.html(areaListHTML);
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
    mealList = mealList.length === 0 ? await API.getMealsByArea(areaName) : mealList;

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
