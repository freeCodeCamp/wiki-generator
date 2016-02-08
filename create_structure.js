/*
Automate converting the raw "wiki" into the proper hierarchy -- node script
- Readin in the file list
- Create top-level folders based on file name (Assume flat structure)
- Copy the files into their folders as index.md
-- All in "Pages"
*/

var mkdirp = require('mkdirp');
var fs = require('fs');

// Get File list
fs.readdir('./wiki-master', function(err, files) {
  if(err) throw err;
  
  // List all of the *.lang folders for later
  var folderList = files.filter(file => {
    return /\w{2}\.lang/.test(file);
  });
  
  // Get English/Top Level files
  var fileList = files.filter(function(file) {
    return (/\.md$/.test(file) && !/^_|\w{2}\.lang|Home\.md/.test(file));
  }).map(function(file) {
    // Make directories/filenames
    var filename = file;
    var dir = 'en/' + file.replace('.md', '');
    return { filename: filename, dir: dir};
  });
  
  // Get non-english files
  var extra = folderList.reduce((thisList, subFolder) => {
    var langDir = subFolder.match(/^\w{2}/)[0] + '/',
        langFiles = fs.readdirSync('./wiki-master/' + subFolder);
    return thisList.concat(langFiles.filter(function(file) {
      return (/\.md$/.test(file) && !/^_|\w{2}\.lang|Home\.md/.test(file));
    }).map(function(file) {
      // Make directories/filenames
      var filename = subFolder + '/' + file;
      var dir = langDir + file.replace('.md', '');
      return { filename: filename, dir: dir};
    }));
  },[]);
  
  //  [ [ stuff] ]
  //  [ stuff ]
  
  console.log('extra', extra);  
  
  fileList = fileList.concat(extra);
  
  createFolders(fileList);
});

function createFolders(fileList) {
  fileList.forEach(function(fileobj) {
    // Create directory
    console.log(fileobj.dir);
    mkdirp('./pages/' + fileobj.dir, function(err) {
      if(err) throw err;
      // Copy File
      var newFileName = './pages/'+fileobj.dir+"/index.md";
      fs.createReadStream('./wiki-master/' + fileobj.filename).pipe(fs.createWriteStream(newFileName));
    });
  });  
}
