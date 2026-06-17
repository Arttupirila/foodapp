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


async function fetchLogin(email, password) { 
  const res = await fetch("http://localhost:3000/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "test@test.com",
    password: "123456"
  })
})
}

     return (
    <form onSubmit={fetchRegister}>
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
      <input type="submit" value="Register" />
    </form>
  );
}

export default Profile