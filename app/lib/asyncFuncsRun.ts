type AsyncFunctionChain<T = any> = ((arg?: T) => Promise<T>)[];

export const executeAsyncChain = (fns: AsyncFunctionChain) => {
  return async (initialValue?: any) => {
    let result: any = initialValue;
    for (const fn of fns) {
      try {
        result = await fn(result);
      } catch (err) {
        console.error(err);
        throw err; // 오류를 던져 호출자가 처리할 수 있게 합니다.
      }
    }
    return result;
  };
};
