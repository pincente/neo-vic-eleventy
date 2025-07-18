module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  // ✅ Add custom filter to get the current year
  eleventyConfig.addNunjucksFilter("currentYear", function() {
    return new Date().getFullYear();
  });

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
