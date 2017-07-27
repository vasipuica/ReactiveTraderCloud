import * as React from 'react'
import * as numeral from 'numeral'
import { Cell } from 'fixed-data-table'

export interface NotionalCellProps {
  format?: string
  suffix?: string
  notionalValue: number
  className: string
  width: number
}

class NotionalCell extends React.Component<NotionalCellProps, {}> {
  render() {
    const { notionalValue, format = '0,000,000[.]00', suffix = '', className, width } = this.props
    const formatted = numeral(notionalValue).format(format) + suffix
    return (<Cell className={className} width={width}>{formatted}</Cell>)
  }
}

export default NotionalCell
