
const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const getContainerStyling = {
  margin: '50px auto 0',
  width: '30%',
  minWidth: '300px',
  padding: '5px',
}

export const getSpotTileProps = () => {
  return {
    canPopout: true,
    currencyChartIsOpening: false,
    currencyPair: {
      symbol: 'GBP',
      base: 'GBP',
    },
    currentSpotPrice: {
      ask: getButtonProps('ask', () => {}).rate,
      bid: getButtonProps('ask', () => {}).rate,
      priceMovementType: 'Up',
      spread: {
        formattedValue: '-1.23',
      },
      valueDate: 1234436547,
    },
    executionConnected: false,
    hasNotification: false,
    isRunningInOpenFin: false,
    isTradeExecutionInFlight: false,
    maxNotional: 5000000,
    notification: {
      error: null,
      notificationType: 'Trade',
    },
    notional: 500,
    priceStale: false,
    pricingConnected: true,
    title: 'GBP / USD',
  }
}

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

export const getPriceMovementIndicatorProps = (priceMovementType: string, 
                                               formattedValue: string) => {
  return {
    priceMovementType,
    spread: {
      formattedValue,
    },
  }
}

export const getTradeNotificationProps = (status: string, 
                                          direction: string, 
                                          hasError: boolean, 
                                          action: any) => {
  return {
    className: 'spot-tile__trade-summary',
    notification: {
      hasError,
      status: { name: status },
      dealtCurrency: 'GBP',
      notional: getRandomNumber(40, 5222),
      termsCurrency: 'USD',
      direction: 'Up',
      spotRate: getRandomNumber(40, 5222),
      formattedValueDate: 'SP. Jul 26',
      tradeId: getRandomNumber(4012, 15222).toString(),
    },
    onDismissedClicked: action('dismiss notification'),
  }
}
