import { render, screen } from '@testing-library/react'
import App from './App'

describe('App component', () => {
  let fetchMock : jest.Mock

  beforeEach(() => {
    fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: () => [{
          "id": 1,
          "name": "Leanne Graham",
          "email": "Sincere@april.biz",
          "phone": "1-770-736-8031 x56442",
          "website": "hildegard.org",
        },
        {
          "id": 2,
          "name": "Ervin Howell",
          "email": "Shanna@melissa.tv",
          "phone": "010-692-6593 x09125",
          "website": "anastasia.net",
        },
      ]
    })
    global.fetch = fetchMock
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders users on mount', async () => {
    render(<App/>)
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const userNames = await screen.findAllByText(/Leanne Graham/)
    expect(userNames.length).toBeGreaterThan(0)

    const userEmails = await screen.findAllByText(/Shanna@melissa.tv/)
    expect(userEmails.length).toBeGreaterThan(0)
  })
})