const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

/*
DEFINE THESE PARAMETERS BEFORE RUNNING
*/
const sourceUri = process.env.DEV_DB;

// make sure this target db is backed up first!
const targetUri = process.env.STAGING_DB;

/*
 *
 */

const dumpDir = path.join(__dirname, 'dump');

const getDirAtEnd = (connectionString) => {
  const lastIndex = connectionString.lastIndexOf('/');
  return connectionString.substring(lastIndex + 1);
};

const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(new Error(`Command failed: ${stderr}`));
      } else {
        console.log('err: ', err);
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
        resolve(stdout);
      }
    });
  });
};

const restoreDatabase = async () => {
  if (!sourceUri || !targetUri) {
    console.error('Source or Target MongoDB URI is not set in environment variables.');
    process.exit(1);
  }

  // Ensure the dump directory exists
  if (!fs.existsSync(dumpDir)) {
    fs.mkdirSync(dumpDir);
  } else {
    fs.rmSync(dumpDir, { recursive: true, force: true });
    fs.mkdirSync(dumpDir);
  }

  const directoryAtEnd = getDirAtEnd(sourceUri);

  try {
    console.log('Dumping source database...');
    await runCommand(`mongodump --uri="${sourceUri}" --out="${dumpDir}" --gzip --forceTableScan`);
    console.log('Source database dumped successfully.');
    console.log('Restoring to target database...');
    await runCommand(
      `mongorestore --uri="${targetUri}" --nsInclude="${targetUri}.*" --drop --gzip "${dumpDir}/${directoryAtEnd}"`
    );

    console.log('Target database restored successfully.');
  } catch (error) {
    console.error('Error during backup and restore:', error);
  } finally {
    // Clean up dump directory
    fs.rmSync(dumpDir, { recursive: true, force: true });
    console.log('Cleaned up dump directory.');
  }
};

restoreDatabase().catch((err) => {
  console.error('Error restoring database:', err);
  process.exit(1);
});
