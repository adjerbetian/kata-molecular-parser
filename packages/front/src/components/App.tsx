import React, { Component } from "react";
import logo from "../ressources/logo.svg";
import "./App.scss";
import { Composition, compositionService } from "../services";
import { FormulaComposition } from "./FormulaComposition";

interface AppProps {}
interface AppState {
  formula: string;
  composition: Composition;
  error: string | null;
}

export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      formula: "",
      composition: {},
      error: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Molecular Parser</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main>
          <h2>Enter your formula</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="formula" />
            <input type="submit" value="Submit" />
          </form>
          <FormulaComposition
            formula={this.state.formula}
            composition={this.state.composition}
            error={this.state.error}
          />
        </main>
      </div>
    );
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // @ts-ignore
    const formula = event.target.elements.formula.value;
    event.preventDefault();
    await this.updateFormulaDecomposition(formula);
  }
  async updateFormulaDecomposition(formula: string) {
    try {
      const composition = await compositionService.getComposition(formula);
      this.setState({
        formula,
        composition,
        error: null,
      });
    } catch (err) {
      this.setState({
        formula,
        composition: {},
        error: err.message || err,
      });
    }
  }
}
