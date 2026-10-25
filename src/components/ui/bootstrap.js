import {
  BBadge,
  BButton,
  BButtonGroup,
  BButtonToolbar,
  BCollapse,
  BForm,
  BFormCheckbox,
  BFormFile,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BListGroup,
  BListGroupItem,
  BModal,
  BNavbar,
  BOffcanvas,
  BProgress,
  BSpinner,
  BTab,
  BTabs,
  createBootstrap,
  vBColorMode,
  vBTooltip
} from 'bootstrap-vue-next'

const components = {
  BBadge,
  BButton,
  BButtonGroup,
  BButtonToolbar,
  BCollapse,
  BForm,
  BFormCheckbox,
  BFormFile,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BListGroup,
  BListGroupItem,
  BModal,
  BNavbar,
  BOffcanvas,
  BProgress,
  BSpinner,
  BTab,
  BTabs
}

function installBootstrap(app) {
  app.use(createBootstrap())
  Object.entries(components).forEach(([name, component]) => app.component(name, component))
  app.directive('b-color-mode', vBColorMode)
  app.directive('b-tooltip', vBTooltip)
}

export default { install: installBootstrap }
