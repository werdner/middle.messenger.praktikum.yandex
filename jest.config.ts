module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    transform: {'^.+\\.(ts|tsx)$': 'ts-jest'},
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!@foo)'],
    modulePathIgnorePatterns: [
        "<rootDir>/dist/",
        "<rootDir>/node_modules/",
        "<rootDir>/static/"
    ]
};
