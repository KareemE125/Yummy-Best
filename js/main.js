import API from './modules/apiHelper.js'

// const MEAL_CATEGORY_LIST = await API.getMealCategoriesList()
// const MEAL_AREA_LIST = await API.getMealAreaList()
// const MEAL_INGREDIENTS_LIST = await API.getMealIngredientsList()

const homeElem = $('#home');
const homeListElem = $('#home .meal-list');
const MealElem = $('#meal');

let currentMeal;
let mealList = [];

MAIN();

async function MAIN()
{  
    MealElem.hide(10);
    homeElem.show(10);

    // The "searchStatus" to know if the user came from another page by click on
    // the seach from the side bar, so we navigate to the home with enabling the search
    localStorage.getItem('searchStatus') === 'on'? $('#search-bars').fadeIn(500) : null;
    localStorage.setItem('searchStatus','off');

    homeListElem.html(loadSpinnerElem());

    try
    {
        await fillHomeUI();
    
        $('.meal-card').on('click',async function(e)
        {
            const mealName = this.querySelector('h2').getAttribute('mealName');
            
            homeListElem.html(loadSpinnerElem());
    
            currentMeal = (await API.getMealsByName(mealName))[0];
            fillMealUI(mealName);
            homeElem.hide(200,()=> MealElem.show(200));
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

////////////////////// HOME FUNCTIONALITIES ///////////////////////////////
function createMealCardElem(meal)
{
    return `
    <div class="col-lg-4 col-xl-3 col-md-6">
        <div class="meal-card position-relative overflow-hidden">
            <img class="img-fluid rounded" src="${meal.imageURL}" alt="meal image">
            <div class="overlay position-absolute rounded overflow-hidden w-100 h-100 bg-danger d-flex align-items-center bg-white bg-opacity-50">
                <h2 class="position-absolute ms-2 fw-light text-black text-wrap" mealName='${meal.name}'>${meal.name.length > 30? meal.name.substring(0,30)+"..." : meal.name}</h2>
            </div>
        </div>
    </div>`;
}

async function fillHomeUI()
{
    mealList = mealList.length === 0 ? await API.getMealsByName() : mealList;

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

$('nav ul li').eq(0).on('click',()=>$('#search-bars').fadeIn(500));

$('#search-bars input').eq(0).on('input',async function()
{
    homeListElem.html(loadSpinnerElem());
    mealList = await API.getMealsByName($(this).val());
    if(mealList.length === 0 && $(this).val().length !== 0)
    {  
        homeListElem.html('<div class="loader-div align-items-start pt-5"><h2 class="fs-1 text-danger">NO RESULTS FOUND</h2></div>');
    }
    else
    {
        await MAIN();
    }
})

$('#search-bars input').eq(1).on('input',async function()
{
    homeListElem.html(loadSpinnerElem());
    try
    {
        mealList = await API.getMealsByLetter($(this).val());
        if(mealList.length === 0 && $(this).val().length !== 0)
        {  
            homeListElem.html('<div class="loader-div align-items-start pt-5"><h2 class="fs-1 text-danger">NO RESULTS FOUND</h2></div>');
        }
        else
        {
            await MAIN();
        }
    }
    catch(e)
    {
        mealList = [];
        await MAIN();
    }

})




////////////////////// ************************* ///////////////////////////////
