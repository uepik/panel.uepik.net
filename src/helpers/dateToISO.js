const dateToISO = (date) => {
  const year = date.toLocaleString('default', { year: 'numeric' })
  const month = date.toLocaleString('default', { month: '2-digit' })
  const day = date.toLocaleString('default', { day: '2-digit' })

  // => yyyy-mm-dd
  return `${ year }-${ month }-${ day }`
}

export default dateToISO
