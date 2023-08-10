import { config } from "@/config";
import { S3Client } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import multerS3 from "multer-s3";

export const prisma = new PrismaClient();

const s3Client = new S3Client({
  endpoint: config.spaceEndpoint,
  region: "sgp1",
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceSecretAccessKey,
  },
});

export const fileUpload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "msquarefdc",
    acl: "public-read",
    key: function (request: any, file: any, cb: any) {
      cb(
        null,
        `msquarefdc/batch1/pyaephyohan/${Date.now()}_${file.originalname}`
      );
    },
  }),
}).array("file", 1);
