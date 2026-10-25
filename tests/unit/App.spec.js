import axios from 'axios'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '@/App.vue'
import bootstrapPlugin from '@/components/ui/bootstrap'
import registerIcons from '@/components/ui/icons'
import i18n from '@/i18n'
import store from '@/store/index.store'

describe('App', () => {
  let wrapper

  beforeEach(() => {
    vi.spyOn(axios, 'post').mockResolvedValue({
      data: {
        result: 'success',
        arguments: {
          torrents: [],
          'download-dir': '/downloads',
          'download-dir-free-space': 0,
          version: 'test'
        }
      }
    })
  })

  afterEach(() => {
    wrapper?.unmount()
    vi.restoreAllMocks()
  })

  it('mounts the application shell with Vue 3 Bootstrap components', async () => {
    wrapper = mount(App, {
      global: {
        plugins: [store, i18n, bootstrapPlugin, registerIcons],
        mocks: {
          $filters: new Proxy({}, { get: () => value => value })
        }
      }
    })

    await flushPromises()

    expect(wrapper.find('header .navbar').exists()).toBe(true)
    expect(wrapper.find('footer .navbar').exists()).toBe(true)
    expect(wrapper.find('#content').exists()).toBe(true)

    await wrapper.find('#btn-panel-details').trigger('click')
    expect(store.getters['Config/getDetailsPanel']).toBe(true)

    await wrapper.find('header button').trigger('click')
    await flushPromises()
    expect(document.querySelector('#add-torrent-modal')).not.toBeNull()
  })
})
