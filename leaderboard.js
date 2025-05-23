
// User data with Indian names
const usersData = [
  { id: 1, name: "Aarav Patel", avatar: "AP", points: 2450, trees: 28, carbonSaved: 543.2, trend: 3, rank: 1, level: 8 },
  { id: 2, name: "Ishaan Sharma", avatar: "IS", points: 2310, trees: 25, carbonSaved: 478.5, trend: 0, rank: 2, level: 7 },
  { id: 3, name: "Ananya Singh", avatar: "AS", points: 2180, trees: 22, carbonSaved: 412.7, trend: 1, rank: 3, level: 7 },
  { id: 4, name: "Arjun Mehta", avatar: "AM", points: 1950, trees: 19, carbonSaved: 386.4, trend: -2, rank: 4, level: 6 },
  { id: 5, name: "Aditi Verma", avatar: "AV", points: 1820, trees: 18, carbonSaved: 342.8, trend: 2, rank: 5, level: 6 },
  { id: 6, name: "Vihaan Kumar", avatar: "VK", points: 1760, trees: 16, carbonSaved: 312.5, trend: -1, rank: 6, level: 5 },
  { id: 7, name: "Saanvi Gupta", avatar: "SG", points: 1650, trees: 15, carbonSaved: 298.3, trend: 0, rank: 7, level: 5 },
  { id: 8, name: "Reyansh Joshi", avatar: "RJ", points: 1540, trees: 14, carbonSaved: 265.7, trend: 1, rank: 8, level: 5 },
  { id: 9, name: "Anika Malhotra", avatar: "AM", points: 1480, trees: 12, carbonSaved: 242.9, trend: 3, rank: 9, level: 4 },
  { id: 10, name: "Kabir Reddy", avatar: "KR", points: 1420, trees: 12, carbonSaved: 231.6, trend: -3, rank: 10, level: 4 },
  { id: 11, name: "Myra Agarwal", avatar: "MA", points: 1380, trees: 11, carbonSaved: 214.2, trend: 0, rank: 11, level: 4 },
  { id: 12, name: "Advait Choudhary", avatar: "AC", points: 1320, trees: 10, carbonSaved: 201.8, trend: 2, rank: 12, level: 4 },
  { id: 13, name: "Kiara Kapoor", avatar: "KK", points: 1260, trees: 10, carbonSaved: 187.3, trend: -2, rank: 13, level: 3 },
  { id: 14, name: "Vivaan Desai", avatar: "VD", points: 1210, trees: 9, carbonSaved: 176.5, trend: 1, rank: 14, level: 3, isCurrentUser: true },
  { id: 15, name: "Riya Iyer", avatar: "RI", points: 1150, trees: 8, carbonSaved: 163.2, trend: -1, rank: 15, level: 3 },
];

