import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

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
  }
  res.status(405).send("Method not allowed");
}
