//import fs module
const fs = require("fs");
// Read 'db.json' file 
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
//routing
module.exports = function (app) {
    //routes http get request to a path specified by call function
    app.get("/api/notes", function (req, res) {
        // Send read data to response of 'GET' request   
        res.json(data);

    });
    //api get request
    app.get("/api/notes/:id", function (req, res) {

        res.json(data[Number(req.params.id)]);

    });

    //api post request
    app.post("/api/notes", function (req, res) {
        // Extracted new note from request body. 
        let newNote = req.body;
        // Assigned unique id obtained from 'uuid' package
        let uniqueId = (data.length).toString();
        console.log(uniqueId);
        newNote.id = uniqueId;
        // Pushed new note in notes file 'db.json'
        data.push(newNote);
        // Written notes data to 'db.json' file
        fs.writeFileSync("./db/db.json", JSON.stringify(data), function (err) {
            if (err) throw (err);
        });
        //send response 
        res.json(data);

    });

    // API DELETE request

    app.delete("/api/notes/:id", function (req, res) {
        // Fetched id to delete
        let noteId = req.params.id;
        let newId = 0;
        console.log(`Deleting note with id ${noteId}`);
        // filter data to get notes except the one to delete
        data = data.filter(currentNote => {
            return currentNote.id != noteId;
        });
        for (currentNote of data) {
            currentNote.id = newId.toString();
            newId++;
        }
        // Write new data to 'db.json' file
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        // send response
        res.json(data);
    });

}