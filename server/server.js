
import express from "express";
import cors from "cors";

import { postRegister, postLogin } from "./controllers/UserController.js";
import { postFavorites, getFavorites, deleteFavorites } from "./controllers/FavoritesController.js";
import { postMp, getMp, deleteMp } from "./controllers/MpsController.js";
import { getShoppinglist, postShoppinglist, deleteShoppinglist } from "./controllers/ShoppinglistController.js";
import { authMiddleware } from "./helpers/auth.js";

const app = express();

app.use(express.json());
app.use(cors());



app.post("/register", postRegister)
app.post("/login", postLogin)

//-------------------------------------------------------------
app.post('/favorites', postFavorites)

app.get('/favorites', getFavorites);

app.delete('/favorites', deleteFavorites)

//-----------------------------------------------------------------------------

app.post('/mps', postMp)

app.get('/mps', getMp);

app.delete('/mps', deleteMp)

//------------------------------------------------------------------------------

app.post('/shoppinglist', postShoppinglist)

app.get('/shoppinglist', getShoppinglist);

app.delete('/shoppinglist', deleteShoppinglist)
app.listen(3000);
