import * as React from 'react'
import * as classnames from 'classnames'
import '../views/statusIndicator.scss'

export interface StatusIndicatorProps {
  className: string
  status: string
}

const getWrapperCssClasses = (className, status):string => {
  const indicatorClassName = (status:string):string => {
    switch (status) {
      case 'Unknown': return ''
      case 'Healthy': return 'status-indicator--healthy'
      case 'Warning': return 'status-indicator--warning'
      case 'Down': return 'status-indicator--down'
      default: return ''
    }
  }

  return classnames('status-indicator', className, indicatorClassName(status))
}

const getIconCssClasses = (className, status):string => {
  const indicatorClassName = (status:string):string => {
    switch (status) {
      case 'Healthy': return 'fa fa-check'
      case 'Down': return 'status-indicator--down'
      default: return ''
    }
  }

  return classnames('status-indicator', className, indicatorClassName(status))
}

const StatusIndicator = ({ className, status }):any => {
  return (
    <div className={getWrapperCssClasses(className, status)}>
      <i className={getIconCssClasses(className, status)}></i>
    </div>
  )
}

export default StatusIndicator
