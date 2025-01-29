const now = new Date();
const timeZone = 'UTC';
const buildTime = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'full',
  timeStyle: 'short',
  timeZone,
}).format(now);

export default {
  time: {
    raw: now.toISOString(),
    formatted: `${buildTime} ${timeZone}`,
  },
};
