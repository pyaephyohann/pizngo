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
  } else if (method === "PUT") {
    const { id, name, price, addonCategoryId } = req.body;
    const isValid = id;
    if (!isValid) return res.status(400).send("Bad Request");
    const existingAddon = await prisma.addons.findFirst({
      where: {
        id,
      },
    });
    const existingAddonCategoryId = existingAddon?.addonCategoryId;
    let updatedAddon = {};
    if (name) {
      updatedAddon = await prisma.addons.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
    }
    const newPrice = price ? price : 0;
    updatedAddon = await prisma.addons.update({
      where: { id },
      data: { price: newPrice },
    });
    const newAddonCategoryId = addonCategoryId
      ? addonCategoryId
      : existingAddonCategoryId;
    updatedAddon = await prisma.addons.update({
      where: { id },
      data: {
        addonCategoryId: newAddonCategoryId,
      },
    });
    return res.status(200).send(updatedAddon);
  } else if (method === "DELETE") {
    const addonId = req.query.id;
    const isValid = addonId;
    if (!isValid) return res.status(400).send("Bad Request");
    await prisma.addons.update({
      where: {
        id: Number(addonId),
      },
      data: {
        isArchived: true,
      },
    });
    return res.status(200).send("Ok");
  }
  res.status(405).send("Method not allowed");
}
