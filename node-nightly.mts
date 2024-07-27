import { downloadAndExtract, getOsArch } from './src/index';

let osArch = getOsArch();
let response = await fetch('https://nodejs.org/download/nightly/index.json');
let allBuilds = await response.json();
let node_nightly_build = allBuilds[0]; // Explicitly use index 0
let { version } = node_nightly_build;
let node_nightly_url = `https://nodejs.org/download/nightly/${version}/node-${version}-${osArch}.tar.gz`;
console.log(node_nightly_url);
// downloadAndExtract(node_nightly_url);
