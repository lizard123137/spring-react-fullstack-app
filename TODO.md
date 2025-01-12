# Drogon-React-Fullstack-App

This file contains the tasks that need to be done in order for the app to be finished.
Some of them such as user authorization are more crucial than others and some are outright optional.

### Backend
- [ ] CMS (This functionality isn't very urgent)
    - [ ] Design a generic table view
    - [ ] Create a menu bar component
    - [ ] View users
    - [ ] View group chats

- [ ] Authentication
    - [X] Implement sign-in and register endpoints
    - [X] Validate api requests
    - [ ] Add refreshToken functionality

- [ ] Chatting
    - [ ] Save messages to DB (do we want to store messages or should it be client-side???)
    - [ ] If we decide to store user messages, add pagination when retrieving them
    - [ ] Store which chatrooms a user belongs to

### Frontend
- [ ] Authentication
    - [X] Send requests using Axios
    - [X] Store tokens
    - [X] Redirect from protected routes
    - [ ] Sign-out functionality
    - [ ] Delete user account functionality
    - [ ] User profiles
    - [X] Login page
    - [X] Register page

- [ ] Chatting
    - [ ] md formatting in user messages
    - [ ] possibility to send files

- [ ] Other functionality
    - [X] Home page
    - [ ] Send emails via contact form

### Docker
- [X] Mount react app as a volume for real time updates

### Testing
- [ ] Add Github actions
    - [ ] Create automated e2e tests using playwright