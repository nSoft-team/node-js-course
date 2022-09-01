import { Component } from "react";
import "./RandomColor.css";

interface RandomColorState {
  color: string;
}

class RandomColor extends Component<{}, RandomColorState> {
  public constructor(props: {}) {
    super(props);
    this.state = { color: "" };
  }

  public componentDidMount(): void {
    document.title = "Northwind | Home";
  }

  public doWork = () => {
    this.setState({ color: this.getColor() });
  };

  private getColor(): string {
    // RGB 0-255, 0-255, 0-255
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const color = `rgb(${r},${g},${b})`;
    return color;
  }

  public render(): JSX.Element {
    return (
      <div
        className="RandomColor Box"
        style={{ backgroundColor: this.state.color }}
      >
        <p>
          <button onClick={this.doWork}>Test</button>
        </p>
      </div>
    );
  }
}

export default RandomColor;
