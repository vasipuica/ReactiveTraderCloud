import * as React from 'react'
import blottersProps from '../../../stories/blotter/blottersProps'
import Blotter from './blotter'

class BlotterContainer extends React.Component<any, {}> {
  public render() {
    return (
      <div className="shell_workspace_blotter">
        <Blotter {...blottersProps} />
      </div>
    )
  }
}

export default BlotterContainer
