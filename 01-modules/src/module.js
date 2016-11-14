export function valid(email) {
  var pattern = /[a-z].mmt-[bm][0-9]{4}@fh-salzburg.ac.at/;
  return pattern.test(email)
}

export function degreeProgram(email) {
  var pattern = /[a-z]{3}(?=-[bm][0-9]{4}@)/;
  return pattern.exec(email)[0].toUpperCase();
}

export function level(email) {
  var pattern = /[bm](?=[0-9]{4}@)/
  return pattern.exec(email)[0].toUpperCase() + 'A';
}

export function graduationYear(email) {
  var pattern = /[0-9]{4}(?=@)/;
  var emailyear = pattern.exec(email)[0];
  if(level(email) == 'BA')
    return emailyear += 3;
  else
    return emailyear += 2;
}


