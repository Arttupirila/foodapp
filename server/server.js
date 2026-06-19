
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



app.post("/register", authMiddleware, postRegister)
app.post("/login", authMiddleware, postLogin)

//-------------------------------------------------------------
app.post('/favorites', authMiddleware, postFavorites)

app.get('/favorites', authMiddleware, getFavorites);

app.delete('/favorites', authMiddleware, deleteFavorites)

//-----------------------------------------------------------------------------

app.post('/mps', authMiddleware, postMp)

app.get('/mps', authMiddleware, getMp);

app.delete('/mps', authMiddleware, deleteMp)

//------------------------------------------------------------------------------

app.post('/shoppinglist', authMiddleware, postShoppinglist)

app.get('/shoppinglist', authMiddleware, getShoppinglist);

app.delete('/shoppinglist', authMiddleware, deleteShoppinglist)
app.listen(3000);
