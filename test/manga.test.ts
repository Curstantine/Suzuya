import { Suzuya } from "../src";

async function testManga(suzu: Suzuya) {
  try {
    const listManga = await suzu.manga.listManga({
      "contentRating[]": ["safe", "suggestive", "erotica", "pornographic"],
      "status[]": ["ongoing", "completed"],
      limit: 10,
      order: {
        year: "asc",
        createdAt: "desc",
      },
    });

    console.log(listManga);
  } catch (error) {
    return console.error(error);
  }
}

export default testManga;
