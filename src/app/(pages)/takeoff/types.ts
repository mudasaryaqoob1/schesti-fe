import { LineCap } from 'konva/lib/Shape';

export interface LineState {
  startingPoint: { x: number; y: number } | null;
  endingPoint: { x: number; y: number } | null;
}

export interface CoordinatesInterface {
  x: number;
  y: number;
}

export interface CountInterface extends CoordinatesInterface {
  dateTime: Date;
}

export interface LineInterface {
  points: number[];
  stroke: string;
  strokeWidth: number;
  lineCap?: LineCap;
  textUnit: number;
  dateTime?: Date;
}

export interface PolygonConfigInterface {
  points: number[];
  stroke: string;
  strokeWidth: number;
  depth?: number;
  textUnit: number;
  dateTime: Date;
}

export interface DrawInterface {
  line: LineInterface[];
  area: PolygonConfigInterface[];
  volume: PolygonConfigInterface[];
  dynamic: LineInterface[];
  count: CountInterface[];
}
