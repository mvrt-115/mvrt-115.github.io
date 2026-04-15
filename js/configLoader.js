// Config and Data Loader
// Loads site configuration from data/config.txt and yearly data from data/yearly/

export async function loadConfig() {
  try {
    const response = await fetch('data/config.txt');
    const text = await response.text();
    return parseConfig(text);
  } catch (error) {
    console.error('Error loading config:', error);
    return null;
  }
}

export async function loadYearData(year) {
  try {
    const response = await fetch(`data/yearly/${year}.txt`);
    const text = await response.text();
    return parseYearData(text);
  } catch (error) {
    console.error(`Error loading year ${year}:`, error);
    return null;
  }
}

function parseConfig(text) {
  const config = {
    currentYear: 2025,
    currentGame: 'Reefscape',
    outreachActive: [],
    outreachDiscontinued: [],
    mentorsCurrent: [],
    mentorsPast: [],
    homeSlides: []
  };
  
  let currentSection = null;
  
  text.split('\n').forEach(line => {
    line = line.trim();
    
    // Skip comments and empty lines
    if (!line || line.startsWith('#')) return;
    
    // Parse key=value pairs
    if (line.includes('=') && !line.startsWith('[')) {
      const [key, value] = line.split('=').map(s => s.trim());
      if (key === 'CURRENT_YEAR') config.currentYear = parseInt(value);
      if (key === 'CURRENT_GAME') config.currentGame = value;
      return;
    }
    
    // Section headers
    if (line === '[OUTREACH_ACTIVE]') {
      currentSection = 'outreachActive';
      return;
    }
    if (line === '[OUTREACH_DISCONTINUED]') {
      currentSection = 'outreachDiscontinued';
      return;
    }
    if (line === '[MENTORS_CURRENT]') {
      currentSection = 'mentorsCurrent';
      return;
    }
    if (line === '[MENTORS_PAST]') {
      currentSection = 'mentorsPast';
      return;
    }
    if (line === '[HOME_SLIDES]') {
      currentSection = 'homeSlides';
      return;
    }
    
    // Add to current section
    if (currentSection && line) {
      config[currentSection].push(line);
    }
  });
  
  return config;
}

function parseYearData(text) {
  const data = {
    year: null,
    game: '',
    robotName: '',
    executives: [],
    engineering: [],
    operations: [],
    memberCount: 0,
    awards: []
  };
  
  let currentSection = null;
  
  text.split('\n').forEach(line => {
    line = line.trim();
    
    if (!line || line.startsWith('#')) return;
    
    // Parse key=value
    if (line.includes('=') && !line.startsWith('[')) {
      const [key, value] = line.split('=').map(s => s.trim());
      if (key === 'YEAR') data.year = parseInt(value);
      if (key === 'GAME') data.game = value;
      if (key === 'ROBOT_NAME') data.robotName = value;
      if (key === 'MEMBER_COUNT') data.memberCount = parseInt(value);
      return;
    }
    
    // Section headers
    if (line === '[EXECUTIVES]') {
      currentSection = 'executives';
      return;
    }
    if (line === '[ENGINEERING]') {
      currentSection = 'engineering';
      return;
    }
    if (line === '[OPERATIONS]') {
      currentSection = 'operations';
      return;
    }
    if (line === '[AWARDS]') {
      currentSection = 'awards';
      return;
    }
    
    // Parse person data: name|role|email|photoPath
    if (currentSection && line.includes('|')) {
      const parts = line.split('|');
      data[currentSection].push({
        name: parts[0],
        role: parts[1] || '',
        email: parts[2] || '',
        photo: parts[3] || ''
      });
      return;
    }
    
    // Simple line items (awards)
    if (currentSection === 'awards' && line) {
      data.awards.push(line);
    }
  });
  
  return data;
}

