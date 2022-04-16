// enable load css into our inside chrome bundler (because esbuild cannot use fileSystem in broswer)

const escaped = (data: string) =>
  data.replace(/\n/g, "").replace(/"/g, '\\"').replace(/'/g, "\\'");

export default escaped;
