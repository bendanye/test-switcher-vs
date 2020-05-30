const vscode = require('vscode');

const switchTest = (searchFilesFunc) => {
    //console.log(vscode.window.activeTextEditor.document.uri.fsPath);

	const fileSuffixes = vscode.workspace.getConfiguration('test-switcher')
        .get('test.suffix', ['.unit.test', '.int.test', '.int.narrow.test']);

    const currentOpenFileName = vscode.window.activeTextEditor.document.uri.fsPath.replace(vscode.workspace.rootPath, '');

    //console.log(currentOpenFileName);

    if (currentOpenFileName.startsWith("\\src\\")) {

        let fileNameToSearch = currentOpenFileName.replace("\\src\\", '').replace('.js', '');
        //console.log(fileNameToSearch);

        fileNameToSearch = fileNameToSearch + '{,' + fileSuffixes.join(',') + '}';

        searchFilesFunc('**/test/', fileNameToSearch);
    }

    else {

        let fileNameToSearch = currentOpenFileName.replace("\\test\\", '').replace('.js', '');
        for(let i in fileSuffixes) {
            fileNameToSearch = fileNameToSearch.replace(fileSuffixes[i], '');
        }

        //console.log(fileNameToSearch);
        searchFilesFunc('**/src/', fileNameToSearch);
        
    }
}

module.exports = {
    switchTest
}