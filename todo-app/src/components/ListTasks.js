import React, { Component } from "react";
import styled from "styled-components";

const StyledDeleteButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  outline: none;
  border: none;
  margin-top: 20px;
`;
const StyledP = styled.p`
  color: #004747;
  display: flex;
  justify-content: center;
`;
const StyledDiv = styled.div`
  display: flex;
  margin: 20px auto;
  justify-content: space-around;
  border-radius: 10px;
  align-content: center;
  flex-wrap: wrap;
  width: 50vw;
  height: 50vh;
  flex-direction: row;
  align-items: stretch;
  overflow-x: hidden;
  overflow-y: auto;
  @media (max-width: 1333px) {
    width: 70vw;
  }
  @media (max-width: 992px) {
    width: 100vw;
  }
`;
const StyledDivTooltip = styled.div`
  display: none;
  position: absolute;
  z-index: 1;
  width: 100%;
  //border-radius: 10px;
`;
const StyledDivItem = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  pointer-events: none;
  background-color: #004747;
  justify-content: center;
  //border-radius: 10px;
  color: white;
`;
const StyledDivWrapper = styled.div`
  position: relative;
  min-width: 40%;
  margin: 10px 20px;

  &:hover {
    ${StyledDivTooltip} {
      display: block;
      //border-radius: 10px;
      text-align: center;
      pointer-events: painted;
      width: 100%;
      overflow-wrap: break-word;
      background-color: lightgrey;
    }
    ${StyledP} {
      margin: 0 5px;
    }
  }
  @media (max-width: 992px) {
    width: 70%;
    height: 60px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

class ListTasks extends Component {
  render() {
    return (
      <StyledDiv on={this.props.items}>
        {this.props.items.map((item) => (
          <StyledDivWrapper key={item.id} id={item.id}>
            <StyledDivItem>{item.name}</StyledDivItem>
            <StyledDivTooltip>
              <StyledP>{item.description}</StyledP>
              <StyledDeleteButton onClick={this.props.delete} id={item.id}>
                Delete Task
              </StyledDeleteButton>
            </StyledDivTooltip>
          </StyledDivWrapper>
        ))}
      </StyledDiv>
    );
  }
}

export default ListTasks;