// Team photo paths by year (handles different extensions)
const teamPhotos = {
  1997: 'assets/images/team/team-1997.jpg',
  1998: 'assets/images/team/team-1998.jpg',
  1999: 'assets/images/team/team-1999.webp',
  2000: 'assets/images/team/team-2000.webp',
  2001: 'assets/images/team/team-2001.webp',
  2002: 'assets/images/team/team-2002.webp',
  2003: 'assets/images/team/team-2003.webp',
  2004: 'assets/images/team/team-2004.webp',
  2005: 'assets/images/team/team-2005.webp',
  2006: 'assets/images/team/team-2006.webp',
  2007: 'assets/images/team/team-2007.webp',
  2008: 'assets/images/team/team-2008.webp',
  2009: 'assets/images/team/team-2009.webp',
  2010: 'assets/images/team/team-2010.webp',
  2011: 'assets/images/team/team-2011.webp',
  2012: 'assets/images/team/team-2012.webp',
  2013: 'assets/images/team/team-2013.webp',
  2014: 'assets/images/team/team-2014.webp',
  2015: 'assets/images/team/team-2015.webp',
  2016: 'assets/images/team/team-2016.webp',
  2017: 'assets/images/team/team-2017.webp',
  2018: 'assets/images/team/team-2018.webp',
  2019: 'assets/images/team/team-2019.webp',
  2020: 'assets/images/team/team-2020.png',
  2021: 'assets/images/team/team-2020.png', // Uses 2020 photo as fallback
  2022: 'assets/images/team/team-2022.png',
  2023: 'assets/images/team/team-2023.JPG',
  2024: 'assets/images/team/team-2024.JPG',
  2025: 'assets/images/team/team-2025-temp.png'
};

// Team history descriptions by year
const yearHistory = {
  1997: { title: 'Team Founded', desc: 'MVRT was established by a few friends looking to venture into the technological world.' },
  2000: { title: 'Early Years', desc: 'Building the foundation of our team culture and engineering practices.' },
  2005: { title: 'Growing Strong', desc: 'Expansion of our team size and first major competition successes.' },
  2010: { title: 'First Decade', desc: 'Celebrating 10 years of innovation and community impact.' },
  2015: { title: 'Expansion', desc: 'Major growth in membership and outreach programs launched.' },
  2018: { title: 'El Toro XXI', desc: 'Power Up season with Chairman\'s Award Finalist recognition.' },
  2019: { title: 'El Toro XXII', desc: 'Deep Space season - Winner at Sacramento Regional.' },
  2020: { title: 'El Toro XXIII', desc: 'Infinite Recharge with Innovation in Control Award.' },
  2021: { title: 'Virtual Season', desc: 'At Home Challenges during the pandemic year.' },
  2022: { title: 'El Toro XXV', desc: 'Rapid React season - Innovation in Control Award.' },
  2023: { title: 'El Toro XXVI', desc: 'Charged Up - World Championship Qualifier!' },
  2024: { title: 'El Toro XXVII', desc: 'Crescendo - Winner at Sacramento Regional.' },
  2025: { title: 'El Toro XXVIII', desc: 'Reefscape - Continuing the legacy.' }
};

