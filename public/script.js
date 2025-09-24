const dictionary = {
    1: 'Basic Template',
    2: 'Link Template',
    3: 'Image Template'
    };

const carousel = document.getElementById('carouselExampleCaptions');
const carouselText = document.getElementById('carouselText');
var activeIndex=0;
carousel.addEventListener('slid.bs.carousel', function (event) {
 activeIndex = event.to;
captionDiv = document.querySelector('.carousel-item.active .carousel-caption');
carouselText.innerHTML = dictionary[activeIndex+1];
carouselText.classList.add('highlight');
});
carousel.addEventListener('slide.bs.carousel', function () {
carouselText.classList.remove('highlight');
});







// Function to create an input field with a placeholder
function createInputField(name, id, required, placeholder) {
const input = document.createElement('input');
input.type = 'text';
input.name = name;
input.id = id;
input.placeholder = placeholder; // Set the placeholder value
if (required) {
input.required = true;
}
return input;
}

// Function to create a textarea with a placeholder
function createTextArea(name, id, required, placeholder) {
const textarea = document.createElement('textarea');
textarea.name = name;
textarea.id = id;
textarea.placeholder = placeholder; // Set the placeholder value
if (required) {
textarea.required = true;
}
return textarea;
}

// Add placeholders to dynamically generated fields
function addSkill() {
const skillsContainer = document.getElementById('skillsContainer');
const skillInput = createInputField('skills[]', '', true, 'Enter a skill'); // Add placeholder
const deleteButton = createDeleteButton(skillInput);
skillsContainer.appendChild(skillInput);
skillsContainer.appendChild(deleteButton);
}

function addEducation() {
const educationContainer = document.getElementById('educationContainer');
const schoolNameInput = createInputField('education[][school_name]', '', true, 'Enter school name'); // Add placeholder
const passingYearInput = createInputField('education[][passing_year]', '', true, 'Enter your passing year 2018-2020'); // Add placeholder
const descriptionTextarea = createTextArea('education[][description]', '', true, 'Enter a description'); // Add placeholder
const deleteButton = createDeleteButton(schoolNameInput, passingYearInput, descriptionTextarea);
educationContainer.appendChild(schoolNameInput);
educationContainer.appendChild(passingYearInput);
educationContainer.appendChild(descriptionTextarea);
educationContainer.appendChild(deleteButton);
}

function addExperience() {
const experienceContainer = document.getElementById('experienceContainer');
const companyNameInput = createInputField('experience[][company_name]', '', true, 'Enter company name'); // Add placeholder
const positionInput = createInputField('experience[][passing_year]', '', true, 'Enter your passing year 2020-2021');  // Add placeholder
const responsibilitiesTextarea = createTextArea('experience[][responsibilities]', '', true, 'Enter responsibilities'); // Add placeholder
const deleteButton = createDeleteButton(companyNameInput, positionInput, responsibilitiesTextarea);
experienceContainer.appendChild(companyNameInput);
experienceContainer.appendChild(positionInput);
experienceContainer.appendChild(responsibilitiesTextarea);
experienceContainer.appendChild(deleteButton);
}

function addAchievement() {
const achievementsContainer = document.getElementById('achievementsContainer');
const fieldInput = createInputField('achievements[][field]', '', true, 'Enter field'); // Add placeholder
const awardsInput = createInputField('achievements[][awards]', '', true, 'Enter awards'); // Add placeholder
const deleteButton = createDeleteButton(fieldInput, awardsInput);
achievementsContainer.appendChild(fieldInput);
achievementsContainer.appendChild(awardsInput);
achievementsContainer.appendChild(deleteButton);
}

// Add placeholders to form inputs
const nameInput = document.getElementById('name');
nameInput.placeholder = 'Enter your Name';

const lastNameInput = document.getElementById('last_name');
lastNameInput.placeholder = 'Enter your Last Name';

const emailInput = document.getElementById('email_address');
emailInput.placeholder = 'Enter your email address';

