module.exports = {
    readFile: (path) => {
        var XLSX = require('xlsx');
        var workbook = XLSX.readFile(path);
        console.log(XLSX.utils.sheet_to_json(workbook.Sheets));
    }
}