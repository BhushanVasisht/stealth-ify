const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const data = []

exports.getLoc = (req, res) => {

    if(data.length == 0)
    {
        fs.createReadStream(path.resolve(__dirname, 'covid_data.csv'))
            .pipe(csv.parse({ headers: true }))
            .on('error', error => console.error(error))
            .on('data', row => data.push({'lat' : row.Lat, 'lng' : row.Long_, 'Total' : row.Total}))
            .on('end', rowCount => {return res.json({data : data})})
    }
    else
    {
        return res.json({data : data})
    }
}
