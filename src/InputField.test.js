import { fireEvent, render, screen } from '@testing-library/react'

const stories = require('./InputField.stories')

describe('wyświetlanie opowieści', () => {
  it('powinien bez błędów wyświetlić wszystkie opowięści ze storybooka', () => {
    for (let story in stories) {
      if (story !== 'default') {
        const C = stories[story]
        render(<C />)
      }
    }
  })
  it('powinien określić etykietę na podstawie nazwy', () => {
    const C = stories.ProstePole
    render(<C />)
    expect(screen.queryByLabelText(/Pole 1.*:/)).toBeInTheDocument()
  })
  it('powinien pozwolić na nadpisanie etykiety', () => {
    const C = stories.PoleZEtykieta
    render(<C />)
    expect(
      screen.queryByLabelText(/Pierwsze pole.*:/)
    ).toBeInTheDocument()
  })
  it('powinien wyknać walidację pola', () => {
    const C = stories.PoleZWalidacja
    render(<C />)
    const input = screen.getByLabelText(/Pole 1.*:/)
    expect(input).toBeInTheDocument()
    expect(
      screen.queryByText('Musi mieć co najminiej 3 znaki długości.')
    ).not.toBeInTheDocument()
    fireEvent.change(input, { target: { value: 'ab' } })
    expect(
      screen.queryByText('Musi mieć co najminiej 3 znaki długości.')
    ).toBeInTheDocument()
  })
  it('powinien wykonać walidację po wyjściu z pola', () => {
    const C = stories.PoleZWalidacja
    render(<C />)
    const input = screen.getByLabelText(/Pole 1.*:/)
    expect(input).toBeInTheDocument()
    expect(
      screen.queryByText('Musi mieć co najminiej 3 znaki długości.')
    ).not.toBeInTheDocument()
    fireEvent.blur(input)
    expect(
      screen.queryByText('Musi mieć co najminiej 3 znaki długości.')
    ).toBeInTheDocument()
  })
})
