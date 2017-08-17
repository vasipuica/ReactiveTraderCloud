import * as React from 'react'
import {createAction} from 'redux-actions'
import {ACTION_TYPES as REGIONS_ACTIONS} from './regions/regionsOperations'
import {getPopoutService} from './../ui/common/popout'
import { Provider } from 'react-redux'

declare const window: any;

const popoutOpened = createAction(REGIONS_ACTIONS.REGION_OPENED)
const generateView = (container) => {
  const childComponent = React.createElement(container)
  return React.createElement(Provider, {store: window.store}, childComponent)
}

export const openFinEpic = openFin => action$ => {
  return action$.ofType(REGIONS_ACTIONS.REGION_REMOVE)
    .map(action => {
      const popoutService = getPopoutService(openFin)
      const {id, container, settings} = action.payload
      const popoutView = generateView(container)
      popoutService.openPopout(
        {
          id,
          url: '/#/popout',
          title: settings.title,
          onClosing: () => {
            console.log('close callback')
          },
          windowOptions: {
            width: settings.width,
            height: settings.height,
            resizable: false,
            scrollable: false,
            dockable: settings.dockable
          }
        }, popoutView
      )
      return popoutOpened()
    })
}
