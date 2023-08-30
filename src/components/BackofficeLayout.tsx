import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData, fetchAppData } from "@/store/slices/appSlice";
import { Box } from "@mui/material";
import { useEffect } from "react";
import TopBar from "./TopBar";
import { useSession } from "next-auth/react";
import SideBar from "./SideBar";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const BackofficeLayout = ({ children }: Props) => {
  const { data } = useSession();
  const dispatch = useAppDispatch();
  const { init } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (!init) {
      dispatch(fetchAppData({ locationId: undefined }));
    }
  }, [dispatch, init]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <TopBar />
      <Box sx={{ display: "flex", zIndex: 5, flex: 1 }}>
        {data && <SideBar />}
        <Box sx={{ p: 3, width: "100%", height: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default BackofficeLayout;
