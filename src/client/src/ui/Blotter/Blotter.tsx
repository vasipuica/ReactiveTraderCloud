import * as React from 'react'
import { Table, Column, Cell } from 'fixed-data-table' // at bottom replacing with react-virtualized
import { DateCell, NotionalCell } from './'
import * as classNames from 'classnames'
// import SizeMe from 'react-sizeme'
import 'fixed-data-table/dist/fixed-data-table.css'
import './blotter.scss'

// import { TradeRow } from '../../../services/model'
type TradeRow = any

export interface BlotterProps {
  canPopout: boolean
  isConnected: boolean
  trades: any
  // passed by SizeMe :
  size: {
    width: number
    height: number,
  }
}

// TODO: Move these to types and actions
function replaceWithAction(a: any, b: any): void {
  return
}

export default class Blotter extends React.Component<BlotterProps, {}> {
  render() {
    const { canPopout, isConnected, trades } = this.props
    const columns = this.createGridColumns(trades)
    const className = classNames(
      'blotter', {
        'blotter--online': isConnected,
        'blotter--offline': !isConnected,
      })
    const newWindowClassName = classNames(
      'glyphicon glyphicon-new-window',
      {
        'blotter__controls--hidden': canPopout,
      },
    )
    const { width, height } = this.props.size // comes from SizeMe

    return (
      <div className={className}>
        <div className="blotter-wrapper">
          <div className="blotter__controls popout__controls">
            <i className={newWindowClassName}
               onClick={() => replaceWithAction('tearOffBlotter', {})}/>
          </div>
          <Table
            rowHeight={30}
            headerHeight={30}
            rowsCount={trades.length}
            width={width}
            height={height}
            rowClassNameGetter={(index: any) => this.getRowClass(trades[index])}>
            {columns}
          </Table>
        </div>
      </div>
    )
  }

  createGridColumns(trades:any):any[] {
    return [
      <Column
        key="Id"
        header={<Cell>Id</Cell>}
        cell={(props: any) => <Cell>{trades[props.rowIndex].trade.tradeId}</Cell>}
        flexGrow={1}
        width={50}/>,
      <Column
        key="Date"
        header={<Cell>Date</Cell>}
        cell={(props: any) => <DateCell width={props.width} dateValue={trades[props.rowIndex].trade.tradeDate} />}
        flexGrow={1}
        width={150}/>,
      <Column
        key="Dir"
        header={<Cell>Direction</Cell>}
        cell={(props: any) => <Cell>{trades[props.rowIndex].trade.direction.name.toUpperCase()}</Cell>}
        flexGrow={1}
        width={80}/>,
      <Column
        key="CCY"
        header={<Cell>CCYCCY</Cell>}
        cell={(props: any) => <Cell>{trades[props.rowIndex].trade.currencyPair.symbol}</Cell>}
        flexGrow={1}
        width={70}/>,
      <Column
        key="Notional"
        header={<Cell className="blotter__trade-field--align-right">Notional</Cell>}
        cell={(props: any) => {
          const trade = trades[props.rowIndex].trade
          return (
            <NotionalCell
              width={props.width}
              className="blotter__trade-field--align-right"
              notionalValue={trade.notional}
              suffix={' ' + trade.currencyPair.base} />
          )
        }}
        flexGrow={1}
        width={120}/>,
      <Column
        key="Rate"
        header={<Cell className="blotter__trade-field--align-right">Rate</Cell>}
        cell={(props: any) => <Cell className="blotter__trade-field--align-right">{trades[props.rowIndex].trade.spotRate}</Cell>}
        flexGrow={1}
        width={80}/>,
      <Column
        key="Status"
        header={<Cell>Status</Cell>}
        cell={(props: any) => <Cell className="blotter__trade-status">{trades[props.rowIndex].trade.status.name}</Cell>}
        flexGrow={1}
        width={80}/>,
      <Column
        key="Value date"
        header={<Cell>Value date</Cell>}
        cell={(props: any) => <DateCell width={props.width} prefix="SP. " format="%d %b" dateValue={trades[props.rowIndex].trade.valueDate} />}
        flexGrow={1}
        width={100}/>,
      <Column
        key="Trader"
        header={<Cell>Trader</Cell>}
        cell={(props: any) => <Cell>{trades[props.rowIndex].trade.traderName}</Cell>}
        flexGrow={1}
        width={80}/>
      ]
  }

  /**
   * Returns the class to apply to a row
   */
  getRowClass(rowItem: TradeRow) {
    if (!rowItem) {
      return ''
    }

    return classNames(
      'blotter__trade',
      {
        'blotter__trade--new': rowItem.isNew,
        'blotter__trade--highlighted': rowItem.isInFocus,
        'blotter__trade--rejected': rowItem.trade.status.name.toLowerCase() === 'rejected',
        'blotter__trade--processing': rowItem.trade.status.name.toLowerCase() === 'processing',
      },
    )
  }
}

// export default SizeMe({monitorHeight: true})(BlotterView)
