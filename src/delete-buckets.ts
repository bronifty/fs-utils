import { listBuckets, emptyBucket, deleteBucket } from '.';

async function deleteBuckets(profile: string = 'default'): Promise<void> {
  const buckets = await listBuckets(profile);
  if (!buckets) return;

  const excludedNames = [
    'bronifty.xyz',
    'www.bronifty.xyz',
    'winglang.bronifty.xyz',
    'cdk-hnb659fds-assets-851725517932-us-east-1',
    'aws-sam-cli-managed-default-samclisourcebucket-cn52sgxeu5ot',
  ];
  for (const bucket of buckets) {
    if (!excludedNames.some(name => bucket.Name.includes(name))) {
      console.log(bucket.Name);
      await emptyBucket(profile, bucket.Name);
      await deleteBucket(profile, bucket.Name);
    }
  }
}

export { deleteBuckets };
// deleteBuckets('default').catch(console.error);

// import { execSync } from 'child_process';

// function deleteBuckets(profileName: string = 'default') {
//   const excludedNames = [
//     'bronifty.xyz',
//     'www.bronifty.xyz',
//     'winglang.bronifty.xyz',
//     'cdk-hnb659fds-assets-851725517932-us-east-1',
//     'aws-sam-cli-managed-default-samclisourcebucket-cn52sgxeu5ot',
//   ];

//   console.log(`Using profile: ${profileName}`);

//   const allBuckets = execSync(
//     `aws s3api list-buckets --query "Buckets[].Name" --output text --profile ${profileName}`,
//   )
//     .toString()
//     .trim()
//     .split(/\s+/);

//   for (const bucket of allBuckets) {
//     if (!excludedNames.includes(bucket)) {
//       try {
//         console.log(`Emptying bucket: ${bucket}`);
//         execSync(
//           `aws s3 rm s3://${bucket} --recursive --profile ${profileName}`,
//         );

//         console.log(`Deleting all versions in bucket: ${bucket}`);
//         const versions = execSync(
//           `aws s3api list-object-versions --bucket ${bucket} --query 'Versions[?VersionId!=\`null\`].{Key:Key,VersionId:VersionId}' --output text --profile ${profileName}`,
//         )
//           .toString()
//           .trim();

//         if (versions) {
//           const versionLines = versions.split('\n');
//           for (const line of versionLines) {
//             const [key, versionId] = line.split('\t');
//             if (key && versionId) {
//               execSync(
//                 `aws s3api delete-object --bucket ${bucket} --key "${key}" --version-id "${versionId}" --profile ${profileName}`,
//               );
//             }
//           }
//         }

//         console.log(`Deleting all delete markers in bucket: ${bucket}`);
//         const deleteMarkers = execSync(
//           `aws s3api list-object-versions --bucket ${bucket} --query 'DeleteMarkers[?VersionId!=\`null\`].{Key:Key,VersionId:VersionId}' --output text --profile ${profileName}`,
//         )
//           .toString()
//           .trim();

//         if (deleteMarkers) {
//           const markerLines = deleteMarkers.split('\n');
//           for (const line of markerLines) {
//             const [key, versionId] = line.split('\t');
//             if (key && versionId) {
//               execSync(
//                 `aws s3api delete-object --bucket ${bucket} --key "${key}" --version-id "${versionId}" --profile ${profileName}`,
//               );
//             }
//           }
//         }

//         console.log(`Deleting bucket: ${bucket}`);
//         execSync(
//           `aws s3api delete-bucket --bucket ${bucket} --profile ${profileName}`,
//         );
//       } catch (error) {
//         console.error(`Error processing bucket ${bucket}:`, error.message);
//       }
//     }
//   }
// }

// // Example usage
// // deleteBuckets('default');

// export { deleteBuckets };
