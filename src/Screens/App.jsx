import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Profile from './Profile.jsx'
import RecipeSearch from './RecipeSearch.jsx'
import FavoriteRecipes from './FavoriteRecipes.jsx'
import Home from './Home.jsx'
import MealPlan from './MealPlan.jsx'
import { useState } from "react";
function App() {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || [] ) 
    const [mpRecipes, setMpRecipes] = useState(JSON.parse(localStorage.getItem("mpRecipes")) || [] ) 
    return (
        
        <BrowserRouter>
        
        <nav>
        <Link to="/">Home</Link>  |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/searchrecipes">Search Recipes</Link> |{" "}
        <Link to="/favoriterecipes">Favorite Recipes</Link> |{" "}
        <Link to="/mealplan">Meal plan</Link>
        </nav>

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />

            <Route
          path="/searchrecipes"
          element={<RecipeSearch favorites={favorites} setFavorites={setFavorites} mpRecipes={mpRecipes} setMpRecipes={setMpRecipes} />}
         />

            <Route
          path="/favoriterecipes"
          element={<FavoriteRecipes favorites={favorites} setFavorites={setFavorites} />}
        />
            <Route
            path="/mealplan" 
            element={<MealPlan mpRecipes={mpRecipes} setMpRecipes={setMpRecipes} />} />
        </Routes>

        </BrowserRouter>
    )
}

export default App