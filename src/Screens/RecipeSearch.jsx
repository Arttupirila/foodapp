import { useState } from 'react'
import './global.css'
import { useContext } from 'react';
import { AppContext } from './AppContext';

function RecipeSearch() {
    const { favorites, setFavorites, mpRecipes, setMpRecipes, setRecipeDetails, recipeDetails } =
    useContext(AppContext);
  const [recipes, setRecipes] = useState([])
  const [query, setQuery] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sorting, setSorting] = useState('default')
  const apiKey = import.meta.env.VITE_API_KEY
  



  async function addFavorite(img, title) {
      await fetch("http://localhost:3000/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      favorite: [img, title]
    })
  });
}

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

  function inFavorites(title) {
  const stored = JSON.parse(localStorage.getItem("favorites")) || [];

  return stored.some(item => item[1] === title);
}
 function inMp(title) {
  const stored = JSON.parse(localStorage.getItem("mpRecipes")) || [];

  return stored.some(item => item[1] === title);
}

  // 🔍 Search recipes
  const searchRecipes = async (e) => {
    e.preventDefault()
    console.log(e.target)
    setSelectedRecipe(null)
    
    const formData = new FormData(e.target)

    const diets = formData.getAll("diet")
    console.log(diets)
    
    const dietsQuery = diets.join('|') || ''
      console.log(dietsQuery) 

    if (!query.trim()) return
    if (!apiKey) {
      console.error('Missing VITE_API_KEY')
      return
    }
  
    try {
      setLoading(true)

      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
          query
        )}&diet=${dietsQuery}&sort=${sorting}&number=20&apiKey=${apiKey}`
      )

      const data = await response.json()
      setRecipes(data?.results ?? [])
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
    
  }

  // 📄 Get full recipe details
  const getRecipeDetails = async (id) => {
    try {
      setLoading(true)

      const res = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${apiKey}`
      )

      const data = await res.json()
      setSelectedRecipe(data)
      const key = data.title
      const updatedDetails = {
        ...recipeDetails,
        [key]: data
      }
      console.log(updatedDetails)
      setRecipeDetails(updatedDetails)
      localStorage.setItem("recipeDetails", JSON.stringify(updatedDetails))
    } catch (error) {
      console.error('Details error:', error)
    } finally {
      setLoading(false)
    }
  }

 const saveFavorites = (img, title) => {
  const newFavorite = [img, title];

  const updatedFavorites = [...favorites, newFavorite];

  setFavorites(updatedFavorites);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

const addToMp = (img, title) => {
  const newMp = [img, title]

  const updatedMp = [...mpRecipes, newMp]

  setMpRecipes(updatedMp)
  localStorage.setItem("mpRecipes", JSON.stringify(updatedMp))
}


  return (
    <div className="RecipeSearch">
      <h2>Search for recipes</h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

     <select name="sort" id="sort" onChange={(e) => setSorting(e.target.value)}>
        {console.log(sorting)}
      <option value="">Default</option>
      <option value="popularity">Popularity</option>
      <option value="healthiness">Healthiness</option>
      <option value="calories">Calories</option>
      <option value="protein">Protein</option>
     </select>
      
      {" "}
      
  <form onSubmit={searchRecipes}>
    <input  type="checkbox" id="option1" name="diet" value="vegan" />
    <label htmlFor="option1"> Vegan </label>
    <br />
    <input type="checkbox" id="option2" name="diet" value="vegetarian" />
    <label htmlFor="option2"> Vegetarian </label>
    <br />
    <input type="checkbox" id="option3" name="diet" value="ketogenic" />
    <label htmlFor="option3"> Ketogenic </label>
    <br />
    <input type="checkbox" id="option4" name="diet" value="glutenfree" />
    <label htmlFor="option4"> Gluten Free </label>
    <br />
    <input type="checkbox" id="option4" name="diet" value="whole30" />
    <label htmlFor="option4"> Whole30 </label>
    <br />
    <input type="submit" value="Search"></input>
    <br />
    <br />
    
  </form>

    

      {loading && <p>Loading...</p>}

      {/* SEARCH RESULTS */}
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.title}
            {" "}
            <button onClick={() => getRecipeDetails(recipe.id)}>
              Details
            </button>
          </li>
        ))}
      </ul>

      {/* SELECTED RECIPE */}
      {selectedRecipe && (
        <div className="recipe-details">
          <button onClick={() => setSelectedRecipe(null)}>Hide Details</button>
          {" "}
          
          <button onClick={() => addFavorite(selectedRecipe.image, selectedRecipe.title) }>
            {inFavorites(selectedRecipe.title)? "Recipe added to favorites!" : "Add recipe to favorites"}
            </button>
          <button onClick={() => addMp(selectedRecipe.image, selectedRecipe.title)}>
            {inMp(selectedRecipe.title)? "Recipe added to meal plan section!" : "Add recipe to meal plan section"}
            </button>
          <h3>{selectedRecipe.title}</h3>
          <img
            src={selectedRecipe.image}
            alt={selectedRecipe.title}
            width="200"
          />
          <p>Recipe ID: {selectedRecipe.id}</p>
          <p> Diet: {selectedRecipe.diets || null }</p>
          <p>Servings: {selectedRecipe.servings}</p>
          <p>Calories (per serving): {selectedRecipe.nutrition?.nutrients.find(n => n.name === "Calories").amount} kcal</p>
          <p>Protein (per serving): {selectedRecipe.nutrition?.nutrients.find(n => n.name === "Protein").amount} grams</p>
          <p>Ready in: {selectedRecipe.readyInMinutes} minutes</p>

          <h4>Ingredients:</h4>
          <ul>
            {selectedRecipe.extendedIngredients?.map((ing) => (
              <li key={ing.id}>{ing.original}</li>
            ))}
          </ul>

          <h4>Instructions:</h4>
          <p
            dangerouslySetInnerHTML={{
              __html: selectedRecipe.instructions,
            }}
          />
        </div>
      )}
    </div>
  )
}

export default RecipeSearch