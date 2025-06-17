const readline = require('readline');
const { execSync } = require('child_process');
const fsPromise = require('fs').promises;
const fs = require('fs');
// const path = require('path');

// const argv = require('minimist')(process.argv);
// const folder = argv['dir']?.toString();
// const user = argv['usr']?.toString();
// const password = argv['pwd']?.toString();
// const url = argv['url']?.toString();

// if(!(folder && user && password && url)) {
//   console.log('Argument `--dir or --usr or --pwd or --url` not found.');
//   console.error('\nAutomation Task failed!');
//   process.exit(1);
// }

// Create an interface for input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// close callback
rl.on('close', () => {
  console.log('\TASK COMPLETED! BYE!! BYE !!!');
  process.exit(0);
});

// Prompt to get user options
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

// Ask the input
const askUser = async (question) => {
  let answer = null;
  try {
    answer = await prompt(question);
    // console.log(answer);
  } catch (e) {
    console.log('\nUnable to propmt', e);
  }
  return answer;
}

// // Main async function
// const main = async () => {

//   try {
//     // Get user input using await
//     const name = await prompt('What is your name? ');

//     // Print the result
//     console.log(`\nHello, ${name}${folder}!`);

//     // remove(folder);
//     await removeFileOrDir(folder);
//     build(folder);
//     rename(folder);
//     zip(folder);
//     deploy(folder);

//     // Close the readline interface
//     rl.close();
//   } catch (e) {
//     console.log('\nUnable to propmt', e);
//   }

//   return '';

// };



// // Call the main async function
// await main();

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
  // const filePath = path.join(__dirname, `/dist/${dir}`);
  const filePath = `dist/${dir}`;
  console.log(`\nSearching and trying to remove "${filePath}"...`);
  try {
    await fsPromise.rm(filePath, { recursive: true, force: true });
    console.log(`"${filePath}" removed successfully.\n`);
  } catch (err) {
    console.error(`Error removing "${filePath}": `, err);
  }
}

// Build for Deployment
const build = (dir) => {
  execSync(`ng build --base-href='/${dir}/'`, { stdio: 'inherit' });
  console.log('Build Successfully Completed!');
};

// Rename folder
const rename = (dir) => {
  const appFolder = 'dist/applications';
  const renameFolder = `dist/${dir}`;
  console.log(`\nDetecting the app folder "${appFolder}".`);
  try {
    console.log(`Renaming the directory...`);
    fs.renameSync(appFolder, renameFolder);
    console.log(`\nApp folder renamed to "${dir}".`);
  } catch (err) {
    console.error(`\nError rnaming "${renameFolder}":`, err);
  }
};

// Zip folder
const zip = (dir) => {
  console.log(`Creating ZIP file ${dir}.zip...\n`);
  execSync(`npx zip-build dist/${dir} dist-zip --template='${dir}-%NAME%-%VERSION%-%TIMESTAMP%.%EXT%'`, { stdio: 'inherit' });
  console.log('\nZIP Process Completed!');
};

// Deploy
const deploy = (dir) => {
  console.log(`Deploying app folder "${dir}" to the remote server...\n`);
  execSync(`node deploy --dir ${dir} --usr username --pwd password --url ftp.someserver.com`, { stdio: 'inherit' });
  console.log('\nDeployment Completed!');
};


// INIT
const init = async () => {
  console.log(`Automation Task Initiated!`, `\nPress Ctrl + C to close the task`);
  await generateBuild();
  rl.close();
}

// BUILD
const generateBuild = async () => {
  dirName = await askUser(`\nEnter the folder name for the build files: `);
  if(dirName) {
    console.log(`You have entered "${dirName}".`);
    if(isyes(await askUser(`\nDo you want to generate build (y/n)? `))) {
      await removeFileOrDir(dirName);
      build();
      rename(dirName);
      await generateZip(dirName);
      await deployApp(dirName);
    }
  } else {
    console.log(`You have entered invalid directory name.`);
    if(isyes(await askUser(`Do you want to retry (y/n)? `))) {
      await retry('generateBuild');
    }
  }
}

const generateZip = async (dirName) => {
  if(dirName) {
    if(isyes(await askUser(`\nDo you want to generate zip file (y/n)? `))) {
      zip(dirName);
    }
  }
}

const deployApp = async (dirName) => {
  if(dirName) {
    if(isyes(await askUser(`\nDo you want to deploy app folder (y/n)? `))) {
      deploy(dirName);
    }
  }
}

// RETRY
const retry = async (processName) => {
  switch(processName) {
    case 'generateBuild':
      await generateBuild();
      break;
    default:
      console.log('Process not available to retry.');
  }
}

// VALIDATE (y/n)
const isyes = (text) => {
  return (text.toLowerCase() === 'y');
}

init();
