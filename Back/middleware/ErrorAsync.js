export const catchAsyncErrors = (theFunction) => (req, res, next) => {
    Promise.resolve(theFunction(req, res, next))
      .catch((error) => {
        console.error('Async error caught:', error);
        next(error instanceof Error ? error : new Error(error));
      });
  };