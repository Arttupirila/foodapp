import Calendar from '/Components/Calendar.jsx'
import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from './AppContext'

function MealPlan() {

  const { setMpRecipes, mpRecipes, draggedRecipe, setDraggedRecipe, droppedRecipes, setDroppedRecipes, recipeDetails, favorites, setFavorites, entry, setEntry } =
    useContext(AppContext);
const [showing, setShowing] = useState(null)
function handleDragStart(e) {
  console.log("drag started")
}

const addToShoppingList = (name) => {
  const updatedEntries = [...entry,
            name
        ]
        setEntry(updatedEntries)
        localStorage.setItem("shoppingList", JSON.stringify(updatedEntries))
}

  const saveFavorites = (img, title) => {
  const newFavorite = [img, title];

  const updatedFavorites = [...favorites, newFavorite];

  setFavorites(updatedFavorites);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

function handleDragEnd(e) {
  console.log("drag ended")
  setDraggedRecipe("")
  console.log(droppedRecipes)
  localStorage.setItem("plannedMeals", JSON.stringify(droppedRecipes)) //LOCAL STORAGE SET
}
function handleDrag(name) {
  console.log("currently dragging " + name)
  setDraggedRecipe(name)
  
}

      const deleteFromMP = (indexToRemove) => {
  const updatedMp = mpRecipes.filter((_, index) => index !== indexToRemove);
  setMpRecipes(updatedMp);
  localStorage.setItem("mpRecipes", JSON.stringify(updatedMp));
};
const mps = mpRecipes || []
console.log(mps)
    return(
        <div className="MealPlan">
        <div>
        <h2>Recipes list (drag and drop)</h2>
        <ul>
           {mps.map((mp, index) => (
  <li key={index}>
    <p onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDrag={()=>handleDrag(mp[1])}draggable="true">{mp[1]}</p>
    <button onClick={() => deleteFromMP(index)}>Remove</button>

    <button onClick={()=> setShowing(mp[1])}>Show details</button>
    <button onClick={() => saveFavorites(mp[0], mp[1])}>Add to favorites</button>

 
  </li>
  
))}
     {showing && (
        <div className="recipe-details">
          <button onClick={() => setShowing(null)}>Hide Details</button>
          {" "}
        
          <h3>{recipeDetails[showing].title}</h3>
          <img
            src={recipeDetails[showing].image}
            alt={recipeDetails[showing].title}
            width="200"
          />
          <p>Recipe ID: {recipeDetails[showing].id}</p>
          <p> Diet: {recipeDetails[showing].diets || null }</p>
          <p>Servings: {recipeDetails[showing].servings}</p>
          <p>Calories (per serving): {recipeDetails[showing].nutrition?.nutrients.find(n => n.name === "Calories").amount} kcal</p>
          <p>Protein (per serving): {recipeDetails[showing].nutrition?.nutrients.find(n => n.name === "Protein").amount} grams</p>
          <p>Ready in: {recipeDetails[showing].readyInMinutes} minutes</p>

          <h4>Ingredients:</h4>
          <ul>
            {recipeDetails[showing].extendedIngredients?.map((ing) => (
              <li key={ing.id}>{ing.original}
              <button onClick={()=> addToShoppingList(ing.original)}>Add to shopping list</button>
              </li>
            ))}
          </ul>

          <h4>Instructions:</h4>
          <p
            dangerouslySetInnerHTML={{
              __html: recipeDetails[showing].instructions,
            }}
          />
        </div>
      )}
        </ul>

       <Calendar />
      
        </div>
        </div>
        

        
    )
        
}

export default MealPlan