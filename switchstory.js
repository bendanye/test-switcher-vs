const vscode = require('vscode');

const switchStory = (searchFilesFunc) => {

	const fileSuffixes = vscode.workspace.getConfiguration('test-switcher')
        .get('story.suffix', ['.stories']);

    const currentOpenFileName = vscode.window.activeTextEditor.document.uri.fsPath.replace(vscode.workspace.rootPath, '');

    if (currentOpenFileName.startsWith("\\src\\")) {

        let fileNameToSearch = currentOpenFileName.replace("\\src\\", '').replace('.js', '');
        
        const result = fileSuffixes.filter(fileSuffix => fileNameToSearch.includes(fileSuffix));
        //console.log(result);
        if (result.length > 0) {
            for(let i in fileSuffixes) {
                fileNameToSearch = fileNameToSearch.replace(fileSuffixes[i], '');
            }
        } else {
            fileNameToSearch = fileNameToSearch + '{,' + fileSuffixes.join(',') + '}';
            
        }

        searchFilesFunc('**/src/', fileNameToSearch);
    }

    else {
        vscode.window.showWarningMessage('Only handle finding story code at ./src folder...');
    }
}

module.exports = {
    switchStory
}