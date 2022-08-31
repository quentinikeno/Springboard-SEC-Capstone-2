# Capstone 2: Project Proposal

## Music Loop Creator

1. What tech stack will you use for your final project? We recommend that you use React and Node for this project, however if you are extremely interested in becoming a Python developer you are welcome to use Python/Flask for this project.

I’m planning on using React and Node for this project. I’ll be using Express and PostgreSQL on the backend.

2. Is the front-end UI or the back-end going to be the focus of your project? Or are you going to make an evenly focused full-stack application?

The plan is for this to be an evenly focused full-stack application.

3.  Will this be a website? A mobile app? Something else?

It will be a web app.

4. What goal will your project be designed to achieve?

The goal for this app will be for users to make loops of music using a step sequencer. There will be a box of cells that users can click on that represent the sequencer and then the app will be able to loop over the notes that have been sequenced.

5. What kind of users will visit your app? In other words, what is the demographic of your users?

I want the sequencer to be very simple to use so that anyone will be able to use it for fun, regardless of their music theory background.

6. What data do you plan on using? How are you planning on collecting your data? You may have not picked your actual API yet, which is fine, just outline what kind of data you would like it to contain. You are welcome to create your own API and populate it with data. If you are using a Python/Flask stack are required to create your own API.

I plan on making my own backend with Express. Instruments and sounds will come from [Tone JS](https://tonejs.github.io/).

7. In brief, outline your approach to creating your project (knowing that you may not know everything in advance and that these details might change later). Answer questions like the ones below, but feel free to add more information:

a. What does your database schema look like?

The database will have a table for users and a table for users to save their sequenced loops.

b. What kinds of issues might you run into with your API? This is especially important if you are creating your own API, web scraping produces notoriously messy data.

The only problem I can think of right now is that I may have a problem when it comes to how to store the data for the loops in SQL.

c. Is there any sensitive information you need to secure?

Just passwords for users.

d. What functionality will your app include?

-   Users can create their own loops without logging in.
-   To save a loop users must register and create an account.

e. What will the user flow look like?

The homepage will display the sequencer where users can create their loops.  
There will also be a user detail page where users can access their saved loops to play, edit, or delete.

f. What features make your site more than a CRUD app? What are your stretch goals?

-   I’d like for users to be able to sequence multiple instruments in their loops. Maybe a max of four or five instruments would be good.
-   Users are able to set the key, scale, and tempo for their loop
-   Perhaps users can set their loops to public or private for sharing.
