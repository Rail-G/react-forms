/// <reference types="vite/client" />
/* eslint @typescript-eslint/no-explicit-any: 0 */
interface StateDefault {
  items: TableRow[],
  date: string,
  score: string,
  useAdd: boolean,
  useEdit: boolean,
  editId: string
}

interface TableRow {
  id: string;
  date: Date;
  score: number
}

interface ImageData {
  id: string;
  imageUrl: string | null | ArrayBuffer;
  colorSpace?: any;
  data?: any;
  height?: number;
  width?: number;
}

interface AddData {
  date: string, 
  score: string, 
  onChangeDate: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onChangeScore: (e: React.ChangeEvent<HTMLInputElement>) => void,
  addData: (e: React.MouseEvent<HTMLButtonElement>) => void,
  closeBlock: (type: string) => void
}

interface UpdData {
  id: string,
  date: string, 
  score: string, 
  onChangeDate: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onChangeScore: (e: React.ChangeEvent<HTMLInputElement>) => void,
  updData: (e: React.MouseEvent<HTMLButtonElement>, index: string) => void
  closeBlock: (type: string) => void
}
