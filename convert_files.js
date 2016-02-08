var fs = require('fs-extra');
var incomingLink = /github\.com\/freecodecamp\/freecodecamp\/wiki/gi;
var outgoingLink = 'freecodecamp.com/wiki';

// Get Folder List
var langFolders = fs.readdirSync('./pages/');

langFolders.filter(langFolder => {
  return /^\w{2}$/.test(langFolder);
}).forEach(langFolder => {
  // Get File list
  fs.readdir('./pages/' + langFolder + '/', function (err, folders) {
    if (err) throw err;
    var fileList = folders.filter(function (folder) {
      // Ignore Hidden Folders and template files
      return !/^\.|^_/.test(folder);
    }).map(function (folder) {
      // Make directories/filenames
      if (/index\.md/.test(folder)) {
        return {
          isHome: true,
          filename: `index.md`,
          title: "Welcome to the Free Code Camp Wiki"
        };
      } else {
        return {
          isHome: false,
          filename: folder + '/index.md',
          title: folder.replace(/-/g, ' ').replace('.md', '')
        };
      }
    });

    // Modify each index.md file
    //  * Add Headers
    //  * Update Links
    fileList.forEach(function (fileObj) {
      var newFileName = './pages/' + langFolder + '/' + fileObj.filename;

      // Read existing contents into data
      var data = fs.readFileSync(newFileName, 'utf-8');

      // Update Links
      data = data.replace(incomingLink, outgoingLink)
        .replace(/\.\/images/gi, '../images');  // Update image links to be relative
      var newData = new Buffer(data);

      // Make the "Home" file display at the top
      var order = (fileObj.isHome) ? 0 : 5;

      // Create Header
      var header = `---\ntitle: ${fileObj.title}\norder: ${order}\n---\n`;
      var buffer = new Buffer(header);

      // Output File
      var fd = fs.openSync(newFileName, 'w+');
      fs.writeSync(fd, buffer, 0, buffer.length); // Write header
      fs.writeSync(fd, newData, 0, newData.length); // Append remaining data
      fs.close(fd);
    });
  });
});