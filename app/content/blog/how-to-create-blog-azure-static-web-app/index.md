---
title: "How to create a personal blog using Azure Static Web App & Gatsby"
description: "In this article we will explore a set of tools and services which will let you build a personal blog and help setup an automated publishing pipeline."
coverImage: "/assets/images/posts/covers/personal-websites-101.svg"
date: "2022-12-21"
author:
  name: Roshan Gautam
  picture: "https://avatars.githubusercontent.com/u/978347?v=4"
ogImage:
  url: "/assets/images/posts/covers/personal-websites-101.svg"
---

<p style="text-align: center;">
  <image src="./personal-websites-101.svg"/>
</p>

In the last [article](https://roshangautam.com/how-to-create-personal-blog-gatsby-github-pages-github-actions/) we looked at how we can run a personal blog from github pages for free. In this article we will learn you how to deploy the same blog as an [Azure Static Web App](https://azure.microsoft.com/en-us/services/app-service/static/) aka SWA. Everything is still the same except this time we will configure a workflow which will publish the blog in Azure instead of Github. SWA is one of Azures free offerings.

## Getting Started

### Azure

Let's start with setting up a personal account in Azure. Navigate to [Azure Portal](https://portal.azure.com/) and either signup for a new account or signin to your existing account.

> If you don't have an Azure account, please visit [[Azure](https://portal.azure.com/) and signup for a free account. Azure offers quite a few free offerings including Static Web Apps. Please dont be alarmed if you were asked to provide a credit card number. You wouldn't be charged anything if you stay within the free offerings.

We will use Gatsby as our blog framework. Please visit my last [article](https://roshangautam.com/how-to-create-personal-blog-gatsby-github-pages-github-actions/) to setup the project and get your blog ready.

### Install required tools

Install the following in addition to the tools used in the last article. Skip this step if you already have'em

- [VS Code SWA Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps) -


### Project Setup

Let's create a new Gatsby site using the [blog starter template](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog/). You can use any other starter templates listed at [Gatsby's website](https://www.gatsbyjs.com/starters). Fire up a terminal of your choice and execute the following command. This is where the blog will be created in your machine, so pick a desired location.

```sh
gatsby new my-awesome-blog https://github.com/gatsbyjs/gatsby-starter-blog
```

Now you will open `gatsby-config.js` to update basic settings for the newly created blog. Locate `siteMedataData` and make the necessary changes by updating site title, author name etc. All the markdown content is located at `app/content/blog` where each article is in its own folder.

Now let's create a new github repository called `my-awesome-blog`. You can either visit [Github](https://github.com) or use [hub](https://hub.github.com/) from your command line to create your new repository. Once you are done creating the repository, fire up your favorite terminal and execute the following commands

> Important : Replace username with your github username and repository with the name of newly created github repository.

```sh
git remote add origin git@github.com:my-awesome-github-username/my-awesome-blog.git
```

```sh
git commit -m "Initial Commit"
```

Push your changes to github

```sh
git push --set-upstream origin master
```

#### Configure auto publishing

The idea is to setup a workflow such that every new commit to the master branch would automatically publish it to github pages. To achieve this we will complete the following one time setup steps

##### Create an access token

First, let's create an access token. We will use this token in the workflow as a secret variable called `ACCESS_TOKEN` in a few minutes

- Use the instructions listed [here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) to create an access token with `repo` permissions
- Use the instructions listed [here](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets) to create a secret called `ACCESS_TOKEN` to use in the workflow

##### Create a github action

You can create a github action in two different ways.

- By adding a `.yml` file to the root of your project under `github/.workflows` directory.
- OR, by navigating to your repository in github and using the `New Worflow` option under `Actions` tab.

The latter will automatically create a commit and push it to your default branch in github.

In this blog we will use the first option. Let's start by creating the directories and the file. Run the following commands from the root of the project

```sh
mkdir .github && mkdir .github\workflows
touch .github\workflows\azure.yml
```

##### Configure the workflow

Open `azure.yml` in an editor and paste the following content

```yml
name: Azure
      
env:
  skip_deploy_on_missing_secrets: true
  
on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:  
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    environment:
      name: azure
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.DEPLOYMENT_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }} # Used for Github integrations (i.e. PR comments)
          action: "upload"
          ###### Repository/Build Configurations - These values can be configured to match your app requirements. ######
          app_location: "app" # App source code path
          api_location: "api" # Api source code path - optional
          output_location: "" # Built app content directory - optional
          ###### End of Repository/Build Configurations ######

  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    environment:
      name: azure
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.DEPLOYMENT_TOKEN }}
          action: "close"
```

For more information regarding Static Web App workflow configurations, please visit: https://aka.ms/swaworkflowconfig


Next create a commit

```sh
git commit -m "Add publishing workflow for Azure static web app"
```

And push your changes to github

```sh
git push
```

Now navigate to the actions tab in github. You should observe a workflow action running. Wait until it completes.

As soon as the workflow completes successfully, your site should be running in Azure Static Web app.

Awesome Job !!!

#### Publishing Workflow

Now whenever you want to add a new article to your blog or update your sites content, you would add/update markdown files to your new created github repository. You can do so in different ways.

- Add/update markdown files from github using their web editor and save. This will automatically create a commit in the github repository.
- OR, Add/update content locally, create a commit and push it to the remote github repository.

Pushing a commit to the master branch will trigger the workflow we created above and publish your site to Azure SWA.

If you want to add/update content locally first:

1. Make changes in `content/blog` folder

> To preivew changes locally run `gatsby develop` from the root of your project folder. This will start a localhost server pointing to the folder in your machine. This also watches for changes and referesh the browser automatically.

2. Create a commit

```sh
git commit -m "new article xyz"
```

3. Push your changes to github

```sh
git push
```

This should start the worflow we configured above and publish any new changes to Azure SWA.

**_Thats it folks !!!_**
