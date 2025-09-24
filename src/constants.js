const mailRegexPattern=/^[\w\.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
const linkedinProfileURLRegexPattern=/^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company|groups|edu|feed)\/[a-zA-Z0-9\-]+\/?$/;
const phoneNumberRegexPattern= /^\+\d{1,3}\s\d{4,}$/;

const docxPaths = {
    "1": "./Templates/Template1/BasicTemplate.docx",
    "2": "./Templates/Template2/LinkTemplate.docx",
    "3": "./Templates/Template3/ImageTemplate.docx"
  };
const resumeSuccessData= {
  "template_id": "1",
  "personal_information": {
    "name": "Lorem",
    "last_name": "ipsum",
    "email_address": "ipsum@adobe.com",
    "phone_number": "+91 4454851515",
    "linkedin_url": ""
  },
  "job_title": "Software Development Engineer",
  "career_objective": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper.",
  "skills": [
    "Strong interpersonal",
    "communication skills",
    "Leadership",
    "Poised under pressure"
  ],
  "education": [
    {
      "school_name": "School",
      "passing_year": "2010-2010",
      "description": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by  injected humour, or randomised words which don't look even slightly believable."
    },
    {
      "school_name": "College",
      "passing_year": "2038-2039",
      "description": "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc"
    }
  ],
  "experience": [
    {
      "company_name": "Adobe",
      "passing_year": "2019-2018",
      "responsibilities": "It is a long established fact that a reader will be distracted by the readable content. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod"
    }
  ],
  "achievements": [
    {
      "field": "Academics",
      "awards": "Lorem ipsum dolor sit amet"
    },
    {
      "field": "Sports",
      "awards": "consectetuer adipiscing elit"
    }
  ]
};


const resumeFieldTypes={
  template_id: "string",
  personal_information: "object",
  job_title: "string",
  career_objective: "string",
  skills: "array",
  education: "array",
  experience: "array",
  achievements: "array"
}
const personalInformationFieldTypes={
  name:"string",
  last_name:"string",
  email_address:"string",
  phone_number:"string",
  linkedin_url:"string"
}

const educationFieldTypes={
  school_name:"string",
  passing_year:"string",
  description:"string"
} 
const experienceFieldTypes={
  company_name:"string",
  passing_year:"string",
  responsibilities:"string"
} 
const achievementFieldTypes={
  field:"string",
  awards:"string"
}

const notMatchingLinkedInURLs = [
  'https://linkedin.com',
  'http://www.linkedin.com',
  'https://www.linkedin.com/',
  'https://linkedin.com/in/',
  'https://www.linkedin.com/in/john-doe/',
  'https://linkedin.com/pub/',
  'https://www.linkedin.com/pub/john-doe/',
  'https://linkedin.com/company/',
  'https://www.linkedin.com/company/example-company/',
  'https://www.linked.com/company/example-company/',
  'https://linkedin.com/groups/',
  'https://www.linkedin.com/groups/example-group/',
  'https://linkedin.com/edu/',
  'https://www.linkedin.com/edu/school-name/',
  'https://linkedin.com/feed/',
  'https://www.linkedin.com/feed/news/',
  'https://www.google.com/'
];

const notMatchingPhoneNumbers=[
  "+1 123",
  "1233455",
  "123",
  "+12 89",
  "+1 "];

const notMatchingEmails=[
  "23823",
  "absdwqd",
  "asa@HSDUIFH",
  "MOSHIT_HH@FH.com",
  "88787@21r3f.c",
]

module.exports = {
    mailRegexPattern,
    linkedinProfileURLRegexPattern,
    phoneNumberRegexPattern,
    docxPaths,
    resumeSuccessData,
    resumeFieldTypes,
    personalInformationFieldTypes,
    educationFieldTypes,
    experienceFieldTypes,
    achievementFieldTypes,
    notMatchingLinkedInURLs,
    notMatchingPhoneNumbers,
    notMatchingEmails
};
  
