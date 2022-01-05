module.export = {
  resolve: {
    fallback:
    {
      stream: require.resolve("stream-browerify"),
      assert: require.resolve("assert/"),
      util: require.resolve("util"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      url: require.resove("url/")
    },

    
  }
}