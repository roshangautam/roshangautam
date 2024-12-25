---
title: "How to create a personal blog using Gatsby, Github Pages & Github Actions"
description: "In this article we will explore a set of tools and services which will let you build a personal blog and help setup an automated publishing pipeline."
coverImage: "/assets/images/posts/covers/personal-websites-101.svg"
date: "2021-07-10"
author:
  name: Roshan Gautam
  picture: "https://avatars.githubusercontent.com/u/978347?v=4"
ogImage:
  url: "/assets/images/posts/covers/personal-websites-101.svg"
---

<p style="text-align: center;">
  <image src="./personal-websites-101.svg"/>
</p>

In this article we will explore a set of tools and services which will let you build a personal blog and help setup an automated publishing pipeline. The idea is to write your content in markdown and publish it to github pages.

To build a personal blog we need to solve for the following

- A server to host your blog,
- An easy way to write & publish your content.

## Getting Started

### [Github Pages](https://pages.github.com/)

To solve our first problem, we will use github pages to host our personal blog. If you own a personal domain, you can configure github pages to use your custom domain at no cost. Isn't that wonderful.

> If you don't have a github account, please visit [Github](https://github.com) and signup for a free account.

### [Gatsby](https://www.gatsbyjs.com/)

To solve our second problem, we will using Gatsby to write our content. Gatsby is a static site generator framework built using react/javascript and provides pre built blogging templates. The best part is you can create your content using [markdown](https://www.markdownguide.org/) and dont worry about any other technicalities. Gatsby will generate an html version of the content written in Markdown. Pick a template and off you go.

To publish the content written in markdown & Gatsby's blog template, we will use [github actions](https://github.com/features/actions). The minute you will add/update content and save it to your github repository an automated workflow will run and generate an html version of your markdown content and publish it to github pages.

> There are several other static site generators available online. You can use any of them. For this article we are using Gatsby.

Let's walk through the steps required to get you up and running.

#### Install required tools

Install the following tools. Skip this step if you already have'em

- [VS Code](https://code.visualstudio.com/) - Editor of choice. Install markdown extensions to help with content writing
- [NodeJS](https://nodejs.org) - To run your blog locally
- [Gatsby Cli](https://www.gatsbyjs.com/docs/tutorial/part-0/#gatsby-cli) - To create and run your blog locally
- [Hub](https://hub.github.com/) - Optional, used to maintain github account from a command line

> macOS users can use [homebrew](https://brew.sh/) to install these tools. Likewise, you can use
> [chocolatey](https://chocolatey.org/) in Windows and `yum/apt` in Redhat or Debian based Linux distros.

#### Project Setup

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
touch .github\workflows\gh-pages.yml
```

##### Configure the workflow

Open `gh-pages.yml` in an editor and paste the following content

```yml
name: Publish to Github Pages

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: enriikke/gatsby-gh-pages-action@v2
        with:
          access-token: ${{ secrets.ACCESS_TOKEN }}
          deploy-branch: gh-pages
```

This is telling github to use [Gatsby Github action](https://github.com/enriikke/gatsby-gh-pages-action) which takes care of building the static content and publishing it to `gh-pages` branch in the github repository. Learn more about other input options available in the action [here](https://github.com/enriikke/gatsby-gh-pages-action#knobs--handles)

Next create a commit

```sh
git commit -m "Add publishing workflow for github pages"
```

And push your changes to github

```sh
git push
```

Now navigate to the actions tab in github. You should observe a workflow action running. Wait until it completes.

As soon as the workflow completes successfully, your site should be live at http://username.github.io/repository.

Awesome Job !!!

#### Publishing Workflow

Now whenever you want to add a new article to your blog or update your sites content, you would add/update markdown files to your new created github repository. You can do so in different ways.

- Add/update markdown files from github using their web editor and save. This will automatically create a commit in the github repository.
- OR, Add/update content locally, create a commit and push it to the remote github repository.

Pushing a commit to the master branch will trigger the workflow we created above and publish your site to github pages.

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

This should start the worflow we configured above and publish any new changes to github pages.

#### Custom domains

This all sounds good but what about custom domains? If you own a custom domain and want to point it to github pages

- Visit your github repository settings and add your custom domain to github pages settings as shown below

![Github Pages Settings](./github-pages-settings.png)

- Visit your domain registrars website and add one of these as an `A` record to your domain's DNS settins

```sbtshell
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

> You just need one of the entries to work. Depdending on how long does your DNS provider takes time to propagate the changes, your domain should start pointing at your github pages repo within a few minutes to a couple of hours. Read more about custom domains in github pages [here](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)

> This site is also hosted in github pages. You can find the repository [here](https://github.com/roshangautam/roshangautam).

**_Thats it folks !!!_**
