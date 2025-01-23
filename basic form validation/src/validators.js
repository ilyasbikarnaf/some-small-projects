export function checkEmail(email) {
  const errors = [];

  if (!email.length) {
    errors.push("must not be blank");
  }
  if (!email.endsWith("@webdevsimplified.com")) {
    errors.push("must end with @webdevsimplified.com");
  }

  return errors;
}

export function checkPassword(password) {
  const errors = [];

  if (!password.length) {
    errors.push("must not be blank");
  }
  if (password.length < 10) {
    errors.push("must have 10 characters or more");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("must include at least a lowercase");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("must include an uppercase");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("must include a number");
  }

  return errors;
}
