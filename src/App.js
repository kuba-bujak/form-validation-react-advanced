import { useState } from 'react'
import './App.css'
import FormExample0 from './FormExample0'
import FormExample1 from './FormExample1'
import ShowData from './ShowData'

// Funkcja wywoływana po przesłaniu formularza, pokazująca alert z przesłaną wartością
const onSubmit = (v) =>
  alert('Prześlij wartość: ' + JSON.stringify(v, null, 2))

function App() {
  // Definiuje stan formularza: przechowywanie danych, błędów, poprawności i wyboru formularza
  const [formFields, setFormFields] = useState({})
  const [errors, setErrors] = useState({})
  const [valid, setValid] = useState()
  const [firstForm, setFirstForm] = useState(true)

  return (
    <div className="App">
      <nav>
        {/* Przełącznik formularza – zmiana formularza na podstawie wyboru */}
        <select
          onChange={(evt) =>
            setFirstForm(evt.target.value === 'first') // Jeśli wybrane "first", ustawia pierwszy formularz
          }
        >
          <option value="first">Pojedyczne pole</option>
          <option value="second">Wiele pól</option>
        </select>
      </nav>
      <main>
        {/* Wyświetla FormExample0 lub FormExample1 na podstawie stanu firstForm */}
        {firstForm ? (
          <FormExample0
            onChange={(ff, v, e) => { // Funkcja wywoływana przy zmianie w formularzu
              setFormFields(ff) // Ustawia wartości pól formularza
              setValid(v) // Ustawia, czy formularz jest poprawny
              setErrors(e) // Ustawia błędy formularza
            }}
            onSubmit={onSubmit} // Wywołuje funkcję po przesłaniu formularza
            initialValue={{
              pole1: 'Przykładowa wartość', // Wartość początkowa dla jednego pola
            }}
          />
        ) : (
          <FormExample1
            onChange={(ff, v, e) => { // Funkcja wywoływana przy zmianie w formularzu
              setFormFields(ff) // Ustawia wartości pól formularza
              setValid(v) // Ustawia, czy formularz jest poprawny
              setErrors(e) // Ustawia błędy formularza
            }}
            onSubmit={onSubmit} // Wywołuje funkcję po przesłaniu formularza
            initialValue={{
              adres1: 'aleja Turinga', // Wartość początkowa dla wielu pól
            }}
          />
        )}
        {/* Komponent wyświetlający dane z formularza */}
        <ShowData
          formFields={formFields} // Przekazuje dane pól formularza
          errors={errors} // Przekazuje błędy formularza
          valid={valid} // Przekazuje poprawność formularza
        />
      </main>
    </div>
  )
}

export default App
