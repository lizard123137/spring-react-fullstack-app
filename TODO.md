# Drogon-React-Fullstack-App

This file contains the tasks that need to be done in order for the app to be finished.
Some of them such as user authorization are more crucial than others and some are outright optional.

### Backend
- [ ] Authentication
    - [ ] Setup postgresql
    - [ ] Find hashing library
    - [ ] Add JWT generation and validation
    - [ ] Implement sign-in and register endpoints
    - [ ] Validate api requests

- [ ] Chatting
    - [ ] Save messages to DB (do we want to store messages or should it be client-side???)
    - [ ] If we decide to store user messages, add pagination when retrieving them
    - [ ] Store which chatrooms a user belongs to

### Frontend
- [ ] Authentication
    - [ ] Send requests using Axios
    - [ ] Store JWT
    - [ ] Redirect from protected routes
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

### Docker
- [ ] Mount react app as a volume for real time updates
- [ ] Configure watch, so that backend automatically rebuilds