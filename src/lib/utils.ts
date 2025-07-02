import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateICSContent(
  plan,
  startDay,
  hour,
  minute,
  alertMinutes = 30
) {
  let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Couch to 5K//EN\n";

  plan.forEach((session) => {
    const sessionDate = new Date(startDay);
    sessionDate.setDate(
      sessionDate.getDate() + (session.week - 1) * 7 + session.dayOffset
    );
    const dtStart = new Date(sessionDate);
    dtStart.setHours(hour, minute);
    const dtEnd = new Date(dtStart);
    dtEnd.setMinutes(dtEnd.getMinutes() + session.duration);

    const eventName =
      session.duration > 0
        ? `C25K Week ${session.week} - Day ${session.day}`
        : `C25K Week ${session.week} ${session.day} (Rest)`;

    icsContent += `BEGIN:VEVENT\n`;
    icsContent += `DTSTART:${format(dtStart, "yyyyMMdd'T'HHmmss")}\n`;
    icsContent += `DTEND:${format(dtEnd, "yyyyMMdd'T'HHmmss")}\n`;
    icsContent += `SUMMARY:${eventName}\n`;
    icsContent += `DESCRIPTION:${session.description}\n`;
    icsContent += `UID:${session.week}-${session.day}-c25k@couch-to-5k.local\n`;

    if (alertMinutes > 0) {
      icsContent += `BEGIN:VALARM\n`;
      icsContent += `TRIGGER:-PT${alertMinutes}M\n`;
      icsContent += `ACTION:DISPLAY\n`;
      icsContent += `DESCRIPTION:C25K Reminder\n`;
      icsContent += `END:VALARM\n`;
    }

    icsContent += `END:VEVENT\n`;
  });

  icsContent += "END:VCALENDAR";
  return icsContent;
}
