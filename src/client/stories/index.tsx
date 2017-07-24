import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { getButtonProps, getNotionalInputProps, getNotionalStyling } from './spotTile/index'

import '../src/ui/common/styles/_base.scss'
import '../src/ui/common/styles/_fonts.scss'

import PriceButton from '../src/ui/workspace/SpotTile/PriceButton'
import '../src/ui/workspace/SpotTile/spotTile.scss'

import '../src/ui/workspace/SpotTile/notionalInput.scss'
import NotionalInput from '../src/ui/workspace/SpotTile/NotionalInput'

storiesOf('Welcome', module).add('to Storybook', () =>
  <button
    style={{ margin: '20px' }}
    onClick={linkTo('Spot Tile')}>Example link go to Spot Tile</button>)

// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>)


const getButtons = (withContainerClass = true) =>
  <div className={ withContainerClass ? 'spot-tile' : ''}>
      <PriceButton {...getButtonProps('Sell', action)} />
      <PriceButton {...getButtonProps('Buy', action)} />
  </div>


storiesOf('Spot Tile', module)
  .add('Buy & Sell buttons', () => getButtons(true))
.add('Notional Input',  () => <div className="spot-tile" style={getNotionalStyling}>
    <div className="spot-tile__container">
    <NotionalInput {...getNotionalInputProps } />
    </div>
  </div>
).add('Notional Input & Buttons', () =>
<div className="spot-tile" style={getNotionalStyling}>
    <div className="spot-tile__container">
      <div>{getButtons(false)}</div>
      <NotionalInput {...getNotionalInputProps } />
    </div>
  </div>)

