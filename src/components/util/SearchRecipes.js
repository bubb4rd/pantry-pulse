const {search_id, search_key, nutrition_id, nutrition_key} = require("../../config");


const search_url = "https://api.edamam.com/api/recipes/v2?";
const nutrition_url = 'https://api.edamam.com/api/food-database/v2/nutrients?';
const fetchRecipes = async (url, controller) => {
    try {
        const response = await fetch (search_url+url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            signal: controller.signal,
        });
        const data = await response.json();
        return data;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('aborted');

        }
    }
}
const fetchNutrition = async () => {

}

export {fetchRecipes};