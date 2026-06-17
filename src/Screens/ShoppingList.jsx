import { useState, useEffect } from "react"
import { useContext } from 'react'
import { AppContext } from './AppContext'
function ShoppingList() {

    const [entry, setEntry] = useState([])
    useContext(AppContext);

    async function fetchList() {
    try {
      const response = await fetch("http://localhost:3000/shoppinglist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) throw new Error(`Fetch failed: ${response.status}`)
      const data = await response.json()
      setEntry(data.items || [])
      console.log(data.items)
    } catch (err) {
      console.error("Error loading shopping list:", err)
    }
  }

    async function handleSubmit(e) {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)
        const text = formData.get("entry")
        console.log("button pressed! Input value: " + text)

        await fetch("http://localhost:3000/shoppinglist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      item: text
    })
    
  })
  .then((response) => response.json())
  .then((data) => {
  setEntry(data.items || [])
  });
  
  ;
        
    }

   async function removeItem(item) {
     try {
      const response = await fetch("http://localhost:3000/shoppinglist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: item
        })
      })
      if (!response.ok) throw new Error(`Fetch failed: ${response.status}`)
      const data = await response.json()
      setEntry(data.items || [])
      console.log(data.items)
    } catch (err) {
      console.error("Error:", err)
    }
  }

  useEffect(() => {
       fetchList()
    }, [])
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
            {item.title} 
            <button onClick={() => removeItem(item.title)}>x</button>
            </li>
        ))}
        </ul>
        </div>
    )
}

export default ShoppingList