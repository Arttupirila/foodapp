import { useContext, useState, useEffect } from "react";
import { AppContext } from "./AppContext";

function FavoriteRecipes() {

  const [showing, setShowing] = useState(null)
  const [favs, setFavs] = useState([])
 const {recipeDetails, setMpRecipes, mpRecipes, entry, setEntry } =
    useContext(AppContext);
  
    

async function addMp(img, title) {
      await fetch("http://localhost:3000/mps", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mp: [img, title]
    })
  });
}

async function addToShoppingList(name)  {
await fetch("http://localhost:3000/shoppinglist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      item: name
    })
    
  })
  .then((response) => response.json())
  .then((data) => {
  setEntry(data.items || [])
  });
}

  async function removeFavorites(title) {
     try {
      const response = await fetch("http://localhost:3000/favorites", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title
        })
      })
      if (!response.ok) throw new Error(`Fetch failed: ${response.status}`)
      const data = await response.json()
      setFavs(data.favorites || [])
      console.log(data.favorites)
    } catch (err) {
      console.error("Error:", err)
    }
  }
  

  async function fetchFavorites() {
    try {
      const response = await fetch("http://localhost:3000/favorites", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) throw new Error(`Fetch failed: ${response.status}`)
      const data = await response.json()
      setFavs(data.favorites || [])
      console.log(data.favorites)
    } catch (err) {
      console.error("Error loading favorites:", err)
    }
  }

  useEffect(() => {
     fetchFavorites()
  }, [])
    return(
        <div>
        <div>
        <h1>Favorite Recipes Screen</h1>
        <ul>
           {favs.map((favorite, index) => (
  <li key={index}>
    {console.log(favs)}
    {favorite.title}
    <button onClick={() => removeFavorites(favorite.title)}>Remove</button>
    <button onClick={()=>setShowing(favorite.title)}>View details</button>
    <button onClick={()=>addMp(favorite.image, favorite.title)}>Add to meal plan screen</button>
    <br />
    <img src={favorite.image} width="200" height="100" />
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