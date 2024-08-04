import { deleteBuckets } from '../src/delete-buckets';

// Example usage:
deleteBuckets('default', ['another-protected-bucket']).catch(console.error);
