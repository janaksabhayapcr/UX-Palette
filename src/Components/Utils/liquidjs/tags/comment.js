module.exports = function (liquid) {
  liquid.registerTag('comment', {
    parse: function (tagToken, remainTokens) {
      var stream = liquid.parser.parseStream(remainTokens);
      stream
        .on('token', function (token) {
          if (token.name === 'endcomment') stream.stop();
        })
        .on('end', function (x) {
          throw new Error('tag ' + tagToken.raw + ' not closed');
        });
      stream.start();
    },
  });
};
