import * as XLSX from "xlsx/xlsx.mjs";
import fs from "fs";
import { connect, createSchema, createTable, populatedata } from '../db/db.js';

XLSX.set_fs(fs);

export default class ScrapeVolunteersFile {
  _filePath = "E:/CHrome Downloads/ewb/volunteers011222.xlsx";
  _file;
  _jsondata = {};

  constructor(filePath) {
    this._filePath = filePath 
    this._file = XLSX.readFileSync(this._filePath);
    this._jsondata = XLSX.utils.sheet_to_json(this._file.Sheets["רשימת מתנדבים"]);
    connect();
  }

  createSchema = async () => await createSchema();

  createTable = async () => await createTable();

  populateDb = async () => await populatedata(this._jsondata);
}


