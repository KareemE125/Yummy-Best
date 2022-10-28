export default class MealCategory{

    constructor(json)
    {
        this.name = json.strCategory;
        this.imageURL = json.strCategoryThumb;
        this.description = json.strCategoryDescription;
    }
}