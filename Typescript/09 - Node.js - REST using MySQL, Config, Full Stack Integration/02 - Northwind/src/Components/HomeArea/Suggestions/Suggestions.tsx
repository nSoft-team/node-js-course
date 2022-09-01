import { Component } from "react";
import "./Suggestions.css";

// Props interface:
interface SuggestionsProps {
  header: string;
}

// State interface:
interface SuggestionsState {
  suggestion: string;
}

class Suggestions extends Component<SuggestionsProps, SuggestionsState> {
  // constructor - initializing the state (must not perform side-effects):
  public constructor(props: SuggestionsProps) {
    super(props);

    // Init the state:
    this.state = {
      suggestion: "---",
    };
  }

  // Lifecycle Hooks - can perform side-effects:

  // useEffect which runs only once:
  public componentDidMount(): void {
    // ...
  }

  // useEffect which runs on any update:
  public componentDidUpdate(
    prevProps: Readonly<SuggestionsProps>,
    prevState: Readonly<SuggestionsState>,
    snapshot?: any
  ): void {
    // ...
  }

  // useEffect which runs when component destroyed:
  public componentWillUnmount(): void {
    // ...
  }

  // Event callback:
  private makeSuggestion = () => {
    // Change state:
    this.setState({ suggestion: "Cranberries" });
  };

  // render - returns the HTML of the component (must not perform side-effects):
  public render(): JSX.Element {
    return (
      <div className="Suggestions Box">
        <p>
          {/* Display props:  */}
          {this.props.header}

          {/* Call event:  */}
          {/* <button onClick={this.makeSuggestion.bind(this)}>Suggest Product</button> */}
          <button onClick={this.makeSuggestion}>Suggest Product</button>

          {/* Display state:  */}
          <span>Suggestion: {this.state.suggestion}</span>
        </p>
      </div>
    );
  }
}

export default Suggestions;
