var mkdirp = require('mkdirp');
var fs = require('fs-extra');
var through2 = require('through2');
var incomingLink = /github\.com\/freecodecamp\/freecodecamp\/wiki/gi;
var outgoingLink = 'freecodecamp.com/wiki';

// Initialize Language folders files to copy
var languageFolders = [{
  inputFile: `./wiki-master/Home.md`,
  outputFile: `./pages/en/index.md`
}, {
  inputFile: `./templates/index.md`,
  outputFile: `./pages/index.md`
}, {
  inputFile: `./templates/lang/_template.jsx`,
  outputFile: `./pages/en/_template.jsx`
}, {
  inputFile: `./templates/_template.jsx`,
  outputFile: `./pages/_template.jsx`
}];

// same logic used on the main site to prepare URLs from titles
// dasherize(str: String) => String
function dasherize(str) {
  return ('' + str)
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace('.md', '')
    .replace(/[^a-z0-9\-\.]/gi, '');
}

function unDasherize(str) {
  return ('' + str)
    .replace(/\-/g, ' ')
    .replace('.md', '')
    .trim();
}

// List of supported languages
var langList = ['en/'];

// Get File list
fs.readdir('./wiki-master', function(err, files) {
  if (err) throw err;

  // List all of the *.lang folders for later
  var folderList = files.filter(file => {
    return /\w{2}\.lang/.test(file);
  });

  // Automatically updates the list of supported languages
  folderList.forEach(file => {
    var lang = /(\w{2})\.lang/.exec(file);
    lang = lang[1]
    langList.push(lang + '/');
  })

  // Get English/Top Level files
  var fileList = files.filter(function(file) {
    return /\.md$/.test(file) && !/^_|\w{2}\.lang/.test(file);
  }).map(function(file) {
    // Make directories/filenames
    if (/Home\.md/i.test(file)) {
      return {
        inputFile: file,
        outputDir: 'en/',
        isHome: true,
        title: 'Welcome to the Free Code Camp Wiki',
        lang: 'en'
      };
    }
    return {
      inputFile: file,
      outputDir: 'en/' + dasherize(file),
      title: unDasherize(file),
      lang: 'en'
    };
  });

  // Get non-english files
  var nonEnglishFileList = folderList.reduce((thisList, langSubFolder) => {
    var lang = langSubFolder.match(/^\w{2}/)[0];
    var langDir = lang + '/';
    var langFiles = fs.readdirSync('./wiki-master/' + langSubFolder);

    // Add this directory to the list of languages
    langList.push(langDir);

    // Regex to use to find Home.md files in any language.
    var homeRegex = /^(([A-Z]{2}-){0,2})Home\.md$/gm;
    var home = homeRegex.exec(langFiles);
    if (home != null) {
      home = home[0];
      languageFolders.push({
        inputFile: `./wiki-master/` + langSubFolder + `/` + home,
        outputFile: `./pages/` + langDir + 'index.md'
      });
    }

    // Setup copies for later
    languageFolders.push({
      inputFile: `./templates/lang/_template.jsx`,
      outputFile: `./pages/` + langDir + '_template.jsx'
    });

    // Append foreign language files to the copy list
    return thisList.concat(
      langFiles.filter(function(file) {
        return (/\.md$/.test(file) && !/^_|\w{2}\.lang/.test(file));
      }).map(function(file) {
        // Make directories/filenames
        if (homeRegex.test(file)) {
          return {
            isHome: true,
            inputFile: file,
            outputDir: langDir,
            lang: lang
          };
        } else {
          return {
            inputFile: langSubFolder + '/' + file,
            outputDir: langDir + dasherize(file),
            title: unDasherize(file),
            lang: lang
          };
        }
      })
    );
  }, []);

  // Create folders and copy *.md files
  createFolders(fileList);
  createFolders(nonEnglishFileList);

  // Copy language templates and templates files to each language
  try {
    languageFolders.forEach(file => {
      fs.copySync(file.inputFile, file.outputFile);
    });
  } catch (err) {
    throw err;
  }

  // Generate _pages.yaml for each language
  langList.forEach(lang => {
    var langDir = './pages/' + lang;

    var output = fs.readdirSync(langDir).filter(file => {
        return fs.statSync(langDir + file).isDirectory() && !/^images$/.test(file);
      })
      .reduce((acc, dir) => {
        return acc + `- "/${lang + dir}/"\n`;
      }, "");

    try {
      fs.outputFileSync(langDir + '_pages.yaml', output);
    } catch (err) {
      throw err;
    }
  });
});

// Create a folder base
function createFolders(fileList) {
  fileList.forEach(function(fileObj) {
    // Create directory
    fs.mkdirsSync('./pages/' + fileObj.outputDir);
    // read file
    fs.createReadStream('./wiki-master/' + fileObj.inputFile)
      .pipe(through2.obj(function(chunk, enc, cb) {
        // convert buffer to string
        var file = chunk.toString();
        // Dirty hack to remove the first line of home
        if (fileObj.isHome) {
          file = file.replace(/^#[^\n]+\n/, '');
        }
        // replace github wiki links with gatsby links
        file = file
          .replace(incomingLink, outgoingLink + '/' + fileObj.lang)
          .replace(/\.\/images/gi, '../images'); // Update image links to be relative
        var order = fileObj.isHome ? 0 : 5;
        var header = `---\ntitle: ${fileObj.title}\norder: ${order}\n---\n`;
        this.push(new Buffer(header + file));
        cb();
      }))
      .pipe(
        fs.createWriteStream('./pages/' + fileObj.outputDir + '/index.md'));
  });
}
