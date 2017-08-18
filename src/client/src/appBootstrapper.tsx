import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router } from 'esp-js'
import { RouterProvider } from 'esp-js-react/dist/esp-react'
import { ServiceConst } from './services/model'
import SchedulerService from './system/schedulerService'
import AutobahnConnectionProxy from './system/service/autobahnConnectionProxy'
import Connection from './system/service/connection'
import { OpenFin } from './system/openFin'
import { Shell } from './ui/shell'
import { PopoutRegionModel, RegionModel, SingleItemRegionModel } from './ui/regions/model'
import { Provider } from 'react-redux'
import * as config from 'config.json'

import {
  AnalyticsService,
  BlotterService,
  CompositeStatusService,
  ExecutionService,
  FakeUserRepository,
  PricingService,
  ReferenceDataService,
} from './services'
import { WellKnownModelIds } from './'
import logger from './system/logger'
import User from './services/model/user'
import configureStore from './redux/configureStore'

let _log = logger.create('OpenfinPopoutService')


// When the application is run in openfin then 'fin' will be registered on the global window object.
declare const window: any

class AppBootstrapper {
  _connection: Connection
  _referenceDataService: ReferenceDataService
  _pricingService: PricingService
  _blotterService: BlotterService
  _executionService: ExecutionService
  _analyticsService: AnalyticsService
  _compositeStatusService: CompositeStatusService
  _schedulerService: SchedulerService
  _openFin: any
  store: any

  get endpointURL() {
    return config.overwriteServerEndpoint ? config.serverEndPointUrl : location.hostname
  }

  run() {
    const espRouter = this.createRouter()
    this.startServices(espRouter)
    this.store = configureStore(
      this._referenceDataService,
      this._blotterService,
      this._pricingService,
      this._analyticsService,
      this._compositeStatusService,
      this._executionService,
      this._openFin,
    )

    this.startModels(espRouter)
    this.displayUi(espRouter)
  }

  createRouter() {
    const espRouter = new Router()
    espRouter.addOnErrorHandler(err => {
      _log.error('Unhandled error in model', err)
    })
    return espRouter
  }

  startServices(espRouter) {
    const user: User = FakeUserRepository.currentUser
    const realm = 'com.weareadaptive.reactivetrader'
    const url = this.endpointURL

    this._schedulerService = new SchedulerService()
    this._connection = new Connection(
      user.code,
      new AutobahnConnectionProxy(url, realm),
      this._schedulerService,
    )

    // in a larger app you'd put a container in here (shameless plug: https://github.com/KeithWoods/microdi-js, but there are many offerings in this space).
    this._openFin = new OpenFin(espRouter)
    this._referenceDataService = new ReferenceDataService(ServiceConst.ReferenceServiceKey, this._connection, this._schedulerService)
    this._pricingService = new PricingService(ServiceConst.PricingServiceKey, this._connection, this._schedulerService, this._referenceDataService)
    this._blotterService = new BlotterService(ServiceConst.BlotterServiceKey, this._connection, this._schedulerService, this._referenceDataService)
    this._executionService = new ExecutionService(ServiceConst.ExecutionServiceKey, this._connection, this._schedulerService, this._referenceDataService, this._openFin)
    this._analyticsService = new AnalyticsService(ServiceConst.AnalyticsServiceKey, this._connection, this._schedulerService, this._referenceDataService)
    this._compositeStatusService = new CompositeStatusService(this._connection, this._pricingService, this._referenceDataService, this._blotterService, this._executionService, this._analyticsService)

    // connect/load all the services
    this._pricingService.connect()
    this._blotterService.connect()
    this._executionService.connect()
    this._analyticsService.connect()
    this._compositeStatusService.start()
    this._referenceDataService.connect()
    // and finally the underlying connection
    this._connection.connect()
  }

  startModels(espRouter) {

    // Wire up the region management infrastructure:
    // This infrastructure allows for differing views to be put into the shell without the shell having to be coupled to all these views.
    const workspaceRegionModel = new RegionModel(WellKnownModelIds.workspaceRegionModelId, 'workspace', espRouter)
    workspaceRegionModel.observeEvents()
    const popoutRegionModel = new PopoutRegionModel(WellKnownModelIds.popoutRegionModelId, 'popout', espRouter, this._openFin)
    popoutRegionModel.observeEvents()
    const blotterRegionModel = new SingleItemRegionModel(WellKnownModelIds.blotterRegionModelId, 'blotter', espRouter)
    blotterRegionModel.observeEvents()
    const sidebarRegionModel = new SingleItemRegionModel(WellKnownModelIds.sidebarRegionModelId, 'sidebar', espRouter)
    sidebarRegionModel.observeEvents()

    if (this._openFin.isRunningInOpenFin) {
      window.fin.desktop.main(() => espRouter.broadcastEvent('init', {}))
    } else {
      espRouter.broadcastEvent('init', {})
    }
  }

  displayUi(espRouter) {
    const store = this.store
    window.store = store
    ReactDOM.render(
      <RouterProvider router={espRouter}>
        <Provider store={store}>
          <Shell />
        </Provider>
      </RouterProvider>,
      document.getElementById('root'),
    )
  }
}

const runBootstrapper = location.pathname === '/' && location.hash.length === 0
// if we're not the root we (perhaps a popup) we never re-run the bootstrap logic
if (runBootstrapper) {
  new AppBootstrapper().run()
}

