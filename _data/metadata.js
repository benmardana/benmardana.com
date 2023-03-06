module.exports = {
  title: "ben mcgarvey",
  url:
    process.env.ELEVENTY_RUN_MODE === "build"
      ? "https://benmcgarvey.com/"
      : "http://localhost:8080",
  language: "en",
  description: "benmcgarvey.com",
  author: {
    name: "ben mcgarvey",
    email: "b.mcgarvey.bm@gmail.com",
    url:
      process.env.ELEVENTY_RUN_MODE === "build"
        ? "https://benmcgarvey.com/"
        : "http://localhost:8080",
  },
};
