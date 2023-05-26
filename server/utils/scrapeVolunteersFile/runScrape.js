import ScrapeVolunteersFile from "./scrapeFile.js";


(async () => {
    const FILE_PATH = process.argv[2] || "";
    try {
        if(!FILE_PATH) throw new Error("A file path must be provided..")
        const scraper = new ScrapeVolunteersFile(FILE_PATH);
        await scraper.createSchema();
        await scraper.createTable();
        await scraper.populateDb();
    } catch (error) {
        console.log(`failed to populate data: ${error}`);
    }
})();