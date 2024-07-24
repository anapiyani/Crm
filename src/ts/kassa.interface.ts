export interface IKassaOperations {
  children: IKassaOperations[] | []; // array of children operations
  id: number; // operation id
  name: string; // operation name
  parent: null | number; // id of parent operation
}
