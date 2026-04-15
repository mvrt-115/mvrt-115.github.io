// Leadership Year Selector
const officersData = {
  2025: {
    executives: [
      { name: "Sean Foo", role: "President", email: "president@mvrt.com" },
      { name: "Sara Chhabra", role: "VP of Operations", email: "operations@mvrt.com" },
      { name: "Neel Kansara", role: "VP of Engineering", email: "engineering@mvrt.com" }
    ],
    engineering: [
      { name: "Rohan Saxena", role: "Co-Director of Electrical", email: "electrical@mvrt.com" },
      { name: "Sreevatsa Pervela", role: "Co-Director of Electrical", email: "electrical@mvrt.com" },
      { name: "Pranav Gupta", role: "Co-Director of Software", email: "software@mvrt.com" },
      { name: "Ronav Dholakia", role: "Co-Director of Software", email: "software@mvrt.com" },
      { name: "Anna Zhang", role: "Co-Director of Mechanical", email: "mechanical@mvrt.com" },
      { name: "Chloe He", role: "Co-Director of Mechanical", email: "mechanical@mvrt.com" }
    ],
    operations: [
      { name: "Yash Guruprakash", role: "Co-Director of Marketing", email: "marketing@mvrt.com" },
      { name: "Advaith Anand", role: "Co-Director of Marketing", email: "outreach@mvrt.com" },
      { name: "Tanya Bandodkar", role: "Co-Director of Outreach", email: "outreach@mvrt.com" },
      { name: "Lisa Fan", role: "Co-Director of Outreach", email: "outreach@mvrt.com" },
      { name: "Jyothish Talari", role: "Director of Finance", email: "finance@mvrt.com" }
    ]
  },
  2024: {
    executives: [
      { name: "Alex Chen", role: "President", email: "president@mvrt.com" },
      { name: "Jordan Park", role: "VP of Operations", email: "operations@mvrt.com" },
      { name: "Taylor Kim", role: "VP of Engineering", email: "engineering@mvrt.com" }
    ],
    engineering: [
      { name: "Morgan Lee", role: "Co-Director of Electrical", email: "electrical@mvrt.com" },
      { name: "Casey Wong", role: "Co-Director of Electrical", email: "electrical@mvrt.com" },
      { name: "Riley Singh", role: "Co-Director of Software", email: "software@mvrt.com" },
      { name: "Avery Patel", role: "Co-Director of Software", email: "software@mvrt.com" },
      { name: "Quinn Murphy", role: "Co-Director of Mechanical", email: "mechanical@mvrt.com" },
      { name: "Jordan Liu", role: "Co-Director of Mechanical", email: "mechanical@mvrt.com" }
    ],
    operations: [
      { name: "Drew Anderson", role: "Co-Director of Marketing", email: "marketing@mvrt.com" },
      { name: "Skyler Brown", role: "Co-Director of Outreach", email: "outreach@mvrt.com" },
      { name: "Hayden Garcia", role: "Director of Finance", email: "finance@mvrt.com" }
    ]
  },
  2023: {
    executives: [
      { name: "Sam Rodriguez", role: "President" },
      { name: "Jamie Thompson", role: "VP of Operations" },
      { name: "Casey Martinez", role: "VP of Engineering" }
    ],
    engineering: [
      { name: "Jordan Wilson", role: "Co-Director of Electrical" },
      { name: "Taylor Davis", role: "Co-Director of Software" },
      { name: "Morgan Miller", role: "Co-Director of Mechanical" }
    ],
    operations: [
      { name: "Riley Brown", role: "Director of Marketing" },
      { name: "Avery Garcia", role: "Director of Outreach" },
      { name: "Quinn Lee", role: "Director of Finance" }
    ]
  },
  2022: {
    executives: [
      { name: "Drew Anderson", role: "President" },
      { name: "Skyler White", role: "VP of Operations" },
      { name: "Morgan Black", role: "VP of Engineering" }
    ],
    engineering: [
      { name: "Casey Green", role: "Co-Director of Electrical" },
      { name: "Jordan Gray", role: "Co-Director of Software" },
      { name: "Taylor Blue", role: "Co-Director of Mechanical" }
    ],
    operations: [
      { name: "Riley Red", role: "Director of Marketing" },
      { name: "Avery Yellow", role: "Director of Outreach" },
      { name: "Quinn Orange", role: "Director of Finance" }
    ]
  },
  2020: {
    executives: [
      { name: "Chris Park", role: "President" },
      { name: "Alex Kim", role: "VP of Operations" },
      { name: "Michelle Lee", role: "VP of Engineering" }
    ],
    engineering: [
      { name: "David Chen", role: "Director of Electrical" },
      { name: "Sarah Wang", role: "Director of Software" },
      { name: "Kevin Liu", role: "Director of Mechanical" }
    ],
    operations: [
      { name: "Emily Zhang", role: "Director of Marketing" },
      { name: "Michael Chen", role: "Director of Outreach" },
      { name: "Jessica Wu", role: "Director of Finance" }
    ]
  },
  2019: {
    executives: [
      { name: "Daniel Park", role: "President" },
      { name: "Sophia Kim", role: "VP of Operations" },
      { name: "Ryan Lee", role: "VP of Engineering" }
    ],
    engineering: [
      { name: "Eric Wang", role: "Director of Electrical" },
      { name: "Amy Chen", role: "Director of Software" },
      { name: "Jason Liu", role: "Director of Mechanical" }
    ],
    operations: [
      { name: "Nicole Zhang", role: "Director of Marketing" },
      { name: "Brian Wu", role: "Director of Outreach" },
      { name: "Laura Chen", role: "Director of Finance" }
    ]
  },
  2018: {
    executives: [
      { name: "Andrew Kim", role: "President" },
      { name: "Rachel Park", role: "VP of Operations" },
      { name: "Steven Lee", role: "VP of Engineering" }
    ],
    engineering: [
      { name: "Kevin Wang", role: "Director of Electrical" },
      { name: "Linda Chen", role: "Director of Software" },
      { name: "Mark Liu", role: "Director of Mechanical" }
    ],
    operations: [
      { name: "Susan Zhang", role: "Director of Marketing" },
      { name: "David Wu", role: "Director of Outreach" },
      { name: "Karen Chen", role: "Director of Finance" }
    ]
  }
};

