import './ShowData.css'

const ShowData = ({ formFields, valid, errors }) => (
  <div className="ShowData">
    <dl>
      <dt>Bieżąca wartość:</dt>
      <dd>{JSON.stringify(formFields, null, 2)}</dd>
      <dt>Czy poprawna?</dt>
      <dd>{JSON.stringify(valid)}</dd>
      <dt>Błędy?</dt>
      <dd>{JSON.stringify(errors, null, 2)}</dd>
    </dl>
  </div>
)

export default ShowData
