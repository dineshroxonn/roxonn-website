# Contributing to Roxonn

## Welcome! 👋

Thank you for considering contributing to Roxonn! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct.

## How Can I Contribute?

### Reporting Bugs 🐛

1. Check if the bug has already been reported
2. Use the bug report template
3. Include:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details

### Suggesting Enhancements ✨

1. Check if the enhancement has been suggested
2. Use the feature request template
3. Include:
   - Clear use case
   - Expected behavior
   - Alternative solutions considered

### Code Contributions 💻

1. Fork the repository
2. Create a feature branch
3. Follow coding standards
4. Add tests
5. Update documentation
6. Submit a pull request

## Development Setup

1. Clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/roxonn-website.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment:

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

4. Start development server:

```bash
npm run dev
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid any type

### React

- Use functional components
- Implement proper error boundaries
- Add proper prop types
- Use hooks appropriately

### Styling

- Use Tailwind CSS
- Follow BEM naming convention for custom CSS
- Maintain responsive design

### Testing

- Write unit tests for utilities
- Add component tests
- Test accessibility
- Maintain good coverage

## Pull Request Process

1. Update documentation
2. Add tests
3. Update changelog
4. Get review from maintainers
5. Address feedback
6. Squash commits
7. Merge after approval

## Git Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests

Example:

```
feat(auth): add GitHub OAuth integration

- Add OAuth flow
- Store user tokens
- Add logout functionality

Closes #123
```

## Branch Naming

- Feature: feature/description
- Bug: fix/description
- Docs: docs/description
- Style: style/description

## Review Process

1. Automated checks must pass
2. Code review by maintainers
3. Documentation review
4. Testing verification
5. Final approval

## Release Process

1. Version bump
2. Update changelog
3. Create release notes
4. Tag release
5. Deploy to staging
6. Deploy to production

## Documentation

- Update README.md if needed
- Add JSDoc comments
- Update API documentation
- Update component documentation

## Questions?

- Open a discussion
- Join our Discord
- Check the FAQ

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
