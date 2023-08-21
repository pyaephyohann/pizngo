import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getAddonCategoriesByMenuId } from "@/utils/client";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { AddonCategories } from "@prisma/client";
import { useRouter } from "next/router";

const Menu = () => {
  const router = useRouter();
  const query = router.query;
  const menuId = query.id as string;
  const { menus, addonCategories, addons, menusAddonCategories } =
    useAppSelector(appData);

  const menu = menus.find((item) => item.id === Number(menuId));

  const validAddonCategories = getAddonCategoriesByMenuId(
    menuId,
    menusAddonCategories,
    addonCategories
  );

  const validAddonCategoryIds = validAddonCategories.map((item) => item.id);

  const validAddons = addons.filter((item) =>
    validAddonCategoryIds.includes(item.addonCategoryId)
  );

  const renderAddons = (addonCategory: AddonCategories) => {
    const addonCategoryId = addonCategory.id;
    const currentAddons = validAddons.filter(
      (item) => item.addonCategoryId === addonCategoryId
    );

    return (
      <FormControl>
        <RadioGroup>
          {currentAddons.map((item) => {
            return (
              <FormControlLabel
                key={item.id}
                value={item.name}
                control={addonCategory.isRequired ? <Radio /> : <Checkbox />}
                label={item.name}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    );
  };

  if (!menu) return <Box>Menu not found</Box>;
  return (
    <Box sx={{ mt: "3rem", ml: "5rem" }}>
      <Typography variant="h5">{menu.name}</Typography>
      <Box sx={{ mt: "2rem" }}>
        {validAddonCategories.map((item) => {
          return (
            <Box key={item.id} sx={{ my: "1.5rem" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "13rem",
                  mb: "1rem",
                }}
              >
                <Typography>{item.name}</Typography>
                <Chip
                  label={item.isRequired ? "Required" : "Optional"}
                  sx={{ bgcolor: "#00DFA2", color: "white" }}
                />
              </Box>
              {renderAddons(item)}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Menu;
