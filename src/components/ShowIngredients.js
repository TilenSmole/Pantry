import Fruits from '../FOODS/Fruits.json';
import Condiments from '../FOODS/Condiments.json';
import Dairy from '../FOODS/Dairy.json';
import Grains from '../FOODS/Grains.json';
import Legumes from '../FOODS/Legumes.json';
import Meat from '../FOODS/Meat.json';
import Nuts from '../FOODS/Nuts and Seeds.json';
//import Oils from '../FOODS/Oils and Fats.json';
//import PackagedFoods from '../FOODS/Packaged Foods.json';
import Seafood from '../FOODS/Seafood.json';
import SpicesHerbs from '../FOODS/Spices and Herbs.json';
import Vegetables from '../FOODS/Vegetables.json';
 
const getNames = () => {
    const fruitNames = Fruits.fruits.map(item => item.name);
    const condimentNames = Condiments.condiments.map(item => item.name);
    const dairyNames = Dairy.dairy.map(item => item.name);
    const grainNames = Grains.grains.map(item => item.name);
    const legumeNames = Legumes.legumes.map(item => item.name);
    const meatNames = Meat.meat.map(item => item.name);
    const nutNames = Nuts.nuts.map(item => item.name);
    // const oilNames = Oils.oils.map(item => item.name);
    // const packagedFoodNames = PackagedFoods.packagedFoods.map(item => item.name);
    const seafoodNames = Seafood.seafood.map(item => item.name);
    const spiceHerbNames = SpicesHerbs.spicesHerbs.map(item => item.name);
    const vegetableNames = Vegetables.vegetables.map(item => item.name);

    return [
        ...fruitNames,
        ...condimentNames,
        ...dairyNames,
        ...grainNames,
        ...legumeNames,
        ...meatNames,
        ...nutNames,
        // ...oilNames,
        // ...packagedFoodNames,
        ...seafoodNames,
        ...spiceHerbNames,
        ...vegetableNames,
    ];
};

const filterSuggestions = (food, fruitNames) => {
    console.log(food);
    if (food.length > 0) {
        return fruitNames.filter(suggestion =>
            suggestion.toLowerCase().includes(food.toLowerCase())
        );
    } else {
        return [];
    }
};

// Main function to get suggestions
export const ShowIngredients = (food) => {
    const fruitNames = getNames();
    return filterSuggestions(food, fruitNames);
};
