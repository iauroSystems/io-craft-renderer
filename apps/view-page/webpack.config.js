const { ModuleFederationPlugin } = require('webpack').container;
const nrwlConfig = require('@nrwl/react/plugins/webpack.js');
const { dependencies } = require('../../package.json');

const _shared = {};
const depsBlacklist = ['gridstack'];

Object.keys(dependencies).forEach((d, i) => {
  if (depsBlacklist.includes(d)) return;

  _shared[d] = {
    singleton: true,
    eager: true,
    requiredVersion: dependencies[d],
  };
});

module.exports = (config, context) => {
  nrwlConfig(config);
  config.context = process.cwd();
  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'ViewPageApp',
      filename: 'remoteEntry.js',
      exposes: {
        // Module
        './ViewPageAppComponent': './apps/view-page/src/app/app.tsx',

        // Slice
        './grid': './apps/view-page/src/app/pages/projects/store/index.ts',

        // Route
        './RoutingDemoConfig':
          './apps/view-page/src/app/pages/projects/DemoConfig.tsx',
      },
      shared: {
        ..._shared,
      },
    })
  );
  config.optimization.runtimeChunk = false;
  config.output = {
    ...config.output,
    uniqueName: 'view-page',
    publicPath: 'auto',
  };

  return config;
};
