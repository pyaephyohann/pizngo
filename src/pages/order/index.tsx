import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, useEffect } from "react";
import { MenuCategories } from "@prisma/client";
import { useRouter } from "next/router";
import { getMenusByMenuCategoryId } from "@/utils/client";
import MenuCard from "@/components/MenuCard";
import Loading from "@/components/Loading";

const Order = () => {
  const router = useRouter();
  const query = router.query;
  const selectedLocationId = query.locationId as string;

  const { isLoading, menus, menuCategories, menusMenuCategoriesLocations } =
    useAppSelector(appData);

  const [value, setValue] = useState(0);

  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategories>();

  useEffect(() => {
    if (menuCategories.length) {
      setSelectedMenuCategory(menuCategories[0]);
    }
  }, [menuCategories]);

  const renderMenus = () => {
    const isValid = selectedLocationId && selectedMenuCategory;
    if (!isValid) return;

    const menuCategoryId = String(selectedMenuCategory.id);

    const validMenus = getMenusByMenuCategoryId(
      menuCategoryId,
      selectedLocationId,
      menus,
      menusMenuCategoriesLocations
    );

    return validMenus.map((item) => {
      const href = { pathname: `/order/menus/${item.id}`, query };
      return <MenuCard key={item.id} menu={item} href={href} />;
    });
  };

  if (isLoading) return <Loading />;

  return (
    <Box sx={{ mt: "1rem" }}>
      {/* Tab */}
      <Box>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={(event, value) => {
            setValue(value);
          }}
          textColor="secondary"
          indicatorColor="secondary"
        >
          {menuCategories.map((item) => {
            return (
              <Tab
                key={item.id}
                label={item.name}
                onClick={() => setSelectedMenuCategory(item)}
              />
            );
          })}
        </Tabs>
      </Box>
      {/* Show Menus */}
      <Box sx={{ display: "flex", flexWrap: "wrap", mt: "2rem" }}>
        {renderMenus()}
      </Box>
    </Box>
  );
};

export default Order;
