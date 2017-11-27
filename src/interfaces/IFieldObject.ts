import { DotType } from '@src/types';
/* linting has found too many errors in this interface. Incorrect behavour. So */
/* tslint:disable */
export default interface IFieldObject {
  // onPoint function returns true if one or more of element blocks
  // located on coordinates x/y.
  // otherwise returns false
  onPoint(x: number, y: number): boolean,
  dotType: DotType,
}
