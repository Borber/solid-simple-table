module.exports = {
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(scss|sass|css)$": "identity-obj-proxy",
  },
  roots: ["<rootDir>/src"],
}
