import { prisma } from "@/utils/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "PUT") {
    const { menuId, orderId, status } = req.body;
    const isValid = menuId && orderId && status;
    if (!isValid) return res.status(400).send("Bad Request");
    await prisma.orderlines.updateMany({
      where: { orderId, menuId },
      data: { status },
    });
    return res.status(200).send("ok");
  }
  res.status(405).send("Method not allowed");
}
