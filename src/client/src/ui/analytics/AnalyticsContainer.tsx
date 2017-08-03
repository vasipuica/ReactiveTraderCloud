import * as React from 'react'
import './analytics.scss'
import Analytics from './Analytics'
import analyticsProps from '../../../stories/analytics/analyticsProps'

class AnalyticsContainer extends React.Component<any, {}> {
  public render() {
    return <div className="analytics__container">
            <div ref="analyticsInnerContainer">
              <Analytics canPopout={false} {...analyticsProps}  />
            </div>
          </div>
  }
}

export default AnalyticsContainer
