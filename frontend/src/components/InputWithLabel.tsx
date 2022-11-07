import * as React from "react";
import styled from "styled-components";

const ComponentWithLabelContainer = styled.div`
  display: grid;
  border-radius: 3px;
  input {
    height: 2rem;
    font-size: 1em;
    margin: 0.5rem 0 1rem;
  }
`;

interface InputWithLabelProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
}

const InputWithLabel = (props: InputWithLabelProps) => {
  const { title, value, onChange } = props;
  return (
    <ComponentWithLabelContainer>
      <label htmlFor={`${title.toLowerCase()}-input`} className="label">
        {title}
      </label>
      <input
        type="text"
        id={`${title.toLowerCase()}-input`}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </ComponentWithLabelContainer>
  );
};

export default InputWithLabel;
