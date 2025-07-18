module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "output"
    },
    htmlTemplateEngine: "njk"
  };
};
