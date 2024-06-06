import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import _ from "lodash";

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

export const singleHeaderExcelFile = (json, excelFileName, excelConfig) => {
    const header = excelConfig.map((header) => {
        return header.label
    });

    let exportData = json.map((item) => {
        let _item = [];

        excelConfig.map((headerItem) => {
            let itemValue = headerItem.value;

            if (Object.hasOwnProperty.call(item, itemValue)) {
                if (typeof item[itemValue] != 'object') {
                    _item.push(item[itemValue]);
                }
            } else {
                if (itemValue.includes('.')) {
                    let excelVal = null;
                    itemValue.split('.').forEach((element, i) => {
                        if (i == 0 && item.hasOwnProperty(element)) {
                            excelVal = item;
                        }
                        
                        if(excelVal[element]) {
                            excelVal = excelVal[element];
                        }
                    });

                    if (excelVal && typeof excelVal != 'object') {
                        _item.push(excelVal);
                    }
                 }
            }
        })

        return _item;
    })

    exportData = [header, ...exportData]

    let wscols = [];
    for (let i = 0; i < header.length; i++) {
        wscols.push({ wch: header[i].length + 10 });
    }

    const worksheet = XLSX.utils.json_to_sheet(exportData, { skipHeader: true });
    worksheet["!cols"] = wscols;
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAsExcelFile(excelBuffer, excelFileName);
  };

  export const saveAsExcelFile = (buffer, fileName) => {
    const data = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  };