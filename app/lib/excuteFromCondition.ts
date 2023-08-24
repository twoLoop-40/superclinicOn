export type Proc = <T>(arg?: T) => Promise<any>;

export const executeFromCondition = (condition: boolean) => {
  return (onTrue: Proc, onFalse: Proc) => {
    return async <T>(arg?: T) => {
      if (condition) {
        return onTrue(arg);
      }
      return onFalse(arg);
    };
  };
};

type ProcWithReturn<T> = (arg?: any) => T;
export const optionalExcute = <T, U>(
  proc1: ProcWithReturn<T>,
  proc2: ProcWithReturn<U>
) => {
  return (condition: boolean) => {
    return (arg?: any) => {
      if (condition) {
        return proc1(arg);
      }
      return proc2(arg);
    };
  };
};
