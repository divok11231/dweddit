
import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [email, setUsername] = useState(0);
  const [error, setError]= useState("");
  

  const mainDivStyle = {
    padding: "1em",
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

    const credentials = { email };
    axios.defaults.withCredentials = true;
    const user = await axios.post("/api/create/follower", credentials);
    if (user) {
      window.location.replace("/feed");
    }
    } catch(error){setError("User does not exist you are schizo he died years ago you have to let go it wasnt your fault he never saw the bus coming")}


       
  };



  return (
    <div style={mainDivStyle}>
      <form  onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">Follow UserId </label>
        <input
          type="number"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.valueAsNumber)}
        />

        

        <button> Follow user </button>
        {error && <p>{error}</p>}
      </form>

     
    </div>
  );
}