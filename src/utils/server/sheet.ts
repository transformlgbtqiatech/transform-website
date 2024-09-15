import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from 'google-auth-library'
import {
  getSecret
} from "astro:env/server"

const SHEET_ID = '10EfVMDS9Khhq_tF0q5p_PYcn7EawYVjD4DTEeRYhdbM'

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

const jwt = new JWT({
  email: getSecret('GOOGLE_SERVICE_AUTH_CLIENT_EMAIL'),
  key: getSecret('GOOGLE_SERVICE_AUTH_KEY')?.replace(/\\n/g, "\n"),
  scopes: SCOPES,
});

export const transformSheet = new GoogleSpreadsheet(SHEET_ID, jwt);
