/**
 * @FileDescription Main scraping file for scraping candidates.
 */

function main() {
  extractList()
}

function extractList() {
  const data = [];
  const candidateList = document.querySelectorAll('.hiring-applicants__list-item');
  for (const candidateDom of candidateList) {
    const candidateDetail = extract(candidateDom);
    data.push(candidateDetail);
  }

  chrome.runtime.sendMessage(JSON.stringify({ action: 'send_data', data }), function(response) {
    console.log('server response: ', response);
  });
}

function extract(candidateDom) {
  const candidateDetails = { workExperience: [], requiredQualification: {} };

  candidateDetails.name = candidateDom.querySelector('.hiring-people-card__title').innerText?.trim();
  let metaData = candidateDom.querySelectorAll('.artdeco-entity-lockup__metadata');
  metaData = metaData[metaData?.length - 1];
  candidateDetails.location = metaData?.innerText?.trim();
  candidateDetails.profileImage = candidateDom?.querySelector('.hiring-selectable-entity > img').getAttribute('src')?.trim();

  const workAndQualificationDom = candidateDom?.querySelector('.artdeco-entity-lockup__caption');
  const workExperienceSection = workAndQualificationDom?.querySelectorAll('ul > li');
  if (workExperienceSection?.length > 0) {
    for (const experienceDom of workExperienceSection) {
      const experience = experienceDom?.innerText;
      const [work, years] = experience?.split('•');

      const [start, end] = years?.split('-') || '';
      candidateDetails.workExperience.push({
        job: work?.trim(),
        startYear: start?.trim() || '-',
        endYear: end?.trim() || '-'
      });
    }
  }

  let mustHaveQualification = workAndQualificationDom?.querySelector('.artdeco-entity-lockup__caption > div > div > span')?.innerText?.trim();
  mustHaveQualification = mustHaveQualification?.split(' ')[0] || '';
  const [users, total] = mustHaveQualification?.split('/');
  candidateDetails.requiredQualification = { required: total, satisfied: users };

  return candidateDetails;
}

main();
