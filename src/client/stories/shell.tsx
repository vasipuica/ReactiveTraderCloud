import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Shell } from '../src/ui/Shell'

storiesOf('Shell', module)
  .add('Show splash', () =>
    <Shell appVersion={'1.0.2'} sessionExpired={false} />)
  .add('Session expired', () =>
    <Shell appVersion={'1.0.2'} sessionExpired={true} />)
