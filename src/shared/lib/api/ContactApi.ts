const CONTACT_FORM_WEBHOOK_URL = 'https://n8botpars.ru/webhook/compascont'

export type ContactFormPayload = {
  name: string;
  phone: string;
  comment?: string;
  file?: File | null;
};

export async function submitContactForm(
  name: string,
  phone: string,
  comment?: string,
  file?: File | null
): Promise<void> {
  if (!CONTACT_FORM_WEBHOOK_URL) {
    throw new Error('Не указан URL webhook для формы контактов.');
  }

  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('comment', comment ?? '');
  if (file) {
    formData.append('file', file);
  }

  const res = await fetch(CONTACT_FORM_WEBHOOK_URL, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Ошибка ${res.status}`);
  }
}
