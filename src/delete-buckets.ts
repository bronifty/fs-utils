import { listBuckets, emptyBucket, deleteBucket } from '.';

async function deleteBuckets(
  profile: string = 'default',
  additionalExcludedNames: string[] = [],
): Promise<void> {
  const buckets = await listBuckets(profile);
  if (!buckets) return;

  const defaultExcludedNames = [
    'bronifty.xyz',
    'www.bronifty.xyz',
    'winglang.bronifty.xyz',
    'cdk-hnb659fds-assets-851725517932-us-east-1',
    'aws-sam-cli-managed-default-samclisourcebucket-cn52sgxeu5ot',
  ];

  const allExcludedNames = [
    ...defaultExcludedNames,
    ...additionalExcludedNames,
  ];

  console.log('Protected buckets:', allExcludedNames.join(', '));

  for (const bucket of buckets) {
    if (!allExcludedNames.some(name => bucket.Name.includes(name))) {
      console.log(`Processing bucket: ${bucket.Name}`);
      try {
        await emptyBucket(profile, bucket.Name);
        await deleteBucket(profile, bucket.Name);
        console.log(`Deleted bucket: ${bucket.Name}`);
      } catch (error) {
        console.error(
          `Error processing bucket ${bucket.Name}:`,
          (error as Error).message,
        );
      }
    }
  }

  console.log('Bucket deletion process completed.');
}

export { deleteBuckets };

// Example usage:
// deleteBuckets('default', ['my-additional-bucket', 'another-protected-bucket']).catch(console.error);

// import { listBuckets, emptyBucket, deleteBucket } from '.';

// async function deleteBuckets(profile: string = 'default'): Promise<void> {
//   const buckets = await listBuckets(profile);
//   if (!buckets) return;

//   const excludedNames = [
//     'bronifty.xyz',
//     'www.bronifty.xyz',
//     'winglang.bronifty.xyz',
//     'cdk-hnb659fds-assets-851725517932-us-east-1',
//     'aws-sam-cli-managed-default-samclisourcebucket-cn52sgxeu5ot',
//   ];
//   for (const bucket of buckets) {
//     if (!excludedNames.some(name => bucket.Name.includes(name))) {
//       console.log(bucket.Name);
//       await emptyBucket(profile, bucket.Name);
//       await deleteBucket(profile, bucket.Name);
//     }
//   }
// }

// export { deleteBuckets };
