import { createContext } from 'react';
import { DrawInterface } from '../types';

export interface DrawHistoryContextInterface {
  [pageNumber: string]: DrawInterface;
}

export interface DrawHistoryContextProps {
  drawHistory: DrawHistoryContextInterface | null;
  handleDrawHistory: (key: string, value: DrawInterface) => void;
}

const DrawHistoryContext = createContext<DrawHistoryContextProps>({
  drawHistory: null,
  handleDrawHistory: () => undefined,
});

export default DrawHistoryContext;
