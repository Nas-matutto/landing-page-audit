// Who lead-magnet emails come from. Sent from the mail. subdomain so the
// main talktomedata.com domain's reputation is kept apart from bulk sends;
// replies go to Nas's real inbox (the subdomain has none).
export const EMAIL_FROM = process.env.EMAIL_FROM?.trim() || 'Nas from Talk to me Data <nas@mail.talktomedata.com>'
export const REPLY_TO = 'nas@talktomedata.com'
