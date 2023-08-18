import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { name, price, addonCategoryId } = req.body;
    const isValid = name && addonCategoryId;
    if (!isValid) return res.status(400).send("Bad Request");
    const addonPrice = price ? price : 0;
    const createdAddon = await prisma.addons.create({
      data: {
        name,
        price: addonPrice,
        addonCategoryId,
      },
    });
    return res.status(200).send(createdAddon);
  }
  res.status(405).send("Method not allowed");
}
