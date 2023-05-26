# Scrape and save the volunteers file

## Description:
This utility receives a path to the volunteer file.  
It then parses only the relevant sheet ("רשימת מתנדבים")  
to a json object.  
It then connects to a postgressql db  
running localy on Docker.  
It creates a Schema, tanle and populates the table  
with the records from the Json file

## usage

Call the script with the following command:
```bash
node .\\runScrape.js <PATH_TO_FILE>
```