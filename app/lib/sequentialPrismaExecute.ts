type PrismaProc<T, R> = (arg?: T) => Promise<R>;

interface Result<R> {
  ok: boolean;
  result?: R;
  error?: any;
}

const chainPrismaOps = <T, R>(
  ...prismaProcs: PrismaProc<any, any>[]
): ((arg?: T) => Promise<Result<R>>) => {
  return async (arg?: T) => {
    let result: any = arg;
    try {
      for (const prismaProc of prismaProcs) {
        result = await prismaProc(result);
      }
      return { ok: true, result: result as R };
    } catch (error) {
      console.log(error);
      return { ok: false, error };
    }
  };
};

export default chainPrismaOps;
