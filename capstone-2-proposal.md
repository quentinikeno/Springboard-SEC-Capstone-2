# Capstone 2: Project Proposal

## Math Practice Game

1. What tech stack will you use for your final project? We recommend that you use React and Node for this project, however if you are extremely interested in becoming a Python developer you are welcome to use Python/Flask for this project.

I’m planning on using React and Node for this project. I’ll be using Express and PostgreSQL on the backend.

2. Is the front-end UI or the back-end going to be the focus of your project? Or are you going to make an evenly focused full-stack application?

The plan is for this to be an evenly focused full-stack application.

3.  Will this be a website? A mobile app? Something else?

It will be a web app.

4. What goal will your project be designed to achieve?

The goal for this app will be for users to practice math problems and make it fun so that users can challenge other users or be incentivised to practice everyday.

5. What kind of users will visit your app? In other words, what is the demographic of your users?

The target for this app will be elementary school aged students.

6. What data do you plan on using? How are you planning on collecting your data? You may have not picked your actual API yet, which is fine, just outline what kind of data you would like it to contain. You are welcome to create your own API and populate it with data. If you are using a Python/Flask stack are required to create your own API.

I plan on making my own backend with Express. Math problems will be provided by the [xMath API](https://x-math.herokuapp.com/).  Number trivia can be incoporated using the [Numbers API](http://numbersapi.com/).

7. In brief, outline your approach to creating your project (knowing that you may not know everything in advance and that these details might change later). Answer questions like the ones below, but feel free to add more information:

a. What does your database schema look like?

The database will have a table for users and a table users' friends.

b. What kinds of issues might you run into with your API? This is especially important if you are creating your own API, web scraping produces notoriously messy data.

Since I'm creating the backend, I just have to make sure my backend API is secure.

c. Is there any sensitive information you need to secure?

Just passwords for users and their emails.

d. What functionality will your app include?

-   Users can do practice arithmetic games without logging in.
-   To save their progress or interact with friends, users will have to log in.

e. What will the user flow look like?

The homepage will display either a tutorial explaining how it works or a math game where users just solve math problems as possible.  
There will also be a user detail page where users can access their user stats and see their friends' progress.

f. What features make your site more than a CRUD app? What are your stretch goals?

-   Users can challenge other users to different math games.
-   Users can practice specific skills e.g. 9 times tables, long division, etc.
-   New math game types.
