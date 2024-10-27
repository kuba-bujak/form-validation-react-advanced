import { useState } from 'react'
import SimpleForm from './SimpleForm'
import InputField from './InputField'

export default {
  component: SimpleForm,
  title: 'Komponent SimpleForm',
}

export const Podstawowy = () => <SimpleForm />

export const ZPolami = () => (
  <SimpleForm>
    <InputField
      name="adres"
      onValidate={(v) => (v && v.length >= 3) || 'Zbyt mało znaków!'}
    />
  </SimpleForm>
)

export const ZOnChangeOrazOnValue = () => {
  const [formFields, setFormFields] = useState({
    adres1: 'Gdzieś tam',
    adres2: '',
  })

  const [valid, setValid] = useState(true)
  const [errors, setErrors] = useState({})

  return (
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
        onValidate={(v) => v.length < 3 && 'Zbyt mało znaków!'}
      />
      <InputField
        name="adres2"
        onValidate={(v) => (v ? null : 'Wymagane')}
      />
      <InputField
        name="cena"
        type="number"
        onValidate={(v) =>
          v && parseInt(v) < 102 ? 'Musi być większa lub równa 102' : null
        }
      />
      <InputField
        name="requiredBy"
        type="date"
        onValidate={(v) => (v ? null : 'Pole wymagane')}
      />
      <button disabled={!valid}>Preślij!</button>
      <br />
      Bieżąca wartość: {JSON.stringify(formFields)}
      <br />
      Czy dane poprawne?: {JSON.stringify(valid)}
      <br />
      Błędy?: {JSON.stringify(errors)}
    </SimpleForm>
  )
}
