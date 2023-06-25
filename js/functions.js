function isValid(string, maxLength) {
  return string.length <= maxLength;
}

function isPalindrome(string) {
  const normalString = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for (let i = normalString.length - 1; i >= 0; i--) {
    reverseString += normalString[i];
  }
  return normalString === reverseString;
}

isValid('Test', 20);
isPalindrome('тест');

//////////////////////////////////

const workingMeetings = (startDay, endDay, durationHours, duration) => {
  const getNumberTime = (str) => {
    let result = 0;
    const arr = str.split(':');
    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        result += arr[i] * 60;
      } else {
        result += +arr[i];
      }
    }
    return result;
  };

  return getNumberTime(durationHours) >= getNumberTime(startDay) &&
    getNumberTime(durationHours) + duration <= getNumberTime(endDay);
};
workingMeetings('8:00', '17:30', '08:00', 900);
