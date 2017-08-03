import * as React from 'react'
import * as classnames from 'classnames'

import * as StatusIndicator from './statusIndicator'
import * as BrokerStatus from './brokerStatus'

import './footer.scss'

export interface FooterProps {
  applicationStatus: string
  connectionType: string
  connectionUrl: string
  isConnectedToBroker: boolean
  isRunningInOpenFin: boolean
  shouldShowServiceStatus: boolean
  openLink: (string) => void
}

// @todo: the values bellow were defined in the esp model, check for other usages and extract it to a common file
const openfinURL: string = 'http://openfin.co'
const adaptiveURL: string = 'http://www.weareadaptive.com'


export default class FooterContainer extends React.Component<FooterProps, {}> {

  render() {
    const {
      applicationStatus,
      shouldShowServiceStatus,
      isRunningInOpenFin,
      isConnectedToBroker,
      connectionUrl,
      connectionType,
      openLink,
    } = this.props
    const panelClasses = classnames('footer__service-status-panel', { 'hide': !shouldShowServiceStatus })
    const openfinLogoClassName = classnames('footer__logo', { 'footer__logo-openfin': isRunningInOpenFin })
    const footerClasses = classnames('footer', { 'footer--disconnected': !isConnectedToBroker })
    return (
      <footer className={footerClasses}>
        <span className="footer__connection-url">
          {isConnectedToBroker ? `Connected to ${connectionUrl} (${connectionType})` : 'Disconnected'}
        </span>
        <span className="footer__logo-container">
          <span className={openfinLogoClassName} onClick={() => openLink(openfinURL)}></span>
          <span className="footer__logo footer__logo-adaptive" onClick={() => openLink(adaptiveURL)}></span>
        </span>
        <div className="footer__status-indicator-wrapper"
          onMouseEnter={e => this.toggleServiceStatus()}
          onMouseLeave={e => this.toggleServiceStatus()}>
          <StatusIndicator className="footer__status-indicator" status={applicationStatus} />
        </div>
        <div className={panelClasses}>
          <ul className="footer__services">
            {this.renderServices(this.props)}
          </ul>
        </div>
      </footer>
    )
  }

  toggleServiceStatus() {
    // @todo: convert the line bellow into an action
    // this.props.router.publishEvent(this.props.model.modelId, 'toggleServiceStatus', {});
  }

  renderServices(props) {
    const items = []
    items.push(<BrokerStatus isConnectedToBroker={props.isConnectedToBroker} />)

    const serviceLookup = props.serviceLookup
    if (!serviceLookup) {
      return items
    }
    for (const serviceType in serviceLookup.services) {
      items.push(this.renderService(props, serviceType))
    }
    return items
  }

  renderService(props, serviceType) {
    const statusSummary = props.serviceLookup.services[serviceType];
    let statusSpan
    if (statusSummary.isConnected) {
      const connectedNodesText = statusSummary.connectedInstanceCount === 1 ? 'node' : 'nodes'
      const title = `${serviceType} (${statusSummary.connectedInstanceCount} ${connectedNodesText})`
      statusSpan = (
        <span className="footer__service-label">
          <i className="footer__icon--online fa fa-circle" />{title}
        </span>
      )
    } else {
      statusSpan = (<span className="footer__service-label">
        <i className="footer__icon--offline fa fa-circle-o" />{serviceType}
      </span>)
    }
    return (
      <li className="footer__service" key={serviceType}>{statusSpan}</li>
    )
  }
}
