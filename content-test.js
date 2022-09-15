function main() {
  let previousIndex = 0;
  extractList(previousIndex);
}

function extractList(previousIndex) {
  const data = []
  const candidateList = document.getElementsByClassName('mn-connection-card artdeco-list');
  const updatedCandidateList = Array.from(candidateList).slice(previousIndex, candidateList.length);
  previousIndex = candidateList.length;
  for (const candidateDom of updatedCandidateList) {
    const candidateDetail = extract(candidateDom);
    data.push(candidateDetail);
  }

  console.log('final data: ', data);
}

function extract(candidateDom) {
  const data = {};
  data.candidateName = candidateDom.querySelector('.mn-connection-card__name')?.getInnerHTML()?.trim();
  data.candidateOccupation = candidateDom.querySelector('.mn-connection-card__occupation')?.getInnerHTML()?.trim();
  data.candidateProfile = `https://www.linkedin.com/${candidateDom.querySelector('.mn-connection-card__picture')?.getAttribute('href')?.trim()}`;
  return data;
}

main();
