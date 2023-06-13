const sumByCategory = (transactionsArray, transactionCategory) => {
  const filteredArray = transactionsArray.filter(transaction => transaction.category.includes(transactionCategory))
  const mappedArray = filteredArray.map(item => item.value)

  return mappedArray.reduce((previous, next) => previous + next, 0)
}

export default sumByCategory
