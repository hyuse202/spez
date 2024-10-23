export function getRelativeTime(date: any) {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();
  const diffInSeconds = Math.round(diffInMs / 1000);
  const diffInMinutes = Math.round(diffInMs / 1000 / 60);
  const diffInHours = Math.round(diffInMs / 1000 / 60 / 60);
  const diffInDays = Math.round(diffInMs / 1000 / 60 / 60 / 24);
  const diffInMonths = Math.round(diffInMs / 1000 / 60 / 60 / 24 / 30);
  const diffInYears = Math.round(diffInMs / 1000 / 60 / 60 / 24 / 365);

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (diffInMinutes < 60) {
    return rtf.format(-diffInMinutes, 'minute');
  } else if (diffInHours < 24) {
    return rtf.format(-diffInHours, 'hour');
  } else if (diffInDays < 30) {
    return rtf.format(-diffInDays, 'day');
  } else if (diffInMonths < 12) {
    return rtf.format(-diffInMonths, 'month');
  } else {
    return rtf.format(-diffInYears, 'year');
  }
}

