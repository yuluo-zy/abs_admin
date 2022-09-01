import { AuthParams } from "@/utils/authentication";

export type Route = AuthParams & {
  name: string;
  key: string;
  breadcrumb?: boolean;
  permission?: string;
  hide?: boolean;
  children?: Route[];
};

export const defaultRoute = "work_order";

export const routes: Route[] = [
  {
    name: "work_order",
    key: "work_order"
  }
];

