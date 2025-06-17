const readline = require('readline');
const { execSync } = require('child_process');
const fsPromise = require('fs').promises;
const fs = require('fs');
const path = require('path');

const argv = require('minimist')(process.argv);
const folder = argv['dir']?.toString();
const user = argv['usr']?.toString();
const password = argv['pwd']?.toString();
const url = argv['url']?.toString();

if(!(folder && user && password && url)) {
  console.log('Argument `--dir or --usr or --pwd or --url` not found.');
  console.error('Automation failed!');
  process.exit(1);
}

// Create an interface for input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

// Main async function
const main = async () => {

  try {
    // Get user input using await
    const name = await prompt('What is your name? ');

    // Print the result
    console.log(`\nHello, ${name}${folder}!`);

    // remove(folder);
    await removeFileOrDir(folder);
    build(folder);
    rename(folder);
    zip(folder);
    deploy(folder);

    // Close the readline interface
    rl.close();
  } catch (e) {
    console.log('\nUnable to propmt', e);
  }

};

// Call the main async function
main();

rl.on("close", () => {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});

// Remove existing folder with same name
// const remove = (dir) => {
//   console.log(path.join(__dirname, `/dist/${dir}`));
//   fs.rm(path.join(__dirname, `/dist/${dir}`), { recursive: true, force: true }, err => {
//     if (err) {
//       throw err;
//     }
//     console.log(`\n${dir} is deleted!`);
//   });
// };

// Remove existing folder with same name
const removeFileOrDir = async (dir) => {
  const filePath = path.join(__dirname, `/dist/${dir}`);
  console.log(filePath);
  try {
    await fsPromise.rm(filePath, { recursive: true, force: true });
    console.log(`${filePath} removed successfully`);
  } catch (err) {
    console.error(`Error removing ${filePath}:`, err);
  }
}

// Build for Deployment
const build = (dir) => {
  execSync(`ng build --base-href='/${dir}/'`, { stdio: 'inherit' });
  console.log('\n Build Successfully Completed!');
};

// Rename folder
const rename = (dir) => {
  console.log(dir);
  try {
    fs.renameSync('dist/applications', `dist/${dir}`);
    console.log(`\nFile Renamed to ! ${dir}`);
  } catch (err) {
    console.error(err);
  }
};

// Zip folder
const zip = (dir) => {
  execSync(`zip-build dist/${dir} dist-zip --template='${dir}-%NAME%-%VERSION%-%TIMESTAMP%.%EXT%'`, { stdio: 'inherit' });
  console.log('\n Zip Process Completed!');
};

// Deploy
const deploy = (dir) => {
  execSync(`node deploy --dir ${dir} --usr username --pwd password --url ftp.someserver.com`, { stdio: 'inherit' });
  console.log('\n Deployment Completed!');
};
