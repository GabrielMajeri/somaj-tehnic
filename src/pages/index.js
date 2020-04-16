import React from "react";
import { Helmet } from "react-helmet";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import "../styles/global.css";

import salariesPerCounty from "../data/salariesPerCounty.json";
import salariesPerJob from "../data/salariesPerJob.json";

export default function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Titillium+Web"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto"
        />

        <title>Șomajul tehnic în perioada stării de urgență</title>
      </Helmet>

      <main>
        <h1>Șomaj Tehnic</h1>

        <p>
          Dacă ești una dintre persoanele care a intrat în șomaj tehnic din
          cauza epidemiei de CoVID-19, suntem aici să te ajutăm.
        </p>

        <SalaryForm />

        <h2>Ce pot să fac dacă nu sunt plătit?</h2>
        <p>
          Te rugăm să ne contactezi prin <a href="#">acest formular</a>. Te vom
          pune în legătură cu un{" "}
          <a href="https://www.unelm.ro/">expert în legislația muncii</a>.
        </p>
      </main>

      <footer>
        Proiect dezvoltat în cadrul concursului{" "}
        <a
          href="http://fmi.unibuc.ro/hackthevirus/"
          target="_blank"
          rel="noreferer noopener"
        >
          #HackTheVirus
        </a>
      </footer>
    </>
  );
}

const SalaryForm = () => {
  const form = useForm({ mode: "onChange" });
  const {
    formState: { isSubmitting },
    register,
    handleSubmit,
    watch,
    errors,
    setError,
  } = form;

  const initialSalary = watch("initialSalary");
  const onSubmit = async (data) => {
    try {
      // fetch
    } catch (error) {
      setError("submit", "submitError", `Doh! ${error.message}`);
    }
  };

  const showSalaryReport = !errors.initialSalary && initialSalary;

  const showSubmit = watch("county") && watch("job");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2>Primești cât trebuie?</h2>
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
          {errors.initialSalary && <div>Salariu invalid</div>}
        </div>
      </div>
      {showSalaryReport && (
        <SalaryReport initialSalary={initialSalary} form={form} />
      )}
      {showSubmit && <Submit form={form} />}
    </form>
  );
};

const SalaryReport = ({ initialSalary, form: { control, watch } }) => {
  // TODO: use per job type salary caps
  const newSalary = Math.min(initialSalary * 0.75, 4072);

  const countyNames = Object.keys(salariesPerCounty);

  const countyOptions = countyNames.map((name) => ({
    label: name,
    value: name,
  }));

  const selectedCounty = watch("county");
  let salaryPerCounty = null;
  if (selectedCounty) {
    salaryPerCounty = salariesPerCounty[selectedCounty.value].total;
  }

  const jobNames = Object.keys(salariesPerJob);

  const jobOptions = jobNames.map((name) => ({
    label: name,
    value: name,
  }));

  const selectedJob = watch("job");
  let salaryPerJob = null;
  if (selectedJob) {
    salaryPerJob = salariesPerJob[selectedJob.value];
  }

  return (
    <>
      <div>Salariu brut inițial: {initialSalary} RON</div>
      <div>Salariu brut actual: {newSalary} RON</div>

      <p>Coșul minim de consum este</p>

      <p>
        Dacă ne spui și din ce județ ești și în ce domeniu lucrezi, putem
        compara datele respective.
      </p>
      <Controller
        as={Select}
        control={control}
        name="county"
        placeholder="Alegeți județul"
        options={countyOptions}
      />
      {salaryPerCounty}
      <Controller
        as={Select}
        control={control}
        name="job"
        placeholder="Alegeți domeniul de activitate"
        options={jobOptions}
      />
      {salaryPerJob}
    </>
  );
};

const Submit = ({
  form: {
    formState: { isSubmitting },
  },
}) => {
  return (
    <>
      <p>
        Cu permisiunea ta, vrem să colectăm anonim aceste date pentru a ajuta
        autoritățile.
      </p>
      <input
        disabled={isSubmitting}
        type="submit"
        value="Trimite datele tale"
      />
    </>
  );
};
