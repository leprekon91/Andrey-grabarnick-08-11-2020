const hasNumber = (value) => {
    return new RegExp(/[0-9]/).test(value);
  };
  const hasMixed = (value) => {
    return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
  };
  const hasSpecial = (value) => {
    return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
  };
  export const strengthColor = (count) => {
    if (count < 2) return 'red';
    if (count < 3) return 'deepOrange';
    if (count < 4) return 'orange';
    if (count < 5) return 'lightGreen';
    return 'green';
  };
  
  export const strengthLabel = (count) => {
    if (count < 2) return 'Bad';
    if (count < 3) return 'Ok';
    if (count < 4) return 'Good';
    if (count < 5) return 'Best';
    return 'Great!';
  };
  
  export const strengthIndicator = (value) => {
    let strengths = 0;
    if (value.length > 5) strengths += 1;
    if (value.length > 7) strengths += 1;
    if (hasNumber(value)) strengths += 1;
    if (hasSpecial(value)) strengths += 1;
    if (hasMixed(value)) strengths += 1;
    return strengths;
  };