// Toast notification functionality
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">${type === 'success' ? '✅' : '❌'}</span>
      <span class="toast-message">${message}</span>
    </div>
    <button class="toast-close">×</button>
  `;
  
  const toastContainer = document.getElementById('toast-container');
  toastContainer.appendChild(toast);
  
  // Add visible class to trigger animation
  setTimeout(() => {
    toast.classList.add('visible');
  }, 10);
  
  // Auto dismiss after 5 seconds
  const dismissTimeout = setTimeout(() => {
    dismissToast(toast);
  }, 5000);
  
  // Close button functionality
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    clearTimeout(dismissTimeout);
    dismissToast(toast);
  });
}

function dismissToast(toast) {
  toast.classList.remove('visible');
  // Remove from DOM after animation completes
  setTimeout(() => {
    toast.remove();
  }, 300);
}

// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  const tabContents = document.querySelectorAll('.tab-content');
  const searchInput = document.getElementById('searchInput');
  const timeRangeSelect = document.getElementById('timeRangeSelect');
  const remindMeBtn = document.getElementById('remindMeBtn');
  const joinChallengeBtn = document.getElementById('joinChallengeBtn');
  
  // Initialize tables
  renderPointsTable(usersData);
  renderTreesTable(usersData);
  renderCarbonTable(usersData);
  
  // Tab click event listeners
  tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      // Remove active class from all triggers and contents
      tabTriggers.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked trigger and corresponding content
      trigger.classList.add('active');
      const tabId = `${trigger.dataset.tab}-tab`;
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Search functionality
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredUsers = usersData.filter(user => 
      user.name.toLowerCase().includes(searchTerm)
    );
    
    renderPointsTable(filteredUsers);
    renderTreesTable(filteredUsers);
    renderCarbonTable(filteredUsers);
  });
  
  // Time range filter (placeholder - would be connected to API in real app)
  timeRangeSelect.addEventListener('change', () => {
    // In a real app, this would fetch different data based on the selected time range
    console.log(`Selected time range: ${timeRangeSelect.value}`);
    // For demo purposes, we'll just re-render the current data
    renderPointsTable(usersData);
    renderTreesTable(usersData);
    renderCarbonTable(usersData);
  });
  
  // Add event listeners for the buttons
  remindMeBtn.addEventListener('click', () => {
    showToast('You will be reminded about the Earth Day Challenge!', 'success');
  });
  
  joinChallengeBtn.addEventListener('click', () => {
    showToast('You have joined the Community Cleanup Challenge!', 'success');
  });
});

// Helper function for rank badges
function getRankBadge(rank) {
  if (rank === 1) {
    return `<span class="rank-badge rank-1">🏆</span>`;
  } else if (rank === 2) {
    return `<span class="rank-badge rank-2">🥈</span>`;
  } else if (rank === 3) {
    return `<span class="rank-badge rank-3">🥉</span>`;
  } else {
    return `<span class="rank-badge">${rank}</span>`;
  }
}

// Helper function for trend icons and text
function getTrendHTML(trend) {
  if (trend > 0) {
    return `<div class="trend trend-positive">
              <span>⬆️</span>
              <span>+${trend} positions</span>
            </div>`;
  } else if (trend < 0) {
    return `<div class="trend trend-negative">
              <span>⬇️</span>
              <span>${trend} positions</span>
            </div>`;
  } else {
    return `<div class="trend trend-neutral">No change</div>`;
  }
}

// Render points table
function renderPointsTable(users) {
  const tableBody = document.getElementById('pointsTableBody');
  tableBody.innerHTML = '';
  
  users.forEach(user => {
    const row = document.createElement('tr');
    if (user.isCurrentUser) {
      row.classList.add('current-user');
    }
    
    row.innerHTML = `
      <td class="text-center">${getRankBadge(user.rank)}</td>
      <td>
        <div class="user-cell">
          <div class="avatar">${user.avatar}</div>
          <div class="user-info">
            <span class="user-name">
              ${user.name}
              ${user.isCurrentUser ? '<span>(You)</span>' : ''}
            </span>
            <span class="user-meta">${user.trees} trees planted</span>
          </div>
        </div>
      </td>
      <td class="text-right">
        <span class="badge">Level ${user.level}</span>
      </td>
      <td class="text-right font-bold">${user.points.toLocaleString()}</td>
      <td class="text-right">
        ${getTrendHTML(user.trend)}
      </td>
    `;
    
    tableBody.appendChild(row);
  });
}

// Render trees table
function renderTreesTable(users) {
  const tableBody = document.getElementById('treesTableBody');
  tableBody.innerHTML = '';
  
  // Sort by trees planted
  const sortedUsers = [...users].sort((a, b) => b.trees - a.trees);
  
  sortedUsers.forEach((user, index) => {
    const row = document.createElement('tr');
    if (user.isCurrentUser) {
      row.classList.add('current-user');
    }
    
    row.innerHTML = `
      <td class="text-center">${index + 1}</td>
      <td>
        <div class="user-cell">
          <div class="avatar">${user.avatar}</div>
          <div class="user-name">
            ${user.name}
            ${user.isCurrentUser ? '<span>(You)</span>' : ''}
          </div>
        </div>
      </td>
      <td class="text-right">
        <span class="badge">Level ${user.level}</span>
      </td>
      <td class="text-right font-bold">${user.trees}</td>
    `;
    
    tableBody.appendChild(row);
  });
}

// Render carbon table
function renderCarbonTable(users) {
  const tableBody = document.getElementById('carbonTableBody');
  tableBody.innerHTML = '';
  
  // Sort by carbon saved
  const sortedUsers = [...users].sort((a, b) => b.carbonSaved - a.carbonSaved);
  
  sortedUsers.forEach((user, index) => {
    const row = document.createElement('tr');
    if (user.isCurrentUser) {
      row.classList.add('current-user');
    }
    
    row.innerHTML = `
      <td class="text-center">${index + 1}</td>
      <td>
        <div class="user-cell">
          <div class="avatar">${user.avatar}</div>
          <div class="user-name">
            ${user.name}
            ${user.isCurrentUser ? '<span>(You)</span>' : ''}
          </div>
        </div>
      </td>
      <td class="text-right">
        <span class="badge">Level ${user.level}</span>
      </td>
      <td class="text-right font-bold">${user.carbonSaved.toFixed(1)}</td>
    `;
    
    tableBody.appendChild(row);
  });
}
