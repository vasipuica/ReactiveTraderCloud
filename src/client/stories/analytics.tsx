import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { default as Analytics, PNLChart, PositionsBubbleChart, AnalyticsBarChart } from  '../src/ui/analytics'
import { default as analyticsProps, pnlChartModel, positionsChartModel } from './analytics/analyticsProps'

storiesOf('Analytics', module)
  .add('Full panel', () =>
    <Analytics canPopout={false} {...analyticsProps} />)
  .add('Bubbles!', () =>
    <div className="analytics__bubblechart-container">
      <span className="analytics__chart-title analytics__bubblechart-title">Positions</span>
      <PositionsBubbleChart data={positionsChartModel.seriesData} />
    </div>)
  .add('P&L chart', () =>
    <div className="analytics analytics__container animated fadeIn">
      <PNLChart {...pnlChartModel} />
    </div>)
  .add('Bar chart', () =>
    <div className="analytics__chart-container">
      <span className="analytics__chart-title">PnL</span>
      <AnalyticsBarChart chartData={positionsChartModel.seriesData} isPnL={true}/>
    </div>)
