export { downloadAndExtract };
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

async function downloadAndExtract(url: string) {
  const filename = url.split('/').pop();
  const folder = filename?.replace('.tar.gz', '');

  try {
    // Download the file
    console.log('Downloading...');
    await execAsync(`curl -L -o ${filename} ${url}`);

    // Check if file exists and has content
    const stats = await fs.stat(filename);
    if (stats.size === 0) {
      throw new Error('Downloaded file is empty');
    }

    // Extract the file
    console.log('Extracting...');
    await execAsync(`tar -xzvf ${filename}`);

    console.log(`File downloaded and extracted to folder: ${folder}`);
  } catch (error) {
    console.error('Error:', error);
  }
}
