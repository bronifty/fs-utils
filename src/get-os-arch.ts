import os from 'os';

function getOsArch() {
  const platform = os.platform();
  const arch = os.arch();

  switch (platform) {
    case 'aix':
      return 'aix-ppc64';
    case 'linux':
      if (arch === 'arm64') return 'linux-arm64';
      if (arch === 'ppc64' && os.endianness() === 'LE') return 'linux-ppc64le';
      if (arch === 's390x') return 'linux-s390x';
      return 'linux-x64'; // default for other Linux architectures
    case 'darwin':
      return 'osx-x64-tar';
    case 'win32':
      if (arch === 'arm64') return 'win-arm64-zip';
      return 'win-x64-zip'; // default for Windows x64
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
}

export { getOsArch };
