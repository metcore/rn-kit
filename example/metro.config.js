const path = require('path');
const { getDefaultConfig } = require('@react-native/metro-config');
const { withMetroConfig } = require('react-native-monorepo-config');

const root = path.resolve(__dirname, '..');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = withMetroConfig(getDefaultConfig(__dirname), {
  root,
  dirname: __dirname,
});

// react-native-monorepo-config only dedupes the library's peerDependencies.
// react-native-svg is a regular dependency of the library root, so both the
// root and example copies would be bundled, registering RNSVG views twice.
// Block the root copy so everything resolves to example/node_modules (the
// copy the native Pods are built from).
const dedupe = ['react-native-svg'];
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

config.resolver.blockList = new RegExp(
  [config.resolver.blockList.source]
    .concat(
      dedupe.map(
        (m) => `^${escapeRegExp(path.join(root, 'node_modules', m))}\\/.*$`
      )
    )
    .join('|')
);
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  ...Object.fromEntries(
    dedupe.map((m) => [m, path.join(__dirname, 'node_modules', m)])
  ),
};

module.exports = config;
