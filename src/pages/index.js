import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { salariuInitial: 0 };
  }

  changeSalary(event) {
    this.setState({
      salariuInitial: event.target.value,
    });
  }

  render() {
    let salary = this.state.salariuInitial;
    let newSalary = (this.state.salariuInitial * 75) / 100;
    if (4072 < newSalary) {
      newSalary = 4072;
    }

    return (
      <div className="bigdiv">
        <div className="title">
          <h1>Somaj Tehnic</h1>
        </div>

        <div className="information1">
          <p>Seek and Destroy better than Seek and Love</p>
        </div>

        <form>
          <label>
            Ce salariu net aveai inainte de instaurarea starii de urgenta?{" "}
            <br />
            <input
              className="inputRon"
              type="text"
              name="RON"
              value={this.state.salariuInitial}
              onChange={this.changeSalary.bind(this)}
            />
          </label>

          <span>RON</span>

          <p>Salariu net initial: {salary} RON</p>
          <p>Salariu net actual: {newSalary} RON</p>
        </form>
      </div>
    );
  }
}

export default () => <App />;
