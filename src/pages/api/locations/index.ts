import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { transpileModule } from "typescript";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name, address, companyId } = req.body;
    const isValid = name && address && companyId;
    if (!isValid) return res.status(400).send("Bad Request");
    const newLocation = await prisma.locations.create({
      data: {
        name,
        address,
        companyId,
      },
    });
    return res.status(200).send(newLocation);
  } else if (method === "PUT") {
    const { id, name, address } = req.body;
    const isValid = id && name && address;
    if (!isValid) return res.status(400).send("Bad Request");
    const updatedLocation = await prisma.locations.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        address,
      },
    });
    return res.status(200).send(updatedLocation);
  } else if (method === "DELETE") {
    const locationId = req.query.id;
    if (!locationId) return res.status(400).send("Bad Request");
    await prisma.locations.update({
      where: {
        id: Number(locationId),
      },
      data: {
        isArchived: true,
      },
    });
    return res.send(200);
  }
  res.status(405).send("Method not allowed");
}
