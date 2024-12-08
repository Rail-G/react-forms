/// <reference types="vite/client" />
/* eslint @typescript-eslint/no-explicit-any: 0 */
interface StateDefault {
  items: TableRow[],
  date: string,
  score: string,
  useAdd: boolean,
  useEdit: boolean,
  editId: number | string
}

interface PropsDefault {}

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