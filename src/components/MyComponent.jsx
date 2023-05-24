import React from "react";
import Form from "./Form";

const MyComponent = () => {
  const handleFormSubmit = (formData) => {
    // Handle the form submission
    console.log("Submitted data:", formData);
  };

  const formFields = [
    {
      name: "name",
      label: "Name",
      validation: {
        required: true,
      },
    },
    {
      name: "email",
      label: "Email",
      validation: {
        required: true,
        // We Can Add more validation rules as needed
      },
    },
  ];

  return (
    <div>
      <h1>My Form</h1>
      <Form fields={formFields} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default MyComponent;
