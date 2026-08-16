// ─── Cron Schedules Content Data for Programmatic SEO ─────────────────────────

export const CRON_PAGES_DATA = [
  {
    slug: 'every-5-minutes',
    expression: '*/5 * * * *',
    name: 'Every 5 Minutes Cron Expression (*/5 * * * *)',
    title: 'Every 5 Minutes Cron Expression (*/5 * * * *) — Schedule & Generator | Rocking Tools',
    description: 'How to run a cron job every 5 minutes (*/5 * * * *). Crontab syntax explanation, execution timetable, and validator.',
    keywords: 'cron every 5 minutes, every 5 minutes cron expression, */5 * * * *, crontab every 5 mins, run cron every 5 minutes',
    intro: 'The standard cron expression to run a task every 5 minutes is `*/5 * * * *`. It triggers at minute 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, and 55 of every hour.',
    useCases: [
      { title: 'API Polling & Webhooks', desc: 'Fetch updates from third-party APIs or poll external message queues every 5 minutes.' },
      { title: 'Server Health Heartbeats', desc: 'Ping server health endpoints and report uptime status to monitoring dashboards.' },
    ],
    faqs: [
      { q: 'What is the syntax for every 5 minutes in crontab?', a: '`*/5 * * * *` specifies a step value of 5 on the minute field.' },
    ],
  },
  {
    slug: 'every-15-minutes',
    expression: '*/15 * * * *',
    name: 'Every 15 Minutes Cron Expression (*/15 * * * *)',
    title: 'Every 15 Minutes Cron Expression (*/15 * * * *) | Rocking Tools',
    description: 'Schedule a cron task every 15 minutes with */15 * * * *. Schedule breakdown and next execution dates.',
    keywords: 'cron every 15 minutes, */15 * * * *, crontab every 15 mins, cron schedule every 15 minutes',
    intro: 'The cron expression `*/15 * * * *` executes every 15 minutes at minutes :00, :15, :30, and :45 of every hour.',
    useCases: [
      { title: 'Cache Invalidation & Warmup', desc: 'Refresh stale cache entries or pre-warm CDN endpoints on a quarterly-hour interval.' },
      { title: 'Email Queue Processing', desc: 'Process outgoing transactional email batches at 15-minute intervals.' },
    ],
    faqs: [
      { q: 'When does */15 * * * * execute?', a: 'It runs 4 times per hour: at 00, 15, 30, and 45 minutes past each hour.' },
    ],
  },
  {
    slug: 'every-hour',
    expression: '0 * * * *',
    name: 'Every Hour Cron Expression (0 * * * *)',
    title: 'Every Hour Cron Expression (0 * * * *) — Hourly Crontab Schedule | Rocking Tools',
    description: 'How to run a cron job once every hour at the top of the hour (0 * * * *). Syntax and execution timetable.',
    keywords: 'cron every hour, hourly cron expression, 0 * * * *, crontab every hour, run task hourly cron',
    intro: 'To run a job once every hour at the start of the hour (minute 0), use the standard cron expression `0 * * * *`.',
    useCases: [
      { title: 'Hourly Data Aggregation', desc: 'Aggregate hourly visitor analytics, database metrics, and server usage stats.' },
      { title: 'Periodic Currency & Rate Sync', desc: 'Update foreign exchange rates or crypto prices once per hour.' },
    ],
    faqs: [
      { q: 'Why is it 0 * * * * instead of * * * * *?', a: '`* * * * *` runs every single minute. `0 * * * *` specifies minute 0, running exactly once per hour.' },
    ],
  },
  {
    slug: 'everyday-at-midnight',
    expression: '0 0 * * *',
    name: 'Every Day at Midnight Cron Expression (0 0 * * *)',
    title: 'Every Day at Midnight Cron Expression (0 0 * * *) — Daily Crontab | Rocking Tools',
    description: 'Run a daily cron job at midnight (00:00) with 0 0 * * *. Daily maintenance, log rotation, and backup schedule.',
    keywords: 'cron everyday at midnight, daily cron expression, 0 0 * * *, cron run at midnight, crontab midnight',
    intro: 'The cron expression `0 0 * * *` executes once per day at exactly 00:00 (midnight). Ideal for daily database backups and nightly jobs.',
    useCases: [
      { title: 'Automated Database Backups', desc: 'Create daily snapshots and compress database dumps during low-traffic midnight hours.' },
      { title: 'Log Rotation & Cleanup', desc: 'Archive server access logs and purge expired session tokens.' },
      { title: 'Daily Report Generation', desc: 'Compile end-of-day sales summaries and deliver financial digest emails.' },
    ],
    faqs: [
      { q: 'What timezone does midnight cron use?', a: 'Cron runs in the server\'s local system timezone unless configured with a CRON_TZ or TZ environment variable.' },
    ],
  },
  {
    slug: 'everyday-at-noon',
    expression: '0 12 * * *',
    name: 'Every Day at Noon Cron Expression (0 12 * * *)',
    title: 'Every Day at 12:00 PM Noon Cron Expression (0 12 * * *) | Rocking Tools',
    description: 'Schedule a cron job to run at 12:00 PM noon every day using 0 12 * * *.',
    keywords: 'cron everyday at noon, 0 12 * * *, cron run at 12pm, midday cron expression',
    intro: 'The expression `0 12 * * *` triggers once per day at exactly 12:00 PM (midday).',
    useCases: [
      { title: 'Midday Notification Digests', desc: 'Send daily lunch reminders or midday news digests to subscribed users.' },
    ],
    faqs: [
      { q: 'What does 0 12 * * * mean?', a: 'It means Minute 0, Hour 12 (24-hour time), Day of Month *, Month *, Day of Week *.' },
    ],
  },
  {
    slug: 'every-monday',
    expression: '0 0 * * 1',
    name: 'Every Monday at Midnight Cron Expression (0 0 * * 1)',
    title: 'Every Monday Cron Expression (0 0 * * 1) — Weekly Crontab | Rocking Tools',
    description: 'Run a weekly cron job every Monday at midnight with 0 0 * * 1. Weekly digest and summary schedule.',
    keywords: 'cron every monday, weekly cron expression, 0 0 * * 1, crontab every monday, run task every monday',
    intro: 'The cron expression `0 0 * * 1` executes once per week on Monday at 00:00 (midnight). Perfect for weekly digests and metric resets.',
    useCases: [
      { title: 'Weekly Email Newsletters', desc: 'Dispatch weekly curated digests and marketing campaigns on Monday mornings.' },
      { title: 'Weekly Quota Resets', desc: 'Reset weekly API usage limits and free tier credits.' },
    ],
    faqs: [
      { q: 'Is 1 Monday or Sunday in cron?', a: 'In standard crontab, 1 represents Monday (0 or 7 is Sunday).' },
    ],
  },
  {
    slug: 'every-weekday',
    expression: '0 9 * * 1-5',
    name: 'Every Weekday at 9:00 AM Cron Expression (0 9 * * 1-5)',
    title: 'Every Weekday (Monday–Friday) Cron Expression (0 9 * * 1-5) | Rocking Tools',
    description: 'Schedule cron tasks for business days (Monday through Friday) at 9:00 AM using 0 9 * * 1-5.',
    keywords: 'cron every weekday, cron monday to friday, 0 9 * * 1-5, business days cron, weekday crontab',
    intro: 'The cron expression `0 9 * * 1-5` executes at 9:00 AM on every weekday (Monday through Friday), pausing over weekends.',
    useCases: [
      { title: 'Stock Market & Trading Sync', desc: 'Initialize trading feeds and stock market data sync on business days.' },
      { title: 'Team Standup Notifications', desc: 'Post daily Slack or Teams standup prompts at 9:00 AM on workdays.' },
    ],
    faqs: [
      { q: 'How do I specify Monday through Friday in cron?', a: 'Use `1-5` in the 5th (Day of Week) field.' },
    ],
  },
  {
    slug: 'first-day-of-month',
    expression: '0 0 1 * *',
    name: '1st Day of Every Month Cron Expression (0 0 1 * *)',
    title: 'First Day of the Month Cron Expression (0 0 1 * *) | Rocking Tools',
    description: 'Run a monthly recurring task on the 1st of every month at midnight with 0 0 1 * *.',
    keywords: 'cron first day of month, monthly cron expression, 0 0 1 * *, crontab monthly, run on 1st of month',
    intro: 'The cron expression `0 0 1 * *` executes once a month on the 1st calendar day at 00:00 (midnight). Ideal for billing cycles and invoices.',
    useCases: [
      { title: 'Monthly Subscription Billing', desc: 'Trigger recurring credit card charges and generate customer monthly invoices.' },
      { title: 'Monthly Quota Allocations', desc: 'Renew monthly storage limits and API credit allowances.' },
    ],
    faqs: [
      { q: 'How does cron know which day is the 1st?', a: 'The 3rd field represents the Day of Month (1-31). Setting it to `1` matches the first day of every month.' },
    ],
  },
]

export function getCronPageBySlug(slug) {
  return CRON_PAGES_DATA.find((c) => c.slug === slug)
}
