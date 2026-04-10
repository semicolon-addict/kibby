export interface ContactFormData {
  name: string;
  email: string;
  serviceneeded: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  const url = import.meta.env.VITE_APPS_SCRIPT_URL;

  if (!url) {
    throw new Error("VITE_APPS_SCRIPT_URL is not set");
  }

  const params = new URLSearchParams({
    name: data.name,
    email: data.email,
    serviceneeded: data.serviceneeded,
    message: data.message,
  });

  await fetch(`${url}?${params.toString()}`, {
    method: "POST",
    mode: "no-cors",
  });
}