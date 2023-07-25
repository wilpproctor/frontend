export function getUserDetails() {
  const stored = sessionStorage.getItem("user");
  if (stored) return JSON.parse(stored);

  const details = {
    email: `testuser${parseInt(Math.random() * 1000)}@gmail.com`,
  };
  
  sessionStorage.setItem("user", JSON.stringify(details));
  return details;
}
