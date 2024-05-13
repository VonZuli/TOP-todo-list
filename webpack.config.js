const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
	entry: {
   index: './src/index.js',
   header: './src/scripts/header.js',
   todo: './src/scripts/todo.js',
   footer: './src/scripts/footer.js',
   modal: './src/scripts/modal.js',
   folder: './src/scripts/folders.js',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  module:{
    rules:[
      {
        test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
				test: /\.(png|svg|jpe?g|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
    ]
  },
  output: {
	
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		
		assetModuleFilename: (pathData) => {
			const filepath = path.dirname(pathData.filename).split("/").slice(1).join("/");
			return `${filepath}/[name].[hash][ext][query]`;
		},
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		}),
  ],
  optimization: {
    runtimeChunk: 'single',
  },
};
