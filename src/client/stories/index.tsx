import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { getContainerStyling, getButtonProps, getNotionalInputProps, 
  getPriceMovementIndicatorProps, getSpotTileProps, getTradeNotificationProps } from './spotTile'

import '../src/ui/common/styles/_base.scss'
import '../src/ui/common/styles/_fonts.scss'

import { Modal } from '../src/ui/Modal'
import SpotTile, { NotionalInput, PriceButton, PriceMovementIndicator, 
       TradeNotification } from '../src/ui/SpotTile'
import '../src/ui/SpotTile/spotTile.scss'

storiesOf('Welcome', module).add('to Storybook', () =>
  <button
    style={{ margin: '20px' }}
    onClick={linkTo('Spot Tile')}>Example link go to Spot Tile</button>)

const getButtons = (withContainerClass = true) =>
  <div className={ withContainerClass ? 'spot-tile' : ''}>
      <PriceButton {...getButtonProps('Sell', action)} />
      <PriceButton {...getButtonProps('Buy', action)} />
  </div>

storiesOf('Modal', module)
  .add('Showing modal', () =>
    <Modal shouldShow={true} title="Modal title">
      <div>Child component in the modal</div>
      <button className="btn shell__button--reconnect"
              onClick={action('modal button clicked')}>A button
      </button>
    </Modal>)
  .add('Not showing modal', () =>
    <Modal shouldShow={false} title="Modal title">
      <div>Child component in the modal</div>
    </Modal>)


storiesOf('Spot Tile', module)
  .add('Full tile', () =>
    <div style={getContainerStyling}>
      <SpotTile {...getSpotTileProps()} />
    </div>)
  .add('Buy & Sell buttons', () =>
    <div className="spot-tile" style={getContainerStyling}>
      <PriceButton {...getButtonProps('Sell', action)} />
      <PriceButton {...getButtonProps('Buy', action)} />
    </div>)
  .add('Notional Input',  () =>
    <div className="spot-tile" style={getContainerStyling}>
      <div className="spot-tile__container">
      <NotionalInput {...getNotionalInputProps } />
      </div>
    </div>)
  .add('Notional Input & Buttons', () =>
    <div className="spot-tile" style={getContainerStyling}>
      <div className="spot-tile__container">
        <div>{getButtons(false)}</div>
        <NotionalInput {...getNotionalInputProps } />
      </div>
    </div>)
  .add('Trade notification', () =>
    <div>
      <div className="spot-tile" style={getContainerStyling}>
        <TradeNotification {...getTradeNotificationProps('Rejected', 'Up', false, action)} />
      </div>
      <div className="spot-tile" style={getContainerStyling}>
        <TradeNotification {...getTradeNotificationProps('Done', 'Down', false, action)} />
      </div>
      <div className="spot-tile" style={getContainerStyling}>
        <TradeNotification {...getTradeNotificationProps('Done', 'Down', true, action)} />
      </div>
    </div>)
  .add('Price movement indicator', () =>
    <div>
      <div className="spot-tile" style={getContainerStyling}>
        <div className="spot-tile__price-movement">
          <PriceMovementIndicator {...getPriceMovementIndicatorProps('Up', '1.12')} />
        </div>
      </div>
      <div className="spot-tile" style={getContainerStyling}>
        <div className="spot-tile__price-movement">
          <PriceMovementIndicator {...getPriceMovementIndicatorProps('Down', '-2.42')} />
        </div>
      </div>
    </div>)
