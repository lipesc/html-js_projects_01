const currencies = {
  BRL: 'Brazilian Real',
  USD: 'United States Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  JPN: 'Japanese Yen',
}

const primaryCurrency = document.getElementById('primary')
const secondaryCurrency = document.getElementById('secondary')
primaryCurrency.innerHTML = getOptions(currencies)
secondaryCurrency.innerHTML = getOptions(currencies)

function getOptions(data) {
  return Object.entries(data)
    .map(
      ([country, currency]) =>
        `<option value="${country}">${country} | ${currency}</option>`
    )
    .join('')
}

document
  .getElementById('btn-convert')
  .addEventListener('click', fetchCurrencies)
function fetchCurrencies() {
  const primary = primaryCurrency.value
  const secondary = secondaryCurrency.value
  const amount = document.getElementById('amount').value
  fetch(
    'https://v6.exchangerate-api.com/v6/9ace402dff4c943e578afbe6/latest/' +
      primary
  )
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('NETWORK RESPONSE ERROR')
      }
    })
    .then(data => {
      console.log(data)
      displayCurrency(data, primary, secondary, amount)
    })
    .catch(error => console.error('FETCH ERROR:', error))
}

function displayCurrency(data, primary, secondary, amount) {
  const calculated = amount * data.conversion_rates[secondary]
  document.getElementById('result').setAttribute('style', 'display:block')
  document.getElementById('txt-primary').innerText =
    amount + ' ' + primary + ' = '
  document.getElementById('txt-secondary').innerText =
    calculated + ' ' + secondary
}