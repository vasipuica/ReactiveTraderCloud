
const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const getButtonProps = (type: string, action: any) => {

  const classNameType = type === 'Sell' ? 'bid' : 'ask'

  return {
    className: `spot-tile__price spot-tile__price--${classNameType}`,
    direction: { name: type },
    rate: {
      pips: getRandomNumber(0, 99),
      bigFigure: getRandomNumber(0, 150),
      pipFraction: getRandomNumber(0, 9),
      rawRate: 123,
    },
    onExecute: action('buy clicked'),
  }
}


export const getNotionalInputProps = {
  className: 'spot-tile__notional',
  notional: 1000000,
  currencyPair: { symbol: 'GBP', base: 'GBP' },
  onChange: () => console.log('Changed'),
  maxValue: 5000000,
}

export const getNotionalStyling = {
  margin: '10% auto',
  width: '30%',
  padding: '5px',
}
