// generateArticles.js
// const faker = require("faker"); // install with: yarn add faker
import { faker } from "@faker-js/faker";

function generateArticle(id) {
  const title = faker.company.catchPhrase();
  const authors = `${faker.person.findName()} and ${faker.name.findName()}`;
  const abstract = faker.lorem.sentences(3);
  const keywords = faker.lorem.words(5).split(" ");
  const pubDate = faker.date.between("2023-01-01", "2025-09-01");
  const journal = faker.company.companyName() + " Journal";
  const volume = faker.datatype.number({ min: 90, max: 250 }).toString();
  const pages = `${faker.datatype.number({
    min: 1,
    max: 300,
  })}-${faker.datatype.number({ min: 301, max: 600 })}`;
  const doi = `10.${faker.datatype.number({
    min: 1000,
    max: 9999,
  })}/j.${faker.random.alphaNumeric(8)}`;
  const citations = faker.datatype.number({ min: 0, max: 50 });
  const downloads = faker.datatype.number({ min: 50, max: 500 });

  return {
    id: `article-${id}`,
    title,
    authors,
    abstract,
    content: `
      <h2>Introduction</h2>
      <p>${faker.lorem.paragraph()}</p>

      <h2>Methodology</h2>
      <p>${faker.lorem.paragraphs(2)}</p>

      <h2>Results</h2>
      <p>${faker.lorem.paragraphs(2)}</p>

      <h2>Conclusion</h2>
      <p>${faker.lorem.sentence()}</p>
    `,
    keywords,
    publicationDate: pubDate.toISOString().split("T")[0],
    journal,
    volume,
    pages,
    doi,
    citations,
    downloads,
  };
}

function generateArticles(n = 150) {
  return Array.from({ length: n }, (_, i) => generateArticle(i + 1));
}

export const fakeArticles = generateArticles(150);
console.log(JSON.stringify(fakeArticles, null, 2));
