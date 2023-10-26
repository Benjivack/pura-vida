Deployment of our application was made to Cirrus by Galvanize https://cirrus.mod3projects.com/ to manage cloud instances.

The following steps for deployment have been shortened/simplified for security reasons. Any keys within are purely for example.

To deploy our backend we:

1. Downloaded and utilized a cloud cli tool developed by Galvanize called Cirrus.
2. Write a pipeline that creates a docker container that can be deployed to Cirrus.
3. After logging into the SKD, ran the following code to deploy our database (we used Postgres) `glv-cloud-cli deploy -a puravidadb -i postgres:14.7 -e POSTGRES_DB=db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -m /var/lib/postgresql -p 5432 -x=false`
4. Deployed the latest api image with the following command `glv-cloud-cli deploy -a puravida -i some_code_here -e SIGNING_KEY=key -e DATABASE_URL=DATABASE_URL -e CORS_HOST=CORS_HOST`

To deploy our frontend changes we:

1. Built our frontend via a gitlab job and deployed our gitlab page
2. Added BrowserRouter to our app.jsx
