import React ,{useState}from "react";
import "./Register.css";
import{API_URL} from "../../../data/ApiPath"

const Register = ({showLoginHandeler}) => {
const [username,setUserName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [loading,setLoading]=useState(false)

const handelSubmit=async(e)=>{
e.preventDefault();
setLoading(true)
try {
  const response = await fetch(`${API_URL}/vendor/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username.trim(), email: email.trim(), password })
  })
  const data = await response.json()
  if (response.ok) {
    console.log(data)
    alert("Vendor Registered Successfully")
    setUserName("")
    setEmail("")
    setPassword("")
    showLoginHandeler()
  } else {
    console.error("Registration failed:", data)
    alert(data.message || "Registration Failed")
  }
} catch (error) {
  console.log("registration failed", error)
  alert("Registration Failed")
} finally{
 setLoading(false)
}
}


  return (
    <div className="registerSection">
      <form className="AuthForm" onSubmit={handelSubmit}>

        <h3>Vendor Register</h3>

        <label htmlFor="username">Username</label>
        <br />
        <input
       onChange={(e)=>setUserName(e.target.value)}
       value={username}
        name="userName"
          type="text"
          id="username"
          placeholder="Enter your Username"
          required
        />
        <br />

        <label htmlFor="email">Email</label>
        <br />
        <input
         onChange={(e)=>setEmail(e.target.value)}
       value={email}
        name="email"
          type="email"
          id="email"
          placeholder="Enter your Email"
          required
        />
        <br />

        <label htmlFor="password">Password</label>
        <br />
        <input
         onChange={(e)=>setPassword(e.target.value)}
       value={password}
        name="password"
          type="password"
          id="password"
          placeholder="Enter your Password"
          required
        />
        <br />

        <div className="btnSubmit">
          <button type="submit" disabled={loading}>{loading ? "Registering..." :"Register"}</button>
        </div>

      </form>
    </div>
  );
};

export default Register;