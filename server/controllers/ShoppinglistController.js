import connectDB from "../helpers/db.js";

const postShoppinglist = async (req, res) => {
    console.log("adding items to shopping list")
    console.log(req.body)
    const shoppinglistItem = req.body.item
    console.log("title: " + shoppinglistItem)
    const db = await connectDB()
    
    
    await db.collection("shoppinglist").insertOne({
        title: shoppinglistItem,
        date: Date()
    })

    const items = await db
            .collection("shoppinglist")
            .find()
            .toArray();

        console.log(items);

        
    res.json({
        message: "Shopping list item added added",
        items: items
    })
}

const getShoppinglist = async (req, res) => {
    try {
        console.log("getting shopping list items");

        const db = await connectDB();

        const items = await db
            .collection("shoppinglist")
            .find()
            .toArray();

        console.log(items);

        res.json({
            items: items
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

const deleteShoppinglist = async (req,res) => {
    
        const db = await connectDB()

        await db.collection("shoppinglist").deleteOne( { title: req.body.item})

          const updatedItems = await db
      .collection("shoppinglist")
      .find()
      .toArray()

    res.json({
      items: updatedItems
    })
    
}

export { getShoppinglist, postShoppinglist, deleteShoppinglist };