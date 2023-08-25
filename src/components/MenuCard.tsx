import { Box, Card, Typography } from "@mui/material";
import { Menus } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

interface Props {
  menu: Menus;
  href: string | object;
}

const MenuCard = ({ menu, href }: Props) => {
  return (
    <Link
      style={{ textDecoration: "none", margin: "1.5rem" }}
      key={menu.id}
      href={href}
    >
      <Card sx={{ maxWidth: 250, p: "1rem", position: "relative" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Image
            alt={menu.name}
            src={menu.assetUrl || ""}
            height={150}
            width={180}
            style={{ borderRadius: "0.5rem" }}
          />
        </Box>
        <Box sx={{ mt: "1rem" }}>
          <Typography sx={{ textAlign: "center" }} variant="h6">
            {menu.name}
          </Typography>
          <Typography
            sx={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              bgcolor: "primary.main",
              borderRadius: "5rem",
              p: "0.6rem",
              color: "white",
            }}
          >
            {menu.price} Ks
          </Typography>
        </Box>
      </Card>
    </Link>
  );
};

export default MenuCard;
