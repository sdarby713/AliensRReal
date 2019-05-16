// from data.js


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

console.log(tableData);
   
var tbody = d3.select("tbody");
tableData.forEach (function (itemData) {

    var row = tbody.append("tr");
    Object.entries(itemData).forEach(function([key, value])  {
        var cell = row.append("td");
        cell.text(value);
    } );
} );


