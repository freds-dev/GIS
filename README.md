# Playgrounds Hub

Welcome to the documentation for the Playgrounds Hub. This guide will walk you through the setup process and provide essential information to run the application locally.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Access the Application](#access-the-application)
- [Additional Information](#additional-information)

## Prerequisites
Before getting started, ensure that you have the following prerequisites:

- Docker daemon is running on your machine.

## Installation and Setup
1. Install all required packages using the following command:
   `npm install`
2. Build docker image and seed database with:
   `npm run docker`
3. Seed database
   `npm run setup`
4. Build CSS files and other stuff needed:
  `npm run build`
5. Run the application:
  `npm run dev`

## Access the Application
To access the application go to `https://localhost:3000`
