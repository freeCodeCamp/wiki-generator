var mkdirp = require('mkdirp');
var fs = require('fs-extra');

// Initialize Language folders files to copy
var languageFolders = [
  {
    inputFile: `./wiki-master/Home.md`,
    outputFile: `./pages/en/index.md`
  },
  {
    inputFile: `./templates/index.md`,
    outputFile: `./pages/index.md`
  },
  {
    inputFile: `./templates/lang/_template.jsx`,
    outputFile: `./pages/en/_template.jsx`
  },
  {
    inputFile: `./templates/_template.jsx`,
    outputFile: `./pages/_template.jsx`
  }
];

// Get File list
fs.readdir('./wiki-master', function (err, files) {
  if (err) throw err;

  // List all of the *.lang folders for later
  var folderList = files.filter(file => {
    return /\w{2}\.lang/.test(file);
  });

  // Get English/Top Level files
  var fileList = files.filter(function (file) {
    return (/\.md$/.test(file) && !/^_|\w{2}\.lang/.test(file));
  }).map(function (file) {
    // Make directories/filenames
    if (/Home\.md/i.test(file)) {
      return {
        inputFile: file,
        outputDir: 'en/'
      };
    } else {
      return {
        inputFile: file,
        outputDir: 'en/' + file.replace('.md', '')
      };
    }
  });

  // Get non-english files
  var extra = folderList.reduce((thisList, langSubFolder) => {
    var langDir = langSubFolder.match(/^\w{2}/)[0] + '/',
      langFiles = fs.readdirSync('./wiki-master/' + langSubFolder);

    // Setup copies for later
    languageFolders.push({
      inputFile: `./wiki-master/` + langSubFolder + `/Home.md`,
      outputFile: `./pages/` + langDir + 'index.md'
    });
    languageFolders.push({
      inputFile: `./templates/lang/_template.jsx`,
      outputFile: `./pages/` + langDir + '_template.jsx'
    });

    // Append foreign language files to the copy list
    return thisList.concat(
      langFiles.filter(function (file) {
        return (/\.md$/.test(file) && !/^_|\w{2}\.lang/.test(file));
      }).map(function (file) {
        // Make directories/filenames
        if (/Home\.md/i.test(file)) {
          return {
            inputFile: file,
            outputDir: langDir
          };
        } else {
          return {
            inputFile: langSubFolder + '/' + file,
            outputDir: langDir + file.replace('.md', '')
          };
        }
      })
    );
  }, []);

  // Create folders and copy *.md files
  createFolders(fileList);

  // Copy language templates and templates files to each language
  try {
    languageFolders.forEach(file => {
      fs.copySync(file.inputFile, file.outputFile);
    });
  } catch (err) {
    throw err;
  }
});

// Create a folder base
function createFolders(fileList) {
  fileList.forEach(function (fileobj) {
    try {
      // Create directory
      fs.mkdirsSync('./pages/' + fileobj.outputDir);

      // Copy File
      fs.copySync('./wiki-master/' + fileobj.inputFile,
        './pages/' + fileobj.outputDir + '/index.md');
    } catch (err) {
      throw err;
    }
  });
}
