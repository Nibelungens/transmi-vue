import { defineComponent, h } from 'vue'

const iconNames = [
  'arrow-bar-left',
  'arrow-bar-right',
  'arrow-clockwise',
  'arrow-down',
  'arrow-repeat',
  'arrow-up',
  'arrows-collapse',
  'box-arrow-in-down-right',
  'caret-right-fill',
  'chat-left-text',
  'check',
  'chevron-down',
  'chevron-double-down',
  'chevron-double-up',
  'chevron-up',
  'circle-fill',
  'file-earmark-arrow-up-fill',
  'file-earmark-fill',
  'files',
  'fonts',
  'folder-fill',
  'gear-fill',
  'globe',
  'graph-down',
  'info-circle-fill',
  'layers-half',
  'lock-fill',
  'pause-fill',
  'people-fill',
  'play-fill',
  'question-circle-fill',
  'trash-fill',
  'tools'
]

const makeIcon = icon => defineComponent({
  name: icon
    ? `Icon${icon.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join('')}`
    : 'BootstrapIcon',
  props: {
    animation: String,
    fontScale: [Number, String],
    icon: String,
    shiftV: [Number, String],
    variant: String
  },
  inheritAttrs: false,
  setup(props, { attrs }) {
    return () => {
      const iconName = icon || props.icon
      return h('i', {
        ...attrs,
        class: [
          'bi',
          iconName ? `bi-${iconName}` : null,
          props.animation === 'throb' ? 'bi-throb' : null,
          props.variant ? `text-${props.variant}` : null
        ],
        style: {
          fontSize: props.fontScale ? `${props.fontScale}em` : null,
          position: props.shiftV ? 'relative' : null,
          top: props.shiftV ? `${props.shiftV}px` : null
        },
        'aria-hidden': 'true'
      })
    }
  }
})

export default function registerIcons(app) {
  app.component('BIcon', makeIcon())

  iconNames.forEach(icon => {
    const componentName = `BIcon${icon.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join('')}`
    app.component(componentName, makeIcon(icon))
  })
}
