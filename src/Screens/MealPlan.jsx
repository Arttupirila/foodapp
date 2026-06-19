import Calendar from '../Components/Calendar' 
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from './AppContext'

function MealPlan() {
  const [mps, setMps] = useState([])
  const { setMpRecipes, mpRecipes, draggedRecipe, setDraggedRecipe, droppedRecipes, setDroppedRecipes, recipeDetails, favorites, setFavorites, entry, setEntry } =
    useContext(AppContext);
const [showing, setShowing] = useState(null)

function handleDragStart(event, name) {
  console.log("drag started (" + name + ")")
  event.dataTransfer.setData("text/plain", name)
  setDraggedRecipe(name)
}

 async function addFavorite(img, title) {
     const token = localStorage.getItem("token");
      await fetch("http://localhost:3000/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      favorite: [img, title]
    })
  });
}

async function fetchMps() {
  const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/mps", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
        },
      })
      if (!response.ok) throw new Error(`Fetch failed: ${response.status}`)
      const data = await response.json()
      setMps(data.mps || [])
      console.log(data.mps)
    } catch (err) {
      console.error("Error loading mps:", err)
    }
  }

async function addToShoppingList(name)  {
  const token = localStorage.getItem("token");
await fetch("http://localhost:3000/shoppinglist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
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


 

function handleDragEnd(e) {
  console.log("drag ended")
  setDraggedRecipe("")
}


       async function removeMps(title) {
        const token = localStorage.getItem("token");
     try {
      const response = await fetch("http://localhost:3000/mps", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: title
        })
      })
      if (!response.ok) throw new Error(`Fetch failed: ${response.status}`)
      const data = await response.json()
      setMps(data.mps || [])
      console.log(data.mps)
    } catch (err) {
      console.error("Error:", err)
    }
  }

 useEffect(() => {
     fetchMps()
  }, [])

    return(
        <div className="MealPlan">
        <div>
        <h2>Recipes list (drag and drop)</h2>
        <ul>
           {mps.map((mp, index) => (
  <li key={index}>
    <p onDragStart={()=>handleDragStart(event, mp.title)} onDragEnd={handleDragEnd} draggable="true">{mp.title}</p>
    <button onClick={() => removeMps(mp.title)}>Remove</button>

    <button onClick={()=> setShowing(mp.title)}>Show details</button>
    <button onClick={() => addFavorite(mp.image, mp.title)}>Add to favorites</button>

 
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