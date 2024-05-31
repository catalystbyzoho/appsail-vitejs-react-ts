const Fs = require('fs');
const Path = require('path');
const { promisify } = require('util');

const readdir = promisify(Fs.readdir);
const stat = promisify(Fs.stat);
const copyFile = promisify(Fs.copyFile);
const mkdir = promisify(Fs.mkdir);
const unlink = promisify(Fs.unlink);
const rmdir = promisify(Fs.rmdir);

if (process.argv.length < 4) {
  console.error('Usage: node copyAndDelete.js [-c|-d] <sourcePath> <destinationPath>');
  process.exit(1);
}
const operation = process.argv[2];
if (operation !== '-c' && operation !== '-d') {
  console.error('Invalid operation. Use -c for copy or -d for delete.');
  process.exit(1);
}

if (operation === '-c') {
const sourcePath = Path.resolve(process.argv[3]);
const destinationPath = Path.resolve(process.argv[4]);
  copyFolders(sourcePath, destinationPath)
    .then(() => {
      console.log('Copy completed successfully.');
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
} else if (operation === '-d') {
  const sourcePath = Path.resolve(process.argv[3]);
  deleteFolder(sourcePath)
    .then(() => {
      console.log('Delete completed successfully.');
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
}

async function copyFolders(source, destination) {
  try {
    await mkdir(destination, { recursive: true });
    const files = await readdir(source);
    for (const file of files) {
      const sourceFilePath = Path.join(source, file);
      const destFilePath = Path.join(destination, file);
      const fileStat = await stat(sourceFilePath);

      if (fileStat.isDirectory()) {
        await copyFolders(sourceFilePath, destFilePath);
      } else {
        await copyFile(sourceFilePath, destFilePath);
      }
    }
  } catch (err) {
    throw err;
  }
}

async function deleteFolder(destinationPath) {
  try {
    const files = await readdir(destinationPath);

    for (const file of files) {
      const filePath = Path.join(destinationPath, file);
      const fileStat = await stat(filePath);
      if (fileStat.isDirectory()) {
        await deleteFolder(filePath);
      } else {
        await unlink(filePath);
      }
    }
    await rmdir(destinationPath);
  } catch (err) {
    throw err;
  }
}