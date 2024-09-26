import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./PersonalInfo.css";

function PersonalInfo() {
  const createField = (
    labelText,
    inputType,
    fieldName,
    value,
    handleChange
  ) => {
    return (
      <div className="field-container" key={fieldName}>
        <label htmlFor={fieldName}>{labelText}:</label>
        <input
          className="input-field"
          type={inputType}
          id={fieldName}
          name={fieldName}
          value={value}
          onChange={handleChange}
          placeholder={labelText}
        />
      </div>
    );
  };

  // State to track submission status
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const createFileField = (labelText, fieldName, handleChange) => {
    return (
      <div className="field-container" key={fieldName}>
        <label htmlFor={fieldName}>{labelText}:</label>
        <input
          className="input-field"
          type="file"
          id={fieldName}
          name={fieldName}
          onChange={handleChange}
          accept="image/*"
        />
      </div>
    );
  };

  // Initial form state
  const initialFormData = {
    fullName: "",
    field: "",
    phone: "",
    linkedin: "",
    github: "",
    programmingLanguages: "",
    workplace: "",
    avatar: null,
    scheduleLink: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate(); // Use navigate to redirect

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    await fetch("http://localhost:5001/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        field: formData.field,
        phone: formData.phone,
        linkedin: formData.linkedin,
        github: formData.github,
        programmingLanguages: formData.programmingLanguages,
        workplace: formData.workplace,
        avatar: formData.avatar,
        scheduleLink: formData.scheduleLink,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Reset the form to its initial state after successful submission
        setFormData(initialFormData);
        setSubmissionSuccess(true);
        navigate("/home"); // Redirect to /home after successful submission
      })
      .catch((error) => {
        console.error("Error:", error);
        setSubmissionSuccess(false);
      });
  };

  return (
    <div className="personal-info-page">
      <div className="form-container">
        <h1 className="form-title">Mentor Sign-Up </h1> {/* כותרת לטופס */}
        {submissionSuccess && (
          <div className="popup">
            <div className="popup-content">
              <h2>Form Submitted Successfully!</h2>
              <p>Thank you for signing up as mentor😍</p>
              <p>
                if you want to hear more about opportunities to contribute to
                Queen-B
              </p>
              <p>please follow us on Linked-In:</p>
              <a href="https://www.linkedin.com/company/queenb">
                Queen-B LinkedIn
              </a>
              <br></br>
              <button onClick={() => setSubmissionSuccess(false)}>Close</button>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {createField(
            "Full Name",
            "text",
            "fullName",
            formData.fullName,
            handleChange
          )}
          {createField("field", "text", "field", formData.field, handleChange)}
          {createField("Phone", "tel", "phone", formData.phone, handleChange)}
          {createField(
            "LinkedIn",
            "url",
            "linkedin",
            formData.linkedin,
            handleChange
          )}
          {createField(
            "GitHub",
            "url",
            "github",
            formData.github,
            handleChange
          )}
          {createField(
            "Programming Languages",
            "text",
            "programmingLanguages",
            formData.programmingLanguages,
            handleChange
          )}
          {createField(
            "Workplace",
            "text",
            "workplace",
            formData.workplace,
            handleChange
          )}
          {createFileField("Avatar (Image)", "avatar", handleChange)}
          {createField(
            "Schedule Link",
            "url",
            "scheduleLink",
            formData.scheduleLink,
            handleChange
          )}

          <button className="input-field submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default PersonalInfo;
