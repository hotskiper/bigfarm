module.exports = {
    roots: ['<rootDir>/src'],
    testRegex: '(/.*\\.test)\\.(ts|tsx)$',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    testEnvironment: 'jsdom'
}