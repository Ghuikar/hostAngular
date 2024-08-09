const path = require('path');

module.exports = {
  mode: 'production', // or 'development', or 'none'
  entry: './src/app/chatbox/chatbox.component.ts', // Entry point for your component
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'chatbox.umd.js', // Output file name
    library: 'chatbox', // Library name for the UMD module
    libraryTarget: 'umd', // Library target type
    globalObject: 'this' // Ensures compatibility in different environments
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Transpile TypeScript files
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'] // File extensions to resolve
  },
  externals: {
    // List any external libraries here if needed
  }
};
