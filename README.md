
# Vacationista

[Deployed App](https://vacationista.netlify.app)

![image](https://user-images.githubusercontent.com/102434281/227291761-432cbac1-9e28-4acf-9c69-6cd44b413844.png)


## Topics
- [Project Overview](#project-overview)
- [Features](#features)
- [Try it out](#purpose)
- [Getting Started](#try-it-out)
- [Planning](#planning)
- [Tech Stacks](#tech-stacks)
- [Video Walkthrough](#video-walkthrough)
## Project Overview

Vacations are supposed to be fun. 

Who wants to spend hours agonizing over travel plans and stopovers and budgets and transportations from place to place or plans of what you'll do at each place (and on and on and on)?

Let's face it. It's exhausting. And gone are the days of the friendly neighborhood travel planner (a full-time job dedicated to travel planning, for goodness sakes!)

Enter Vacationista. 

Vacationista is designed to take the load off of you - the vacationer - and let you focus on what really matters: getting that mediterranean tan or waxing your surfboard.

So hang loose. Sit back. Let's make travel a breeze together.
## Features

Features of this app:

- Security
    - Don't fret. Vacationista is designed with Firebase SDK for security.
    - Pages are restricted by user (so no snooping at other travelers' trips!)

- Creating a User
    - Click the Sign-In button on the top right of the page to get started.
    - After authentication, new users will be taken to the register page - where they can register to be the newest Vacationista Traveler.

- Home Page
    - The Home Page can be divided into two views: (1) User not signed-in and (2) User signed-in
        - User not signed-in view:
            - Similar to the user signed-in view, with the exception that no trips are shown.
            - Non-users can still access Vacationista Destination Highlights and Articles.

        ![image](https://user-images.githubusercontent.com/102434281/227292246-a68211ce-09e0-45fb-93a5-cb27e0512abd.png)   

        - User signed-in view:
            - Users can:
                - Access Vacationista Destination Highlights and Articles
                - Access their Profile Page by clicking on their profile picture in the top right
                - Access an overview of their trips by clicking on the My Trips link in their profile image in the top right
                - Navigate to any Upcoming Trips that are displayed
                - Plan a New Trip by clicking the New Trip icon


        ![image](https://user-images.githubusercontent.com/102434281/227291761-432cbac1-9e28-4acf-9c69-6cd44b413844.png)


- Trip Page
    - The Trip Page lets you CRUD on all things trips, including:
        - Trip Location
        - Trip Dates
        - Trip Budget 
        - Trip Legs
        - Trip Events
        - Trip Recommendations (from Yelp)

    - Users can also navigate to (1) Trip Expenses and Transportations and (2) Trip Detailed View

    ![image](https://user-images.githubusercontent.com/102434281/227292845-a3183991-2832-45c4-a827-ffc6bb8fa031.png)

- Leg Page
    - Planning a stopover while abroad?
        - The Leg page is very similar to the Trip Page.
        - Users can CRUD on all things legs, like trips, as well as reassign legs to different trips!
        - Users can also navigate to (1) Leg Expenses and Transportations and (2) Leg Detailed View


    ![image](https://user-images.githubusercontent.com/102434281/227293329-142df1a8-bec8-41a7-a17a-8f0eb6d86d3b.png)


- Events
    - Want to go see the Eiffel Tower or eat at Cafe du Monde?
    - Think of events as a way to keep track of your itinerary.
    - Events hold information about well... events! Things like...
        - Title
        - Location
        - Image
        - Event Type
        - Event Description

    ![image](https://user-images.githubusercontent.com/102434281/227293649-e2e6b951-b57d-47ff-add4-4c0221fd36ff.png)


- Expenses and Transportations Page
    - Trying to itemize your budget while planning a trip or leg?
        - The Expenses and Transportations overview page lets you add, edit, view or delete expenses (hotels, groceries, restaurants, attractions, etc) as well as transportations (planes, trains & automobiles.) 
        - Users can specify the costs of their expenses and transportations and the total trip or leg budget remaining will display.

    ![image](https://user-images.githubusercontent.com/102434281/227293906-974253f7-6f5f-416c-a9bc-7e7aa4e416cd.png)


- Detail Page
    - Okay, you've adding everything there is to know about your trip. How can I see everything in one place?
    - Users can click on the Detailed view link to navigate to the trip or leg detail page. Here:
        - Users can see an overview of the dates of their trip or leg and the events planned for each date.
        - Users can see an overview of the trip or leg expenses (and subtotal)
        - Users can see an overview of the trip or leg transportations (and subtotal)
        - Users can view their trip or leg total cost


    ![image](https://user-images.githubusercontent.com/102434281/227294110-88b56583-79d6-4f82-af68-313eb8fd14f5.png)

## Try it out

### Back end
    1. Clone the project to your machine - git@github.com:mmccullough1997/vacationista-server.git
    2. cd into project directory
    3. Run pipenv install and pipenv shell
    4. Run ./seed.sh in the terminal to make migrations and load data fixtures
    5. Create a .env file in the root of the directory. Add the following:
    
        YELP_API_TOKEN=""
        GEOAPIFY_API_TOKEN=""

        **note: users will need to setup a yelp fusion and geoapify account to receive tokens
    
    6. To start the server, run python manage.py runserver

### Front end
    1. Clone the project to your machine - git@github.com:mmccullough1997/vacationista-client.git
    2. cd into project directory
    3. Create a .env file in the root of the directory. Add the following:
    
        NEXT_PUBLIC_FIREBASE_API_KEY=""
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
        NEXT_PUBLIC_DATABASE_URL="http://localhost:8000"

        **note: users will need to setup a google firebase project to receive firebase keys
    
    4. In the project root directory, in the terminal, run:

        npm install or npm i

    5. From the terminal, run:

        npm run prepare

    6. To start Vacationista, run:

        npm run dev



## Planning

[Link to wireframe](https://www.figma.com/file/FUbz8x4dp7mNQPPt6Xqrzv/Vacationista-Wireframe?node-id=0%3A1&t=ft79vTwKxCcyRFBW-1)

![image](https://user-images.githubusercontent.com/102434281/227295021-1737627f-1587-4b9a-b63c-e29232719bd0.png)


[Link to flowchart](https://www.figma.com/file/0zYysGeYM7KbfPyB2YgWb1/Vacationista?node-id=0%3A1&t=mjZugIm94aHeryCX-1)

![image](https://user-images.githubusercontent.com/102434281/227294461-0b39f409-87f5-4271-8145-a4fadcbacf04.png)


[Link to ERD](https://drawsql.app/teams/mitch/diagrams/vacationista-mvp)

![image](https://user-images.githubusercontent.com/102434281/227294786-3503e97f-2e20-4745-b336-55ef7e452b2a.png)

## Tech Stacks
### Backend
<div align="center">
<a href="https://www.python.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/python-original.svg" alt="Python" height="50" /></a>  
<a href="https://www.djangoproject.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/django-original.svg" alt="Django" height="50" /></a>  
<a href="hhttps://www.sqlite.org/index.html" target="_blank"><img style="margin: 10px" src="https://user-images.githubusercontent.com/33158051/103467186-7b6a8900-4d1a-11eb-9907-491064bc8458.png" alt="SQLite" height="50" /></a>
</div>
<ul>
<li>Fixtures</li>
<li>ORM & SQL Queries</li>
<li>Models</li>
<li>API Endpoint Views</li>
<li>User authentication using authtoken</li>
<li>URL routing & action decorators</li>
</ul>

### Frontend 
<div align="center"> 
<a href="https://reactjs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React" height="50" /></a>  
<a href="https://nextjs.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" alt="nextjs" width="40" height="40"/>
<a href="https://firebase.google.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/firebase.png" alt="Firebase" height="50" /></a> 
<a href="https://www.w3schools.com/css/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg" alt="CSS3" height="50" /></a>  
<a href="https://en.wikipedia.org/wiki/HTML5" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg" alt="HTML5" height="50" /></a>  
<a href="https://getbootstrap.com/docs/3.4/javascript/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/bootstrap-plain.svg" alt="Bootstrap" height="50" /></a>  
<a href="https://www.figma.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/figma-icon.svg" alt="Figma" height="50" /></a>  
</div>

## 

[Video Walkthrough Link](https://www.loom.com/share/90938451aec046e29660424a220f3baf)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mitchmccullough)
