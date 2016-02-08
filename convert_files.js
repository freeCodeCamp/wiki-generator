/*
Automated cleanup / Setup -- node script
-- All in "Pages"
- Add Headers to each file
  - Title, Order (whatever that is)
- ? Automated cleanup of Markdown
IE: ###NoSpace === ### With Space
Regex :   /^(\s+#{1,4})(\S)/ => /$1 $2/
- List of regex to automate
JSON Array/Object
  - Link modification/cleanup
*/

var fs = require('fs');
var incomingLink = /github\.com\/freecodecamp\/freecodecamp\/wiki/gi;
var outgoingLink = 'freecodecamp.com/wiki';

// Get Folder List
var langFolders = fs.readdirSync('./pages/');

langFolders.filter(langFolder => {
  return /^\w{2}$/.test(langFolder);
}).forEach(langFolder => {
  // Get File list
  fs.readdir('./pages/' + langFolder + '/', function(err, folders) {
    if(err) throw err;
    var fileList = folders.filter(function(folder) {
      // Remove stupid hidden folders
      return !/^\.|\.md$|^_/.test(folder);
    }).map(function(folder) {
      // Make directories/filenames
      var filename = folder+'/index.md';
      var title = folder.replace(/-/g, ' ').replace('.md', '');
      return { filename: filename, title: title};
    });
  
    fileList.forEach(function(fileobj) {
      // Create directory
  
      var newFileName = './pages/' + langFolder + '/' +fileobj.filename;
  
      var data = fs.readFileSync(newFileName, 'utf-8'); //read existing contents into data
      var fd = fs.openSync(newFileName, 'w+');
  
      data = data.replace(incomingLink, outgoingLink)
                 .replace(/\.\/images/gi,'../images');  // Update image links to be relative
      var newData = new Buffer(data);
  
      var header = '---\ntitle: ' + fileobj.title + '\norder: 5\n---\n';
      var buffer = new Buffer(header);
  
      fs.writeSync(fd, buffer, 0, buffer.length); //write new data
      fs.writeSync(fd, newData, 0, newData.length); //append old data
      fs.close(fd);
    });
  });
});