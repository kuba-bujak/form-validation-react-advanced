import { useCallback, useState, useEffect } from "react";
import FormContext from "./FormContext";
import "./SimpleForm.css";

const SimpleForm = ({ children, value, onChange, onValid }) => {
  const [values, setValues] = useState(value || {}); // Przechowuje aktualne wartości pól formularza
  const [dirtyFields, setDirtyFields] = useState({}); // Przechowuje informacje, które pola zostały edytowane
  const [invalidFields, setInvalidFields] = useState({}); // Przechowuje informacje o błędach w polach

  useEffect(() => {
    setValues(value || {}); // Aktualizuje wartości, gdy zmienia się `value` przekazane przez propsy
  }, [value]);

  useEffect(() => {
    if (onChange) {
      onChange(values); // Wywołuje onChange za każdym razem, gdy wartości `values` się zmieniają
    }
  }, [onChange, values]);

  useEffect(() => {
    if (onValid) {
      onValid(
        Object.keys(invalidFields).every((i) => !invalidFields[i]), // Sprawdza, czy wszystkie pola są poprawne
        invalidFields // Przekazuje obiekt z błędami do onValid
      );
    }
  }, [onValid, invalidFields]);

  const setValue = useCallback(
    (field, v) => setValues((vs) => ({ ...vs, [field]: v })), // Ustawia nową wartość dla pola
    [setValues]
  );
  const getValue = useCallback((field) => values[field], [values]); // Pobiera wartość dla danego pola
  const setDirty = useCallback(
    (field) => setDirtyFields((df) => ({ ...df, [field]: true })), // Ustawia pole jako edytowane
    [setDirtyFields]
  );
  const getDirty = useCallback(
    (field) => Object.keys(dirtyFields).includes(field), // Sprawdza, czy pole było edytowane
    [dirtyFields]
  );
  const setInvalid = useCallback(
    (field, error) => {
      setInvalidFields((i) => ({
        ...i,
        [field]: error ? error : undefined,  // Ustawia błąd walidacji dla pola (jeśli występuje)
      }));
    },
    [setInvalidFields]
  );
  const form = {
    setValue: setValue, // Metoda ustawiania wartości pola
    value: getValue, // Metoda pobierania wartości pola

    setDirty: setDirty, // Metoda oznaczania pola jako edytowane
    isDirty: getDirty, // Metoda sprawdzania, czy pole było edytowane

    setInvalid: setInvalid, // Metoda ustawiania błędu walidacji
  };

  return (
    <div className="SimpleForm-container">
      <FormContext.Provider value={form}>{children}</FormContext.Provider>
    </div>
  );
};

export default SimpleForm;
