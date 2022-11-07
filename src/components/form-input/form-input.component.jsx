import React from "react";
import { FormInputLabel, Input, Group } from "./form-input.styles.jsx";
const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {/* Nếu như props label exist thì mới render label   */}
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
