import { pathsToModuleNameMapper } from 'ts-jest'

const config = {
  rootDir: '../',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  moduleNameMapper: pathsToModuleNameMapper({
    '@test/*': ['<rootDir>/test/$1'],
    '@/*': ['<rootDir>/src/$1'],
  }),
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePaths: ['<rootDir>'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  verbose: true,
}

export default config
