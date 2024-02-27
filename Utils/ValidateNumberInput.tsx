const validateNumberInRange= (input:number, minimum:number,maximum:number): boolean => {
    return input >= minimum && input <= maximum;
  };

  export default validateNumberInRange;