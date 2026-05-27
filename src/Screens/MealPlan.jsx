import Calendar from '/Components/Calendar.jsx'

function MealPlan({ setMpRecipes, mpRecipes }) {


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
        <h1>meal plan screen</h1>
        <ul>
           {mps.map((mp, index) => (
  <li key={index}>
    {mp[1]}
    <button onClick={() => deleteFromMP(index)}>Remove</button>
    <br />
    <img src={mp[0]} width="200" height="100" />
  </li>
))}
        </ul>

        <section>

        <Calendar></Calendar>
      
        </section>
        

        </div>
        </div>
        

        
    )
        
}

export default MealPlan