export const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const padZero = (num) => String(num).padStart(2, "0");

  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1); // Months are 0-indexed
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = padZero(date.getMinutes());
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert to 12-hour format, with 12 instead of 0

  return `${day}-${month}-${year} - ${padZero(hours)}:${minutes} ${period}`;
};
