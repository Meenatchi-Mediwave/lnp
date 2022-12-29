require("dotenv").config();

const {
  printHelp,
  insertNovel,
  fetchAllNovels,
  getNovel,
  updateNovel,
  deleteNovel,
} = require("./utils");

async function main() {
  //node cli fetch-all
  // 0    1    2
  const action = process.argv[2];

  switch (action) {
    case "fetch-all":
      const result = await fetchAllNovels();
      console.log(result.rows);
      break;
    case "fetch":
      // node cli fetch 3
      //    0    1   2    3
      const id = process.argv[3];
      if (!id) {
        printHelp();
        process.exit(1);
      }
      const novel = await getNovel(id);
      if (!novel.rows.length) {
        console.log("Novel not found");
        process.exit(1);
      }
      console.log(novel.rows[0]);
      break;
    case "insert":
      // node cli insert "book name"
      // 0     1    2      3
      const novelTitle = process.argv[3];
      if (!novelTitle) {
        printHelp();
        process.exit(1);
      }
      const newNovel = await insertNovel(novelTitle);
      console.log(newNovel);
      break;
    case "update":
      // node cli update id "book name"
      // 0    1   2       3   4
      const novelId = process.argv[3];
      const newNovelTitle = process.argv[4];
      if (!novelId) {
        printHelp();
        process.exit(1);
      }
      const novelFound = await getNovel(novelId);
      if (!novelFound.rows.length) {
        console.log("Novel not found");
        process.exit(1);
      }
      const updatedNovel = await updateNovel(novelId, newNovelTitle);
      console.log("old value: ", novelFound.rows[0]);
      console.log("new value: ", updatedNovel.rows[0]);
      break;
    case "delete":
      //node cli delete id
      //0     1   2       3
      const nid = process.argv[3];
      if (!nid) {
        printHelp();
        process.exit(1);
      }
      const novelToDelete = await getNovel(nid);
      if (!novelToDelete.rows.length) {
        console.log("Novel not found");
        process.exit(1);
      }
      await deleteNovel(nid);
      console.log("Deleted", novelToDelete.rows[0]);
      break;
    default:
      printHelp();
      break;
  }
  process.exit(0);
}
main();
