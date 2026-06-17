import connectDB from "../helpers/db.js";

const postMp = async (req, res) => {
    console.log("adding mps")
    console.log(req.body)
    const mp = req.body.mp
    console.log("title: " + mp[1] + "image: " + mp[0])
    const db = await connectDB()
    
    
    await db.collection("mps").insertOne({
        title: mp[1],
        image: mp[0],
        date: Date()
    })

    res.json({
        message: "Meal plan recipe added"
    })
}

const getMp = async (req, res) => {
    try {
        console.log("getting mps");

        const db = await connectDB();

        const mps = await db
            .collection("mps")
            .find()
            .toArray();

        console.log(mps);

        res.json({
            mps: mps
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

const deleteMp = async (req,res) => {
    
        const db = await connectDB()

        await db.collection("mps").deleteOne( { title: req.body.title})

          const updatedMps = await db
      .collection("mps")
      .find()
      .toArray()

    res.json({
      mps: updatedMps
    })
    
}

export { postMp, getMp, deleteMp };