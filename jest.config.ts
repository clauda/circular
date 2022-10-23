import type { Config } from '@jest/types'
import { pathsToModuleNameMapper } from 'ts-jest'

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  rootDir: './',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testRegex: '.*\\.spec\\.(t|j)s$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },

  collectCoverageFrom: [
    '<rootDir>/src/**/*.(t|j)s',
    '!<rootDir>/src/main.ts',
    '!<rootDir>/src/*.options.ts',
    '!<rootDir>/src/**/*.factory.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/*.config.ts',
    '!<rootDir>/src/**/*.module.ts',
    '!<rootDir>/src/app.module.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],

  moduleNameMapper: pathsToModuleNameMapper({
    '@test/*': ['<rootDir>/test/$1'],
    '@/*': ['<rootDir>/src/$1'],
  }),
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  verbose: true,
}

export default config
