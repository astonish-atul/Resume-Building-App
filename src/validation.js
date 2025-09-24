
const {mailRegexPattern,linkedinProfileURLRegexPattern,phoneNumberRegexPattern} = require("../src/constants");


// Regular expression for validating LinkedIn URL
function IsLinkedInURL(link) {
  const regex = linkedinProfileURLRegexPattern;
  return regex.test(link);
}

// Regular expression for validating phone number
function IsValidPhoneNumber(phoneNumber) {
  const phoneNumberRegex = phoneNumberRegexPattern// Regex for +91 897888 format
  return phoneNumberRegex.test(phoneNumber);
}
function IsValidEmail(email) {
  const regexPattern = mailRegexPattern;
  return regexPattern.test(email);
}

// Validate the fields in the request body
function ValidateFields(req) {
  const {
    template_id,
    personal_information,
    job_title,
    career_objective,
    skills,
    education,
    experience,
    achievements
  } = req.body;

  // Check for missing required fields
  if (
    !template_id ||
    !personal_information ||
    !job_title ||
    !career_objective ||
    !skills ||
    !education ||
    !experience ||
    !achievements
  ) {
    return { error: 'Missing required fields' };
  }

  // Check the data type of template_id
  if (typeof template_id !== 'string') {
    return { error: 'template_id must be a string.' };
  }

  // Validate personal_information object
  if (
    typeof personal_information !== 'object' ||
    !personal_information.name ||
    !personal_information.last_name ||
    !personal_information.email_address ||
    !personal_information.phone_number ||
    !personal_information.linkedin_url ||
    !IsValidEmail(personal_information.email_address)||
    !IsLinkedInURL(personal_information.linkedin_url) ||
    !IsValidPhoneNumber(personal_information.phone_number)
  ) {
    return {
      error: 'personal_information must be an object with name, last_name, email_address, valid phone_number, and a valid LinkedIn URL and valid email'
    };
  }

  // Check if all personal_information fields are strings
  const personalInfoFields = ['name', 'last_name', 'email_address', 'phone_number', 'linkedin_url'];
  for (const field of personalInfoFields) {
    if (typeof personal_information[field] !== 'string') {
      return { error: `personal_information.${field} must be a string.` };
    }
  }

  // Validate job_title field
  if (typeof job_title !== 'string') {
    return { error: 'job_title must be a string.' };
  }

  // Validate career_objective field
  if (typeof career_objective !== 'string') {
    return { error: 'career_objective must be a string.' };
  }

  // Validate skills array
  if (!Array.isArray(skills) || !skills.every(skill => typeof skill === 'string')) {
    return { error: 'skills must be an array of strings.' };
  }

  // Validate education array
  if (!Array.isArray(education) || !education.every(edu => ValidateEducation(edu))) {
    return {
      error: 'education must be an array of objects with school_name, passing_year, and description fields of valid types.'
    };
  }

  // Validate experience array
  if (!Array.isArray(experience) || !experience.every(exp => ValidateExperience(exp))) {
    return {
      error: 'experience must be an array of objects with company_name, passing_year, and responsibilities fields of valid types.'
    };
  }

  // Validate achievements array
  if (!Array.isArray(achievements) || !achievements.every(ach => ValidateAchievement(ach))) {
    return {
      error: 'achievements must be an array of objects with field and awards fields of valid types.'
    };
  }

  return null; // No validation error
}

// Validate the education object
function ValidateEducation(edu) {
  if (
    typeof edu === 'object' &&
    edu.school_name &&
    edu.passing_year &&
    edu.description &&
    typeof edu.school_name === 'string' &&
    /^\d{4}-\d{4}$/.test(edu.passing_year) &&
    typeof edu.description === 'string'
  ) {
    return true;
  }
  return false;
}

// Validate the experience object
function ValidateExperience(exp) {
  if (
    typeof exp === 'object' &&
    exp.company_name &&
    exp.passing_year &&
    exp.responsibilities &&
    typeof exp.company_name === 'string' &&
    /^\d{4}-\d{4}$/.test(exp.passing_year) &&
    typeof exp.responsibilities === 'string'
  ) {
    return true;
  }
  return false;
}

// Validate the achievement object
function ValidateAchievement(ach) {
  if (
    typeof ach === 'object' &&
    ach.field &&
    ach.awards &&
    typeof ach.field === 'string' &&
    typeof ach.awards === 'string'
  ) {
    return true;
  }
  return false;
}

// Validate the headers in the request
function ValidateHeaders(req) {
  if (
    !req.headers['accept'] ||
    req.headers['accept'] !== 'application/pdf' ||
    !req.headers['content-type'] ||
    req.headers['content-type'] !== 'application/json'
  ) {
    return { error: 'Invalid headers' };
  }

  return null; // No validation error
}

module.exports = { ValidateFields, ValidateHeaders };
