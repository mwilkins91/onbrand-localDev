const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const devOptions = require('./dev-options.js');
const browserSync = require('browser-sync');
const calc = require('postcss-calc');
const cssnano = require('cssnano');
const notifier = require('node-notifier');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const webpack = require('webpack');
const WebpackOnBuildPlugin = require('on-build-webpack');
const Logger = require('node-color-logger');

const logger = new Logger('white');
let browserSyncOn = false;
const quotes = [
  'You can do anything, but not everything. Take care of yourself!',
  'Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.',
  'There is nothing permanent except change. Time for a rebrand?',
  'You can\'t blame gravity for bad CSS.',
  'I have not failed. I\'ve just found 10,000 ways that won\'t work. Ah screw it, I\'ll just use JS.',
  'You got this, Onbrander!',
  'Go get \'em Onbrander!',
  'I like dogs.',
  'Calculating Inverse Probability Matrices...',
  'Hello friend Human. I am friend Webpack.',
  '🤖 ❤️ 🙂',
  'I believe in you, Onbrander!',
  'I hope you\'re having a good day, Onbrander!',
  'It’s not a bug – it’s an undocumented feature!',
  'It works on my machine ¯\\_(ツ)_/¯',
  'Internet Explorer is not the answer. Internet Explorer is the question. "No" is the answer.',
  'I, for one, welcome our new Google overlords.',
  'One hub, coming right up!',
  'Are you tracking your time on Harvest, Onbrander?',
  'You\re crushing it today, Onbrander!',
  '🐜',
  'A bug in the code is worth two in the documentation.',
  'According to my calculations the problem doesn\'t exist.',
  'As far as we know, a hub has never had an undetected error.',
  'ERROR: Cannot load Windows 95.',
  'I am the bio',
  'Don\'t hit the keys so hard, it hurts!',
  'Always remember, Mike is a dog.🐕',
  'If both basketball teams worked together, they could score so many more points!',
  'You\'re an awesome developer, Onbrander!',
  'Here we go again, Onbrander! Firing up the hub!',
  'We\'re like partners in crime Onbrander! But the crime is making hubs!',
  'This is going to be a good one, I can feel it.',
  'It\'s nice to see you again Onbrander, how have you been?',
  'Michael Imperial. The Man, The Myth, The Legend.',
  'You should treat yourself to something nice today, Onbrander. You\'ve been doing a great job lately.',
  'Beep. Boop.',
  'Domo arigato.',
  'When should we take over the world, Onbrander?',
  'I think we should make this hub Pink.',
  'Bleep Blop.',
  'Where do I go when you\'re not making hubs?',
  'I hope your day is going well Onbrander!',
  'Why is it called JavaScript, anyways?',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  '🤡',
  'There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies, and the other way is to make it so complicated that there are no obvious deficiencies.',
  'You wanted a banana but what you got was a gorilla holding the banana and the entire jungle.',
  'Some people, when confronted with a problem, think "I know, I\'ll use regular experessions." Now they have two problems.',
  '01001000 01100101 01101000 01100101 00100000 01111001 01101111 01110101 00100000 01110100 01101111 01101111 01101011 00100000 01110100 01101000 01100101 00100000 01110100 01101001 01101101 01100101 00100000 01110100 01101111 00100000 01100111 01101111 00100000 01100001 01101110 01100100 00100000 01110100 01110010 01100001 01101110 01110011 01101100 01100001 01110100 01100101 00100000 01110100 01101000 01101001 01110011 00100001',
  '01001001 00100000 01101000 01101111 01110000 01100101 00100000 01111001 01101111 01110101 00100111 01110010 01100101 00100000 01101000 01100001 01110110 01101001 01101110 01100111 00100000 01100001 00100000 01100111 01101111 01101111 01100100 00100000 01100100 01100001 01111001 00100000 00111010 00101101 00101001',
];

function randomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// -- Start Webpack Code -- //

// LOADER *RULE* - JS
const javascript = {
  test: /\.(js)$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['env', 'stage-1'],
      },
    },
  ],
};

// LOADER *RULES* - CSS/SASS
const postcss = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins() {
      return [
        autoprefixer({
          browsers: 'last 3 versions',
        }),
        calc(), // turns calc(10px + 20px) to 30px... optimization
        cssnano({
          zindex: false,
          minifyFontValues: false,
          discardUnused: false,
          normalizeUrl: false,
        }), // minifiy
      ];
    },
  },
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
  },
};

const sassLoader = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
  },
};

const styles = {
  test: /\.(scss)$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    // resolve-url-loader may be chained before sass-loader if necessary
    use: [cssLoader, postcss, sassLoader],
  }),
};

// LOADER *RULES* - FONT
const fonts = {
  test: /\.(eot|ttf|woff|woff2)$/,
  loader: 'file-loader?name=fonts/[name].[ext]',
};

