declare module '@capacitor-community/barcode-scanner' {
    export interface BarcodeScannerPlugin {
      scan(): Promise<{
        hasContent: boolean;
        content: string;
      }>;
    }
  
    export const BarcodeScanner: BarcodeScannerPlugin;
  }
  