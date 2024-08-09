// custom.d.ts
interface Window {
  customConfig?: {
    color?: string;
    [key: string]: any; // To handle any other properties you may add
  };
}
