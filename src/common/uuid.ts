import crypto from "crypto";

export default {
  valid: (uuid: string) => uuid.match(/^([a-z]|[A-Z]|[0-9]|[-]){36}$/gm),
  create: () => crypto.randomUUID(),
};
