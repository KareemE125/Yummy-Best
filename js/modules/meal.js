export default class Meal
{
    constructor(json)
    {

        this.name = json.strMeal;
        this.imageURL = json.strMealThumb;
        this.youTubeURL = json.strYoutube;
        this.instructions = json.strInstructions;
        this.area = json.strArea;
        this.category = json.strCategory;
        this.ingredients = [];
        for (let i = 1; i <= 20; i++) 
        {
            const item = json[`strIngredient${i}`];
            if( item == null || item.trim().length === 0 ){ break; }
            else
            { 
                const itemAmount = json[`strMeasure${i}`]
                this.ingredients.push(`${itemAmount} ${item}`); 
            }              
        }

    }
}