export function initLeadership() {
  const yearButtons = document.querySelectorAll('.year-btn');
  const officersDisplay = document.getElementById('officers-display');
  
  if (!officersDisplay) return;
  
  function renderOfficers(year) {
    const data = officersData[year];
    if (!data) return;
    
    const hasEmail = year >= 2024;
    
    let html = `
      <div class="officers-section">
        <h3 class="text-center mb-6">Executives</h3>
        <div class="leaders-grid mb-8">
          ${data.executives.map(officer => `
            <div class="card leader-card">
              <h4>${officer.name}</h4>
              <p class="text-small">${officer.role}</p>
              ${hasEmail && officer.email ? `<a href="mailto:${officer.email}" class="text-small text-purple">${officer.email}</a>` : ''}
            </div>
          `).join('')}
        </div>
        
        <h3 class="text-center mb-6">Engineering Directors</h3>
        <div class="leaders-grid mb-8">
          ${data.engineering.map(officer => `
            <div class="card leader-card">
              <h4>${officer.name}</h4>
              <p class="text-small">${officer.role}</p>
              ${hasEmail && officer.email ? `<a href="mailto:${officer.email}" class="text-small text-purple">${officer.email}</a>` : ''}
            </div>
          `).join('')}
        </div>
        
        <h3 class="text-center mb-6">Operations Directors</h3>
        <div class="leaders-grid">
          ${data.operations.map(officer => `
            <div class="card leader-card">
              <h4>${officer.name}</h4>
              <p class="text-small">${officer.role}</p>
              ${hasEmail && officer.email ? `<a href="mailto:${officer.email}" class="text-small text-purple">${officer.email}</a>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    officersDisplay.innerHTML = html;
  }
  
  // Initial render
  renderOfficers(2025);
  
  // Button click handlers
  yearButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      yearButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const year = parseInt(btn.dataset.year);
      renderOfficers(year);
    });
  });
}
