const functions = require('firebase-functions');

const gcconfig = {
  projectId: 'football-25167',
  keyFilename: 'football-25167-firebase-adminsdk-qkkdm-11a4d268ad.json',
};
// const gcloud = require("@google-cloud");

// const gcs = gcloud.storage(gcconfig);

const { Storage } = require('@google-cloud/storage');
const storage = new Storage(gcconfig);

const os = require('os');
const path = require('path');
const spawn = require('child_process').spawn;
const cors = require('cors')({ origin: true });
const Busboy = require('busboy');
const fs = require('fs');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

//  reacts on storage events

exports.onFileChange = functions.storage.object().onFinalize((event) => {
  console.log(event);
  const bucket = event.bucket;
  const contentType = event.contentType;
  const filePath = event.name;
  console.log('File change detected, function execution started');

  if (path.basename(filePath).startsWith('resized-')) {
    console.log('we already renamed that file!');
    return;
  }

  const destBucket = storage.bucket(bucket);
  const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
  const metadata = { contentType };

  return destBucket
    .file(filePath)
    .download({
      destination: tmpFilePath,
    })
    .then(() => {
      return spawn('convert', [tmpFilePath, '-resize', '500x500', tmpFilePath]);
    })
    .then(() => {
      return destBucket.upload(tmpFilePath, {
        destination: 'resized-' + path.basename(filePath),
        metadata: metadata,
      });
    });
});

exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(500).json({
        message: 'Not Allowed',
      });
    }

    const busboy = new Busboy({ headers: req.headers });
    let uploadData = null;
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on('finish', () => {
      const bucket = storage.bucket('football-25167.appspot.com');
      bucket
        .upload(uploadData.file, {
          uploadType: 'media',
          metadata: {
            metadata: {
              contentType: uploadData.type,
            },
          },
        })
        .then(() => {
          res.status(200).json({
            message: 'It worked!!!',
          });
        })
        .catch((err) => {
          console.log('........... jo', err);
          if (err) {
            return res.status(500).json({
              error: err,
            });
          }
        });
    });
    busboy.end(req.rawBody);
  });
});