const phoneNumberInput = document.getElementById('phone_number');
phoneNumberInput.placeholder = 'Ex +91 7013...';

const linkedInInput = document.getElementById('linkedin_url');
linkedInInput.placeholder = 'Enter your LinkedIn URL';

const jobTitleInput = document.getElementById('job_title');
jobTitleInput.placeholder = 'Enter your job title';

const careerObjectiveTextarea = document.getElementById('career_objective');
careerObjectiveTextarea.placeholder = 'Enter your career objective';


function createDeleteButton(...deleteElements) {
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
    deleteElements.forEach((element) => {
        element.parentNode.removeChild(element);
    });
    deleteButton.parentNode.removeChild(deleteButton);
    });
    return deleteButton;
}

const form = document.getElementById('dynamicForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const jsonData = {
    template_id:-1,
    personal_information: {},
    job_title:"",
    career_objective:"",
    skills: [],
    education: [],
    experience: [],
    achievements: []
    };

    educationIndex=0;
    experienceIndex=0;
    achievementIndex=0;
    for (const [key, value] of formData.entries()) {
        
    const keys = key.split(/\[|\]\[|\]/).filter((entry) => entry !== '');
    const category = keys.shift();
    //   console.log(category,key,keys,value);
    if (category === 'personal_information') {
        const fieldName = keys[0];
        jsonData.personal_information[fieldName] = value;
    } else if(category==='job_title')
    {
        jsonData.job_title=value;
    }
    else if(category==='career_objective')
    {
       jsonData.career_objective=value;
    }
    else if (category === 'skills') {
        jsonData.skills.push(value);
    } 

    //correct code

    else if (category === 'education') {
        const fieldName = keys[0];
        const fieldValue = formData.get(key);
        const educationItem = jsonData.education[educationIndex] || {};
        educationItem[fieldName] = fieldValue;
        jsonData.education[educationIndex] = educationItem;
        if( Object.keys(educationItem).length===3)
        {
            educationIndex+=1;
        
        }
    } else if (category === 'experience') {
        const fieldName = keys[0];
        const fieldValue = formData.get(key);
        const experienceItem = jsonData.experience[experienceIndex] || {};
        experienceItem[fieldName] = fieldValue;
        jsonData.experience[experienceIndex] = experienceItem;
        if( Object.keys(experienceItem).length===3)
        {
        experienceIndex+=1;
        }
    } else if (category === 'achievements') {
        const fieldName = keys[0];
        const fieldValue = formData.get(key);
        const achievementItem = jsonData.achievements[achievementIndex] || {};
        achievementItem[fieldName] = fieldValue;
        jsonData.achievements[achievementIndex] = achievementItem;
        if( Object.keys(achievementItem).length===2)
        {
        achievementIndex+=1;
        }
    }
    }
    // Select all buttons in the form
    const buttons = form.querySelectorAll('button');

    buttons.forEach(button => {
        button.disabled = true;
      });
      const loadingIcon = document.getElementById('loadingIcon');
      loadingIcon.style.display = 'block';
    jsonData.template_id=(activeIndex+1).toString();
    console.log('Form Data:', jsonData);
    fetch('http://localhost:8080/resume', {
        method: 'POST',
        headers: {
          'Accept':'application/pdf',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      })
      // Disable all buttons
      .then(response => {
        if (response.ok) {
            return response.blob();
        } else {
            throw new Error('Invalid data');
        }
    })
    .then(blob => {
        // Handle the successful response
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        console.log(url);
        console.log(blob);
        buttons.forEach(button => {
            button.disabled = false;
        });
        loadingIcon.style.display = 'none';
        // Alternatively, you can set the URL as the source of an iframe to display it within the page
        // const iframe = document.createElement('iframe');
        // iframe.src = url;
        // document.body.appendChild(iframe);
    })
    .catch(error => {
        // Handle the error response
        console.error('Error:', error);
        buttons.forEach(button => {
            button.disabled = false;
          });
        // Display an error message to the user
        alert(error);
    });
  
});