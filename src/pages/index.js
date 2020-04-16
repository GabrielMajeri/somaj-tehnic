import React, { useState } from "react";

function App() {
  const [initialSalary, setInitialSalary] = useState(0);

  function changeSalary(event) {
    setInitialSalary(event.target.value);
  }

  let salary = initialSalary;
  let newSalary = (initialSalary * 75) / 100;
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
          Ce salariu net aveai inainte de instaurarea starii de urgenta? <br />
          <input
            className="inputRon"
            type="text"
            name="RON"
            value={initialSalary}
            onChange={changeSalary}
          />
        </label>

        <span>RON</span>

        <p>Salariu net initial: {salary} RON</p>
        <p>Salariu net actual: {newSalary} RON</p>
      </form>
    </div>
  );
}

export default () => <App />;
