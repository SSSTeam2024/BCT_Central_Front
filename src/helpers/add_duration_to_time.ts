function addDurationToTime(
    time: string,
    hoursToAdd: number,
    minutesToAdd: number,
    givenDate: string
  ) {
    if (!time || typeof time !== "string" || !time.includes(":")) {
      throw new Error("Invalid 'time' argument. Expected format: 'HH:MM'");
    }
    if (!givenDate || typeof givenDate !== "string" || !givenDate.includes("-")) {
      throw new Error("Invalid 'givenDate' argument. Expected format: 'YYYY-MM-DD'");
    }
    const [hours, minutes] = time.split(":").map(Number);
    let totalMinutes = hours * 60 + minutes;
    totalMinutes += hoursToAdd * 60 + minutesToAdd;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    const [year, month, day] = givenDate.split("-").map(Number);
    const currentDate = new Date(year, month - 1, day);
    if (totalMinutes >= 24 * 60) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    let y = currentDate.getFullYear();
    let m = currentDate.getMonth() + 1;
    let d = currentDate.getDate().toLocaleString();

    return {
      date:
        String(y) +
        "-" +
        String(m).padStart(2, "0") +
        "-" +
        String(d).padStart(2, "0"),
      hours: newHours,
      minutes: newMinutes,
    };
  }
  export {addDurationToTime}