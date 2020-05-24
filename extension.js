// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const fs = require("fs");
const path = require("path");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "test-switcher-vs" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('test-switcher-vs.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		//console.log(vscode.window.activeTextEditor.document.uri.fsPath);

		const currentOpenFileName = vscode.window.activeTextEditor.document.uri.fsPath.replace(vscode.workspace.rootPath, '');

		console.log(currentOpenFileName);

		let fileToSwitch = null; 

		if (currentOpenFileName.startsWith("\\src\\")) {
			fileToSwitch = 'test/calculator.unit.test.js';
		}

		else {
			fileToSwitch = 'src/calculator.js';
		}

		var filePath = path.join(vscode.workspace.rootPath, fileToSwitch);
		var openPath = vscode.Uri.file(filePath);
		vscode.workspace.openTextDocument(openPath).then(doc => {
			vscode.window.showTextDocument(doc).then(editor => {

			}, err => {
				console.error(err);
			});
		}, err => {
			console.error(err);
		});

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from test-switcher-vs!');
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
