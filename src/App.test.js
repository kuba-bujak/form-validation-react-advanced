import { render, fireEvent, screen } from '@testing-library/react'
import App from './App'

describe('komponent App', () => {
  it('powinien wyświetlić etykietę pola na pierwszym formularzu', () => {
    render(<App />)
    expect(screen.queryByLabelText(/Pole 1/)).toBeInTheDocument()
  })

  it('powinien potrafić przełączyć się na drugi formularz', () => {
    const { container } = render(<App />)
    expect(screen.queryByLabelText(/Pole 1/)).toBeInTheDocument()
    fireEvent.change(container.querySelector('select'), {
      target: { value: 'second' },
    })
    expect(screen.getByLabelText(/Adres 2*:/)).toBeInTheDocument()
  })
})
