import { useEffect, useState } from 'react'
import './App.css'
import SimpleForm from './SimpleForm'
import InputField from './InputField'

const FormExample1 = ({ onSubmit, onChange, initialValue = {} }) => {
  const [formFields, setFormFields] = useState(initialValue)

  const [valid, setValid] = useState(true)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (onChange) {
      onChange(formFields, valid, errors)
    }
  }, [onChange, formFields, valid, errors])

  return (
    <div className="TheForm">
      <h1>Wiele pól</h1>

      <SimpleForm
        value={formFields}
        onChange={setFormFields}
        onValid={(v, errs) => {
          setValid(v)
          setErrors(errs)
        }}
      >
        <InputField
          name="adres1"
          onValidate={(v) =>
            !v || v.length < 3 ? 'Zbyt mało znaków!' : null
          }
        />

        <InputField
          name="adres2"
          onValidate={(v) => (v ? null : 'Wymagane')}
        />

        <InputField
          name="adres3"
          onValidate={(v) => (v ? null : 'Wymagane')}
        />

        <InputField
          name="adres4"
          onValidate={(v) => (v ? null : 'Wymagane')}
        />

        <InputField
          name="cena"
          type="number"
          onValidate={(v) =>
            !v || parseInt(v) < 102 ? 'Musi wynosić co najmniej 102' : null
          }
        />

        <InputField
          name="wymagane_przez"
          type="date"
          onValidate={(v) => (v ? null : 'Wymagane')}
        />

        <button
          onClick={() => onSubmit && onSubmit(formFields)}
          disabled={!valid}
        >
          Prześlij!
        </button>
      </SimpleForm>
    </div>
  )
}

export default FormExample1
