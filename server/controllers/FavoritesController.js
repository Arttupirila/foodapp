import connectDB from "../helpers/db.js";

const postFavorites = async (req, res) => {
    console.log("adding favorites")
    console.log(req.body)
    const fav = req.body.favorite
    console.log("title: " + fav[1] + "image: " + fav[0])
    const db = await connectDB()
    
    
    await db.collection("favorites").insertOne({
        title: fav[1],
        image: fav[0],
        date: Date()
    })

    res.json({
        message: "Favorite added"
    })
}

const getFavorites = async (req, res) => {
    try {
        console.log("getting favorites");

        const db = await connectDB();

        const favorites = await db
            .collection("favorites")
            .find()
            .toArray();

        console.log(favorites);

        res.json({
            favorites: favorites
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

const deleteFavorites = async (req,res) => {
    
        const db = await connectDB()

        await db.collection("favorites").deleteOne( { title: req.body.title})

          const updatedFavorites = await db
      .collection("favorites")
      .find()
      .toArray()

    res.json({
      favorites: updatedFavorites
    })
    
}

export { postFavorites, getFavorites, deleteFavorites };