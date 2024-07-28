import aws, { S3 } from 'aws-sdk';
import { promisify } from 'util';
import crypto from 'crypto';
class AwsS3 {
  s3;
  fileUpload;
  buffer;
  path;
  constructor(fileUpload: any, path: string = '', buffer: any = false) {
    const config = {
      region: process.env.NEXT_PUBLIC_REGION,
      accessKeyId: process.env.NEXT_PUBLIC_ACC_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET,
      signatureVersion: process.env.NEXT_PUBLIC_BUCKET_SIGNATURE_VERSION,
    };

    this.fileUpload = fileUpload;
    this.s3 = new aws.S3(config);
    this.buffer = buffer;
    this.path = path;
  }
  getS3URL = async () => {
    const randomBytes = promisify(crypto.randomBytes);
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString('hex');
    const params: S3.PutObjectRequest = {
      Body: this.fileUpload,
      Bucket: process.env.NEXT_PUBLIC_BUCKET!,
      Key: `${new Date().getFullYear()}/${this.path}${imageName}-${
        this.fileUpload.name
      }`,
      ContentType: this.fileUpload.type,
      ACL: 'public-read',
    };
    const uploadResult = await this.s3.upload(params).promise();
    return uploadResult.Location;
  };

  uploadS3URL = async () => {
    try {
      const randomBytes = promisify(crypto.randomBytes);
      const rawBytes = await randomBytes(16);
      const imageName = rawBytes.toString('hex');
      const base64Data = this.fileUpload.replace(/^data:image\/\w+;base64,/, '');
      // const fileData = Buffer.from(base64Data, 'base64');
      console.log(this.fileUpload, " ==> filteuploaded")
      const params: S3.PutObjectRequest = {
        Body: Buffer.from(base64Data, 'base64'),
        // Body: fileData,
        Bucket: process.env.NEXT_PUBLIC_BUCKET!,
        Key: `${new Date().getFullYear()}/${this.path}${imageName}-${this.fileUpload.name
          }`,
        ACL: 'public-read', // Set the access control
        ContentType: 'image/png', // Adjust the content type as per your file type
        // ContentType: 'application/pdf' // Set the content type
      };
      const uploadResult: any = await this.s3.upload(params).promise();
      return uploadResult.Location;
    } catch (error) {
      console.log(error, " error uploadS3URL");
    }
  }
  getS3URLWithProgress = async (listener: (_progress: S3.ManagedUpload.Progress) => void) => {
    const randomBytes = promisify(crypto.randomBytes);
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString('hex');
    const params: S3.PutObjectRequest = {
      Body: this.fileUpload,
      Bucket: process.env.NEXT_PUBLIC_BUCKET!,
      Key: `${new Date().getFullYear()}/${this.path}${imageName}-${
        this.fileUpload.name
      }`,
      ContentType: this.fileUpload.type,
      ACL: 'public-read',
    };
    const managedUpload = this.s3.upload(params);
    managedUpload.on('httpUploadProgress', listener);

    const uploadResult: any = await managedUpload.promise();
    return uploadResult.Location;
  };
}
export default AwsS3;
