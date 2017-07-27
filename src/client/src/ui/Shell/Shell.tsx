import * as React from 'react'
import { Modal } from '../Modal'
import './shell.scss'
import '../common/styles/_base.scss'
import '../common/styles/_fonts.scss'

// TODO: Move these to types and actions
function replaceWithAction(a: any, b: any): void {
  return
}

export interface ShellProps {
  appVersion: string
  sessionExpired: boolean
}

export default class Shell extends React.Component<ShellProps, {}> {

  render() {
    const { appVersion, sessionExpired } = this.props

    return (
      <div>
        <div className="shell__splash">
          <span className="shell__splash-message">{appVersion}<br />Loading...</span>
        </div>
        <div className="shell__container">
          <Modal shouldShow={sessionExpired} title="Session expired">
            <div>
              <div>Your 15 minute session expired, you are now disconnected from the server.</div>
              <div>Click reconnect to start a new session.</div>
              <button className="btn shell__button--reconnect"
                      onClick={() => replaceWithAction('reconnectClicked', {})}>Reconnect
              </button>
            </div>
          </Modal>
          <div className="shell_workspace_blotter">
            {/*<Workspace className="shell__workspace" />*/}
            {/*<Blotter className="shell__blotter" />*/}
          </div>
          {/*<Sidebar className="shell__sidebar" />*/}
        </div>
        <div className="shell__footer">
          {/*<Footer />*/}
        </div>
      </div>
    )
  }
}
