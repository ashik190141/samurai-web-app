export const createIssue = async (data) => {
  const res = await fetch(`http://localhost:5000/app/create-issue`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const userInfo = await res.json();
  return userInfo;
};
