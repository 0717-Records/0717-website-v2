const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_PRISMA_URL;
const rootDir = path.resolve(__dirname, '..');
const backupDir = path.join(rootDir, 'backups');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupFileName = `backup-${timestamp}.gz`;
const backupFilePath = path.join(backupDir, backupFileName);

const createBackup = async () => {
  if (!uri) {
    console.error('MONGODB_PRISMA_URL is not set in environment variables.');
    process.exit(1);
  }

  // Ensure the backups directory exists
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  const command = `mongodump --uri=${uri} --archive=${backupFilePath} --gzip`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error('Failed to create backup:', err);
      console.error(stderr);
      process.exit(1);
    }

    console.log('Backup created successfully:', backupFilePath);
    console.log(stdout);
  });
};

createBackup().catch((err) => {
  console.error('Error creating backup:', err);
  process.exit(1);
});
