import React, { Component } from "react";
import Form from "./components/Form";
import ListTasks from "./components/ListTasks";
import "./App.css";
import uuidv4 from "uuid/dist/v4";
// import { useForm } from "react-hook-form";

class App extends Component {
  state = {
    taskId: "",
    taskName: "",
    taskDesc: "",
    // taskComplete: false,
    taskList: [],
  };
  // resetForm = (event) => {
  //   event.target.reset();
  // };
  handleText = (event) => {
    this.setState({ taskName: event.target.value });
  };
  handleTextArea = (event) => {
    this.setState({ taskDesc: event.target.value });
  };
  // handleCheckbox = (event) => {
  //   this.setState({ taskComplete: event.target.checked });
  // };
  handleDeleteTask = (event) => {
    let target = event.target.parentElement.parentElement;
    target.remove();
    let storage = JSON.parse(localStorage.getItem("Tasks"));
    let deleteItem = storage
      .map((item) => {
        return item.id;
      })
      .indexOf(target.id);
    if (!storage) return;
    storage.splice(deleteItem, 1);
    localStorage.setItem("Tasks", JSON.stringify(storage));
  };
  loadDefault = () => {
    let newTask = {
      id: uuidv4(),
      name: "Hover me".toUpperCase(),
      description:
        "Hi there, welcome to my todo app. You can start by deleting this task and creating one of your own. It's that easy. " +
        "Good luck and may you complete all the tasks that your heart desire. ",
      taskComplete: false,
    };
    if (!localStorage.getItem("Tasks")) {
      localStorage.setItem("Tasks", JSON.stringify([newTask]));
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let { taskName, taskDesc, taskList } = this.state;

    if (!taskName) {
      return;
    } else {
      let newTask = {
        id: uuidv4(),
        name: taskName.toUpperCase(),
        description: taskDesc,
        // complete: false,
      };
      let storage = JSON.parse(localStorage.getItem("Tasks"));
      storage.push(newTask);

      storage.map((item) => {
        this.setState({
          taskList: [...taskList, item],
        });
      });
      localStorage.setItem("Tasks", JSON.stringify(storage));
    }
  };
  handleLocal = () => {
    if (!localStorage.getItem("Tasks")) {
      return this.state.taskList;
    } else {
      return JSON.parse(localStorage.getItem("Tasks"));
    }
  };

  render() {
    return (
      <div onLoad={this.loadDefault()} onChange={this.handleLocal}>
        <Form
          hSubmit={this.handleSubmit}
          hText={this.handleText}
          hTextarea={this.handleTextArea}
          // reset={this.resetForm()}
        />
        <ListTasks items={this.handleLocal()} delete={this.handleDeleteTask} />
      </div>
    );
  }
}

export default App;
