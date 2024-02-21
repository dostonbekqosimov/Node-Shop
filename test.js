// const axios = require('axios');

/*
In the following code we try to get list of all entries from remote url and then based on that make request about each of the 
category starting with 'A'. Finally print the API counts of the category. We are using axios get, which returns a promise. 
*/
const axios = require('axios');

async function connectToURL(url) {
    const resp = await axios.get(url);
    let listOfEntries =
        resp.data.entries;
    let Categories = listOfEntries.map((entry) => {
        return entry.Category
    });
    Categories = [...new Set(Categories)];

    Categories.forEach(async (Category) => {
        if (Category.startsWith("A")) {
            try {
                const resp = await axios({
                    method: 'get',
                    url: "https://api.publicapis.org/entries?Category=" + Category,
                    responseType: 'json'
                })
                console.log(Category + "   " + resp.data.count);
            }
            catch (e) {
                console.log(e);
            }
        }

    });
}
connectToURL('https://api.publicapis.org/entries').catch(err => {
    console.log(err.toString())
});