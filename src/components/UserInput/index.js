import React, { Component } from "react";
import "./index.css";

class UserInput extends Component {
  state = {
    name: "",
  };

  constructor(props) {
    super(props);
    this.textInputRef = React.createRef();
  }

  componentDidMount() {
    this.textInputRef.current.focus();
  }

  saveToLocal = () => {
    const { name } = this.state;
    if (name) {
      localStorage.setItem("name", name);
      localStorage.setItem("score", 0);
      localStorage.setItem("topScore", 0);
      window.location.reload();
    }
  };

  onChangeInput = (e) => {
    this.setState({ name: e.target.value });
  };

  render() {
    return (
      <div className="bg-container">
        <div className="wrapper-container">
          <h1 className="title">Tile Matching Game</h1>
          <div className="input-container">
            <label className="input-label">Enter your name</label>
            <input
              type="text"
              className="input-ele"
              onChange={this.onChangeInput}
              ref={this.textInputRef}
            />
            <button
              type="submit"
              className="play-button"
              onClick={this.saveToLocal}
            >
              Play
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInput;
