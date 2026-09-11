import emailjs from "@emailjs/browser";

export interface ContactFormValues {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  message: string;
}

export class EmailConfigError extends Error {
  constructor() {
    super(
      "Email is not configured. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in your environment."
    );
    this.name = "EmailConfigError";
  }
}

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  );
}

export async function sendContactEmail(values: ContactFormValues): Promise<void> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new EmailConfigError();
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      from_name: values.name,
      from_email: values.email,
      company: values.company || "Not provided",
      project_type: values.projectType,
      message: values.message,
    },
    { publicKey }
  );
}
