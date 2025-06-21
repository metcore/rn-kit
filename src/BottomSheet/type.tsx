export type BottomSheetHeighProps = `${number}%` | 'auto' | number;

export interface BottomSheetProops {
  label?: string;
  isOpen?: boolean;
  onClose?: (isOpen: boolean) => void;
  children?: React.ReactNode;
  backdrop?: boolean;
  closable?: boolean;
  onRequestClose?: (e: any) => void;
  buttonClose?: boolean;
  height?: BottomSheetHeighProps;
  pullBar?: React.ReactNode;
  footer?: React.ReactNode;
}
