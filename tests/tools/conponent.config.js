import { afterEach } from 'vitest'
import { shallowMount as mountComponent } from '@vue/test-utils'
import { createStore } from 'vuex'
import bootstrapPlugin from '@/components/ui/bootstrap'
import registerIcons from '@/components/ui/icons'

const wrappers = new Set()
const passthroughFilters = new Proxy({}, {
  get: () => value => value
})

const localVue = {}
const store = createStore({
  getters: {
    'Torrents/getSelectedTorrents': () => [],
    'Torrents/getTorrents': () => [],
    'Config/getTimeRefresh': () => 1000,
    'Config/getSelectSortCol': () => 'name',
    'Config/getSelectSortReverse': () => false,
    'Config/getDownloadDir': () => '',
    'Config/getDownloadDirFreeSpace': () => 0,
    'Config/getDetailsPanel': () => false,
    'Config/getVersion': () => '',
    'Notification/getLast': () => ({ timestamp: new Date(), message: '', level: 'info' })
  },
  mutations: {
    'Torrents/ADD_SELECTED': () => null,
    'Torrents/SELECTED': () => null,
    'Torrents/REMOVE_SELECTED': () => null,
    'Torrents/SET_LIST_TORRENT': () => null,
    'Config/SET_TIME_REFRESH': () => null
  }
})

const mocks = {
  $t: message => message,
  $tc: message => message,
  $i18n: { t: message => message },
  $filters: passthroughFilters
}

function shallowMount(component, options = {}) {
  const {
    store: providedStore = store,
    mocks: providedMocks = mocks,
    propsData,
    global = {},
    ...mountOptions
  } = options

  const wrapper = mountComponent(component, {
    ...mountOptions,
    props: mountOptions.props || propsData,
    global: {
      ...global,
      plugins: [bootstrapPlugin, registerIcons, providedStore, ...(global.plugins || [])],
      mocks: { ...mocks, ...providedMocks, ...(global.mocks || {}) }
    }
  })

  wrappers.add(wrapper)
  return wrapper
}

afterEach(() => {
  wrappers.forEach(wrapper => wrapper.unmount())
  wrappers.clear()
})

export { localVue, store, mocks, shallowMount }
