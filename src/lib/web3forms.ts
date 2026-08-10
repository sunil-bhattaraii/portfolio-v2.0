export const WEB3FORMS_ACCESS_KEY =
  'f1d24eb2-42ae-4016-86f6-26f0cd6228f0';

export async function submitContact(payload: {
  name: string;
  email: string;
  message: string;
}): Promise<{ ok: boolean; data: Record<string, unknown> }> {
  const formData = new FormData();
  formData.append('access_key', WEB3FORMS_ACCESS_KEY);
  formData.append('name', payload.name);
  formData.append('email', payload.email);
  formData.append('message', payload.message);

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json().catch(() => ({}));
  return { ok: data?.success === true, data };
}
