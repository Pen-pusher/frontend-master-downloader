#!/usr/bin/env node

const mkdirp = require("mkdirp");
const args = require("args");
const chalk = require("chalk");
const crawler = require("./crawler");
const downloader = require("./downloader");

args
  .option("courses", 'names of course ex: "git-in-depth"')
  .option("id", "only one video")
  .option("directory", "directory of destination");

const flags = args.parse(process.argv);
let { courses, directory } = flags;

directory = directory || "DownLoads/";

if (!courses) {
  console.log(chalk.red("You must proide course \n"));
  return;
}

directory = directory + courses;

mkdirp(directory, function(err) {
  if (err) console.error(err);
});

(async () => {
  let links = await crawler(flags);
  console.log("Will start downloading videos");
  downloader(links, directory);
})();
