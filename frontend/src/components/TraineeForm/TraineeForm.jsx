import React, { useState } from "react";
import "./TraineeForm.css";
import Button from "../shared/Button";

const formInitialState = {
  trainee_name: "",
  github_link: "",
  portfolio_link: "",
  linkedIn_link: "",
  role: "",
  about_me: "",
  skills: "",
};

export const TraineeForm = () => {
  const [formDetails, setFormDetails] = useState(formInitialState);

  function handleInputChange(event) {
    event.preventDefault();
    setFormDetails({ ...formDetails, [event.target.name]: event.target.value });
  }

  const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:5000";

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/submit_trainee_form`, {
        // fetch(
        //   `${process.env.REACT_APP_BACKEND_URL}/submit_trainee_form`,
        //   {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDetails),
      });
      if (!response.ok) {
        // throw new Error(await response.json());
        const errorText = await response.text();
        throw new Error(errorText || "Unknown error");
      } else {
        const result = await response.json();
        console.log("Success", result);
        setFormDetails(formInitialState);
        return result;
      }
    } catch (error) {
      // console.log(error.message);
      console.error(error);
    }
  }

  return (
    <form className="reg-form" onSubmit={handleSubmit}>
      <div className="input-fields">
        <label htmlFor="trainee_name">Name: </label>
        <input
          id="trainee_name"
          type="text"
          name="trainee_name"
          className="data_input"
          value={formDetails.trainee_name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="input-fields">
        <label htmlFor="github_link">GitHub Link: </label>
        <input
          id="github_link"
          type="url"
          name="github_link"
          className="data_input"
          value={formDetails.github_link}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="input-fields">
        <label htmlFor="portfolio_link">Portfolio Link: </label>
        <input
          id="portfolio_link"
          type="url"
          name="portfolio_link"
          className="data_input"
          value={formDetails.portfolio_link}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="input-fields">
        <label htmlFor="linkedIn_link">LinkedIn Link: </label>
        <input
          id="linkedIn_link"
          type="url"
          name="linkedIn_link"
          className="data_input"
          value={formDetails.linkedIn_link}
          onChange={handleInputChange}
          required
        />
      </div>

      <fieldset className="role">
        <legend>Role:</legend>
        <div className="role-type">
          <label htmlFor="frontend">Frontend: </label>
          <input
            id="frontend"
            type="radio"
            name="role"
            value="frontend"
            onChange={handleInputChange}
          />
        </div>
        <div className="role-type">
          <label htmlFor="fullstack">Full Stack: </label>
          <input
            id="fullstack"
            type="radio"
            name="role"
            value="fullstack"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>

      <div className="input-fields">
        <label htmlFor="about_me">About me: </label>
        <textarea
          id="about_me"
          type="text"
          name="about_me"
          className="data_input"
          value={formDetails.about_me}
          min="100"
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="input-fields">
        <label htmlFor="skills">My skills: </label>
        <textarea
          id="skills"
          type="text"
          name="skills"
          className="data_input"
          value={formDetails.skills}
          min="100"
          onChange={handleInputChange}
          required
        />
      </div>

      <Button buttonName="Create Profile" type="submit" />
    </form>
  );
};
