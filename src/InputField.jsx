import FormContext from "./FormContext";
import { useContext, useEffect, useState } from "react";

import "./InputField.css";

// Funkcja formatująca camelCase do przyjemniejszej formy (np. "camelCase" -> "Camel Case")
const splitCamelCase = (s) =>
  s
    .replace(/([a-z0-9])([A-Z0-9])/g, "$1 $2")
    .replace(/^([a-z])/, (x) => x.toUpperCase());

const InputField = (props) => {
  const form = useContext(FormContext); // Pobiera funkcje formularza z kontekstu

  const [error, setError] = useState(""); // Przechowuje komunikat o błędzie dla pola

  const { onValidate, name, label, ...otherProps } = props; // Destrukturyzuje propsy

  let value = form.value && form.value(name); // Pobiera wartość pola, jeśli istnieje

  useEffect(() => {
    if (onValidate) {
      setError(onValidate(value)); // Ustawia błąd walidacji przy zmianie wartości lub funkcji walidacji
    }
  }, [onValidate, value]);

  const setInvalid = form.setInvalid;

  useEffect(() => {
    if (setInvalid) {
      setInvalid(name, error); // Aktualizuje błąd walidacji w formularzu
    }
  }, [setInvalid, name, error]);
  
  // Wyświetla komunikat, gdy InputField nie jest wewnątrz komponentu formularza
  if (!form.value) {
    return "Komponent InputField powinien być umieszczony wewnątrz formularza";
  }

  return (
    <div className="InputField">
      <label htmlFor={name}>{label || splitCamelCase(name)}:</label>
      <input
        id={name}
        onBlur={() => form.setDirty(name)} // Ustawia pole jako edytowane przy opuszczeniu pola
        value={value || ""} 
        onChange={(event) => {
          form.setDirty(name); // Ustawia pole jako edytowane
          form.setValue(name, event.target.value); // Aktualizuje wartość pola w formularzu
        }}
        {...otherProps}
      />{" "}
      {
        <div className="InputField-error">
          {form.isDirty(name) && error ? error : <>&nbsp;</>} {/* Wyświetla błąd, jeśli pole jest "brudne" i zawiera błąd */}
        </div>
      }
    </div>
  );
};

export default InputField;
