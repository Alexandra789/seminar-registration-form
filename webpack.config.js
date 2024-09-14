const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devServer = (isDev) => !isDev ? {} : {
	devServer: {
		static: path.resolve(__dirname, 'dist'),
		open: true,
		hot: true,
		port: 9000,
	},
};

module.exports = ({ develop }) => ({
	mode: develop ? 'development' : 'production',
	entry: './src/index.js',
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		clean: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: './scss/style.css' // исправлено на .css
		})
	],
	module: {
		rules: [
			{
				test: /\.(?:ico|png|jpg|jpeg|svg)$/i,
				type: 'asset/inline'
			},
			{
				test: /\.html$/i,
				loader: 'html-loader'
			},
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: () => [require('autoprefixer')],
							},
						},
					}
				]
			},
			{
				test: /\.scss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: () => [require('autoprefixer')],
							},
						},
					},
					'sass-loader'
				]
			}
		]
	},
	...devServer(develop),
});
