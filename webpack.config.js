const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FilemanagerWebpackPlugin = require("filemanager-webpack-plugin");

const config = {
	entry: path.resolve(__dirname, "src", "index.js"),

	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index.js",
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "template.html"),
			filename: "index.html",
		}),

		new FilemanagerWebpackPlugin({
			events: {
				onStart: {
					delete: ["dist"],
				},
			},
		}),
	],

	module: {
		rules: [
			{
				test: /\.js$/,
				use: "babel-loader",
				exclude: "/node_modules/",
			},
			{
				test: /\.html$/,
				use: ["html-loader"],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.s[ac]ss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(eot|ttf|woff2?)$/,
				type: "asset/resource",
			},
			{
				test: /\.(jpg|png|gif)$/,
				type: "asset/resource",
			},
		],
	},

	devServer: {
		watchFiles: path.resolve(__dirname, "src"),
		open: true,
		compress: true,
	},
};

module.exports = config;
