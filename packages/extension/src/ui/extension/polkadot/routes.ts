import dotAccounts from "./dot-accounts.vue";
import dotTxApprove from "./dot-approvetx.vue";
import { RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  { path: "/dotaccounts", component: dotAccounts, name: "dotaccounts" },
  { path: "/dotTxApprove", component: dotTxApprove, name: "dotTxApprove" },
];
export default (namespace: string): RouteRecordRaw[] => {
  return routes.map((route) => {
    route.path = `/${namespace}${route.path}`;
    route.name = route.name ? `${namespace}-${String(route.name)}` : undefined;
    return route;
  });
};