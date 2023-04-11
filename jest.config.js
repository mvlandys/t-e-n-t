module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    setupFilesAfterEnv: ["./tests/helpers/setup.ts"],
    maxWorkers: 1
};