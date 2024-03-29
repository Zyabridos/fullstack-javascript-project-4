import { isAbsolute } from './smallUtils.js';
import * as cheerio from 'cheerio';
import axios from 'axios';

const url = 'https://www.w3schools.com';
// const url = 'https://ru.hexlet.io/courses';

const mapping = [
  { tag: 'src', attribute: 'href' },
  { tag: 'script', attribute: 'href' },
  { tag: 'img', attribute: 'src' },
]

async function extractLinks (domain) {
  let links = [];
  axios.get(domain)
    .then((response) => response.data)
    .then((html) => {
        const $ = cheerio.load(html);
        $("link").each(function () {
          let href = $(this).attr('href'); 
          if (href && isAbsolute(href)) {
            links.push(href);
          }
          else if (href && !isAbsolute(href)) {
            href = `${domain}${href}`
            links.push(href);
          }
      });
      // return links;
      console.log(links)
    });
};

extractLinks(url).then((links) => {
  console.log('Extracted links:', links);
});

export default extractLinks;
