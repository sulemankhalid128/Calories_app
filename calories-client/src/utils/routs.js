import User from "../Main/users/User";

export const privateRoutesPath = [
  {
    path: "/user",
    exact: true,
    element: <User />,
  },
];
