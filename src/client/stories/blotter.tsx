import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Blotter, DateCell, NotionalCell } from  '../src/ui/Blotter'
import { Blotter as BlotterVirtualized } from  '../src/ui/BlotterVirtualized'
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
    <div>
      <h2>Potential change from fixed-data-table to react-virtualized</h2>
      <BlotterVirtualized {...blottersProps} />
    </div>)
