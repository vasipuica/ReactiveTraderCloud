import * as React from 'react'

const brokerStatus = ({ isConnectedToBroker }: {isConnectedToBroker: boolean}): {} => {

  const statusSpanClassName = isConnectedToBroker ? 'footer__icon--online fa fa-circle' : 'footer__icon--offline fa fa-circle-o'
  const statusSpan = (
    <span className="footer__service-label">
      <i className={statusSpanClassName} />broker
    </span>
  )
  return <li className="footer__service" key="broker">{statusSpan}</li>
}

export default brokerStatus
