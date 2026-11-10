// Shared by /es/contact and /en/contact. Backend: github.com/mapube16/Formularyforlanding,
// Railway service "akai-form" (project alluring-delight) — recipient set by MAILERSEND_TO_EMAIL there.
const ENDPOINT = 'https://akai-form-production.up.railway.app/api/email/form-submission';

const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
const thanks = document.querySelector<HTMLElement>('[data-contact-thanks]');
const error = document.querySelector<HTMLElement>('[data-contact-error]');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (button) button.disabled = true;
  if (error) error.hidden = true;

  const { dialCode, phone, ...fields } = Object.fromEntries(new FormData(form)) as Record<string, string>;
  const data = {
    site: 'AKAI',
    ...fields,
    phone: phone ? `${dialCode} ${phone}` : '',
    page: location.href,
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    form.hidden = true;
    if (thanks) thanks.hidden = false;
  } catch (err) {
    console.error('Contact form submission failed', err);
    if (error) error.hidden = false;
  } finally {
    if (button) button.disabled = false;
  }
});
