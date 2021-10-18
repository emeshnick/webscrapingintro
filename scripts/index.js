const axios = require("axios");
const cheerio = require("cheerio");

async function main() {
  let totalImg = 0;
  let imgAlt = 0;

  let response = await axios.get("https://en.wikipedia.org/wiki/Penguin");

  let page = response.data;
  let $ = cheerio.load(page, {
    xml: {
      normalizeWhitespace: true,
    },
  });

  $("img").each(function () {
    totalImg++;
    let image = $(this);
    console.log($.html(image) + "\n");
    if (image.attr("alt") || image.attr("alt") === "") {
      imgAlt++;
    }
  });

  console.log(
    `${imgAlt} out of ${totalImg} total images have alternative descriptions`
  );
}

main();
