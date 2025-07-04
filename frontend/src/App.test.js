// 📄 App.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// ✅ This is your test setup (mock fetch)
beforeEach(() => {
  global.fetch = jest.fn()
    .mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve([]) }) // Mock GET /tasks
    );
});

afterEach(() => {
  jest.clearAllMocks(); // Clean up after each test
});

// ✅ Then your actual test goes here
test('renders without tasks', async () => {
  render(<App />);

  const title = screen.getByText('Listas');
  expect(title).toBeInTheDocument();
});
