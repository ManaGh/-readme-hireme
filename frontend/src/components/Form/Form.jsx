import React, { useState } from "react";
import "./Form.css";
import Button from "../shared/Button";

const Form = () => {
  const formInitialState = {
    trainee_name: "",
    github_link: "",
    portfolio_link: "",
    linkedIn_link: "",
    role: "",
    about_me: "",
    skills: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialState);

  function handleInputChange(event) {
    event.preventDefault();
    setFormDetails({ ...formDetails, [event.target.name]: event.target.value });
  }

  return (
    <form className="reg-form">
      <div className="input-fields">
        <label htmlFor="trainee_name">Name: </label>
        <input
          id="trainee_name"
          type="text"
          name="trainee_name"
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
            // value={formDetails.role}
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
            // value={formDetails.role}
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
          value={formDetails.skills}
          min="100"
          onChange={handleInputChange}
          required
        />
      </div>

      <Button buttonName="Create" type="submit" />
    </form>
  );
};

export default Form;
