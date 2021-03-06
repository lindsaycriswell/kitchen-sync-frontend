import React from "react";
import { Button, Modal, Input, Card } from "semantic-ui-react";
import RecipeCard from "../Recipes/RecipeCard";
import { connect } from "react-redux";
import ShoppingListIngredientList from "./ShoppingListIngredientList";
import * as emailjs from "emailjs-com";
import bannerImage from "./../../photos/newbanner.jpg";

class ShoppingListModalContainer extends React.Component {
  state = {
    email: "",
    modalOpen: false,
    dimmerClick: true
  };

  handleChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  handleSubmit = () => {
    this.props.shoppingListIngredients.sort(function(a, b) {
      let searchNameA = a.searchName.toUpperCase();
      let searchNameB = b.searchName.toUpperCase();
      if (searchNameA < searchNameB) {
        return -1;
      }
      if (searchNameA > searchNameB) {
        return 1;
      }
      return 0;
    });

    for (var i = 0; i < this.props.shoppingListIngredients.length; i++) {
      this.props.shoppingListIngredients[
        i
      ].searchName = this.props.shoppingListIngredients[i].searchName
        .split(" ")
        .map(function(word) {
          return word[0].toUpperCase() + word.substr(1);
        })
        .join(" ");
    }

    emailjs
      .send(
        "kitchensyncshoppinglist_gmail_com",
        "kitchensync_shopping_list",
        {
          email: this.state.email,
          shoppingListIngredients: this.props.shoppingListIngredients,
          image: bannerImage
        },
        "user_kN7rJ3E81xLlmJFFtafZ0"
      )
      .then(
        function(response) {
          console.log(
            "SUCCESS. status=%d, text=%s",
            response.status,
            response.text
          );
        },
        function(err) {
          console.log("FAILED. error=", err);
        }
      );

    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  toggleModalOpen = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  render() {
    return (
      <div>
        <Modal
          className="ui medium scrolling modal transition visible active"
          open={this.state.modalOpen}
          trigger={
            <Button
              onClick={this.toggleModalOpen}
              size="medium"
              style={{
                marginBottom: "40px"
              }}
            >
              Create a shopping list for this meal
            </Button>
          }
        >
          <Modal.Header
            style={{
              color: "#4e618e"
            }}
            className="modal-header"
          >
            Create a Shopping List
            <span
              style={{ float: "right", color: "black" }}
              onClick={this.toggleModalOpen}
            >
              X
            </span>
          </Modal.Header>
          <div>
            <Modal.Content
              className="ui grid centered"
              style={{ marginTop: "10px" }}
            >
              <div className="row">
                <div className="sixteen wide column">
                  <Card.Group
                    itemsPerRow={3}
                    centered
                    style={{ margin: "10px" }}
                  >
                    {this.props.currentMealRecipes.map(recipe => (
                      <RecipeCard recipe={recipe} key={recipe.id} />
                    ))}
                  </Card.Group>
                </div>
              </div>
              <div className="row">
                <div className="sixteen wide column">
                  <h1 className="modal-header">Ingredients</h1>
                </div>
                <div className="sixteen wide column">
                  <h3 className="centered-text" style={{ margin: "1%" }}>
                    Check off the ingredients you already have to remove them
                    from your shopping list.
                  </h3>
                </div>
              </div>
              <div>
                <ShoppingListIngredientList
                  recipes={this.props.currentMealRecipes}
                />
                <div className="row">
                  <div className="sixteen wide column">
                    <Input
                      style={{ margin: "20px" }}
                      type="text"
                      placeholder="Email Address"
                      onChange={this.handleChange}
                    />
                    <Button size="small" onClick={this.handleSubmit}>
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="sixteen wide column">
                  <p className="close" onClick={this.toggleModalOpen}>
                    Close
                  </p>
                </div>
              </div>
            </Modal.Content>
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentMealRecipes: state.recipe.currentMealRecipes,
    shoppingListIngredients: state.shoppingList.shoppingListIngredients
  };
}

export default connect(mapStateToProps)(ShoppingListModalContainer);
