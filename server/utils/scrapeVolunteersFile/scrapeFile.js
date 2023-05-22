//get file from google docs
// convert to json
// save to temp file as db
import * as XLSX from "xlsx/xlsx.mjs";
import fs from "fs";

XLSX.set_fs(fs);

// const FILE_PATH = "E:/CHrome Downloads/ewb/volunteers011222.xlsx"

// export default class ScrapeFile {

// }

(() => {
  const file = XLSX.readFileSync(
    "E:/CHrome Downloads/ewb/volunteers011222.xlsx"
  );
  const data = XLSX.utils.sheet_to_json(file.Sheets["רשימת מתנדבים"]);
  fs.writeFileSync("volunteers,json", JSON.stringify(data, null, 2));
})();
