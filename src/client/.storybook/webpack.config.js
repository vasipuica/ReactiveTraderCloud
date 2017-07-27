const _ = require('lodash')
const path = require('path')

// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config')
module.exports = (baseConfig, env) => {
  const defaultConfig = genDefaultConfig(baseConfig, env)

  const config = {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader'
        },
        {
          test: /\.css$/,
          include: [
            path.resolve(__dirname, "non_existing_path_as_a_workaround")
          ],
          loader: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 100000
              }
            },
          ]
        },
      ],
    },
    resolve: {
      extensions: [
        '.ts',
        '.tsx',
      ],
    },
  }

  // merging customizer to concatenate arrays and remove duplicates
  function unionIfArray(objValue, srcValue) {
    if(objValue && (_.isArray(srcValue) !== _.isArray(objValue))) {
      throw new Error('trying to assign non-array to array')
    }
    if (_.isArray(srcValue) && _.isArray(objValue)) {
      return _.union(srcValue, objValue)
    }
  }

  return _.mergeWith(config, defaultConfig, unionIfArray)
}
