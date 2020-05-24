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

		const fileSuffixes = ['.unit.test'];

		const currentOpenFileName = vscode.window.activeTextEditor.document.uri.fsPath.replace(vscode.workspace.rootPath, '');

		//console.log(currentOpenFileName);

		if (currentOpenFileName.startsWith("\\src\\")) {

			let fileNameToSearch = currentOpenFileName.replace("\\src\\", '').replace('.js', '');
			//console.log(fileNameToSearch);

			fileNameToSearch = fileNameToSearch + '{,' + fileSuffixes.join(',') + '}';

			searchFiles('**/test/', fileNameToSearch);
		}

		else {

			let fileNameToSearch = currentOpenFileName.replace("\\test\\", '').replace('.js', '');
			for(let i in fileSuffixes) {
				fileNameToSearch = fileNameToSearch.replace(fileSuffixes[i], '');
			}

			//console.log(fileNameToSearch);
			searchFiles('**/src/', fileNameToSearch);
			
		}

		
	});

	context.subscriptions.push(disposable);
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
