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
        <div>
        
        <div class=" shadow rounded-t-md p-4 bg-white border-t-4 ${issue.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]"}">
                    <div class="TopIcon flex justify-between items-center mb-3">
                        ${issue.status === "open" ? '<img src="./assets/Open-Status.png" alt="">' : '<img src="./assets/Closed- Status .png" alt="">'}
                        ${issue.priority === "high" ? '<p class="bg-red-200 rounded-full py-1 px-7 text-red-500 font-semibold">HIGH</p>' : issue.priority === "medium" ? '<p class="bg-yellow-200 rounded-full py-1 px-7 text-[#D97706] font-semibold">MEDIUM</p>' : '<p class="bg-[#EEEFF2] rounded-full py-1 px-7 text-[#9CA3AF] font-semibold">LOW</p>'}
                    </div>
                    <h3 class="text-lg font-semibold mb-2">${issue.title.length > 25 
                    ? issue.title.slice(0,25) + "..." 
                    : issue.title}</h3>
                    <p class="text-gray-600 mb-2">${issue.description.length > 50 
                    ? issue.description.slice(0,50) + "..." 
                    : issue.description}</p>
                    <div class="batch flex items-center gap-1 mb-2 uppercase">
                        <div class="badge badge-outline rounded-full bg-[#FFF8DB] badge-warning text-[10px] font-bold">${issue.labels[0]}</div>
                        <div class="badge badge-outline rounded-full bg-[#FFF8DB] badge-warning text-[10px] font-bold">${issue.labels[1]}</div>
                        
                    </div>
                    
                </div>
                <div class="shadow mb-4 flex justify-between items-center rounded-b-md p-4 bg-white border-t border-gray-200">
                    <div>
                        <p class="text-sm text-gray-500">#${issue.id} by ${issue.author}</p>
                        <p class="text-sm text-gray-500">Assignee: ${issue.assignee}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-gray-500">${new Date(issue.createdAt).toLocaleDateString()}</p>
                        <p class="text-sm text-gray-500">Updated: ${new Date(issue.updatedAt).toLocaleDateString()}</p>
                    </div>
                    
                </div>

        </div>
        `;
    }).join("");

    issueCard.innerHTML = issueCards;

    // Dynamic Issue Cards End


}

getData();


// Issue Card Dynamic End