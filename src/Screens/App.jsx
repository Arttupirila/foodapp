import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Profile from './Profile.jsx'
import RecipeSearch from './RecipeSearch.jsx'
import FavoriteRecipes from './FavoriteRecipes.jsx'
import Home from './Home.jsx'
import MealPlan from './MealPlan.jsx'
import Calendar from '/Components/Calendar.jsx'
import ShoppingList from './ShoppingList.jsx'
import { AppContext } from "./AppContext.js";
import { useState } from "react";
function App() {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || [] ) 
    const [mpRecipes, setMpRecipes] = useState(JSON.parse(localStorage.getItem("mpRecipes")) || [] ) 
    const [draggedRecipe, setDraggedRecipe] = useState("")
    const [droppedRecipes, setDroppedRecipes] = useState(JSON.parse(localStorage.getItem("plannedMeals")) || {})
    const [recipeDetails, setRecipeDetails] = useState(JSON.parse(localStorage.getItem("recipeDetails")) || {})
    const [entry, setEntry] = useState(JSON.parse(localStorage.getItem("shoppingList")) || [])
    return (
         <AppContext.Provider
      value={{
        favorites,
        setFavorites,
        mpRecipes,
        setMpRecipes,
        draggedRecipe,
        setDraggedRecipe,
        droppedRecipes,
        setDroppedRecipes,
        recipeDetails,
        setRecipeDetails,
        entry,
        setEntry
      }}
    >
       <BrowserRouter>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/profile">Profile</Link> |{" "}
          <Link to="/searchrecipes">Search Recipes</Link> |{" "}
          <Link to="/favoriterecipes">Favorite Recipes</Link> |{" "}
          <Link to="/mealplan">Meal plan</Link> |{" "}
          <Link to="/shoppinglist">Shopping list</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/searchrecipes" element={<RecipeSearch />} />
          <Route path="/favoriterecipes" element={<FavoriteRecipes />} />
          <Route path="/mealplan" element={<MealPlan />} />
          <Route path="/shoppinglist" element={<ShoppingList />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}


export default App