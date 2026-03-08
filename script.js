// Button Filtering Start

const AllFilterBtn = document.getElementById("all-filter-btn");
const OpenFilterBtn = document.getElementById("open-filter-btn");
const ClosedFilterBtn = document.getElementById("closed-filter-btn");

// Button Filtering End

// Issue Card Dynamic Start
async function getData() {
  const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await response.json();

  
  const issues = data.data || [];

  console.log(data);
  console.log(issues.length);

    // Dynamic Total Issue Counter Start
    const TotalIssue = document.getElementById("TotalIssue");
    TotalIssue.innerHTML = `<h2 class="font-bold text-2xl">${issues.length} Issues</h2><p>Track and manage your project issues</p>`
    // Dynamic Total Issue Counter End

    // Dynamic Issue Cards Start

    const issueCard = document.getElementById("issueCard");
    const issueCards = issues.map(issue => {
        return `
        <div class="border border-gray-300 rounded-md p-4 mb-4">
            <h3 class="text-lg font-semibold mb-2">${issue.title}</h3>
            <p class="text-gray-600 mb-2">${issue.description}</p>
            <p class="text-sm text-gray-500">Status: ${issue.status}</p>
        </div>
        `;
    }).join("");

    issueCard.innerHTML = issueCards;

    // Dynamic Issue Cards End


}

getData();


// Issue Card Dynamic End