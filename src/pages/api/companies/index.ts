import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "PUT") {
    const { id, name, address } = req.body;
    const isValid = id && name && address;
    if (!isValid) return res.status(400).send("Bad Request");
    const updatedCompany = await prisma.companies.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        address,
      },
    });
    return res.status(200).send(updatedCompany);
  }
  res.status(200).json({ name: "John Doe" });
}
