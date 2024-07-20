# Inventory Management App 💼
This is a full-stack Inventory Management App Project, that is built using Next.js and MongoDB (Mongoose).

## Features
- **User Authentication**: Secure login and registration.
- **User Authorization**: Role-based Authorization. There are mainly two roles, `user` and `admin`.
- **Product Management**: Add, edit, and delete products.
- **Category Management** : Manage product categories.
- **User Management** : Admin are able to manage othe users.
- **Search and Filter** : Easily find products with advanced search, filter, sort options.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/zenithexe/inventory-management-app.git
    ```

2. Navigate to the project directory:
    ```bash
    cd inventory-management-app
    ```

3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up the environment variables. Create a `.env` file in the root directory and add the necessary variables:
    ```plaintext
    DATABASE_URL='your_database_url'
    JWT_SECRET='your_jwt_secret'
    ```
5. Integrate your MongoDB Database with the project.
    ```
    just google it man :)
    ```

6. Start the development server :
     ```bash
        npm run dev
     ```

## Project Routes
Once the server is running, you can access the application at `http://localhost:3000`.
These are the different routes :
- **/** : Basic Home-page. Content about the project.
- **/profile** : Manage your account. 
- **/inventory** : Advance view of your inventory.
- **/category** :  Advance view to manage the `item-category`.
- **/users** : Advance view to manage `users`. Admins are only able to manage other users.
- **/login** : User Login Page
- **/register** : User Registration Page

## Role Permessions
`User Role` :
- Add/Edit inventory items.
- View Categories
- View other users. Edit their own profile.

`Admin Role` :
- Add/Edit/Delete inventory items.
- Add/Edit/Delete Category
- Edit/Delete/Promote/Demote other users.

## Dependencies
These are the library used in the project.
- `shadcnn` : UI Library
- `Tanstack React Tables` : Headless React UI library to create complete Table UI.
- `NextAuth (Auth.js)` : User Authentication and Session Control
