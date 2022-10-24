export const modelMock = {
  create: jest.fn(),
  find: jest.fn(() => ({ exec: jest.fn() })),
  findById: jest.fn(() => ({ exec: jest.fn() })),
  findByIdAndUpdate: jest.fn(() => ({ exec: jest.fn() })),
}
