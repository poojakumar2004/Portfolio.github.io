const homeBtn = document.getElementById("homeBtn");
const createBtn = document.getElementById("createBtn");
const editBtn = document.getElementById("editBtn");
const formSection = document.getElementById("formSection");
const homeSection = document.getElementById("homeSection");
const portfolioSection = document.getElementById("portfolioSection");
const form = document.getElementById("portfolioForm");

function showSection(sectionId) {
  [homeSection, formSection, portfolioSection].forEach(sec => sec.classList.add("hidden"));
  document.getElementById(sectionId).classList.remove("hidden");
}

// Show home
homeBtn.addEventListener("click", () => showSection("homeSection"));

// Create new
createBtn.addEventListener("click", () => {
  form.reset();
  document.getElementById("formTitle").innerText = "Create Your Portfolio";
  showSection("formSection");
});

// Edit existing
editBtn.addEventListener("click", () => {
  const data = JSON.parse(localStorage.getItem("portfolioData"));
  if (data) {
    showSection("formSection");
    document.getElementById("formTitle").innerText = "Edit Your Portfolio";

    document.getElementById("name").value = data.name;
    document.getElementById("email").value = data.email;
    document.getElementById("phone").value = data.phone;
    document.getElementById("about").value = data.about;
    document.getElementById("education").value = data.education;
    document.getElementById("experience").value = data.experience;
    document.getElementById("skills").value = data.skills.join(", ");
    document.getElementById("projects").value = data.projects.join(", ");
  } else {
    alert("No portfolio found! Please create one first.");
  }
});

// Save portfolio
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const file = document.getElementById("photo").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      savePortfolio(reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    const savedPhoto = JSON.parse(localStorage.getItem("portfolioData"))?.photo || "";
    savePortfolio(savedPhoto);
  }
});

function savePortfolio(photoData) {
  const portfolioData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    about: document.getElementById("about").value,
    education: document.getElementById("education").value,
    experience: document.getElementById("experience").value,
    skills: document.getElementById("skills").value.split(",").map(s => s.trim()),
    projects: document.getElementById("projects").value.split(",").map(p => p.trim()),
    photo: photoData
  };

  localStorage.setItem("portfolioData", JSON.stringify(portfolioData));
  displayPortfolio(portfolioData);
  showSection("portfolioSection");
}

// Display portfolio
function displayPortfolio(data) {
  document.getElementById("nameDisplay").innerText = data.name;
  document.getElementById("aboutDisplay").innerText = data.about;
  document.getElementById("emailDisplay").innerText = data.email;
  document.getElementById("phoneDisplay").innerText = data.phone;
  document.getElementById("educationDisplay").innerText = data.education;
  document.getElementById("experienceDisplay").innerText = data.experience;

  const skillsList = document.getElementById("skillsDisplay");
  const projectsList = document.getElementById("projectsDisplay");
  const photo = document.getElementById("photoDisplay");

  photo.src = data.photo || "https://via.placeholder.com/150";
  skillsList.innerHTML = "";
  projectsList.innerHTML = "";

  data.skills.forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill;
    skillsList.appendChild(li);
  });

  data.projects.forEach(project => {
    const li = document.createElement("li");
    li.textContent = project;
    projectsList.appendChild(li);
  });
}

// Auto-load saved portfolio
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("portfolioData"));
  if (saved) {
    displayPortfolio(saved);
    showSection("portfolioSection");
  }
};