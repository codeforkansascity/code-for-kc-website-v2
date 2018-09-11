/* From http://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/ */

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}


// Get Google Spreadsheet data

// https://docs.google.com/spreadsheets/d/1IFbDEk5cRKP3WuQX7gMl6XDxLYuVZ4eeq0XRluxqmEQ/edit#gid=669009687
//                                        \________________________  _______________/
//                                                                 \/
//                                                                key passed to tabletop
//                                                                to identify the spread sheet
//  NOTE:  You have to publish the spread sheet from
//         the File menu of the spread sheet.

// Please note that the column names in this spread sheet were defined by the Google Form that inserts data into it.

// http://cors.io/?u=https://docs.google.com/a/codeforkc.org/spreadsheets/d/1qQcHRsaWeekCIg-4jPRjXMy-MX1oT4-VmkgfPiRgOp0/edit?usp=sharing
Tabletop.init({                                             // Requires js/tabletop.js
    debug: false,

    key: '1sVK8tgfTFPhUOpsgiGhb71hWJ26XIhiYIlg8XrGlQyI', // Projects List

    simpleSheet: false,
    wanted: ['Project Information'],
    orderby: 'Type of Entity',

    callback: function (data, tabletop) {
        var converter = new showdown.Converter();
        var worksheetRows = tabletop.sheets("Project Information").all();
        for (var i in worksheetRows) {
            var worksheetRow = worksheetRows[i];

            if ( worksheetRow['HomePage'] != 'Y' ) continue;

            var row = '';
            
            
            row += ' <div class="inner">';
            row +- '    <div id="float"';
            row += '    <ul class="features">';
            row += '        <li class="fit major">';
            row += '            <h3>' + worksheetRow["Title"] + '</h3>';
            row += '            <p>' + converter.makeHtml(worksheetRow['Card-Description']) + '</p>';
            row += '            <p>'

            if ( worksheetRow['Site']) {
                row += '<a href="' + worksheetRow['Site']+ '" target="_blank">Visit Web Site</a>';
            }
            if ( worksheetRow['GitHub']) {
                row += ' <a href="' + worksheetRow['GitHub']+ '" target="_blank">See Code/GitHub</a>';
            }
            if ( worksheetRow['Slack ID']) {
                row += '<br /> Slack: ' + worksheetRow['Slack ID'];
            }
            if ( worksheetRow['Languages']) {
                row += '&nbsp;&nbsp;&nbsp;&nbsp; Languages: ' + worksheetRow['Languages'];
            }

            row += '            </p>';
            row += '        </li>';
            row += '    </ul>';
            row +- '    </div>'
            row += '</div>';
            




            console.dir('Data: %o; HTML: %o', worksheetRow, row);

            $('#projects').append(row);


        }
    }
});