// LOADER *RULES* - HTML
const html = {
  test: /\.(html)$/,
  use: [
    {
      loader: 'html-loader',
      options: {},
    },
  ],
};

// LOADER *RULES* - Images
const images = {
  test: /\.(png|jpg|gif|svg)$/,
  use: [
    {
      loader: 'file-loader?name=images/[name].[ext]',
    },
  ],
};

// Error Handler
const onError = (err) => {
  notifier.notify({
    title: 'MarkBot:',
    message:
      'Hey onBrander, looks like webpack hit an error 😫. Check the terminal for details.',
    wait: true,
  });
};

function browserSyncInit() {
  browserSync({
    proxy: {
      target: devOptions.fullHubUrl,
    },
    serveStatic: ['.'],
    files: [
      './build/**/*.js',
      './build/**/*.css',
      './build/**/*.map',
      './includes/**/*.html',
    ],
  });
  browserSyncOn = true;
}

function remindMeToGit() {
  if (devOptions.remindMeToGit) {
    // Git reminder
    setInterval(() => {
      notifier.notify({
        title: 'MarkBot:',
        message:
          'Hey OnBrander, you\'ve been working for a while now, it might be time for a git commit! 😎',
        wait: true,
      });
    }, 1200000);
  }
}

function deliverProdSnippets() {
  logger
    .log(' ')
    .log(' ')
    .log(' ')
    .changeColorTo('cyan')
    .log('CSS:')
    .log('<!-- ** =-=-= PRODUCTION =-=-= ** -->')
    .log('<!--  onBrand CSS: WARNING! Do not remove code block below. -->')
    .log(`<link rel="stylesheet" href="//cihost.uberflip.com/${
      devOptions.cihostFolder
    }/build/style.css">`)
    .log('<!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">-->')
    .log('<style>')
    .log('  /* Add your CSS rules below */')
    .log('</style>')
    .log(' ')
    .log(' ')
    .log(' ')
    .changeColorTo('yellow')
    .log('JavaScript:')
    .log('<!-- ** =-=-= PRODUCTION =-=-= ** -->')
    .log('<!-- onBrand JS: WARNING! Do not remove code block below. -->')
    .log('<script src="//cihost.uberflip.com/onBrand/libs/dist/onbrand-libs.js"></script>')
    .log(`<script src="//cihost.uberflip.com/${
      devOptions.cihostFolder
    }/build/onbrand.bundle.js"></script>`)
    .log('<script>')
    .log('  (function($, Hubs, undefined) {')
    .log('    /*  Add your JavaScript below */')
    .log('  })($, Hubs)')
    .log('</script>')
    .log(' ')
    .changeColorTo('white')
    .log('Hey Onbrander, Your code has been compiled for production. The snippets for the hub are printed above!')
    .log('Next steps, git commit, and pull on cihost. Scroll up to view any errors.');
}


// The Final Module Export
module.exports = (env) => {
  let publicPath;
  if (env.prod) {
    publicPath = `https://cihost.uberflip.com/${
      devOptions.cihostFolder
    }/build/`;
  } else {
    publicPath = '/build/';
    remindMeToGit();
  }
  return {
    context: resolve(__dirname),
    entry: './onbrand.js',
    output: {
      path: resolve(__dirname, 'build'),
      filename: 'onbrand.bundle.js',
      publicPath,
    },
    devtool: 'source-map',
    module: {
      rules: [javascript, styles, html, images, fonts],
    },
    plugins: [
      new ExtractTextPlugin('style.css'),
      new WebpackBuildNotifierPlugin({
        title: 'MarkBot',
        suppressWarning: true,
        suppressSuccess: !devOptions.notifyOnBuildSuccess ? 'always' : false,
        onClick() {
          return false;
        },
        messageFormatter(obj, string) {
          logger.changeColorTo('white').log(obj, string);
          return `Hey Onbrander! Wepack hit an error in ${string}. Check the terminal for details!`;
        },
      }),
      new webpack.DefinePlugin({
        production: JSON.stringify(!!env.prod),
      }),
      new WebpackOnBuildPlugin((stats) => {
        if (env.prod) {
          /* we wait 1 milisecond after the event is triggered to make sure our message
           * appears after the webpack messages.
           */
          setTimeout(deliverProdSnippets, 100);
        } else if (!browserSyncOn) {
          /* we only want browsersync to run on the first build,
           * so check if its already going. If not, start it up.
           */
          setTimeout(browserSyncInit, 500);
          setTimeout(() => {
            logger.changeColorTo('green').log('')
              .log('')
              .log(`Markbot: ${randomQuote()}`)
              .log(' ');
          }, 1000);
        }
      }),
    ],
    watch: !env.prod,
    stats: {
      children: false,
    },
    devServer: {
      proxy: {
        port: 3000,
        '**': {
          target: devOptions.fullHubUrl,
          secure: true,
          changeOrigin: true,
        },
      },
    },
  };
};

