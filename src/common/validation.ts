const validateEmail = (email: string): boolean => {
  const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/;

  return reg.test(email);
};

export default validateEmail;
