const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

module.exports = {
  entry: './src/server.ts',
  mode: 'production',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist/back/src'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
      rules: [
          {
            test: /\.ts$/,
            use: [
              'ts-loader',
            ],
          },
      ],
  },
  externals: [
      nodeExternals(),
  ],
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: ['npm run start'],
        blocking: false,
        parallel: true,
      },
    })
  ],
}
