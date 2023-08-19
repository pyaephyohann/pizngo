import { getQrCodeUrl } from "@/utils/client";
import { prisma, qrCodeImageUpload } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name, locationId } = req.body;
    const isValid = name && locationId;
    if (!isValid) return res.status(400).send("Bad Request");
    const createdTable = await prisma.tables.create({
      data: {
        name,
        locationId: Number(locationId),
      },
    });
    await qrCodeImageUpload(Number(locationId), createdTable.id);
    const qrCodeUrl = getQrCodeUrl(Number(locationId), createdTable.id);
    await prisma.tables.update({
      where: {
        id: createdTable.id,
      },
      data: {
        assetUrl: qrCodeUrl,
      },
    });
    return res.status(200).send(createdTable);
  } else if (method === "PUT") {
    const { id, name } = req.body;
    const isValid = id;
    if (!isValid) return res.status(400).send("Bad Request");
    let updatedTable = {};
    if (name) {
      updatedTable = await prisma.tables.update({
        where: { id },
        data: { name },
      });
    }
    return res.status(200).send(updatedTable);
  }
  res.status(405).send("Method not allowed");
}
