import QuantitySelector from "@/components/QuantitySelector";
import { useAppSelector } from "@/store/hooks";
import {
  appData,
  selectAddons,
  selectLocations,
} from "@/store/slices/appSlice";
import { getAddonCategoriesByMenuId } from "@/utils/client";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { AddonCategories, Addons } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Menu = () => {
  const router = useRouter();
  const query = router.query;
  const menuId = query.id as string;
  const { menus, addonCategories, addons, menusAddonCategories } =
    useAppSelector(appData);

  const [quantity, setQuantity] = useState<number>(1);

  const [selectedAddons, setSelectedAddons] = useState<Addons[]>([]);

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

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

  const onQuantityDecrease = () => {
    const newValue = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newValue);
  };

  const onQuantityIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
  };

  useEffect(() => {
    const requiredAddonCategories = validAddonCategories.filter(
      (item) => item.isRequired
    );
    if (requiredAddonCategories.length) {
      if (!selectedAddons.length) {
        setIsDisabled(true);
      } else {
        const requiredAddons = selectedAddons.filter((addon) => {
          const addonCategory = validAddonCategories.find(
            (item) => item.id === addon.addonCategoryId
          );
          if (addonCategory?.isRequired) {
            return true;
          } else {
            return false;
          }
        });
        const hasSelectAllRequiredAddons =
          requiredAddonCategories.length === requiredAddons.length;
        const isDisabled = hasSelectAllRequiredAddons ? false : true;
        setIsDisabled(isDisabled);
      }
    }
  }, [selectedAddons, validAddonCategories]);

  const handleAddonSelect = (selected: boolean, addon: Addons) => {
    const addonCategory = addonCategories.find(
      (item) => item.id === addon.addonCategoryId
    ) as AddonCategories;
    if (addonCategory.isRequired) {
      const addonWithSameAddonCategory = selectedAddons.find(
        (item) => item.addonCategoryId === addon.addonCategoryId
      ) as Addons;
      let newSelectedAddon = [] as Addons[];
      if (addonWithSameAddonCategory) {
        const filteredAddons = selectedAddons.filter(
          (item) => item.id !== addonWithSameAddonCategory.id
        );
        newSelectedAddon = [...filteredAddons, addon];
      } else {
        newSelectedAddon = [...selectedAddons, addon];
      }
      setSelectedAddons(newSelectedAddon);
    } else {
      if (selected) {
        setSelectedAddons([...selectedAddons, addon]);
      } else {
        setSelectedAddons([
          ...selectedAddons.filter((item) => item.id !== addon.id),
        ]);
      }
    }
  };

  const renderAddons = (addonCategory: AddonCategories) => {
    const addonCategoryId = addonCategory.id;
    const currentAddons = validAddons.filter(
      (item: Addons) => item.addonCategoryId === addonCategoryId
    );

    return (
      <FormControl>
        <RadioGroup>
          {currentAddons.map((item) => {
            return (
              <FormControlLabel
                key={item.id}
                value={item.name}
                control={
                  addonCategory.isRequired ? (
                    <Radio
                      onChange={(event, value) =>
                        handleAddonSelect(value, item)
                      }
                    />
                  ) : (
                    <Checkbox
                      onChange={(event, value) =>
                        handleAddonSelect(value, item)
                      }
                    />
                  )
                }
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
      <QuantitySelector
        value={quantity}
        onQuantityDecrease={onQuantityDecrease}
        onQuantityIncrease={onQuantityIncrease}
      />
      <Button
        disabled={isDisabled}
        sx={{ mt: "2rem", mb: "5rem" }}
        variant="contained"
      >
        Add To Cart
      </Button>
    </Box>
  );
};

export default Menu;
