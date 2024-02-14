
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
       
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',  
      

    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', // path
        title: 'JATE',
       }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        desktop: false,
        mobile: false,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E.',
        description: 'A writing app with JavaScript syntax highlighting',
        background_color: 'blue',
        theme_color: 'grey',
        start_url: '/', 
        publicPath: '/',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'), favicon: true,
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
            
          },
         
          
        ],
 }),
      new InjectManifest({
        swSrc: './src-sw.js', 
        swDest: 'src-sw.js', 
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
        
      ],
    },
  };
};