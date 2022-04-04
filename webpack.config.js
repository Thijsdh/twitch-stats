const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		main: './src/main.ts',
		background: './src/background.ts',
		popup: './src/popup/index.tsx',
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['css-loader'],
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: 'src/popup/index.html', to: 'popup.html' },
				{ from: 'manifest.json', to: 'manifest.json' }
			]
		})
	]
};
