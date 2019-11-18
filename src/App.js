import React, { Component } from "react";
import DynamicForm from "./components/DynamicForm";
import "./App.css";

class App extends Component {
  state = {
    data: [
      {
        id: 1,
        trainingName: "Computer science",
        description: "regarding basics of c and c++",
        department: "cse",
        date: "11/25/2019",
        duration: 2,
        meetingRoom: "Austin"
      },
      {
        id: 2,
        trainingName: "Java",
        description: "Regarding java basics",
        department: "cse",
        date: "01/11/2019",
        duration: 1,
        meetingRoom: "TP Room"
      }
    ],
    current: {}
  };

  onSubmit = model => {
    let data = [];
    if (model.id) {
      data = this.state.data.filter(d => {
        return d.id != model.id;
      });
    } else {
      model.id = +new Date();
      data = this.state.data.slice();
    }

    this.setState({
      data: [model, ...data],
      current: {} // todo
    });
  };

  onEdit = id => {
    let record = this.state.data.find(d => {
      return d.id == id;
    });
    //alert(JSON.stringify(record));
    this.setState({
      current: record
    });
  };

  onNewClick = e => {
    this.setState({
      current: {}
    });
  };

  mySearchFunction = () => {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  render() {
    let data = this.state.data.map(d => {
      return (

        <tr key={d.id}>
          <td>{d.trainingName}</td>
          <td>{d.description}</td>
          <td>{d.department}</td>
          <td>{d.date}</td>
          <td>{d.duration}</td>
          <td>{d.meetingRoom}</td>
          {/* <td>{d.skills && d.skills.join(",")}</td> */}
          <td>
            <button
              onClick={() => {
                this.onEdit(d.id);
              }}
            >
              Edit
                </button>
          </td>
        </tr>

      );
    });

    return (
      <div className="App">
        <div className="form-actions">
          <button className="new_training" onClick={this.onNewClick} type="submit">
            SCHEDULE NEW TRAINING
          </button>
        </div>
        <DynamicForm
          key={this.state.current.id}
          className="form"
          title="Training Form"
          defaultValues={this.state.current}
          model={[
            { key: "trainingName", label: "Training Name", props: { required: true } },
            { key: "description", label: "Description" },
            {
              key: "department",
              label: "Department",
              type: "string",
              // props: { min: 0, max: 5 }
            },
            {
              key: "date",
              label: "date",
              type: "date",
              id: "date"
            },
            { key: "duration", label: "Duration", type: "number" },
            {
              key: "meeting_room",
              label: "Meeting Room",

            }

          ]}
          onSubmit={model => {
            this.onSubmit(model);
          }}
        />

        <input type="text" id="myInput" onChange={() => { this.mySearchFunction() }} placeholder="Search for names.." title="Type in a name"></input>
        <table border="1" id="myTable">
          <div>
            Scheduled Trainings
        </div>
          <div>

          </div>
          <tbody>{data}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
