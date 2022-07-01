export const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const dateFormate = (dateStr) => {
  let date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const getUserLocal = () => {
  let user = localStorage?.getItem("user");
  return JSON.parse(user);
};
export const setUserLocal = (res) => {
  localStorage.clear();
  localStorage.setItem("calories_token", res?.token);
  localStorage.setItem("user", JSON.stringify(res));
};
