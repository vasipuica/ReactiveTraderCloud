import * as React from 'react'
import { timeFormat } from 'd3-time-format'
import { Cell } from 'fixed-data-table'

export interface DateCellProps {
  format?: string
  prefix?: string
  dateValue: Date
  width: number
}

export default class DateCell extends React.Component<DateCellProps, {}> {

  render() {
    const { dateValue, format = '%e-%b %H:%M:%S', prefix = '', width } = this.props
    const formatted = timeFormat(format)(dateValue)
    return (<Cell width={width}>{prefix}{formatted}</Cell>)
  }
}
