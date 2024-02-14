const validatePassword = (password: string): boolean => {
  // Regular expressions for each requirement
  const hasCapital = /[A-Z]/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const hasNumber = /\d/.test(password);
  const isLongEnough = password.length >= 6;

  // Check if all conditions are met
  return hasCapital && hasSymbol && hasNumber && isLongEnough;
};

export default validatePassword;