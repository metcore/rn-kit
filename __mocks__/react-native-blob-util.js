const ReactNativeBlobUtil = {
  fs: { dirs: { CacheDir: '/tmp', DocumentDir: '/tmp' } },
  config: jest.fn(() => ({
    fetch: jest.fn(() =>
      Promise.resolve({
        path: () => '/tmp/file',
        respInfo: { headers: { 'content-type': 'application/pdf' } },
      })
    ),
  })),
};

module.exports = ReactNativeBlobUtil;
module.exports.default = ReactNativeBlobUtil;
