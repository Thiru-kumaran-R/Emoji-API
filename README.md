
# Emojipedia API

The Emojipedia API is a RESTful API developed using Deno.js and MongoDB, allowing users to access comprehensive information about emojis.

## Features

- **Emoji Information**: Retrieve detailed information about emojis including their Unicode, description, category, and more.
- **Search**: Search for emojis by unicode.
- **Random Emoji**: Get a random emoji from the database.
- **Create, Update, Delete**: Perform CRUD operations on emojis.

## Technologies Used

- **Deno.js**: A secure runtime for JavaScript and TypeScript, providing a productive and secure environment for building server-side applications.
- **MongoDB**: A NoSQL database, used for storing emoji data.
- **Oak**: A middleware framework for Deno's http server.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/thirukumaran05/Emojipedia.git
    ```
    
2. Go to project folder:

    ```bash
    cd project
    ```

3. Start the server:

    ```bash
    deno run --allow-env --allow-sys --allow-read --allow-net server.ts
    ```

## Usage

### Endpoints

| Method | Endpoint                                         | Description                           |
| ------ | ------------------------------------------------ | ------------------------------------- |
| GET    | https://emojipedia.deno.dev/emoji                | Retrieve specific emoji               |
| GET    | https://emojipedia.deno.dev/random               | Get a random emoji.                   |
| POST   | https://emojipedia.deno.dev/emoji                | Add a new emoji.                      |
| PUT    | https://emojipedia.deno.dev/emoji                | Update an existing emoji.             |
| DELETE | https://emojipedia.deno.dev/emoji                | Delete an emoji by its ID.            |

# Unicode Categories Overview

Unicode provides a categorization system for characters, organizing them into various categories based on their usage, characteristics, and properties. Understanding these categories can help in navigating the diverse range of characters supported by Unicode.

## Overview of Categories

| Category  | Description                                                                                         |
|-----------|-----------------------------------------------------------------------------------------------------|
| Objects   | Characters representing various tangible and abstract objects, including tools, symbols, and artifacts. |
| Nature    | Characters representing elements and phenomena found in the natural world, such as weather symbols, plants, and celestial bodies. |
| People    | Characters depicting human figures, faces, body parts, and activities, including emojis and pictograms. |
| Smileys   | Characters representing facial expressions, emotions, gestures, and moods, commonly used in written communication. |
| Animals   | Characters representing various animals, both real and mythical, including mammals, birds, reptiles, and insects. |

## Understanding Unicode Categories

For more information. Please feel free to visit this website. [Emojipedia](https://emojipedia.org/)

### Example

#### Request
```bash
https://emojipedia.deno.dev/😁
```

#### Response
```http
{
      "unicode": "😁",
      "name": "Beaming Face with Smiling Eyes",
      "category": "Smileys & Emotion",
      "description": "A yellow face with smiling eyes and full-toothed grin, as if saying Cheese! for the camera.",
      "keywords": ["face", "smile", "happy", "joy", "grin", "cheese", "smiley", "haha"]
}

```

## Contributing

Contributions are always welcome!

Contribute by uploading an emoji including its name, category, description, and keywords.Ensure that the description and keywords are clear and applicable to the associated emoji or unicode.

