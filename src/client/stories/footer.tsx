import * as React from 'react'
import { storiesOf } from '@storybook/react'
import * as StatusIndicator from '../src/ui/footer/next/statusIndicator'

import footerProps from './footer/footerProps'

storiesOf('Footer', module)
  .add('StatusIndicator', () =>
    <StatusIndicator className="footer__status-indicator" status={footerProps.applicationStatus}  />)
