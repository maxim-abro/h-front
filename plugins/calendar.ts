
// export default calendar;

export default function (context:any, inject:any) {

  const calendar: object = (date: string) => {
    const months: string[] = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];

    const month: any = () => {
      if (date[5] === "0") {
        return date[6];
      } else {
        return date.substring(5, 7);
      }
    };

    return `${date.substring(8)} ${months[month() - 1]} ${date.substring(0, 4)}`;
  };

  inject('calendar', calendar)
}
