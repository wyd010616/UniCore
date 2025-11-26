const universities = {
  UofT: 21,
  McGill: 30,
  UBC: 34,
  UAlberta: 111,
  UW: 112,
  Western: 114,
  Montreal: 141,
};

function getUniversityNameById(id) {
  for (let [key, value] of Object.entries(universities)) {
    if (value === id) {
      return key;
    }
  }
  return null;
}

export { getUniversityNameById };
