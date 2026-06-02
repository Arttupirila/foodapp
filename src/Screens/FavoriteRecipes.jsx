import { useContext } from "react";
import { AppContext } from "./AppContext";
import { useState } from "react";
function FavoriteRecipes() {

  const [showing, setShowing] = useState(null)
 const { favorites, setFavorites, recipeDetails, setMpRecipes, mpRecipes, entry, setEntry } =
    useContext(AppContext);
  
     const deleteFavorites = (indexToRemove) => {
  const updatedFavorites = favorites.filter((_, index) => index !== indexToRemove);
  setFavorites(updatedFavorites);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

const addToMp = (img, title) => {
  const newMp = [img, title]

  const updatedMp = [...mpRecipes, newMp]

  setMpRecipes(updatedMp)
  localStorage.setItem("mpRecipes", JSON.stringify(updatedMp))
}

const addToShoppingList = (name) => {
  const updatedEntries = [...entry,
            name
        ]
        setEntry(updatedEntries)
        localStorage.setItem("shoppingList", JSON.stringify(updatedEntries))
}



    const favs = favorites || []
    console.log(favs)
    return(
        <div>
        <div>
        <h1>Favorite Recipes Screen</h1>
        <ul>
           {favs.map((favorite, index) => (
  <li key={index}>
    {favorite[1]}
    <button onClick={() => deleteFavorites(index)}>Remove</button>
    <button onClick={()=>setShowing(favorite[1])}>View details</button>
    <button onClick={()=>addToMp(favorite[0], favorite[1])}>Add to meal plan screen</button>
    <br />
    <img src={favorite[0]} width="200" height="100" />
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
        </div>
        
        </div>

        
    )
}

export default FavoriteRecipes