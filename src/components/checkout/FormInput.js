import React from "react";
import { Input } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export default function FormInput({ name, label }) {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            style={{ width: "100%" }}
            placeholder={label}
          />
        )}
        defaultValue=""
        control={control}
        fullWidth
        name={name}
        label={label}
        required
      />
    </div>
  );
}
