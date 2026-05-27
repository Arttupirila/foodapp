import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RecipeSearch from './Screens/RecipeSearch.jsx'
import Home from './Screens/Home.jsx'
import MealPlan from './Screens/MealPlan.jsx'
import App from './Screens/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
