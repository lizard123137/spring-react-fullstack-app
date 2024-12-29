# Drogon-React-Fullstack-App

This file contains the tasks that need to be done in order for the app to be finished.
Some of them such as user authorization are more crucial than others and some are outright optional.

### Backend
- [ ] General
    - [X] Switch backend to laravel (better documentation...)
    - [ ] Debloat laravel (research which files can be safely removed)

- [ ] CMS
    - [ ] Design a generic table view
    - [ ] Create a menu bar component
    - [ ] View users
    - [ ] View group chats

- [ ] Authentication
    - [X] Implement sign-in and register endpoints
    - [X] Validate api requests

- [ ] Chatting
    - [ ] Save messages to DB (do we want to store messages or should it be client-side???)
    - [ ] If we decide to store user messages, add pagination when retrieving them
    - [ ] Store which chatrooms a user belongs to

### Frontend
- [ ] Authentication
    - [ ] Send requests using Axios
    - [ ] Store tokens
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
    - [ ] Send emails via contact form

### Docker
- [X] Mount react app as a volume for real time updates
- [ ] Fix backend, so that it works with Laravel
    - [ ] Configure a nginx container, so that it can host the backend
    - [ ] Mount application as a volume for hot reloading support