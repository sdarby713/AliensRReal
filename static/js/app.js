// default behavior: get the data and load it into the HTML table
getData();
loadTable(tableData);


// next, set up the select button:
var btn = d3.select("#filter-btn");

btn.on("click", function() {
    d3.event.preventDefault();
    getData();

    var inField = d3.select("#datetime");
    var inDate = inField.property("value");

    if (inDate.includes("/")) {
        var idParts = inDate.split("/");
    }
    else if (inDate.includes("-")) {
        var idParts = inDate.split("-");
    } 
    else {
        console.log(`File date not understood: ${inDate.datetime}`);
    }
    idMonth = parseInt(idParts[0]);
    idDay   = parseInt(idParts[1]);
    idYear  = parseInt(idParts[2]);


    console.log(`button click:  inDate = ${idMonth}, ${idDay}, ${idYear}`);
    tableData = tableData.filter(filterByDate);
    loadTable(tableData);
})

function getData() {
    var specialLine = {
        datetime: "1/28/1996",
        city: "dallas",
        state: "tx",
        country: "us",
        shape: "star",
        durationMinutes: "5 mins.",
        comments: "Cowboys win a superbowl, that's alien!"
    };
    

    tableData = []
    data.forEach (function (itemData, index) {
        if (index === 2) {
            tableData.push(specialLine);
            // those sneaky folks at Aliens-R-Real central wanted to
            // make sure that this special line stays in the data!
        }
        tableData.push(itemData);
    });
}

function loadTable(tData) {
    // create and populate the page table
    var tbody = d3.select("tbody");

    // empty out any contents in the HTML table
    var tbl = document.getElementById("ufo-table");
    for (var i = tbl.rows.length - 1; i > 0; i--)  { tbl.deleteRow(i);}

    tData.forEach (function (itemData) {
        var row = tbody.append("tr");
        Object.entries(itemData).forEach(function([key, value])  {
            var cell = row.append("td");
            cell.text(value);
        } );
    } );
}



// here be the filtering functions
function filterByDate(dataLine) {
    // things could get out of control in a hurry when it comes to
    // date formats.  For now, we will handle dates in format 
    // mm/dd/yyyy, with parts separated by "/" or "-".
    // these can be one or two digit; if a year is < 1000 we'll add 2000 to it

    // console.log("---------");
    // console.log(dataLine.datetime);
    // console.log(`filterByDate:  inDate = ${idMonth}, ${idDay}, ${idYear}`);

    if (dataLine.datetime.includes("/")) {
        var dtParts = dataLine.datetime.split("/");
    }
    else if (dataLine.datetime.includes("-")) {
        var dtParts = dataLine.datetime.split("-");
    } 
    else {
        console.log(`File date not understood: ${dataLine.datetime}`);
    }

    // parse these into integers because we need for 01 === 1
    dtMonth = parseInt(dtParts[0]);
    dtDay   = parseInt(dtParts[1]);
    dtYear  = parseInt(dtParts[2]);

    // 2-digit year defaults to this century
    if (dtYear < 100) {dtYear += 2000};
    if (idYear < 100) {idYear += 2000};

    if ((dtMonth === idMonth) &&
        (dtDay === idDay)  &&
        (dtYear === idYear))  {
            // console.log("TRUE");
            return true;}

    // console.log("false");
    return false;
}

