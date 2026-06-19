import { useState } from "react";

function Profile() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   async function fetchRegister(e) {
    e.preventDefault();

    await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  }


async function fetchLogin(e) {
    e.preventDefault();
    try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`)
    const data = await response.json()
    console.log(data.token)
    localStorage.setItem("token", data.token)
} catch (err) {
      console.error("Error:", err)
    }
  }

     return (
    <form onSubmit={fetchLogin}>
      <input
        type="text"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input type="submit" value="Login" />
    </form>
  );
}

export default Profile