import SimpleForm from './SimpleForm'
import InputField from './InputField'

export default {
  component: InputField,
  title: 'Komponent InputField',
}

export const BrakFormularza = () => <InputField name="pole1" />

export const ProstePole = () => (
  <SimpleForm>
    <InputField name="pole1" />
  </SimpleForm>
)

export const PoleTypuNumber = () => (
  <SimpleForm>
    <InputField name="pole1" type="number" />
  </SimpleForm>
)

export const PoleTypuDate = () => (
  <SimpleForm>
    <InputField name="pole1" type="date" />
  </SimpleForm>
)

export const PoleZEtykieta = () => (
  <SimpleForm>
    <InputField name="pole1" label="Pierwsze pole" />
  </SimpleForm>
)

export const PoleZWalidacja = () => (
  <SimpleForm>
    <InputField
      name="pole1"
      onValidate={(v) =>
        !v || v.length < 3 ? 'Musi mieć co najminiej 3 znaki długości.' : null
      }
    />
  </SimpleForm>
)
