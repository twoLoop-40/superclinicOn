type PropertyExtractor = (arg: Record<string, any>) => Record<string, any>;

const combinePropertyExtractors = (extractors: PropertyExtractor[]) => {
  return (obj: Record<string, any>) => {
    return extractors.reduce((acc, extractor) => {
      return { ...acc, ...extractor(obj) };
    }, {});
  };
};

export default combinePropertyExtractors;
