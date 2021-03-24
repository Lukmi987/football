const functions = require("firebase-functions");
const {Storage} = require("@google-cloud/storage");
const storage = new Storage();
const os = require("os");
const path = require("path");
const spawn =require("child-process-promise");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.onFileChange = functions.storage.object().onFinalize( (event) => {
  console.log(event);
  const bucket = event.bucket;
  const contentType = event.contentType;
  const filePath = event.name;
  console.log("File change detected, function execution started");

  if (path.basename(filePath).startsWith("resized-")) {
    console.log("we already renamed that file!");
    return;
  }

  const destBucket = storage.bucket(bucket);
  const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
  const metadata = {contentType};

  return destBucket.file(filePath).download({
    destination: tmpFilePath,
  }).then(() => {
    return spawn("convert",
        [tmpFilePath, "-resize", "500x500", tmpFilePath]);
  }).then( () => {
    return destBucket.upload(tmpFilePath,
        {destination: "resized-" + path.basename(filePath),
          metadata: metadata});
  });
});
