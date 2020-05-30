// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const { switchtest } = require('./switchtest');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "Test Switcher" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposableSwitchCode = vscode.commands.registerCommand('test-switcher-switch-code', function () {
		// The code you place here will be executed every time your command is executed
		switchtest(searchFiles);
	});

	let disposableSwitchStorybook = vscode.commands.registerCommand('test-switcher-switch-story', function () {
		vscode.window.showInformationMessage('Hello Storybook from test-switcher-vs!');
	});

	context.subscriptions.push(disposableSwitchCode);
	context.subscriptions.push(disposableSwitchStorybook);
}

function searchFiles(dirToSearch, fileNameToSearch) {
	const findResult = vscode.workspace.findFiles(dirToSearch + fileNameToSearch + '.js', '**​/node_modules/**', 100);
	return findResult.then(uris => {
		console.log(uris);
		if (!uris || uris.length == 0) {
			vscode.window.showWarningMessage('No file to switch...');
			return;
		}
		
		switchFile(uris[0]);
	});
}

function switchFile(fileToSwitch) {
	console.log('switchFile: ' + fileToSwitch);
	var openPath = fileToSwitch;
	vscode.workspace.openTextDocument(openPath).then(doc => {
		vscode.window.showTextDocument(doc).then(editor => {

		}, err => {
			console.error(err);
		});
	}, err => {
		console.error(err);
	});

	// Display a message box to the user
	//vscode.window.showInformationMessage('Hello World from test-switcher-vs!');
}


exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
