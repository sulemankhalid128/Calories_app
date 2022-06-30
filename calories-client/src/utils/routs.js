import Admin from "../Main/admin/Admin";
import AllUserFood from "../Main/admin/AllUserFood";

export const privateRoutesPath = [
  {
    path: "/admin",
    exact: true,
    component: Admin,
  },
  {
    path: "/admin/user/foods/:id",
    exact: true,
    component: AllUserFood,
  },
];
