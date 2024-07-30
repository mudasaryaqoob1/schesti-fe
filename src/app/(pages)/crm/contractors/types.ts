import { ChooseFontType } from '@/app/component/fonts';
import { FileInterface } from '@/app/interfaces/file.interface';

export type StandardToolType = 'signature' | 'initials' | 'stamp' | 'date';

type SignatureState = {
  tool: 'signature';
  value?:
    | {
        font: ChooseFontType;
        value: string;
      }
    | FileInterface;
};

type InitialsState = {
  tool: 'initials';
  value?: string;
};

type StampState = {
  tool: 'stamp';
  value?: FileInterface;
};

type DateState = {
  tool: 'date';
  value?: string;
};

export type ToolState = {
  position: { x: number; y: number };
  id: string;
} & (SignatureState | InitialsState | StampState | DateState);

export type PdfContractMode =
  | 'add-values'
  | 'edit-fields'
  | 'view-fields'
  | 'view-values';
