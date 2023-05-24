import React, { useState } from "react";

const Form = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateField = (name, value, rules) => {
    const errorMessages = [];

    if (rules.required && !value) {
      errorMessages.push("This field is required");
    }

    if (rules.minLength && value.length < rules.minLength) {
      errorMessages.push(`Minimum length should be ${rules.minLength}`);
    }

    // we can Add more validation rules as needed

    return errorMessages;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    fields.forEach((field) => {
      const { name, validation } = field;
      const value = formData[name];
      const fieldErrors = validateField(name, value, validation);
      if (fieldErrors.length > 0) {
        formErrors[name] = fieldErrors;
      }
    });

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      onSubmit(formData);
      setFormData({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block mb-1">
            {field.label}
          </label>
          <input
            type="text"
            id={field.name}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              errors[field.name] ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:border-blue-500`}
          />
          {errors[field.name] &&
            errors[field.name].map((error, index) => (
              <p key={index} className="text-red-500 mt-1">
                {error}
              </p>
            ))}
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
