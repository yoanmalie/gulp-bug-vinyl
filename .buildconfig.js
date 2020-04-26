// Environments flags
const options = {
  isDevelopment:
    process.argv.includes("--development") ||
    process.env.NODE_ENV === "development",
  isProduction:
    process.argv.includes("--production") ||
    process.env.NODE_ENV === "production",
};

// Error Handler
const errorHandler = (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log("Error: ", err.toString());
  }
};

// Paths configurations
const paths = {
  source: "./src",
  public: "./public",
  assets: "/assets",
};

const css = {
  src: `${paths.source + paths.assets}/css`,
  dest: `${paths.public + paths.assets}/css`,
  entry: "/styles",
  extensions: "scss",
};

// Make things available for tasks files
export { options, errorHandler, paths, css };
