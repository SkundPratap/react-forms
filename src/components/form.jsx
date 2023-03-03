import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Stack } from "@mui/material";

const ReactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    message: false,
  });

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        return value.trim().length > 0;
      case "lastName":
        return value.trim().length > 0;
      case "email":
        return /^\S+@\S+\.\S+$/.test(value);
      case "message":
        return value.trim().length >= 6;
      default:
        return true;
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
    setFormErrors((previousFormErrors) => ({
      ...previousFormErrors,
      [name]: !validateField(name, value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  const isFormValid = () => {
    return (
      Object.values(formErrors).every((error) => !error) &&
      Object.values(formData).every((value) => value.trim().length > 0)
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          error={formErrors.firstName}
          helperText={formErrors.firstName && "First name is required"}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          error={formErrors.lastName}
          helperText={formErrors.lastName && "Last name is required"}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={formErrors.email}
          helperText={formErrors.email && "Invalid email format"}
        />

        <TextField
          id="standard-textarea"
          label="Message"
          placeholder="Enter your message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={8}
          multiline
          variant="filled"
          error={formErrors.message}
          helperText={formErrors.message && "Please enter a message"}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormValid()}
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default ReactForm;
