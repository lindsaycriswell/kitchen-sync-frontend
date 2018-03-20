import React from "react";
import TimeParser from "./../TimeParser";

class MealDirection extends React.Component {
  state = {
    completed: false
  };

  handleChange = e => {
    this.setState({
      completed: !this.state.completed
    });
  };

  render() {
    let displayStyle;

    if (this.state.completed && this.props.direction.doAhead) {
      displayStyle = {
        display: "inline",
        textDecoration: "line-through",
        color: "green"
      };
    } else if (this.state.completed) {
      displayStyle = { display: "inline", textDecoration: "line-through" };
    } else if (this.props.direction.doAhead) {
      displayStyle = { display: "inline", color: "green" };
    } else {
      displayStyle = { display: "inline" };
    }

    return (
      <div>
        <input
          onChange={this.handleChange}
          type="checkbox"
          style={{
            marginLeft: "10px",
            marginRight: "5px",
            height: "2vh",
            width: "2vw"
          }}
        />

        <h3 style={displayStyle}>
          <TimeParser time={new Date(this.props.direction.time)} /> -{" "}
          {this.props.direction.description}
        </h3>
        <p
          style={{
            marginLeft: "50px",
            marginBottom: "20px",
            fontStyle: "italic"
          }}
        >
          {this.props.direction.recipe}
        </p>
      </div>
    );
  }
}

export default MealDirection;

// - {this.props.direction.time} -{" "}
// {this.props.direction.recipe}