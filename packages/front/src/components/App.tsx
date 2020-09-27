import React from "react";
import logo from "../ressources/logo.svg";
import "./App.scss";

export function App() {
  return (
    <div className="App">
      <header>
        <h1>Molecular Parser</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <form>
          <label>
            Formula: <input type="text" name="name" />
          </label>
          <input type="submit" value="Envoyer" />
        </form>
      </main>
    </div>
  );
}
