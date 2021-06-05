const fiftyMin = 3000000;
const oneDay = 86400000;

export function getTimeDiffSinceTokenCreation(tokenCreatedTime){
  const currentTimeInMill = new Date().getTime();
  return currentTimeInMill - tokenCreatedTime;
}


//if longer than 50min since token creation get a new token
// and set a time out for logging user out
export const  manageTokenValidity = (setTokenStatus, getNewToken) => {
  let time;
  window.onclick = checkLastActiveTimeAndGetToken;
  console.log('click is registered');
  function checkLastActiveTimeAndGetToken() {
    const tokenCreatedTime = parseInt(localStorage.tokenCreatedTime);
    console.log('click is registered happend');
    const timeSinceTokenCreation =
      getTimeDiffSinceTokenCreation(tokenCreatedTime);
    if (timeSinceTokenCreation > fiftyMin) {
      clearTimeout(time);
      getNewToken();

      time = setTimeout(() => {
        localStorage.clear();
        window.onclick = undefined;
        setTokenStatus({ deleted: true });
      }, oneDay);
    }
  }
}