import React, { useState } from "react";
import { User } from "../types/user";
import { GENDER_OPTIONS } from "../constants/constants";

interface EditUserFormProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  user,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState(user);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSaveEnabled, setSaveEnabled] = useState(false);
  const [isLocked, setLocked] = useState(user.age < 18);

  const validateField = (name: string, value: string | number) => {
    let error = "";

    if (!value) {
      error = `${name} cannot be empty.`;
    }

    return error;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    const parsedValue = name === "age" ? Number(value) : value;
    const error = validateField(name, parsedValue);

    setFormData({ ...formData, [name]: parsedValue });
    setErrors({ ...errors, [name]: error });

    // Enable save only if no errors exist and fields are valid
    setSaveEnabled(
      Object.values({ ...errors, [name]: error }).every((err) => !err) &&
        Object.values({ ...formData, [name]: parsedValue }).every((val) => val)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const key = e.key;

    if (name === "age" && !/^\d$/.test(key) && key !== "Backspace") {
      e.preventDefault(); // Prevent non-numeric input
    }

    if (name === "country" && !/^[a-zA-Z\s]$/.test(key) && key !== "Backspace") {
      e.preventDefault(); // Prevent numeric or special character input
    }
  };

  const handleSave = () => {
    // Trim the values before saving
    const trimmedFormData = {
      ...formData,
      age: formData.age,
      country: formData.country.trim(),
      description: formData.description.trim(),
    };

    // Lock fields if age is confirmed to be < 18
    if (trimmedFormData.age < 18) {
      setLocked(true);
    }
    onSave(trimmedFormData); // Pass trimmed data to the parent
  };

  return (
    <>
      <div>
        <div className="flex justify-between">
          <p className="w-[28%] flex flex-col">
            <span className="text-gray-600">Age</span>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isLocked} // Disable if locked
              className={`border border-solid border-gray-300 px-1 w-full rounded-lg ${
                errors.age ? "border-red-500" : ""
              }`}
            />
            {errors.age && (
              <div className="text-red-500 text-sm">{errors.age}</div>
            )}
          </p>
          <p className="w-[28%] flex flex-col">
            <span className="text-gray-600">Gender</span>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={isLocked} // Disable if locked
              className={`h-[26px] rounded-lg px-1 border border-solid border-gray-300 ${
                errors.gender ? "border-red-500" : ""
              }`}
            >
              {GENDER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.gender && (
              <div className="text-red-500 text-sm">{errors.gender}</div>
            )}
          </p>
          <p className="w-[28%] flex flex-col">
            <span className="text-gray-600">Country</span>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isLocked} // Disable if locked
              className={`border border-solid border-gray-300 px-1 w-full rounded-lg ${
                errors.country ? "border-red-500" : ""
              }`}
            />
            {errors.country && (
              <div className="text-red-500 text-sm">{errors.country}</div>
            )}
          </p>
        </div>
        <p className="flex flex-col my-[10px]">
          <span>Description</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={isLocked} // Disable if locked
            className={`border border-solid border-gray-300 px-1 w-full min-h-[106px] rounded-lg ${
              errors.description ? "border-red-500" : ""
            }`}
          />
          {errors.description && (
            <div className="text-red-500 text-sm">{errors.description}</div>
          )}
        </p>
        <div className="flex justify-end space-x-3">
          <button className="" onClick={onCancel}>
            ❌
          </button>
          <button className="" disabled={!isSaveEnabled} onClick={handleSave}>
            ✅
          </button>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default EditUserForm;