// Initialize leadership from config files
export async function initLeadershipFromConfig() {
  const yearButtons = document.querySelectorAll('.year-btn');
  const combinedDisplay = document.getElementById('year-combined-display');
  
  if (!combinedDisplay) return;
  
  async function renderYear(year) {
    const data = await loadYearData(year);
    const history = yearHistory[year] || { title: `Year ${year}`, desc: '' };
    
    const allOfficers = [
      ...(data?.executives || []),
      ...(data?.engineering || []),
      ...(data?.operations || [])
    ];
    
    // Load mentors from config
    const config = await loadConfig();
    const mentorsCurrent = config?.mentorsCurrent || [];
    const mentorsPast = config?.mentorsPast || [];
    
    const teamPhoto = teamPhotos[year] || teamPhotos[2024];
    
    const awardsHtml = data?.awards?.length ? `
      <div class="year-season-awards">
        ${data.awards.map(a => `<span class="award-tag">${a}</span>`).join('')}
      </div>
    ` : '';
    
    let html = `
      <!-- Year Cards Grid -->
      <div class="year-cards-grid">
        
        <!-- Season Info Card -->
        <div class="year-card year-card-info">
          <span class="year-card-year">${year}</span>
          <h3>${history.title}</h3>
          <p class="text-body text-sm">${history.desc}</p>
          <div class="year-card-badges">
            ${data?.game ? `<span class="badge badge-purple">${data.game}</span>` : ''}
            ${data?.robotName ? `<span class="badge badge-outline">${data.robotName}</span>` : ''}
          </div>
          ${awardsHtml}
        </div>
        
        <!-- Team Photo Card -->
        <div class="year-card year-card-photo">
          <div class="year-team-photo-wrapper">
            <img src="${teamPhoto}" alt="Team ${year}" onerror="this.src='${teamPhotos[2024]}'" id="team-photo-${year}">
            <button class="view-photo-btn" data-photo="${teamPhoto}" data-year="${year}">View Photo</button>
          </div>
        </div>
        
        <!-- Leadership Card -->
        <div class="year-card year-card-leadership">
          <h3>Leadership Team</h3>
          <div class="officers-list">
            ${allOfficers.map(officer => `
              <div class="officer-item">
                ${officer.photo ? `<img src="${officer.photo}" alt="${officer.name}" onerror="this.style.display='none'">` : '<div class="officer-placeholder-sm">👤</div>'}
                <div class="officer-details">
                  <span class="officer-name">${officer.name}</span>
                  <span class="officer-role">${officer.role}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Mentors Card -->
        <div class="year-card year-card-mentors">
          <h3>Mentors</h3>
          <div class="mentors-list">
            ${mentorsCurrent.map(mentor => {
              const isHead = mentor.includes('Head Mentor');
              const name = mentor.replace(' (Head Mentor)', '');
              return `
                <div class="mentor-item ${isHead ? 'mentor-item-head' : ''}">
                  <span class="mentor-name">${name}</span>
                  ${isHead ? '<span class="mentor-tag">Head</span>' : ''}
                </div>
              `;
            }).join('')}
            <div class="mentors-divider"></div>
            ${mentorsPast.map(mentor => `
              <div class="mentor-item mentor-item-past">
                <span class="mentor-name">${mentor}</span>
                <span class="mentor-tag">Past</span>
              </div>
            `).join('')}
          </div>
        </div>
        
      </div>
      
      <!-- Photo Modal -->
      <div class="photo-modal" id="photo-modal">
        <div class="photo-modal-content">
          <button class="photo-modal-close">&times;</button>
          <img src="" alt="Team Photo" id="photo-modal-img">
          <p class="photo-modal-caption"></p>
        </div>
      </div>
    `;
    
    combinedDisplay.innerHTML = html;
  }
  
  // Load initial year from config
  const config = await loadConfig();
  const initialYear = config ? config.currentYear : 2025;
  renderYear(initialYear);
  
  // Update active button
  yearButtons.forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.year) === initialYear);
  });
  
  // Button click handlers
  yearButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      yearButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const year = parseInt(btn.dataset.year);
      renderYear(year);
    });
  });
  
  // Photo modal handlers (delegated to container)
  combinedDisplay.addEventListener('click', (e) => {
    // View Photo button clicked
    if (e.target.classList.contains('view-photo-btn')) {
      const photoUrl = e.target.dataset.photo;
      const year = e.target.dataset.year;
      const modal = combinedDisplay.querySelector('#photo-modal');
      const modalImg = combinedDisplay.querySelector('#photo-modal-img');
      const modalCaption = combinedDisplay.querySelector('.photo-modal-caption');
      
      modalImg.src = photoUrl;
      modalCaption.textContent = `Team ${year}`;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    // Close button clicked
    if (e.target.classList.contains('photo-modal-close')) {
      const modal = combinedDisplay.querySelector('#photo-modal');
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Click outside modal content
    if (e.target.classList.contains('photo-modal')) {
      e.target.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = combinedDisplay.querySelector('#photo-modal');
      if (modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
}
