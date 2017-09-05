import * as _ from 'lodash'
import { createAction } from 'redux-actions'

export interface RegionSettings {
  title: string,
  width: number,
  height: number,
  dockable: boolean,
}

export const regionsSettings = (title:string, width:number, height:number, dockable:boolean): RegionSettings => {
  return {
    title,
    width,
    height,
    dockable,
  }
}

export const ACTION_TYPES = {
  REGION_ADD: '@ReactiveTraderCloud/REGION_ADD',
  REGION_OPEN_WINDOW: '@ReactiveTraderCloud/REGION_OPEN_WINDOW',
  REGION_TEAROFF_WINDOW: '@ReactiveTraderCloud/REGION_TEAROFF_WINDOW',
  REGION_ATTACH_WINDOW: '@ReactiveTraderCloud/REGION_ATTACH_WINDOW',
}

// onPopoutClick
export const openWindow = createAction(ACTION_TYPES.REGION_OPEN_WINDOW, (payload, openFin) => ({ ...payload, openFin }))
// onComponentMount
export const addRegion = createAction(ACTION_TYPES.REGION_ADD, payload => payload)

export interface Region {
  id:string,
  isTearedOff: boolean,
  container: any,
  settings: RegionSettings
}

const changeRegionTearOffStatus = (state, payload:Region, status:boolean) => {
  const regionId:string = payload.id
  const region = _.pick(state, [regionId])
  region[regionId].isTearedOff = status
  const cleanState = _.omit(state, [regionId])
  return {
    ...region,
    ...cleanState
  }
}

export const regionsReducer = (state: any = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.REGION_ADD:
      const newRegion:Region = action.payload
      return {
        [newRegion.id]: newRegion,
        ...state,
      }
    case ACTION_TYPES.REGION_ATTACH_WINDOW:
      return changeRegionTearOffStatus(state, action.payload, false)
    case ACTION_TYPES.REGION_TEAROFF_WINDOW:
      return changeRegionTearOffStatus(state, action.payload, true)
    default:
      return state
  }

}
