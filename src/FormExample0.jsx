import { useEffect, useState } from "react";
import SimpleForm from "./SimpleForm";
import InputField from "./InputField"

const FormExample0 = ({ onSubmit, onChange, initialValue = {} }) => {
  const [formFields, setFormFields] = useState({}); // Stan przechowujący wartości pól formularza

  const [valid, setValid] = useState(true); // Stan określający poprawność formularza
  const [errors, setErrors] = useState({}); // Stan przechowujący błędy walidacji formularza

  useEffect(() => {
    // Wywoływane przy każdej zmianie formFields, valid lub errors
    if (onChange) {
      onChange(formFields, valid, errors); // Wywołuje funkcję onChange z danymi formularza
    }
  }, [onChange, formFields, valid, errors]);

  return (
    <div className="TheForm">
      <h1>Pojedyncze pole</h1>

      <SimpleForm
        value={formFields} // Przekazuje wartości pól do SimpleForm
        onChange={setFormFields} // Aktualizuje wartości pól przy każdej zmianie
        onValid={(v, errs) => { // Wywoływane, gdy formularz jest walidowany
          setValid(v); // Ustawia wartość `valid` w zależności od walidacji
          setErrors(errs); // Ustawia błędy walidacji
        }}
      >
        <InputField
          name="pole1"
          onValidate={(v) =>
            !v || v.length < 3 ? "Łańcuch zbyt krótki" : null // Sprawdza, czy tekst jest dłuższy niż 3 znaki
          }
        />
        <button
          onClick={() => onSubmit && onSubmit(formFields)} // Wywołuje onSubmit przy kliknięciu
          disabled={!valid} // Wyłącza przycisk, jeśli formularz jest niepoprawny
        >
          Prześlij!
        </button>
      </SimpleForm>
    </div>
  );
};

export default FormExample0;
