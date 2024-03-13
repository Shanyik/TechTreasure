# TechTreasure Marketplace

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

TechTreasure is a web application designed to simulate buying and selling of PC hardware components. Drawing inspiration from platforms like hardverapró.hu and vinted.hu, my project aims to provide a user-friendly experience for trading computer parts. The project is dependent on another project, CloudImage (https://github.com/Shanyik/CloudImage), which serves as an image hosting service.

## Built With

* [![React][React.js]][React-url]
* [![C#][C#badge]][C#-url]
* [![PostgreSQL][PostgreSQLbadge]][PostgreSQL-url]
* [![Bootstrap][Bootstrapbadge]][Bootstrap-url]
* [![Docker][Dockerbadge]][Docker-url]

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Road Map](#roadmap)
- [License](#license)

## Installation

To run the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/Shanyik/TechTreasure.git
cd TechTreasure

# Start the frontend
cd frontend
npm install
npm start

# Start the backend
cd backend
dotnet run
Make sure to configure the appSettings.json file.

# OR

run docker compose up
```
## Usage
Once the application is running, you can access the frontend at http://localhost:3000.

## Features
- User Authentication
- Product Listing and Search
- Integration with CloudImage for image hosting

## Roadmap
- [ ] Shopping Cart Functionality
- [ ] Payment Gateway Integration
- [ ] User Ratings and Reviews

## License
This project is licensed under the MIT License.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[C#badge]: https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white
[C#-url]: https://docs.microsoft.com/en-us/dotnet/csharp/
[PostgreSQLbadge]: https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Dockerbadge]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[Bootstrapbadge]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com/
