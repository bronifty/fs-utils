import { downloadAndExtract } from '../src/download-extract';

const url =
  'https://nodejs.org/download/nightly/v23.0.0-nightly202407272d1b4a8cf7/node-v23.0.0-nightly202407272d1b4a8cf7-linux-x64.tar.gz';
downloadAndExtract(url);
import { promises as fs } from 'fs';
import path from 'path';

const filename = url.split('/').pop();
const folder: string | undefined = filename?.replace('.tar.gz', '');

if (filename) {
  const filePath = path.join(__dirname, filename);
  const folderPath = path.join(__dirname, folder);

  // Clean up: remove the downloaded file and extracted folder
  fs.unlink(filePath)
    .then(() => console.log(`Cleaned up file: ${filePath}`))
    .catch(error =>
      console.error(`Error cleaning up file: ${filePath}`, error),
    );

  fs.rmdir(folderPath, { recursive: true })
    .then(() => console.log(`Cleaned up folder: ${folderPath}`))
    .catch(error =>
      console.error(`Error cleaning up folder: ${folderPath}`, error),
    );
}
