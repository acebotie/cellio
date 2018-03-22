// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
require('electron-disable-file-drop');
window.$ = window.jQuery = require('jquery');
((io) => {
    var holder = $('#dragArea');
    console.log(holder, holder[0]);
    holder.on('dragover', () => {
        return false;
    });

    holder.on('dragleave', () => {
        return false;
    });

    holder.on('dragend', () => {
        return false;
    });

    holder.on('drop', (e) => {
        e.preventDefault();

        for (let f of e.originalEvent.dataTransfer.files) {
            if (/\.xls[x]?$/.test(f.path)) {
                console.log('File(s) you dragged here: ', f.path);
                io.readFile(f.path);
            }
        }

        return false;
    });

    holder.find('a').on('click', () => {
        /* from app code, require('electron').remote calls back to main process */
        var dialog = require('electron').remote.dialog;
        /* show a file-open dialog and read the first selected file */
        var f = dialog.showOpenDialog({ properties: ['openFile'] });
        io.readFile(f[0]);
    });
})(require('./xlsxio'));