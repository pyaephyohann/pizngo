import { useRouter } from "next/router";
import OrderAppLayout from "./OrderAppLayout";
import BackofficeLayout from "./BackofficeLayout";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const query = router.query;
  const isOrderApp = query.locationId && query.tableId;

  const isBackofficeApp =
    router.pathname.includes("/backoffice") ||
    router.pathname.includes("/auth");

  if (isOrderApp) {
    return <OrderAppLayout>{children}</OrderAppLayout>;
  }

  if (isBackofficeApp) {
    return <BackofficeLayout>{children}</BackofficeLayout>;
  }
  return <>{children}</>;
};

export default Layout;
