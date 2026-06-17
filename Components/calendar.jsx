import React, { useContext } from "react"; 
import { AppContext } from "../src/Screens/AppContext";
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weeks = [1, 2, 3, 4];

function Calendar() {

const { draggedRecipe, setDraggedRecipe, droppedRecipes, setDroppedRecipes } =
    useContext(AppContext);
  
  
  function handleDropSlot(week, day) {
  const key = `week-${week}-day-${day}`

  setDroppedRecipes(prev => ({
    ...prev,
    [key]: [...(prev[key] || []), draggedRecipe]
  }
))
console.log("item dropped into slot")
}

 function handleRemove(week, day, recipe) {
  const key = `week-${week}-day-${day}`;
  
  const currentDayRecipes = droppedRecipes[key] || [];
  const updatedCurrentDayRecipes = currentDayRecipes.filter(item => item !== recipe);

  const updatedRecipes = {
    ...droppedRecipes,
    [key]: updatedCurrentDayRecipes
  };

  setDroppedRecipes(updatedRecipes);
  localStorage.setItem("plannedMeals", JSON.stringify(updatedRecipes));
}

  return (
    <div>
        <style>
          {`
            .container {
              display: inline-grid;
              
              grid-template-columns: repeat(8, 1fr);
              
              background-color: blue;
              padding: 3px;
              grid-auto-rows: minmax(80px, auto);
              
              
              
            }
            .container div {
              background-color: #f1f1f1;
              border: 1px solid black;
              padding: 10px;
              
              font-size: 20px;
              text-align: left;
            }
            .weeks {
            
            color: Red;
            
            }
            .days {
            color: Blue;
            
           
            
                
            }
           .slots{
           
           }
           
           
          `}
        </style>
       <h1>Meal Plan</h1>

      <div className="container">
       
        <div></div>

        
        {days.map((day) => (
          <div className="days" key={day}>
            {day}
          </div>
        ))}

        
        {weeks.map((week) => (
          <React.Fragment key={"week-group-" + week}> {/* Changed to React.Fragment to avoid key warnings */}
            
            <div className="weeks" key={"week-" + week}>
              Week {week}
            </div>

            
           {days.map((day) => {
  const key = `week-${week}-day-${day}`
  const currentDayRecipes = droppedRecipes[key] || []; // Grab this specific day's array, default to empty array

  return (
    <div  
      onDrop={() => handleDropSlot(week, day)}
      className="slots"
      key={key}
    >
      {/* FIX: Access the array inside your state object and call .map() */}
      {currentDayRecipes.map((recipe, index) => (
        <div  key={index}>
          <small>{recipe}</small>
          
          {" "}
          <button onClick={()=>handleRemove(week, day, recipe)}>X</button>
        </div>
      ))}
    </div>
  );
})}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}


export default Calendar