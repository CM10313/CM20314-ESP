const validateDate = (date: string): boolean => {
    const currentDate = new Date();
    const inputDate = new Date(date);

    // Set time components to 0 for both dates
    currentDate.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 1);

    return inputDate.getTime() >= currentDate.getTime();
};

  export default validateDate;
  export const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
