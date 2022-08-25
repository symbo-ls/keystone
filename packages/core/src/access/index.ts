import { BaseListTypeInfo, ListAccessControl, ListOperationAccessControl } from '../types';

export function allowAll() {
  return true;
}
export function denyAll() {
  return false;
}

export function setAllOperations(val: boolean) {
  return {
    query: () => val,
    create: () => val,
    update: () => val,
    delete: () => val,
  };
}

export function allOperations<ListTypeInfo extends BaseListTypeInfo>(func) {
  return {
    query: func,
    create: func,
    update: func,
    delete: func,
  };
}
