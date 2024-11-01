function convertToHHMM(seconds: any) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return {
      hours: hours,
      minutes: minutes,
    };
  }
  export {convertToHHMM}