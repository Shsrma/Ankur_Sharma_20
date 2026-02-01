# Contributing to Cyber Canvas

First off, thank you for considering contributing to this project! It's people like you that make this project such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check if the issue already exists. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate those steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots or animated GIFs if possible**
- **Include your environment** (OS, Node.js version, etc.)

### Suggesting Enhancements

When creating enhancement suggestions, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

- Fill in the required template
- Follow the TypeScript and JavaScript styleguide
- Include appropriate test cases
- Update documentation as needed
- End all files with a newline

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/cyber-canvas.git`
3. Add upstream: `git remote add upstream https://github.com/Shsrma/cyber-canvas.git`
4. Create a branch: `git checkout -b feature/my-feature`

### Frontend Development
```bash
npm install
npm run dev
```

### Backend Development
```bash
cd backend
npm install
npm run dev
```

## Styleguide

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - 🎨 when improving the format/structure of the code
  - 🐛 when fixing a bug
  - 🚀 when improving performance
  - 📝 when writing docs
  - ✅ when adding tests
  - 🔒 when dealing with security
  - ⬆️ when upgrading dependencies

### Code Styleguide

#### TypeScript/JavaScript
```typescript
// Use const by default, let when needed, avoid var
const message = 'Hello World';

// Use arrow functions when possible
const add = (a: number, b: number): number => a + b;

// Use descriptive variable names
const isValidEmail = true;

// Add JSDoc comments for functions
/**
 * Validates an email address
 * @param email - The email to validate
 * @returns True if valid, false otherwise
 */
const validateEmail = (email: string): boolean => {
  // implementation
};

// Keep lines under 100 characters
// Use meaningful whitespace
```

#### React Components
```typescript
// Functional components with TypeScript
interface Props {
  title: string;
  onClick?: () => void;
}

export const MyComponent: React.FC<Props> = ({ title, onClick }) => {
  return <button onClick={onClick}>{title}</button>;
};
```

#### CSS/Tailwind
- Use Tailwind classes instead of custom CSS when possible
- Keep component styles scoped
- Use meaningful class names
- Maintain consistency with existing patterns

## Testing

- Write tests for new features
- Update tests for modified features
- Run the full test suite before submitting a PR: `npm run test`
- Maintain or improve code coverage

## Documentation

- Keep README.md up to date
- Document any new API endpoints
- Include examples for new features
- Add inline comments for complex logic

## Additional Notes

### Issue and Pull Request Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested

## Attribution

These contribution guidelines are adapted from the Atom project's contribution guidelines.

---

Questions? Feel free to reach out to ankur.sharma2003920@gmail.com
