

// Issue Card Dynamic Start
async function getData() {
  const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await response.json();

  
  const issues = data.data || [];
  const openCount = issues.filter(issue => issue.status === "open").length;
  const closedCount = issues.filter(issue => issue.status === "closed").length;

  console.log(data);
  console.log(issues.length);
  console.log(openCount, closedCount);


  // Button Filtering Start

    let currentStatus = "all-filter-btn";

    const AllFilterBtn = document.getElementById("all-filter-btn");
    const OpenFilterBtn = document.getElementById("open-filter-btn");
    const ClosedFilterBtn = document.getElementById("closed-filter-btn");

    

    AllFilterBtn.addEventListener("click", () => {
        setActiveButton(AllFilterBtn);
        renderIssues(issues);
    });

    OpenFilterBtn.addEventListener("click", () => {
        setActiveButton(OpenFilterBtn);
        const openIssues = issues.filter(issue => issue.status === "open");
        renderIssues(openIssues);
        
    });

    ClosedFilterBtn.addEventListener("click", () => {
        setActiveButton(ClosedFilterBtn);
        const closedIssues = issues.filter(issue => issue.status === "closed");
        renderIssues(closedIssues);
    });

    function filterIssues(status) {

    if(status === "all"){
        renderIssues(issues);
        return;
    }

    const filtered = issues.filter(issue => issue.status === status);
    renderIssues(filtered);
    }

    AllFilterBtn.onclick = () => filterIssues("all");
    OpenFilterBtn.onclick = () => filterIssues("open");
    ClosedFilterBtn.onclick = () => filterIssues("closed");

    // Active Button Function
    function setActiveButton(activeBtn) {
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => {
        // reset all buttons to default
        btn.classList.remove("btn-primary");
        btn.classList.add("bg-[#FFFFFF]", "border-[#E4E4E7]", "text-[#64748B]");
    });

    // remove default style from active button
    activeBtn.classList.remove("bg-[#FFFFFF]", "border-[#E4E4E7]", "text-[#64748B]");

    console.log(openCount, closedCount);
    // add active style
    activeBtn.classList.add("btn-primary");

        if(activeBtn.id==="all-filter-btn"){
            // Dynamic Total Issue Counter Start
            const TotalIssue = document.getElementById("TotalIssue");
            TotalIssue.innerHTML = `<h2 class="font-bold text-2xl">${issues.length} Issues</h2><p>Track and manage your project issues</p>`
            // Dynamic Total Issue Counter End
        } else if(activeBtn.id==="open-filter-btn"){
            // Dynamic Total Issue Counter Start
            const TotalIssue = document.getElementById("TotalIssue");
            TotalIssue.innerHTML = `<h2 class="font-bold text-2xl">${openCount} Issues</h2><p>Track and manage your project issues</p>`
            console.log(openCount);
            // Dynamic Total Issue Counter End
        } else if(activeBtn.id==="closed-filter-btn"){
            // Dynamic Total Issue Counter Start
            const TotalIssue = document.getElementById("TotalIssue");
            TotalIssue.innerHTML = `<h2 class="font-bold text-2xl">${closedCount} Issues</h2><p>Track and manage your project issues</p>`
            // Dynamic Total Issue Counter End
        }
    }
    
    
renderIssues(issues);
setActiveButton(AllFilterBtn);


// Dynamic Issue Cards Start

    function renderIssues(issueList) {
    const container = document.getElementById("issueCard");
    container.innerHTML = "";

    issueList.forEach(issue => {
        const card = `
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
        container.innerHTML += card;
        // Dynamic Issue Cards End
    });

    
    
}


}

getData();



// Issue Card Dynamic End

async function modalData() {
  const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}");
  const data = await response.json();

  
  const mData = data.data || [];
  const issue_modal = document.getElementById("issue_modal");
    const modalDetails = mData.map(issue => {
        return `
        <div>
            <h2 class="text-2xl font-bold mb-4">${issue.title}</h2>
            <p class="text-gray-700 mb-4">${issue.description}</p>
            <p class="text-sm text-gray-500">#${issue.id} by ${issue.author}</p>
            <p class="text-sm text-gray-500">Assignee: ${issue.assignee}</p>
            <p class="text-sm text-gray-500">Created: ${new Date(issue.createdAt).toLocaleDateString()}</p>
            <p class="text-sm text-gray-500">Updated: ${new Date(issue.updatedAt).toLocaleDateString()}</p>
        </div>
        `;
    }).join("");
    issue_modal.innerHTML = modalDetails;
}

modalData();
// Modal Dynamic Start