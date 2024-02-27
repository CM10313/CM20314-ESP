const validateURL = (url: string): boolean => {
    const urlRegex = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;
    return url === '' || urlRegex.test(url);
  };

  export default validateURL;