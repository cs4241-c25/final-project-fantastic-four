# Description
This application is event management software that allows for the creation of approved guest lists for social events. Users verified by administrators can add and delete names on a list for each event and edit their own account information. Administrators can create events, edit them, and delete users and any names on any list. They can also deactivate events to prevent addition of new names, revoke list access from any user, and change roles of other members to administrator or door duty. In door mode users can check in guests and the time they were checked in is recorded. Due to unforeseen circumstances for one group member door functionality was not completed on time.  
The application also has responsive styling as it is meant to be used on desktop and mobile devices.  
You can access the application [here](https://final-project-fantastic-four.vercel.app/).
# Additional Instructions
There is an administrator account with credentials ldgiffune@wpi.edu:admin123. This account can be used to approve additional registered accounts created on the registration page via the admin dashboard
# Used
- Web framework: NextJS
- Server: node.js
- Programming language (client and server): Typescript
- Styles framework: Bootstrap
- Database: MongoDB
- Authentication: Auth.js
- Deployment: Vercel 
Continuous Deployment/Integration: github actions
# Challenges
The primary challenges we faced working on this project were several group members learning next.js and implementing the poorly documented Auth.js credentials provider
# Responsibilities
- Lev: Authentication and session management, role management, event editing, navigation
- Rodrigo: Creating new events and displaying list of events, approving and revoking list access, activating and deactivating events, updating user email and did most of the styling.
- Dan: Display list of guests for every event using dynamic routing, user ability to add guests and remove them, admin can remove any guest
- Victor: 
# Video
https://youtu.be/jRNtF0RuDfc  
The video shows the state of the application before most of the styling was applied and focuses mainly on the core functionalities of the application instead.
