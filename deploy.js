const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

var argv = require('minimist')(process.argv);
const folder = argv['dir']?.toString();
const user = argv['usr']?.toString();
const password = argv['pwd']?.toString();
const url = argv['url']?.toString();


if(!(folder && user && password && url)) {
  console.log('Argument `--dir or --usr or --pwd or --url` not found.');
  console.error('Deployment failed!');
  process.exit(1);
}

const config = {
    user: user,
    // Password optional, prompted if none given
    password: password,
    host: url,
    port: 21,
    localRoot: __dirname + `/dist/${folder}`,
    remoteRoot: `/public_html/${folder}/`,
    // include: ["*", "**/*"],      // this would upload everything except dot files
    // include: ["*.php", "dist/*", ".*"],
    include: ["*", "**/*", ".*"],
    // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
    // exclude: [
    //     "dist/**/*.map",
    //     "node_modules/**",
    //     "node_modules/**/.*",
    //     ".git/**",
    // ],
    exclude: [],
    // delete ALL existing files at destination before uploading, if true
    deleteRemote: true,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: true,
    // use sftp or ftp
    sftp: false,
};

ftpDeploy.deploy(config, function (err, res) {
    if (err) console.log(err);
    else console.log("finished:", res);
});
ftpDeploy.on("uploading", function (data) {
    console.log(data.totalFilesCount); // total file count being transferred
    console.log(data.transferredFileCount); // number of files transferred
    console.log(data.filename); // partial path with filename being uploaded
});
ftpDeploy.on("uploaded", function (data) {
    console.log(data); // same data as uploading event
});
ftpDeploy.on("log", function (data) {
    console.log(data); // same data as uploading event
});
ftpDeploy.on("upload-error", function (data) {
    console.log(data.err); // data will also include filename, relativePath, and other goodies
});
