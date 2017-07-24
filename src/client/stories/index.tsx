import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
// import SpotTile from '../src/ui/workspace/SpotTile'

import '../src/ui/common/styles/_base.scss'
import '../src/ui/common/styles/_fonts.scss'

import PriceButton from '../src/ui/workspace/SpotTile/PriceButton'
import '../src/ui/workspace/SpotTile/spotTile.scss'

storiesOf('Welcome', module).add('to Storybook', () => 
  <button
    style={{ margin: '20px' }}
    onClick={linkTo('Spot Tile')}>Example link go to Spot Tile</button>)

// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>)

const buyButtonProps = {
  className: 'spot-tile__price spot-tile__price--bid',
  direction: { name: 'Buy' },
  rate: {
    pips: 11,
    bigFigure: 999,
    pipFraction: 0.11,
    rawRate: 123,
  },
  onExecute: action('buy clicked'),
}
const sellButtonProps = {
  className: 'spot-tile__price spot-tile__price--ask',
  direction: { name: 'Sell' },
  rate: {
    pips: 5,
    bigFigure: 552,
    pipFraction: 0.11,
    rawRate: 22,
  },
  onExecute: action('sell clicked'),
}

storiesOf('Spot Tile', module)
  .add('Buy/Sell button', () => 
    <div className="spot-tile">
      <PriceButton {...buyButtonProps} />
      <PriceButton {...sellButtonProps} />
     </div>)
