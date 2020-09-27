import React, { Component } from "react";
import { Composition } from "../services";
import "./FormulaComposition.scss";

export class FormulaComposition extends Component<{
  formula: string;
  composition: Composition;
  error: string | null;
}> {
  render() {
    return (
      <div className="formula">
        <h3>{this.props.formula}</h3>
        {this.props.error && <div className="error">{this.props.error}</div>}
        <table className="formula-composition">
          <tbody>
            {Object.entries(this.props.composition).map(([element, count]) => (
              <tr key={element}>
                <td>{element}</td>
                <td>→</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
