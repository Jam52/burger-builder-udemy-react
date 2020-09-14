import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter ZipCode",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    console.log("[contactData]__orderHandler", this.props.ingredients);

    const formData = {};
    for (let formElId in this.state.orderForm) {
      formData[formElId] = this.state.orderForm[formElId].value;
    }

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log("Order Placed: ", response);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log("Order Placed ERROR:", error);
        this.setState({ loading: false });
      });
  };

  checkValidity(input, rules) {
    let isValid = true;
    try {
      if (rules.required) {
        isValid = input.trim() !== "";
      }
    } catch (e) {
      console.log(e);
    }

    return isValid;
  }

  inputChangedHandler = (event, inputId) => {
    console.log(event.target.value);
    const updatedOrderForm = {
      ...this.state.orderForm,
    };

    const updatedFormEl = { ...updatedOrderForm[inputId] };
    updatedFormEl.value = event.target.value;
    updatedFormEl.valid = this.checkValidity(
      updatedFormEl.value,
      updatedFormEl.validation
    );
    updatedFormEl.touched = true;
    updatedOrderForm[inputId] = updatedFormEl;

    let formIsValid = true;
    for (let inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form className={classes.InputForm} onSubmit={this.orderHandler}>
        {formElementsArray.map((formEl) => {
          return (
            <Input
              elementType={formEl.config.elementType}
              elementConfig={formEl.config.elementConfig}
              value={formEl.config.value}
              key={formEl.id}
              changed={(event) => this.inputChangedHandler(event, formEl.id)}
              invalid={!formEl.config.valid}
              touched={formEl.config.touched}
              shouldValidate={formEl.config.validation}
            />
          );
        })}
        <Button
          disabled={!this.state.formIsValid}
          btnType="Success"
          clicked={this.orderHandler}
        >
          Order
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
