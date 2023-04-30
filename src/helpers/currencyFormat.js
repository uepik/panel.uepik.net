const currencyFormat = (value) => {
  const options = {
    style: 'currency',
    currency: 'PLN'
  }

  return value.toLocaleString('pl-PL', options)
}

export default currencyFormat
