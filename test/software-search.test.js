const search = require("../javascripts/software-search");

test("matches a single result", () => {
  const index = search.buildIndex([
    {
      "Standard Name": "GitHub",
      Description: "foo bar",
    },
  ]);

  const results = search.getResults("github", index);
  expect(results.length).toBe(1);
});

test("fuzzy matches", () => {
  const index = search.buildIndex([
    {
      "Standard Name": "GitHub",
      Description: "foo bar",
    },
  ]);

  const results = search.getResults("githb", index);
  expect(results.length).toBe(1);
});

test("matches a word within the name", () => {
  const index = search.buildIndex([
    {
      "Standard Name": "Microsft Office",
      Description: "foo bar",
    },
  ]);

  const results = search.getResults("office", index);
  expect(results.length).toBe(1);
});

test("matches a partial word", () => {
  const index = search.buildIndex([
    {
      "Standard Name": "GitHub",
      Description: "foo bar",
    },
  ]);

  const results = search.getResults("git", index);
  expect(results.length).toBe(1);
});

test("matches multiple partial words", () => {
  const index = search.buildIndex([
    {
      "Standard Name": "GitHub Desktop",
      Description: "foo bar",
    },
  ]);

  const results = search.getResults("git desk", index);
  expect(results.length).toBe(1);
});

test("results are in descending order", () => {
  const index = search.buildIndex([
    {
      "Standard Name": "something something Git",
      Description: "foo bar",
    },
    {
      "Standard Name": "something something",
      Description: "This one is also Git.",
    },
  ]);

  const results = search.getResults("git", index);
  expect(results.length).toBe(2);
  expect(results[0].score).toBeGreaterThan(results[1].score);
});

test("matches a single word within the name", () => {
  const index = search.buildIndex([
    {
      "Standard Name": "something something Git",
      Description: "foo bar",
    },
    {
      "Standard Name": "something something",
      Description: "This one is also Git.",
    },
  ]);

  const results = search.getResults("git", index);
  expect(results[0].ref).toBe("something something Git");
});
