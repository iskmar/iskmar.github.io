import React, { Component } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  display: flex;
  align-self: center;
  width: 50%;
  height: 70px;
  text-align: center;
  border: none;
  background: linear-gradient(to bottom right, seagreen, darkolivegreen);
  color: white;
  font-size: 22px;
  margin: 10px auto;
  //@media (max-width: 1333px) {
  //  width: 80vw;
  //}
  @media (max-width: 992px) {
    width: 70%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const StyledButton = styled.button`
  display: flex;
  align-self: center;
  margin: 30px auto;
`;
const StyledForm = styled.form`
  width: 50vw;
  margin: 50px auto;
  justify-content: center;
  @media (max-width: 1333px) {
    width: 80vw;
  }
  @media (max-width: 768px) {
    width: 100vw;
  }
  @media (max-width: 992px) {
    width: 100vw;
  }
`;
class Form extends Component {
  render() {
    return (
      <StyledForm
        onSubmit={() => {
          this.props.hSubmit();
          // this.props.reset();
        }}
      >
        <StyledInput
          name="text"
          onChange={this.props.hText}
          placeholder="*Enter task name"
          autoComplete="off"
        />
        <StyledInput
          name="textarea"
          onChange={this.props.hTextarea}
          placeholder="Enter task description (Optional)"
          autoComplete="off"
        />
        <StyledButton onSubmit={this.props.handleLocal}>Add Task</StyledButton>
      </StyledForm>
    );
  }
}

export default Form;
