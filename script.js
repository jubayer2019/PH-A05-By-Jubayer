
// Modal Dynamic Start
const loadWordDetail = async(id) => {
        const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        displayModal(data);
};

// Manage Spinner
const manageSpinner = (status)=>{
    if(status==true){
        document.getElementById("loadingSpinner").classList.remove("hidden");
        document.getElementById("cardContainer ").classList.add("hidden");
    }else{
        document.getElementById("cardContainer ").classList.remove("hidden");
        document.getElementById("loadingSpinner").classList.add("hidden");
    }
};


const displayModal = (data) => {
    // console.log(data);
    const issue_modal = document.getElementById("modal_container");
    
    issue_modal.innerHTML = `
    <h2 class="font-bold text-[24px]">${data.data.title}</h2>
    <div class="flex items-center gap-4 py-4">
    ${data.data.status === "open" ? '<div class="badge badge-success rounded-full">Openned</div>' : '<div class="badge badge-primary rounded-full">Closed</div>'}
    <span>•</span><p class="text-[#64748B] text-[12px]">Open by ${data.data.author}</p>
    <span>•</span><p class="text-[#64748B] text-[12px]">${new Date(data.data.createdAt).toLocaleDateString()}</p>
    </div>
    <div class="batch flex items-center gap-1 mb-2 uppercase">
        <div class="badge badge-outline rounded-full bg-[#FFF8DB] badge-warning text-[10px] font-bold">${data.data.labels[0]}</div>
        <div class="badge badge-outline rounded-full bg-[#FFF8DB] badge-warning text-[10px] font-bold">${data.data.labels[1]}</div>
    </div>
    <p class="text-[#64748B] py-5 text-[12px]">${data.data.description}</p>

    <div class="bg-[#F8FAFC] rounded-md p-3 flex justify-baseline items-center gap-[35%]">
        <div>
            <p class="text-[#64748B] text-[12px] mb-2">Assignee:</p>
            <h2 class="font-semibold text-[16px]">${data.data.assignee}</h2>
        </div>
        <div>
            <p class="text-[#64748B] text-[12px] mb-2">Priority:</p>
            ${data.data.priority === "high" ? '<p class="bg-red-200 rounded-full py-1 px-7 text-red-500 font-semibold">HIGH</p>' : data.data.priority === "medium" ? '<p class="bg-yellow-200 rounded-full py-1 px-7 text-[#D97706] font-semibold">MEDIUM</p>' : '<p class="bg-[#EEEFF2] rounded-full py-1 px-7 text-[#9CA3AF] font-semibold">LOW</p>'}

        </div>
    </div>

    `;
    // manageSpinner(false);
    document.getElementById("text_modal").showModal();
    
};


// Issue Card Dynamic Start
async function getData() {
  const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await response.json();
//   manageSpinner(true);

//   Counting Open and Closed Issues Start
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
        
        <div onclick="loadWordDetail(${issue.id})" class=" shadow rounded-t-md p-4 bg-white border-t-4 ${issue.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]"}">
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

    // manageSpinner(false);
    
}


}

getData();


