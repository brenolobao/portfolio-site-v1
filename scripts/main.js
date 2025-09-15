
// Sistema de tema
let currentTheme = 'light';
let currentLang = 'pt';
let translations = {};

// Carregar traduções
async function loadTranslations() {
    try {
        const ptResponse = await fetch('lang/pt.json');
        const enResponse = await fetch('lang/en.json');

        translations.pt = await ptResponse.json();
        translations.en = await enResponse.json();

        updateContent();
    } catch (error) {
        console.error('Erro ao carregar traduções:', error);
    }
}

// Atualizar conteúdo baseado no idioma
function updateContent() {
    const data = translations[currentLang];
    if (!data) return;

    // Profile
    document.getElementById('profile-name').textContent = data.profile.name;
    document.getElementById('profile-role').textContent = data.profile.role;
    document.getElementById('profile-age').textContent = data.profile.age;
    document.getElementById('profile-status').textContent = data.profile.status;

    // Menu
    document.getElementById('menu-home').textContent = data.menu.home;
    document.getElementById('menu-about').textContent = data.menu.about;
    document.getElementById('menu-skills').textContent = data.menu.skills;
    document.getElementById('menu-projects').textContent = data.menu.projects;
    document.getElementById('menu-contacts').textContent = data.menu.contacts;

    // Sections
    document.getElementById('home-title').textContent = data.sections.home.title;
    document.getElementById('home-subtitle').textContent = data.sections.home.subtitle;

    document.getElementById('about-title').textContent = data.sections.about.title;
    document.getElementById('about-subtitle').textContent = data.sections.about.subtitle;

    document.getElementById('experience-title').textContent = data.sections.about.experience.title;
    document.getElementById('objective-title').textContent = data.sections.about.objective.title;
    document.getElementById('objective-content').innerHTML = data.sections.about.objective.content;

    // Update experience cards
    updateExperienceCards(data.sections.about.experience.items);

    document.getElementById('skills-title').textContent = data.sections.skills.title;
    document.getElementById('skills-subtitle').textContent = data.sections.skills.subtitle;
    document.getElementById('hard-skills-title').textContent = data.sections.skills.hard;
    document.getElementById('soft-skills-title').textContent = data.sections.skills.soft;

    // Update soft skills
    updateSoftSkills(data.sections.skills.softSkills);

    document.getElementById('projects-title').textContent = data.sections.projects.title;
    document.getElementById('projects-subtitle').textContent = data.sections.projects.subtitle;
    document.getElementById('projects-section-title').textContent = data.sections.projects.projectsTitle;
    document.getElementById('git-title').textContent = data.sections.projects.gitTitle;

    // Update projects
    updateProjectsCards(data.sections.projects.items);

    document.getElementById('git-commits').textContent = data.sections.projects.gitProfile.commits2025;
    document.getElementById('git-contributions').textContent = data.sections.projects.gitProfile.contributions;

    document.getElementById('contacts-title').textContent = data.sections.contacts.title;
    document.getElementById('contacts-subtitle').textContent = data.sections.contacts.subtitle;

    // Footer
    document.getElementById('change-lang-text').textContent = data.footer.changeLang;
    document.getElementById('change-theme-text').textContent = data.footer.changeTheme;
    document.getElementById('copyright').textContent = data.footer.copyright;

    // Update button titles
    document.getElementById('pt-btn').title = data.footer.portuguese;
    document.getElementById('en-btn').title = data.footer.english;
    document.getElementById('light-btn').title = data.footer.lightMode;
    document.getElementById('dark-btn').title = data.footer.darkMode;
}

function updateExperienceCards(items) {
    const container = document.getElementById('experience-cards');
    container.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        let tasksHtml = '';
        if (item.tasks) {
            tasksHtml = '<ul>' + item.tasks.map(task => `<li>${task}</li>`).join('') + '</ul>';
        }

        card.innerHTML = `
                    <h3>${item.company}</h3>
                    <h4>${item.position}</h4>
                    ${tasksHtml}
                    <p>${item.period}</p>
                `;
        container.appendChild(card);
    });
}

function updateSoftSkills(skills) {
    const container = document.getElementById('soft-skills-cards');
    const softCards = container.querySelectorAll('.soft-card');

    skills.forEach((skill, index) => {
        if (softCards[index]) {
            const img = softCards[index].querySelector('img');
            softCards[index].innerHTML = `${skill} `;
            softCards[index].appendChild(img);
        }
    });
}

function updateProjectsCards(projects) {
    const container = document.getElementById('projects-cards');
    const projectCards = container.querySelectorAll('.card .desc p');

    projects.forEach((project, index) => {
        if (projectCards[index]) {
            projectCards[index].textContent = project.description;
        }
    });
}

// Controle de tema
function toggleTheme(theme) {
    currentTheme = theme;

    if (theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        document.getElementById('dark-btn').classList.add('active-button');
        document.getElementById('light-btn').classList.remove('active-button');
    } else {
        document.body.removeAttribute('data-theme');
        document.getElementById('light-btn').classList.add('active-button');
        document.getElementById('dark-btn').classList.remove('active-button');
    }

    localStorage.setItem('theme', theme);
}

// Controle de idioma
function changeLanguage(lang) {
    currentLang = lang;

    if (lang === 'en') {
        document.getElementById('en-btn').classList.add('active-button');
        document.getElementById('pt-btn').classList.remove('active-button');
        document.documentElement.lang = 'en';
    } else {
        document.getElementById('pt-btn').classList.add('active-button');
        document.getElementById('en-btn').classList.remove('active-button');
        document.documentElement.lang = 'pt-br';
    }

    updateContent();
    localStorage.setItem('language', lang);
}

// Event listeners
document.getElementById('light-btn').addEventListener('click', () => toggleTheme('light'));
document.getElementById('dark-btn').addEventListener('click', () => toggleTheme('dark'));
document.getElementById('pt-btn').addEventListener('click', () => changeLanguage('pt'));
document.getElementById('en-btn').addEventListener('click', () => changeLanguage('en'));

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Carregar preferências salvas
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLang = localStorage.getItem('language') || 'pt';

    currentTheme = savedTheme;
    currentLang = savedLang;

    toggleTheme(savedTheme);
    changeLanguage(savedLang);

    // Carregar traduções
    loadTranslations();
});