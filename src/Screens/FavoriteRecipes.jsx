

function FavoriteRecipes({ favorites, setFavorites }) {

     const deleteFavorites = (indexToRemove) => {
  const updatedFavorites = favorites.filter((_, index) => index !== indexToRemove);
  setFavorites(updatedFavorites);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

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
    <br />
    <img src={favorite[0]} width="200" height="100" />
  </li>
))}
        </ul>
        </div>
        
        </div>

        
    )
}

export default FavoriteRecipes