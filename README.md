# Playgrounds Hub

Welcome to the documentation for the Playgrounds Hub. This guide will walk you through the setup process and provide essential information to run the application locally.

## Prerequisites
Before getting started, ensure that you have the following prerequisites:

- Docker daemon is running on your machine.

Please copy the `.env.example` file and rename it to `.env`. Then generate a MapLibre key and paste it in the variable.


## Installation and Setup
1. Install all required packages using the following command:
   `npm install`
2. Build docker image and run:
   `npm run docker`
3. Seed database
   `npm run setup`
4. Build CSS files and other stuff needed:
  `npm run build`
5. Run the application:
  `npm run dev`

## Access the Application
To access the application go to `https://localhost:3000`

## Default accounts
User: 
   email: `rachel@remix.run`
   pw: `racheliscool`

Admin:
   email: `admin@remix.run`
   pw: `adminiscool`
