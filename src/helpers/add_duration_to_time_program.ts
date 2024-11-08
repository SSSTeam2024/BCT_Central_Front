const addDurationToTime = (
    time: string,
    hoursToAdd: number,
    minutesToAdd: number
  ) => {
    console.log("time", time)
    console.log("hoursToAdd", hoursToAdd)
    console.log("minutesToAdd", minutesToAdd)
    const [hours, minutes] = time.split(":").map(Number);
    let totalMinutes = hours * 60 + minutes;
    totalMinutes += hoursToAdd * 60 + minutesToAdd;

    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;

    return {
      hours: newHours,
      minutes: newMinutes,
    };
  };
  export {addDurationToTime}