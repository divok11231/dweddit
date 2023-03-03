
import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]= useState("")

  const mainDivStyle = {
    padding: "1em",
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    try{

    const credentials = { email, password };
    
    const user = await axios.post("/api/auth/register", credentials);
    if (user) {
    window.location.replace("/feed");}}
    catch(error){setError("you arent a real person you lied to me why would you lie to me thats not cool bro")}


       
  };



  return (
    <div style={mainDivStyle}>
      <form  onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username"> Username </label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password"> Password </label>
        <input
          type="text"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button> Log in </button>
      </form>
      {error && <p>{error}</p>}

     
    </div>
  );
}