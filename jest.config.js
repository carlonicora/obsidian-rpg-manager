module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
	},
};
