import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Blotter, DateCell, NotionalCell } from  '../src/ui/blotter'
import { Blotter as BlotterVirtualized } from  '../src/ui/blotterVirtualized'
import blottersProps from './blotter/blottersProps'

storiesOf('Blotter', module)
  .add('Full Blotter', () =>
    <Blotter {...blottersProps} />)
  .add('Date cell', () =>
    <div style={{ background: '#FFFFFF' }}>
      <DateCell dateValue={new Date()} width={200}/>
    </div>)
  .add('Notional cell', () =>
    <div style={{ background: '#FFFFFF' }}>
      <NotionalCell
        className="blotter__trade-field--align-right"
        notionalValue={200}
        suffix={' GBP'} width={200}/>
    </div>)
  .add('Blotter virtualized', () =>
    <div style={{ background: '#FFFFFF' }}>
      <h2>Potential change from fixed-data-table to react-virtualized</h2>
      <p>fixed-data-table is no longer maintained by Facebook and it's throwing deprecation warnings in the console with current React version. As of 27 Jul 2017 react-virtualized is the most popular recommended upgrade. There is @types/react-virtualized package for TypeScript.</p>
      <p>The components and their props are almost the same as in fixed-data-table</p>
      <p>Needs styling</p>
      <BlotterVirtualized {...blottersProps} />
    </div>)
