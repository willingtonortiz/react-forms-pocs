import "./App.css";
import { ChangeEvent, ComponentPropsWithRef, useState } from "react";

function App() {
  const [value, setValue] = useState("");

  return (
    <div>
      <h1>Hello world</h1>

      <label htmlFor={"firstName"}>First Name</label>
      <Input
        name={"firstName"}
        allowed={AllowedPatterns.AllExcept("|")}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {value}
    </div>
  );
}

export default App;

type InputProps = ComponentPropsWithRef<"input"> & {
  // Regex string to match against
  allowed?: string;
};

const AllowedPatterns = {
  // negative regex [^value]: math anything except the value => Input regex will delete anything except the value
  // positive regex [value]: match only the value => Input regex will delete the value
  All: "",
  Alpha: "[^a-zA-Z]",
  Numeric: "[^0-9]",
  AlphaNumeric: "[^a-zA-Z0-9]",
  Latin: "[^a-zA-ZñÑáéíóúÁÉÍÓÚ]",
  LatinNumeric: "[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9]",
  LatinNumericSpace: "[^a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 ]",
  AllExcept: (except: string) => {
    return `[${except}]`;
  },
};

function filterInputValue(value: string, allowed: string) {
  return value.replace(new RegExp(allowed, "g"), "");
}

function Input({
  // Represents the regex that will be replaced with an empty string
  allowed = AllowedPatterns.All,
  onChange,
  ...props
}: InputProps) {
  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    if (!onChange) {
      return;
    }
    event.target.value = filterInputValue(event.target.value, allowed);
    onChange(event);
  }

  return <input {...props} onChange={onChangeHandler} />;
}
