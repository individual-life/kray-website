export const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const getWeekDays = (): Date[] => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + distanceToMonday);
  const week = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    week.push(day);
  }
  return week;
};

