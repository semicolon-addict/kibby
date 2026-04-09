export interface ContactFormData {
  name: string;
  email: string;
  serviceneeded: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  const url = import.meta.env.VITE_APPS_SCRIPT_URL;

  const params = new URLSearchParams({
    name: data.name,
    email: data.email,
    serviceneeded: data.serviceneeded,
    message: data.message,
  });

  const response = await fetch(`${url}?${params.toString()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) {
    throw new Error("Submission failed");
  }

  return response.text();
}