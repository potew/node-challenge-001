const checkLoginFields = (email, password) => {
  switch (true) {
    case email === '': ({ message: '"email" is not allowed to be empty' });
    case password === '': ({ message: '"password" is not allowed to be empty' });
    case !email: ({ message: '"email" is required' });
    case !password: ({ message: '"password" is required' });
    default:
      false;
  }
};

const validateAuthor = ({ name, email, password, picture }) => {
  switch (true) {
    case name.length < 5:
      ({ message: '"name" length must be at least 8 characters long' });
    case !email:
      ({ message: '"email" is required' });
    case !(/([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm).test(email):
      ({ message: '"email" must be a valid address' });
    case !password:
      ({ message: '"password" is required' });
    case !picture:
      ({ message: 'The path to your avatar is missing' });
    case password.length < 6:
      ({ message: '"password" length must be at least 6 characters long' });
    default:
      false;
  }    
};

const validatePostData = ({category, title, summary, first_paragraph, body}) => {
  switch (true) {
    case !title || title === '':
      ({ message: '"title" is required' });
    case !category || category === '':
      ({ message: '"category" is required' });
    case !summary || summary === '':
      ({ message: '"summary" is required' });
    case !first_paragraph || first_paragraph === '':
      ({ message: 'The first paragraph is required' });
    case !body || body === '':
      ({ message: 'A body is required' });
    default:
      false;
  }
};

module.exports = {
  checkLoginFields,
  validatePostData,
  validateAuthor,
};
