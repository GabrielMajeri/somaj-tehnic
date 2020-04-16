import React from "react";
import { Helmet } from "react-helmet";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import salariesPerCounty from "../data/salariesPerCounty.json";
import salariesPerJob from "../data/salariesPerJob.json";

export default function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Șomajul tehnic în perioada stării de urgență</title>
      </Helmet>

      <h1>Șomaj Tehnic</h1>

      <p>
        Dacă ești una dintre persoanele care a intrat în șomaj tehnic din cauza
        epidemiei de CoVID-19, suntem aici să te ajutăm.
      </p>

      <SalaryForm />
    </>
  );
}

const SalaryForm = () => {
  const {
    control,
    formState: { isSubmitting },
    register,
    handleSubmit,
    watch,
    errors,
    setError,
  } = useForm({
    mode: "onChange",
  });

  const initialSalary = watch("initialSalary");
  const onSubmit = async (data) => {
    try {
      // fetch
    } catch (error) {
      setError("submit", "submitError", `Doh! ${error.message}`);
    }
  };

  const showSalaryReport = !errors.initialSalary && initialSalary;

  let invalidSalaryWarning = null;
  if (errors.initialSalary) {
    invalidSalaryWarning = <div>Salariu invalid</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>
          Ce salariu <u>brut</u> aveai înainte de instaurea stării de urgență?
        </p>
        <div>
          <input
            disabled={isSubmitting}
            type="text"
            id="initialSalary"
            name="initialSalary"
            placeholder="2000"
            ref={register({ pattern: /^[0-9]+$/i })}
          />
          <label htmlFor="initialSalary">RON</label>
          {invalidSalaryWarning}
        </div>
      </div>
      {showSalaryReport && (
        <SalaryReport initialSalary={initialSalary} control={control} />
      )}
      <p>
        Cu permisiunea ta, strângem date anonime de la oameni afectați de
        pandemie din toată țara, și raportăm aceste date autorităților.
      </p>
      <input disabled={isSubmitting} type="submit" value="Trimite dat " />
    </form>
  );
};

const SalaryReport = ({ initialSalary, control }) => {
  // TODO: use per job type salary caps
  const newSalary = Math.min(initialSalary * 0.75, 4072);

  const countyNames = Object.keys(salariesPerCounty);

  const countyOptions = countyNames.map((name) => ({
    label: name,
    value: name,
  }));

  const jobNames = Object.keys(salariesPerJob);

  const jobOptions = jobNames.map((name) => ({
    label: name,
    value: name,
  }));

  return (
    <>
      <div>Salariu brut inițial: {initialSalary} RON</div>
      <div>Salariu brut actual: {newSalary} RON</div>

      <Controller
        as={Select}
        control={control}
        name="county"
        placeholder="Alegeți județul"
        options={countyOptions}
      />
      <Controller
        as={Select}
        control={control}
        name="job"
        placeholder="Alegeți domeniul de activitate"
        options={jobOptions}
      />
    </>
  );
};
