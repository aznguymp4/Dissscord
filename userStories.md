# Dissscord User Stories
This page describes the experience a user will go through when exploring the website in both unauthorized and authenticated states.

## Unauthorized
- I will be presented with the Discovery Page (list of public servers).
- I will be redirected to the login page if I click a server in the Discovery Page.
- To register an account, I will have to fill out the on-screen registration form with valid data.
    - Required Fields:
        - e-mail
        - username
        - password
    - Optional Fields:
        - none

## Authorized
- Initial Launch
    - I will be on the most recent server/channel I was in (if saved) when logging in.
    - I will be sent to the Discovery Page if there was no recent saved.
- Account Control Panel
    - In Account Settings, I will be able to change my:
        - Password
        - About Me
        - Display Name
        - Profile Picture
- Servers Sidebar
    - I will be able to view all my joined servers on the very left-hand side.
    - An "Add Server" button will be below all the user's servers.
    - A "Discover" button will be below the "Add Server" button, redirecting to the Discovery Page.
    - A "Direct Messages" button will be at the top *(if implemented).
- Server Settings (if authorized)
    - I can edit the server name and icon
    - I can toggle the server visibility (Public/Private)
        - Public: Users can view it on the Discovery Page and join.
        - Private: Server will not appear on the Discovery Page. New joins are prohibited.
- Channels
    - After selecting a server, I will be able to view all of its channels to the right of the server sidebar.
    - I can click channels in the list to select them.
    - If I'm the server owner, I can:
        - Add a new channel using the modal that appears after using the + icon in the list.
        - Edit and delete channels with the right-click dropdown of the channel.
    - Upon server creation, there will be a default #general channel to start off.
- Messages
    - Messages will appear to the right of the channels list.
    - Authorized users can view and send messages (up to 2000 characters) in the selected channel.
    - Users may edit or delete their own messages.
    - Server owner can delete (but not edit) other users' messages.
- Reactions
    - Users may react to a message with an emoji.
    - Users may remove their reaction.
        - If the user was the only person who reacted, the emoji will be removed entirely.
        - If other users had reacted and the user removes it, it will simply decrement the count.