fetch('profile.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Vložit jméno
    document.querySelector('#name').textContent = 'Ahoj, já jsem ' + data.name;

    // Vygenerovat seznam dovedností
    const skillsUl = document.querySelector('#skills');
    data.skills.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill;
      skillsUl.appendChild(li);
    });

    // Vygenerovat zájmy
    const interestsSection = document.querySelector('#interests .container');
    const interestsUl = document.createElement('ul');
    data.interests.forEach(interest => {
      const li = document.createElement('li');
      li.textContent = interest;
      interestsUl.appendChild(li);
    });
    interestsSection.appendChild(interestsUl);

    // Vygenerovat projekty
    const projectsSection = document.querySelector('#projects .container');
    data.projects.forEach(project => {
      const projectDiv = document.createElement('div');
      projectDiv.className = 'project-card';
      projectDiv.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank">Zobrazit projekt</a>
      `;
      projectsSection.appendChild(projectDiv);
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    // Možná zobrazit chybu uživateli
    document.querySelector('#name').textContent = 'Chyba při načítání dat';
  });