import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'

storiesOf('Welcome', module).add('to Storybook', () =>
  <button
    style={{ margin: '20px' }}
    onClick={linkTo('Spot Tile')}>Example link go to Spot Tile</button>)

import { Shell } from '../src/ui/Shell'

storiesOf('Shell', module)
  .add('show splash', () =>
    <Shell appVersion={'1.0.2'} sessionExpired={false} />)
  .add('session expired', () =>
    <Shell appVersion={'1.0.2'} sessionExpired={true} />)
