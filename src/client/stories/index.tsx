import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { getButtonProps } from './spotTile/index'
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


storiesOf('Spot Tile', module)
  .add('Buy/Sell button', () =>
    <div className="spot-tile">
      <PriceButton {...getButtonProps('Sell', action)} />
      <PriceButton {...getButtonProps('Buy', action)} />
     </div>)
