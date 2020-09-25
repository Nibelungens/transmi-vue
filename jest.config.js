module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageReporters : ['cobertura', 'text']
}
