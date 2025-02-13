export const isSessionExpired = () => {
  const loginTime = localStorage.getItem('login_time');
  if (loginTime) {
    const elapsedTime = Date.now() - loginTime;
    const sessionTimeout = 12 * 60 * 60 * 1000;
    return elapsedTime > sessionTimeout;
  }
  return true;
};
