export const userLogin = async (data) => {
  const res = await fetch(`http://localhost:5000/app/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
  const userInfo = await res.json();
  return userInfo;
};
