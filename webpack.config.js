import crypto from "crypto";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import webpack from "webpack";

// Recreate __dirname and require for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

// Import JSON data
const packageInfo = require("./package.json"),
	// build the hash for each new iteration of the build
	// keeps the cache of the file fresh
	buildHash = crypto.createHash('sha256')
		.update(Date.now().toString())
		.digest('hex')
		.substring(0, 16);

console.log(`Build hash: ${buildHash}`);
console.log(`Building for environment: ${process.env?.NODE_ENV}`);

const isProduction = process.env?.NODE_ENV === 'development' || 'production';

const basicConfig ={
	mode: process.env.NODE_ENV,
	devtool: isProduction ? 'source-map' : 'eval-source-map',
	entry: {
		[packageInfo.name]: [
			path.resolve("src", "js", "utils", "eventBusMixin.js"),
			path.resolve("src", "js", "utils", "config.js"),
			path.resolve("src", "js", "index.js")
		],
		"time.worker": path.resolve("src", "js", "time-sync", "time.worker.js"),
	},
	output: {
	  module: true,
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
	  sourceMapFilename: "[file].map",
	  publicPath: '/',
		environment: {
			module: true,
		},
	},
	externals: {
		'hls.js': 'Hls',
		// 'lit': 'lit',
	},
	resolve: {
		alias: {
			'@EventBus': path.resolve(__dirname, 'src/js/utils/eventBusMixin.js'),
			'@Config': path.resolve(__dirname, 'src/js/utils/config.js'),
		},
		extensions: ['.js'],
		modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
	},
	cache: {
		type: "filesystem",
		cacheDirectory: path.resolve(__dirname, ".temp_cache"),
		compression: "gzip",
		allowCollectingMemory: true,
	},
	experiments: {
		outputModule: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [
					/node_modules/,
					path.resolve(__dirname, "src/other")
				],
				// use: {
				// 	loader: 'babel-loader',
				// },
			},
			{
				test: /\.css|\.s(c|a)ss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'lit-scss-loader',
						options: {
							minify: true, // defaults to false
						},
					},
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								outputStyle: "compressed"
							},
						},
					},
				],
			},
			{
				test: /\.(mp4|svg|png|jpe?g|gif)$/,
				type: 'asset/resource',
				exclude: /media/,
				generator: {
					emit: false,
					filename: '[name][ext]'
				}
			},
			{
				test: /\.(json|txt|html)$/i,
				type: "asset/resource",
				// include: [path.resolve(__dirname, "src/other")], // Only apply to files in "other"
				generator: {
					emit: false,
					filename: '[name][ext]'
				}
			},
		],
	},
	plugins: [
		new webpack.ProvidePlugin({
			i18n: [path.resolve(__dirname, './src/js/utils/i18n.js'), 'i18n'],
		}),
		new CopyPlugin({
			patterns: [
				{ from: "./src/other/", to: "other/", force: false },
			],
		}),
		new webpack.DefinePlugin({
			__BUILD_HASH__: `"${buildHash}"`,
			__VERSION__: JSON.stringify(packageInfo.version),
			__CARD_NAME__: JSON.stringify(packageInfo.name.split('/').pop())
		})
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					format: {
						comments: false,
					},
					compress: {
						drop_console: false, // Keep console.log for debugging
						drop_debugger: true,
					},
				},
				extractComments: false, // This is the key setting
			}),
		],
	}
};

export default basicConfig;
