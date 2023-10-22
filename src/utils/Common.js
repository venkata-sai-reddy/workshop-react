export const convertTimetoLocalDateTime = (dateTo, time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const inputDate = new Date(dateTo);
    
    const date = new Date();
    date.setMonth(String(inputDate.getMonth()));
    date.setDate(String(inputDate.getDate()).padStart(2, '0'));
    date.setFullYear(inputDate.getFullYear());
    date.setHours(hours-5);
    date.setMinutes(minutes);
    date.setSeconds(0);

    return date.toISOString();
}

export const convertToDateFormat = (dateTo) => {
    const date = new Date(dateTo);
    return date.toISOString();
}

export const sessionUnAuthCheck = (error) => {
    return error?.response?.data?.status === 401
}