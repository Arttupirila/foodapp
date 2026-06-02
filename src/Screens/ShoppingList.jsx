import { useState } from "react"
import { useContext } from 'react'
import { AppContext } from './AppContext'
function ShoppingList() {

    const { entry, setEntry} =
    useContext(AppContext);

   

    function handleSubmit(e) {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)
        const text = formData.get("entry")
        console.log("button pressed! Input value: " + text)
        const currentEntries = entry
        if (currentEntries.includes(text)) {
            console.log("repeat")
        }
        const updatedEntries = [...entry,
            text
        ]
        console.log("entries: " + updatedEntries)
        setEntry(updatedEntries)
        localStorage.setItem("shoppingList", JSON.stringify(updatedEntries))
    }

   function removeEntry(index) {
    const updatedEntries = entry.filter((_, i) => i !== index);
    console.log("entries: " + updatedEntries)
    setEntry(updatedEntries)
    localStorage.setItem("shoppingList", JSON.stringify(updatedEntries))
}
    return (
        <div>
        <h1>Shopping List</h1>
       
        <div>

            <form onSubmit={handleSubmit}>
        <input type="text" name="entry" required></input>
        <input type="submit" value={"Add"}></input>
            </form>

        </div>
            <ul>
        {entry.map((item, index) => (
            <li key={index}>
            {item}
            <button onClick={() => removeEntry(index)}>x</button>
            </li>
        ))}
        </ul>
        </div>
    )
}

export default ShoppingList