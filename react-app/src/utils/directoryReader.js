/* eslint-disable no-await-in-loop */
// Wrap readEntries in a promise to make working with readEntries easier
async function readEntriesPromise(directoryReader) {
  try {
    return await new Promise((resolve, reject) => {
      directoryReader.readEntries(resolve, reject);
    });
  } catch (err) {
    console.log(err);
  }
}
// Get all the entries (files or sub-directories) in a directory by calling
// readEntries until it returns empty array
async function readAllDirectoryEntries(directoryReader) {
  const entries = [];
  let readEntries = await readEntriesPromise(directoryReader);
  while (readEntries.length > 0) {
    entries.push(...readEntries);
    readEntries = await readEntriesPromise(directoryReader);
  }
  return entries;
}

// Drop handler function to get all files
async function getAllFileEntries(dataTransferItemList, currentDir = '') {
  const queue = Object.values(dataTransferItemList).map((item) => item.webkitGetAsEntry());
  const fileEntries = [];
  while (queue.length > 0) {
    const entry = queue.shift();
    if (entry.isFile) {
      const file = await new Promise((resolve, reject) => entry.file(
        (fileData) => {
          const fileInfo = {};
          fileInfo.fullPath = entry.fullPath;
          fileInfo.parentDir = currentDir;
          return resolve({ fileData, fileInfo });
        },
        () => reject(),
      ));
      fileEntries.push(file);
    } else if (entry.isDirectory) {
      const reader = entry.createReader();
      queue.push(...await readAllDirectoryEntries(reader));
    }
  }
  console.log(fileEntries.length);
  return fileEntries;
}

export default getAllFileEntries;
