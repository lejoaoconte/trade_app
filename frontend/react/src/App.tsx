import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const signUp = async () => {
    const input = { name, email, document, password };
    const responseSignup = await fetch("http://localhost:3010/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(input),
    });

    const outputSignup = await responseSignup.json();

    if(outputSignup.accountId) {
      console.log("Signup successful:", outputSignup);
      setMessage("Signup successful!");
    } else {
      console.log("Signup failed:", outputSignup);
      setMessage(outputSignup.error);
    }
  };

  return (
    <>
      <div>
        <input
          className="input-name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input-email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-document"
          placeholder="Document"
          onChange={(e) => setDocument(e.target.value)}
        />
        <input
          className="input-password"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button-signup" onClick={() => signUp()}>
          Sign Up
        </button>
        {message && <span className="span-message">{message}</span>}
      </div>
    </>
  );
}

export default App;
